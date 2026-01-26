import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user || user.role !== 'admin') {
            return Response.json({ error: 'Admin access required' }, { status: 403 });
        }

        const { credentialType, holderName, holderEmail, holderDid, roleTitle, authorityScope, validUntil } = await req.json();

        if (!credentialType || !holderName || !holderEmail || !roleTitle) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Get organization
        const orgs = await base44.entities.Organization.filter({ id: user.organization_id });
        const organization = orgs[0];

        if (!organization || !organization.lei) {
            return Response.json({ error: 'Organization must have LEI before issuing vLEIs' }, { status: 400 });
        }

        // Generate unique vLEI identifier
        const timestamp = Date.now();
        const vleiId = `vLEI-${organization.lei}-${credentialType}-${timestamp}`;

        // Create W3C Verifiable Credential
        const validFrom = new Date().toISOString();
        const credentialData = {
            "@context": [
                "https://www.w3.org/2018/credentials/v1",
                "https://www.gleif.org/vlei/v1"
            ],
            "id": vleiId,
            "type": ["VerifiableCredential", `${credentialType}Credential`],
            "issuer": {
                "id": organization.lei,
                "name": organization.name,
                "lei": organization.lei
            },
            "issuanceDate": validFrom,
            "expirationDate": validUntil || null,
            "credentialSubject": {
                "id": holderDid || `mailto:${holderEmail}`,
                "lei": organization.lei,
                "personLegalName": holderName,
                "officialRole": roleTitle,
                "roleType": credentialType,
                "authorityScope": authorityScope || `${credentialType} authority for ${organization.name}`,
                "email": holderEmail
            },
            "proof": {
                "type": "Ed25519Signature2020",
                "created": validFrom,
                "proofPurpose": "assertionMethod",
                "verificationMethod": `${organization.lei}#key-1`,
                "jws": `TAS_${credentialType}_${timestamp}_${organization.lei.substring(0, 8)}`
            }
        };

        // Create vLEI record
        const vleiRecord = await base44.asServiceRole.entities.vLEICredential.create({
            organization_id: user.organization_id,
            vlei_id: vleiId,
            credential_type: credentialType,
            holder_name: holderName,
            holder_email: holderEmail,
            holder_did: holderDid || null,
            role_title: roleTitle,
            authority_scope: authorityScope || `${credentialType} authority for ${organization.name}`,
            issued_by: user.email,
            status: 'active',
            valid_from: validFrom,
            valid_until: validUntil || null,
            credential_data: credentialData
        });

        // Create notification for the holder
        await base44.asServiceRole.entities.Notification.create({
            recipient_id: user.id,
            recipient_email: holderEmail,
            type: 'credential_issued',
            title: `${credentialType} vLEI Credential Issued`,
            message: `You have been issued a ${credentialType} credential as ${roleTitle} for ${organization.name}.`,
            priority: 'high',
            send_email: true,
            metadata: {
                vlei_id: vleiId,
                credential_type: credentialType,
                role_title: roleTitle
            }
        });

        return Response.json({
            success: true,
            vlei_id: vleiId,
            credential: credentialData,
            record: vleiRecord
        });

    } catch (error) {
        console.error('vLEI issuance error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});