import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, BookOpen, Users, FileText, Shield, Settings, 
  Activity, Globe, BarChart, Mail, CreditCard, Award,
  AlertCircle, CheckCircle, Download, Upload, Eye,
  Filter, RefreshCw, Bell, Lock, Unlock, Trash2,
  Edit, Plus, Share2, Calendar, DollarSign, TrendingUp
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export default function UserManual() {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
  }, []);

  const isAdmin = user?.role === 'admin';

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Business User Manual Sections
  const businessUserSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: BookOpen,
      subsections: [
        {
          title: 'Creating Your Account',
          content: `
**Overview:** Register and set up your TAS account to begin accessing compliance and identity verification services.

**Steps:**
1. Navigate to the TAS website homepage
2. Click "Get Started" or "Sign In" button
3. Enter your email address and create a secure password
4. Verify your email through the confirmation link sent to your inbox
5. Complete your profile information including name and organization details

**Examples:**
- Initial registration for new businesses needing LEI
- Creating accounts for team members who need vLEI credentials
- Setting up access for compliance officers

**Best Practices:**
- Use a strong password with uppercase, lowercase, numbers, and symbols
- Use a company email address (not personal email)
- Complete all profile fields for faster application processing

**Troubleshooting:**
- Email not received? Check spam folder or request a new confirmation email
- Password requirements not met? Ensure at least 8 characters with mixed case
- Account locked? Contact support at support@tas.example.com
          `
        },
        {
          title: 'Navigating the Dashboard',
          content: `
**Overview:** The dashboard is your central hub for monitoring applications, credentials, and compliance status.

**Key Components:**

**1. Quick Stats Panel**
- Shows your current application status
- Displays active credentials count
- Highlights pending actions requiring attention
- Real-time compliance score indicator

**2. Recent Activity Feed**
- Last 10 actions on your account
- Workflow progress updates
- System notifications and alerts
- Document upload confirmations

**3. Action Center**
- Quick access to common tasks
- Start new LEI application
- Request vLEI credentials
- Upload compliance documents

**Navigation Tips:**
- Use the top menu bar for major sections
- Click dashboard cards for detailed views
- Search function available in top-right corner
- Mobile-responsive design works on all devices

**Examples:**
- Monday morning compliance check routine
- Quick status verification before client meetings
- Team coordination using shared dashboard views
          `
        },
        {
          title: 'Understanding User Roles',
          content: `
**Overview:** Different user roles provide different levels of access and capabilities within TAS.

**User Role Types:**

**1. Regular User**
- Can submit applications for their organization
- View their own credentials and workflows
- Upload documents for verification
- Receive notifications about status changes
- Cannot manage other users or billing

**2. Organization Administrator**
- All regular user capabilities
- Invite new users to organization
- Manage team member access
- Configure organization settings
- View billing and usage reports
- Issue vLEI credentials to team members

**Permission Matrix:**
| Function | Regular User | Org Admin |
|----------|-------------|-----------|
| Submit LEI Application | ✓ | ✓ |
| View Own Credentials | ✓ | ✓ |
| Invite Users | ✗ | ✓ |
| Manage Billing | ✗ | ✓ |
| Issue vLEI | ✗ | ✓ |
| View Reports | ✗ | ✓ |

**Use Cases:**
- Small business: Owner as admin, accountant as regular user
- Enterprise: Compliance team lead as admin, team members as users
- Financial institution: Department heads as admins
          `
        }
      ]
    },
    {
      id: 'lei-application',
      title: 'LEI Application Process',
      icon: FileText,
      subsections: [
        {
          title: 'Starting a New LEI Application',
          content: `
**Overview:** Apply for a Legal Entity Identifier (LEI) - a unique 20-character code that identifies your organization globally.

**What is an LEI?**
An LEI is like a passport for your business in financial markets. It's required for:
- Trading securities and derivatives
- Regulatory reporting (MiFID II, EMIR, Dodd-Frank)
- Financial transactions in many jurisdictions
- Bank account opening in some countries

**Step-by-Step Application:**

**Step 1: Business Information**
- Enter legal name exactly as registered
- Provide business registration number
- Select entity legal form (LLC, Corporation, etc.)
- Specify registration country and jurisdiction

**Step 2: Address Details**
- Legal address (from business registration)
- Headquarters address (if different)
- Mailing address for correspondence

**Step 3: Contact Information**
- Primary contact person details
- Backup contact (recommended)
- Email addresses for notifications
- Phone numbers with country codes

**Step 4: Document Upload**
- Business registration certificate
- Proof of address (utility bill, bank statement)
- Articles of incorporation
- Supporting identification documents

**Step 5: Facial Verification**
- Click "Generate Verification Link"
- Scan QR code with mobile phone
- Complete liveness check (30-60 seconds)
- System automatically validates

**Timeline:**
- Document review: 24-48 hours
- AML screening: 1-2 business days
- LEI issuance: Same day after approval
- Total process: 3-5 business days typically

**Costs:**
- Application fee: Based on your billing plan
- Annual renewal: Automatic billing
- Rush processing: Available for additional fee

**Common Mistakes to Avoid:**
- Using trading name instead of legal name
- Incomplete business registration numbers
- Low-quality document scans
- Incorrect entity legal form selection
          `
        },
        {
          title: 'Uploading Required Documents',
          content: `
**Overview:** Proper documentation is critical for LEI application approval. This guide ensures you submit the right documents in the correct format.

**Required Documents Checklist:**

**1. Business Registration Certificate**
- Official certificate from government registry
- Must show legal name, registration number, and date
- Accepted formats: PDF (preferred), JPG, PNG
- Must be current (issued within last 12 months)
- Should include registry seal or stamp

**2. Proof of Address**
- Utility bill (electricity, water, gas)
- Bank statement
- Government correspondence
- Must show business legal address
- Dated within last 3 months

**3. Articles of Incorporation**
- Original incorporation documents
- Amendments if company name changed
- Showing current legal structure
- Certified copy preferred

**Document Quality Requirements:**
- Minimum 300 DPI resolution
- All text must be clearly readable
- No shadows or glare on photos
- Complete document (all pages)
- File size: Maximum 10MB per file
- Accepted formats: PDF, JPG, JPEG, PNG

**Upload Process:**
1. Click "Upload Documents" button
2. Select file from your computer
3. Wait for upload confirmation (green checkmark)
4. Upload additional documents if needed
5. Verify all required documents uploaded
6. Click "Continue to Next Step"

**Document Security:**
- All uploads encrypted in transit (TLS 1.3)
- Stored in secure, compliant data centers
- Access logged for audit purposes
- Automatically deleted 90 days after LEI issuance

**Troubleshooting:**
- **File too large:** Compress PDF or reduce image resolution
- **Format not accepted:** Convert to PDF using free online tools
- **Upload failed:** Check internet connection, try again
- **Quality rejected:** Ensure good lighting, no shadows, all text readable

**Examples of Good vs. Bad Documents:**
- ✓ Clear, straight scan of official certificate
- ✗ Photo at an angle with shadows
- ✓ Recent utility bill with full address visible
- ✗ Cropped bill missing key information
          `
        },
        {
          title: 'Facial Liveness Verification',
          content: `
**Overview:** Facial liveness verification proves you're a real person completing the application, not using a photo or video. This prevents fraud and ensures regulatory compliance.

**Why is This Required?**
- Regulatory requirement for Know Your Customer (KYC)
- Prevents identity theft and impersonation
- Required by GLEIF for LEI issuance
- Ensures person applying has authority

**Preparing for Verification:**

**Equipment Needed:**
- Smartphone, tablet, or computer with camera
- Good lighting (natural light from window ideal)
- Quiet environment
- Stable internet connection

**Optimal Conditions:**
- Face the camera directly
- Remove glasses (if possible)
- Remove hat or head covering
- Ensure face is well-lit and visible
- No other people in frame

**Step-by-Step Process:**

**From Desktop Computer:**
1. Click "Generate Verification Link" button
2. QR code appears on screen
3. Open camera app on your phone
4. Point at QR code to scan
5. Link opens in mobile browser
6. Follow on-screen instructions
7. Complete liveness actions (blink, turn head, smile)
8. Verification completes in 30-60 seconds
9. Return to computer, click "I've Completed Verification"

**From Mobile Device:**
1. Click "Generate Verification Link"
2. Click "Open Verification Link"
3. Allow camera permissions
4. Position face in oval frame
5. Follow instructions (natural movements)
6. Keep face centered in frame
7. Wait for automatic completion
8. Click "I've Completed Verification"

**What Happens During Verification:**
- Camera captures live video of your face
- AI detects natural human movements
- Compares to database of known spoofing attempts
- Validates you are physically present
- Creates encrypted biometric signature
- Results sent to TAS instantly

**Liveness Actions You May Be Asked:**
- Blink naturally
- Turn head left or right
- Smile
- Look up or down
- Nod
- All actions are simple and natural

**Privacy & Security:**
- Facial data processed, not permanently stored
- Encrypted during transmission
- Deleted within 24 hours after verification
- Compliant with GDPR, CCPA, PDPA
- No facial recognition database created
- Only used for this one-time verification

**Troubleshooting:**

**"Poor Lighting" Error:**
- Move to area with better light
- Face a window (natural light)
- Turn on overhead lights
- Avoid backlighting (light behind you)

**"Face Not Detected" Error:**
- Move closer to camera
- Ensure face fills the oval frame
- Remove sunglasses or hat
- Check camera permissions enabled

**"Liveness Check Failed" Error:**
- Make movements more natural (not robotic)
- Ensure you're alone in frame
- Don't use a photo or video of yourself
- Try again in better lighting

**"Connection Lost" Error:**
- Check internet connection stable
- Restart verification process
- Try from different device
- Contact support if persists

**Verification Results:**
- **Pass:** Green checkmark, proceed to submission
- **Review:** Manual review required (1-2 hours)
- **Fail:** Can retry immediately up to 3 times
- After 3 failures: Contact support for assistance

**Accessibility:**
- Screen reader compatible
- Alternative verification available for disabilities
- Contact support@tas.example.com for assistance
          `
        },
        {
          title: 'Tracking Application Status',
          content: `
**Overview:** Monitor your LEI application progress in real-time with detailed status updates and estimated completion times.

**Application Lifecycle Stages:**

**1. Draft (Before Submission)**
- Application saved but not submitted
- Can edit all fields
- Documents can be added/removed
- No review process started
- Action: Complete and submit when ready

**2. Submitted**
- Application sent to TAS for review
- Initial validation checks running
- AML screening initiated
- Estimated time: 1-2 hours
- Action: Wait for review completion

**3. Under Review**
- Document verification in progress
- Legal entity information being validated
- Business registry checks running
- Compliance officer assigned
- Estimated time: 24-48 hours
- Action: Respond to any questions from reviewer

**4. Additional Information Required**
- Reviewer needs clarification or more documents
- Email notification sent to you
- Application paused until you respond
- Action: Upload requested documents or respond to queries

**5. AML Screening**
- Anti-money laundering checks running
- Sanctions list screening
- PEP (Politically Exposed Person) checks
- Adverse media screening
- Estimated time: 2-4 hours
- Action: No action needed, automatic process

**6. Approved**
- All checks passed successfully
- LEI generation process initiated
- vLEI credential being created
- Email confirmation sent
- Estimated time: Minutes
- Action: Wait for credential issuance

**7. LEI Issued**
- LEI code generated and active
- Visible in GLEIF global database
- vLEI credential issued to your wallet
- Welcome email with credentials sent
- Action: Download credentials, start using LEI

**8. Rejected**
- Application did not pass verification
- Email with detailed reasons sent
- Can reapply after addressing issues
- Partial refund may apply
- Action: Review rejection reasons, correct, reapply

**How to Check Status:**

**Method 1: Dashboard**
- Log into TAS portal
- Dashboard shows current status
- Color-coded status badge
- Progress bar showing completion %

**Method 2: Email Notifications**
- Automatic email on each status change
- Contains detailed information
- Links directly to application
- Check spam folder if not in inbox

**Method 3: Application Detail Page**
- Click on application from dashboard
- View complete timeline
- See reviewer notes
- Download documents submitted

**Status Indicators:**

🔵 **Draft** - Blue, in progress
🟡 **Submitted** - Yellow, waiting
🟠 **Under Review** - Orange, being processed
🔴 **Action Required** - Red, needs your attention
🟢 **Approved** - Green, completed
⚫ **Rejected** - Gray, failed

**Estimated Processing Times:**

| Stage | Typical Duration | Rush Available |
|-------|-----------------|----------------|
| Document Review | 24-48 hours | Yes, +$50 |
| AML Screening | 2-4 hours | No |
| Final Approval | 1-2 hours | No |
| LEI Issuance | Instant | N/A |
| **Total** | **3-5 business days** | **24 hours** |

**What to Do at Each Stage:**

**When "Additional Information Required":**
1. Read email carefully for what's needed
2. Gather requested documents
3. Log into application
4. Upload new documents
5. Click "Submit Updated Information"
6. Review resumes automatically

**When "Under Review" for Over 48 Hours:**
1. Check email for any messages
2. Verify documents uploaded correctly
3. Check application detail page for notes
4. Contact support if no updates after 72 hours

**Notification Settings:**
- Email: On by default for all status changes
- SMS: Optional, configure in settings
- In-app: Always enabled
- Webhook: Available for API integrations

**Historical Tracking:**
- View past applications in Archive
- See timeline of all changes
- Download audit trail
- Export to PDF for records
          `
        }
      ]
    },
    {
      id: 'credentials',
      title: 'Managing Credentials',
      icon: Award,
      subsections: [
        {
          title: 'Viewing Your LEI',
          content: `
**Overview:** Your Legal Entity Identifier (LEI) is a unique 20-character alphanumeric code that identifies your organization in global financial markets.

**Where to Find Your LEI:**

**1. Dashboard**
- Main dashboard shows active LEI
- Click to view full details
- Copy button for quick sharing

**2. Credentials Page**
- Navigate to "Credentials" in main menu
- View all issued credentials
- Download verification certificates

**3. Email Confirmation**
- LEI sent via email when issued
- Contains full details and certificate
- PDF attachment for records

**LEI Format Explained:**
Example: 529900T8BM49AURSDO55

- **Characters 1-4:** LOU code (issuing authority)
- **Characters 5-6:** Reserved (usually 00)
- **Characters 7-18:** Entity identifier
- **Characters 19-20:** Checksum digits

**LEI Details Display:**

**Basic Information:**
- 20-character LEI code
- Organization legal name
- Registration number
- Entity legal form

**Status Information:**
- Current status (Active/Lapsed)
- Issue date
- Last update date
- Next renewal date
- Renewal status

**Registry Information:**
- Issuing LOU name
- Registration country
- Managing LOU
- GLEIF verification status

**Actions Available:**

**Copy LEI Code:**
1. Click copy icon next to LEI
2. Paste into forms, emails, contracts
3. Use in regulatory filings

**Download Certificate:**
1. Click "Download Certificate" button
2. Receives official PDF certificate
3. Contains QR code for verification
4. Includes GLEIF seal of authenticity

**Verify LEI:**
1. Click "Verify in GLEIF Database"
2. Opens GLEIF.org in new tab
3. Shows global registry entry
4. Confirms active status

**Share LEI:**
1. Click "Share" button
2. Generate shareable link
3. Send to counterparties
4. Link includes verification data

**Using Your LEI:**

**In Financial Transactions:**
- Provide to banks when opening accounts
- Include in trade confirmations
- Use in derivatives transactions
- Required for security purchases

**In Regulatory Filings:**
- MiFID II transaction reporting
- EMIR trade repositories
- Dodd-Frank swap reporting
- SFTR securities financing

**On Legal Documents:**
- Include on company letterhead
- Add to invoices for B2B clients
- Reference in contracts
- Display on company website

**LEI Renewal:**
- Annual renewal required to keep active
- Automatic reminder 60 days before expiry
- One-click renewal process
- Billing automatic with saved payment method

**If LEI Lapses:**
- Shows "Lapsed" status
- Still searchable in GLEIF database
- Cannot be used for new transactions
- Renewal available with small penalty fee

**LEI Ownership Transfer:**
- Contact support to transfer LEI
- Requires legal documentation
- Merger/acquisition scenarios
- 2-3 business days process
          `
        },
        {
          title: 'Understanding vLEI Credentials',
          content: `
**Overview:** A verifiable LEI (vLEI) is a digital, cryptographically secure version of your LEI that enables automated verification and digital signatures.

**What is a vLEI?**
Think of it as a digital passport for your organization:
- Contains your LEI in verifiable credential format
- Cryptographically signed by TAS
- Can be verified instantly by anyone
- No need for manual checks
- Machine-readable for automation

**Types of vLEI Credentials:**

**1. Organization vLEI (OOR)**
- Represents the organization itself
- Issued to the legal entity
- Contains business registration details
- Used for organizational identity
- One per organization

**2. Person vLEI (ECR)**
- Issued to individuals within organization
- Links person to their role
- Multiple can be issued per organization
- Used for authorized signing
- Each has specific authority scope

**vLEI Structure:**

**Credential Contents:**
```
{
  "credentialSubject": {
    "LEI": "529900T8BM49AURSDO55",
    "legalName": "Example Corp Ltd",
    "registrationNumber": "12345678",
    "jurisdiction": "GB",
    "legalForm": "Limited Company"
  },
  "issuer": "did:web:tas.example.com",
  "issuanceDate": "2026-01-26T10:30:00Z",
  "expirationDate": "2027-01-26T10:30:00Z",
  "proof": {
    "type": "Ed25519Signature2020",
    "created": "2026-01-26T10:30:00Z",
    "proofPurpose": "assertionMethod",
    "verificationMethod": "did:web:tas.example.com#key-1",
    "proofValue": "z3MvG..."
  }
}
```

**How to Use vLEI:**

**1. Digital Signatures**
- Sign contracts electronically
- Legally binding in most jurisdictions
- Recipient can verify instantly
- No need for wet signatures

**2. API Authentication**
- Use vLEI in API calls
- Proves your organization's identity
- Automated B2B transactions
- No passwords or API keys needed

**3. Smart Contracts**
- Interact with blockchain applications
- Prove organizational authority
- DeFi compliance requirements
- Token issuance verification

**4. Regulatory Reporting**
- Automated filing submissions
- Instant identity verification
- Reduced manual processing
- Faster approval times

**Viewing Your vLEI:**

**From Dashboard:**
1. Navigate to "Credentials" page
2. Click on vLEI credential
3. View full credential details
4. See cryptographic proof

**Credential Details:**
- Credential ID (DID)
- Issued date
- Expiry date
- Issuer information
- Cryptographic signature
- Verification status

**Download Options:**
- JSON format (machine-readable)
- PDF certificate (human-readable)
- QR code (for mobile verification)
- W3C Verifiable Credential format

**Verifying a vLEI:**

**Manual Verification:**
1. Click "Verify Credential"
2. System checks cryptographic signature
3. Verifies against GLEIF trust registry
4. Shows verification result (Valid/Invalid)
5. Displays verification timestamp

**Programmatic Verification:**
```javascript
// API call to verify vLEI
const result = await verifyVLEI(credential);
// Returns: { valid: true, issuer: "TAS", status: "active" }
```

**vLEI Lifecycle:**

**Issuance:** 
- Automatically created with LEI
- No additional fee
- Instant generation

**Active:**
- Valid for use
- Can be presented to verifiers
- Cryptographic proof valid

**Renewal:**
- Automatically renewed with LEI
- New signature generated
- Old credential remains valid until expiry

**Revocation:**
- Can be revoked if compromised
- Revocation published to registry
- Verifiers see revoked status
- New credential can be reissued

**Security Features:**

**Cryptographic Proof:**
- Ed25519 digital signature
- Cannot be forged
- Mathematically verifiable
- Quantum-resistant options available

**Tamper Evidence:**
- Any modification breaks signature
- Verifiers detect alterations instantly
- Hash-based integrity checks

**Privacy Preservation:**
- Selective disclosure available
- Share only necessary attributes
- Zero-knowledge proofs supported

**Best Practices:**

**Storage:**
- Store in secure digital wallet
- Backup credential JSON file
- Keep offline copy in encrypted storage
- Don't share private keys

**Usage:**
- Only present to trusted verifiers
- Use selective disclosure when possible
- Don't email credential unencrypted
- Revoke immediately if compromised

**Sharing:**
- Use secure sharing portal
- Time-limited access links
- Watermark sensitive presentations
- Log all sharing activities
          `
        },
        {
          title: 'Issuing vLEI to Team Members',
          content: `
**Overview:** Organization administrators can issue vLEI credentials to team members, delegating authority for specific roles and responsibilities.

**Prerequisites:**
- Must be organization administrator
- Organization must have active LEI
- Team member must have TAS account
- Team member email must be verified

**Use Cases for Team vLEI:**

**Finance Team:**
- CFO: Sign financial statements
- Treasurer: Authorize payments
- Controller: Approve reports

**Legal Team:**
- General Counsel: Sign contracts
- Compliance Officer: Regulatory filings
- Corporate Secretary: Board resolutions

**Operations:**
- COO: Operational agreements
- Project Manager: Vendor contracts
- Department Head: Budget approvals

**Step-by-Step Issuance Process:**

**Step 1: Access Credential Management**
1. Log into TAS portal
2. Navigate to "Credentials" page
3. Click "Issue vLEI to Team Member"
4. Confirm you have authority

**Step 2: Select Team Member**
- Choose from existing organization users
- Or invite new user via email
- User must accept invitation
- User must complete identity verification

**Step 3: Define Role and Authority**

**Credential Type:**
- Select "Official Organizational Role (OOR)"
- Or "Engagement Context Role (ECR)"

**Role Title:**
- CEO, CFO, Director, Manager, etc.
- Custom titles supported
- Should match person's actual role

**Authority Scope:**
Define what the person can do with this credential:

**Financial Authority:**
- [ ] Sign contracts up to $____
- [ ] Approve payments
- [ ] Make financial commitments
- [ ] Access financial systems

**Operational Authority:**
- [ ] Sign operational agreements
- [ ] Manage vendors
- [ ] Approve projects
- [ ] Access operational systems

**Regulatory Authority:**
- [ ] Submit regulatory filings
- [ ] Represent organization to regulators
- [ ] Sign compliance documents
- [ ] Access regulatory portals

**Step 4: Set Validity Period**

**Duration Options:**
- Fixed term (e.g., 1 year, 2 years)
- Matches employment contract
- Indefinite (until revoked)
- Custom date range

**Recommended Practices:**
- Annual renewal for senior roles
- Match to employment terms
- Review quarterly for changes
- Auto-expire on role change

**Step 5: Review and Issue**

**Review Summary:**
- Recipient name and email
- Role title and description
- Authority scope granted
- Validity period
- Issuer information (you)

**Final Confirmation:**
1. Review all details carefully
2. Check "I confirm authority to issue"
3. Click "Issue vLEI Credential"
4. Credential generated instantly

**Step 6: Recipient Notification**

**Email Sent to Recipient:**
- Notification of credential issuance
- Link to view credential
- Instructions for use
- Security guidelines

**Recipient Actions:**
1. Log into TAS account
2. View new credential
3. Download to digital wallet
4. Acknowledge receipt

**Managing Issued Credentials:**

**View All Issued Credentials:**
- Navigate to "Team Credentials" tab
- See list of all active credentials
- Filter by role, person, status
- Export to Excel/CSV

**Credential Details:**
For each credential you can see:
- Holder name
- Role title
- Issue date
- Expiry date
- Authority scope
- Usage statistics
- Last used date

**Credential Actions:**

**1. View Credential**
- Click on credential row
- See full details
- View cryptographic proof
- Check verification status

**2. Modify Authority**
- Update authority scope
- Extend/reduce permissions
- Effective immediately
- Recipient notified of changes

**3. Suspend Credential**
- Temporarily disable
- Use for leave of absence
- Reactivate when needed
- No reissuance required

**4. Revoke Credential**
- Permanently invalidate
- Use when person leaves company
- Role change scenarios
- Security incidents
- Cannot be undone

**5. Renew Credential**
- Before expiry date
- One-click renewal
- Same authority scope
- New validity period

**Revocation Process:**

**When to Revoke:**
- Employee termination
- Role change
- Security compromise
- Authority no longer needed

**How to Revoke:**
1. Click "Revoke" next to credential
2. Select reason for revocation
3. Add optional notes
4. Confirm revocation
5. Recipient notified immediately

**What Happens on Revocation:**
- Credential marked invalid immediately
- Verifiers see revoked status
- Cannot be used for signatures
- Removed from holder's wallet
- Revocation published to registry

**Compliance and Governance:**

**Audit Trail:**
- All issuances logged
- All modifications tracked
- All revocations recorded
- Export for compliance reports

**Regular Reviews:**
- Quarterly access reviews recommended
- Annual recertification
- Verify roles still accurate
- Check authority scopes appropriate

**Approval Workflows:**
- Set up approval chains
- Multiple signatures required
- Segregation of duties
- Compliance officer review

**Reporting:**

**Usage Reports:**
- How often credentials used
- Which systems accessed
- Signatures made
- Transactions authorized

**Compliance Reports:**
- Active credentials by role
- Expiring credentials (next 30 days)
- Recently revoked
- Audit trail export

**Best Practices:**

**Principle of Least Privilege:**
- Grant minimum authority needed
- Review and adjust regularly
- Don't over-provision access

**Segregation of Duties:**
- No single person has complete authority
- Financial approvals require multiple signatures
- Different people for different functions

**Regular Recertification:**
- Annual review of all credentials
- Manager confirms still appropriate
- Update authority scopes as needed

**Immediate Revocation:**
- Revoke on last day of employment
- Automate with HR system if possible
- Don't delay revocation

**Documentation:**
- Keep records of why each credential issued
- Document authority delegated
- Maintain approval records
- Archive for compliance

**Security:**
- Use multi-factor authentication
- Require strong passwords
- Monitor for suspicious activity
- Alert on unusual credential use

**Training:**
- Train credential holders on proper use
- Explain authority limits
- Provide security guidelines
- Regular refresher training
          `
        }
      ]
    },
    {
      id: 'compliance',
      title: 'Compliance & Monitoring',
      icon: Shield,
      subsections: [
        {
          title: 'Understanding AML Screening',
          content: `
**Overview:** Anti-Money Laundering (AML) screening checks your organization against global sanctions lists, watchlists, and adverse media to ensure regulatory compliance.

**What is AML Screening?**

AML screening is a regulatory requirement that checks if your organization or its beneficial owners appear on:
- Government sanctions lists (OFAC, UN, EU, etc.)
- Politically Exposed Persons (PEP) databases
- Financial crime watchlists
- Adverse media sources
- Enforcement action lists

**Why is it Required?**

**Legal Requirements:**
- Required by international law (FATF guidelines)
- Mandated for financial institutions
- LEI issuance compliance requirement
- Bank due diligence obligations

**Risk Management:**
- Prevents doing business with sanctioned entities
- Protects your organization from fines
- Maintains banking relationships
- Preserves business reputation

**What Gets Screened:**

**Organization Level:**
- Legal entity name
- Trading names and DBAs
- Business registration numbers
- Registered addresses
- Countries of operation

**Individual Level:**
- Directors and officers
- Beneficial owners (25%+ ownership)
- Authorized signatories
- Key management personnel

**Screening Process:**

**Step 1: Data Collection**
- Information gathered from your LEI application
- Public registry data
- Corporate structure information
- Ownership details

**Step 2: Automated Screening**
- Names run through global databases
- Fuzzy matching algorithms
- Multiple name variations checked
- Real-time screening (2-5 minutes)

**Step 3: Match Analysis**
- Potential matches identified
- False positives filtered
- Risk scored (Low/Medium/High)
- Detailed match report generated

**Step 4: Human Review**
- High-risk matches reviewed by analyst
- Context evaluated
- Final determination made
- Decision documented

**Screening Results:**

**Clear (Green):**
- No matches found
- Proceed with LEI issuance
- Typical result for most businesses
- Continuous monitoring activated

**Potential Match (Yellow):**
- Possible match requires review
- Additional information requested
- Manual investigation by compliance team
- Resolution within 24-48 hours

**Hit (Red):**
- Confirmed match on sanctions list
- LEI application cannot proceed
- Detailed explanation provided
- Appeal process available if in error

**Understanding Match Scores:**

**Low Risk (0-30):**
- Weak name similarity
- Different jurisdiction
- Different business type
- Usually false positive

**Medium Risk (31-70):**
- Moderate name match
- Some details align
- Requires investigation
- Could be same entity

**High Risk (71-100):**
- Strong name match
- Multiple data points align
- Likely same entity
- Detailed review required

**What Happens During Review:**

**Documentation Request:**
You may be asked to provide:
- Government-issued ID for beneficial owners
- Proof of address for individuals
- Corporate structure chart
- Source of funds documentation
- Business activity description

**Verification Timeline:**
- Standard review: 24-48 hours
- Complex cases: 3-5 business days
- Additional documentation needed: Adds time
- Final decision: Email notification

**Common Screening Triggers:**

**Name Confusion:**
- Common names (e.g., "John Smith")
- Similar to known entity
- Translated names
- Abbreviations

**Geographic Factors:**
- Operations in high-risk countries
- Ownership from sanctioned regions
- Business partners in watchlist countries

**Industry Factors:**
- High-risk industries (money services, crypto)
- Arms/defense sector
- Precious metals/diamonds
- Cross-border money transfers

**Beneficial Ownership:**
- PEP (politician, government official)
- Family member of PEP
- Close associate of sanctioned person

**Continuous Monitoring:**

**Ongoing Checks:**
- Daily screening against updated lists
- New sanctions list monitoring
- Adverse media scanning
- Corporate structure change detection

**Alert Triggers:**
- New sanctions list additions
- Adverse news mentions
- Ownership changes
- Geographic expansion into high-risk areas

**Your Responsibilities:**

**Keep Information Updated:**
- Report ownership changes immediately
- Update addresses within 30 days
- Notify of name changes
- Report PEP status changes

**Respond to Queries:**
- Reply to screening questions within 48 hours
- Provide requested documentation
- Cooperate with investigations
- Maintain accurate records

**Annual Recertification:**
- Confirm no material changes
- Update beneficial owner information
- Resubmit documentation if requested
- Acknowledge continued compliance

**If You Receive an Alert:**

**Step 1: Review Notification**
- Read alert details carefully
- Check what triggered the match
- Review match score and details
- Note response deadline

**Step 2: Gather Documentation**
- Collect proof of identity
- Prepare explanation
- Compile supporting documents
- Organize chronologically

**Step 3: Submit Response**
- Log into TAS portal
- Navigate to alert
- Upload documentation
- Submit explanation

**Step 4: Wait for Resolution**
- Compliance team reviews (24-48 hours)
- May request additional information
- Decision communicated via email
- Can appeal if disagree with decision

**Appeals Process:**

**If AML screening decision is unfavorable:**
1. Submit formal appeal within 30 days
2. Provide additional evidence
3. Explain why determination is incorrect
4. Senior compliance officer reviews
5. Final decision within 10 business days
6. Further appeal to regulatory body if needed

**Privacy and Data Protection:**

**Data Security:**
- All screening data encrypted
- Access logged and monitored
- Retained per regulatory requirements
- Deleted after retention period

**Information Sharing:**
- May be shared with regulators if required
- Shared with LEI issuing authority
- Not sold to third parties
- Subject to data protection laws

**Your Rights:**
- Access your screening records
- Request correction of errors
- Object to processing (limited circumstances)
- Data portability

**Best Practices:**

**Proactive Steps:**
- Self-screen before applying
- Check beneficial owners not on lists
- Research countries of operation
- Review adverse media about your company

**Accurate Information:**
- Use exact legal names
- Provide complete ownership details
- List all jurisdictions accurately
- Disclose PEP relationships upfront

**Quick Response:**
- Monitor email for alerts
- Respond within required timeframes
- Provide complete documentation
- Follow up if no response in 48 hours

**Compliance Culture:**
- Train staff on AML requirements
- Maintain compliance procedures
- Document all due diligence
- Regular internal audits
          `
        },
        {
          title: 'Handling Compliance Alerts',
          content: `
**Overview:** Compliance alerts notify you of potential regulatory issues, required actions, or risk factors that need your attention. Proper handling ensures continued compliance and active LEI status.

**Types of Compliance Alerts:**

**1. Renewal Reminders**
- **Trigger:** 60 days before LEI expiry
- **Severity:** Low → High (as expiry approaches)
- **Action Required:** Renew LEI subscription
- **Timeline:** Must renew before expiry date

**2. Information Update Required**
- **Trigger:** Annual data refresh requirement
- **Severity:** Medium
- **Action Required:** Confirm or update entity information
- **Timeline:** Within 30 days

**3. AML Screening Hit**
- **Trigger:** Name match on sanctions/PEP list
- **Severity:** High
- **Action Required:** Provide documentation/explanation
- **Timeline:** Within 48 hours

**4. Document Expiry**
- **Trigger:** Uploaded documents nearing expiry
- **Severity:** Medium
- **Action Required:** Upload updated documents
- **Timeline:** Before document expiry date

**5. Beneficial Owner Change Detected**
- **Trigger:** Public registry shows ownership change
- **Severity:** High
- **Action Required:** Confirm changes, update records
- **Timeline:** Within 7 days

**6. Address Mismatch**
- **Trigger:** Address different in public records
- **Severity:** Medium
- **Action Required:** Clarify correct address
- **Timeline:** Within 14 days

**7. Failed Payment**
- **Trigger:** Renewal payment declined
- **Severity:** Critical
- **Action Required:** Update payment method
- **Timeline:** Within 3 days to avoid suspension

**8. Regulatory Change**
- **Trigger:** New regulation affects your entity
- **Severity:** Medium
- **Action Required:** Review and acknowledge
- **Timeline:** Varies by regulation

**Alert Notification Methods:**

**1. In-App Notifications**
- Bell icon in top-right header
- Red badge shows unread count
- Click to view alert details
- Mark as read when actioned

**2. Email Notifications**
- Sent to primary contact email
- Subject line indicates severity
- Contains alert summary
- Link to full details in portal

**3. SMS Notifications (Optional)**
- For critical/high severity only
- Configure in notification settings
- Brief message with action needed
- Link to portal

**4. Dashboard Banner**
- Persistent banner for critical alerts
- Appears on every page
- Dismissible after action taken
- Returns if deadline approaching

**Alert Severity Levels:**

**🔵 Low (Informational)**
- No immediate action required
- Awareness notifications
- System updates
- Best practice reminders
- **Example:** "New feature available"

**🟡 Medium (Action Required)**
- Action needed within days/weeks
- Not immediately critical
- Business-as-usual compliance
- **Example:** "Annual information review due"

**🟠 High (Urgent)**
- Action required within hours/days
- Risk of service disruption
- Regulatory compliance at stake
- **Example:** "AML screening requires response"

**🔴 Critical (Immediate)**
- Immediate action required
- Service interruption imminent
- Serious compliance risk
- **Example:** "Payment failed - LEI suspension in 24 hours"

**How to View Alerts:**

**From Dashboard:**
1. Bell icon shows unread alert count
2. Click bell to open alert panel
3. See list of all active alerts
4. Click alert to view details

**From Alerts Page:**
1. Navigate to "Compliance" → "Alerts"
2. View all alerts (read and unread)
3. Filter by type, severity, status
4. Sort by date or priority

**Alert Details Include:**
- Alert type and title
- Severity level (color-coded)
- Date/time triggered
- Detailed description
- Required actions
- Deadline for response
- Related entity/application
- Supporting documentation
- Response history

**How to Respond to Alerts:**

**Step 1: Read Carefully**
- Understand what triggered the alert
- Note the deadline for response
- Check what documentation is needed
- Review any supporting information

**Step 2: Gather Information**
- Collect required documents
- Prepare explanations if needed
- Consult with relevant team members
- Review your records for accuracy

**Step 3: Submit Response**
- Click "Respond to Alert" button
- Fill in required information
- Upload supporting documents
- Add explanation if needed
- Submit response

**Step 4: Track Resolution**
- Alert status changes to "Under Review"
- Compliance team reviews (24-48 hours)
- May request additional information
- Final resolution notification sent

**Step 5: Confirm Resolution**
- Review resolution message
- Verify issue is resolved
- Mark alert as complete
- Archive for records

**Common Alert Scenarios:**

**Scenario 1: Renewal Reminder**

**Alert:** "LEI renewal due in 30 days"

**Action:**
1. Click "Renew Now" in alert
2. Review current information
3. Update if anything changed
4. Confirm payment method
5. Submit renewal
6. Receive confirmation

**Expected Resolution:** Immediate

**Scenario 2: AML Screening Hit**

**Alert:** "Potential sanctions match - immediate review required"

**Action:**
1. Review match details
2. Determine if false positive
3. Gather proof of identity
4. Submit clarification with documents
5. Wait for compliance review

**Expected Resolution:** 24-48 hours

**Scenario 3: Document Expiry**

**Alert:** "Business registration certificate expires in 15 days"

**Action:**
1. Obtain updated certificate from registry
2. Upload new document to portal
3. System auto-validates
4. Old document archived

**Expected Resolution:** Immediate upon upload

**Scenario 4: Payment Failure**

**Alert:** "Payment declined - LEI will suspend in 3 days"

**Action:**
1. Update credit card or bank details
2. Retry payment manually
3. Confirm payment successful
4. Alert auto-resolves

**Expected Resolution:** Minutes

**Scenario 5: Address Mismatch**

**Alert:** "Registered address differs from business registry"

**Action:**
1. Review both addresses
2. Determine which is correct
3. Update in system or explain discrepancy
4. Upload proof of address if needed

**Expected Resolution:** 2-3 business days

**Alert Response Best Practices:**

**Do's:**
✓ Respond within required timeframe
✓ Provide complete documentation
✓ Be accurate and truthful
✓ Keep records of responses
✓ Follow up if no reply in 48 hours
✓ Set calendar reminders for deadlines

**Don'ts:**
✗ Ignore alerts (even if seem minor)
✗ Provide incomplete information
✗ Miss response deadlines
✗ Upload irrelevant documents
✗ Assume alert will auto-resolve
✗ Wait until last minute to respond

**Notification Settings:**

**Customize Alerts:**
1. Navigate to Settings → Notifications
2. Choose notification methods per alert type
3. Set quiet hours (no SMS at night)
4. Add backup email addresses
5. Save preferences

**Email Preferences:**
- Immediate: Email sent instantly
- Daily Digest: One email per day with all alerts
- Weekly Summary: Friday roundup
- Critical Only: Only high/critical severity

**SMS Preferences:**
- All Alerts: Every alert triggers SMS
- Critical Only: Only critical alerts
- Disabled: No SMS notifications

**Alert History & Reporting:**

**View Alert History:**
- Navigate to Compliance → Alert History
- See all alerts for last 12 months
- Filter by type, date, status
- Export to Excel/PDF

**Alert Metrics:**
- Average response time
- Alerts by type (last 90 days)
- Resolution rate
- Overdue alerts count

**Compliance Reporting:**
- Generate monthly compliance report
- Shows all alerts and responses
- Demonstrates regulatory compliance
- Export for board meetings/audits

**Escalation Procedures:**

**If Unable to Respond in Time:**
1. Contact support immediately
2. Explain the delay
3. Request extension if available
4. Provide estimated response date
5. Follow up with response ASAP

**If Disagree with Alert:**
1. Submit response explaining disagreement
2. Provide supporting evidence
3. Request review by senior compliance officer
4. Await re-evaluation
5. Escalate to regulatory body if needed

**Getting Help:**

**Support Channels:**
- Email: compliance@tas.example.com
- Phone: +XX-XXXX-XXXX (business hours)
- Live Chat: Available in portal
- Support tickets: For detailed issues

**Response Times:**
- Critical alerts: Within 2 hours
- High severity: Within 4 hours
- Medium/Low: Within 24 hours

**Consequences of Non-Response:**

**Missing Deadlines:**
- First reminder: 24 hours after deadline
- Second reminder: 48 hours after deadline
- Final notice: 72 hours after deadline
- Automatic suspension: 7 days after deadline

**During Suspension:**
- LEI marked "Lapsed" in GLEIF
- Cannot be used for new transactions
- Banking relationships may be affected
- Reinstatement requires full review + penalty fee

**Preventing Alerts:**

**Proactive Measures:**
- Keep contact information updated
- Maintain accurate entity data
- Upload documents before expiry
- Renew LEI 30+ days early
- Regular self-audits (quarterly)
- Monitor public registry changes
- Review notifications weekly

**Quarterly Compliance Checklist:**
- [ ] All documents current (not expiring soon)
- [ ] Address matches public records
- [ ] Ownership information accurate
- [ ] Payment method valid
- [ ] Contact details up to date
- [ ] No pending alerts
- [ ] Responded to all communications
          `
        }
      ]
    },
    {
      id: 'workflows',
      title: 'Workflows & Automation',
      icon: Activity,
      subsections: [
        {
          title: 'Understanding Workflow Status',
          content: `
**Overview:** Workflows represent multi-step processes in TAS (KYB verification, AML screening, credential issuance). Understanding workflow status helps you track progress and anticipate next steps.

**What is a Workflow?**

A workflow is an automated business process with multiple steps:
- Each step may involve different systems
- Steps execute in sequence or parallel
- Human review may be required at certain steps
- Final outcome determined by all step results

**Common Workflow Types:**

**1. KYB (Know Your Business) Verification**
- Verifies business legitimacy
- Checks registration documents
- Validates business addresses
- Confirms authorized representatives

**2. AML (Anti-Money Laundering) Screening**
- Screens against sanctions lists
- PEP (Politically Exposed Person) checks
- Adverse media scanning
- Continuous monitoring setup

**3. LEI Issuance**
- Generates unique 20-character code
- Registers with GLEIF database
- Creates verification certificate
- Activates in global registry

**4. vLEI Credential Issuance**
- Generates verifiable credential
- Cryptographic signing
- Wallet integration
- Recipient notification

**5. Facial Verification**
- Liveness detection
- Identity matching
- Biometric validation
- Results recording

**Workflow Status Lifecycle:**

**📝 Pending**
- Workflow created but not started
- Waiting for trigger condition
- Manual initiation required
- Or scheduled for future start

**▶️ In Progress**
- Workflow actively executing
- One or more steps running
- Progress tracked in real-time
- Estimated completion time shown

**⏸️ Paused**
- Temporarily halted
- Waiting for external data
- User input required
- Will resume when ready

**✅ Completed**
- All steps finished successfully
- Final outcome positive
- Results available
- No further action needed

**❌ Failed**
- One or more steps failed
- Could not complete process
- Error details available
- May require restart or correction

**⚠️ Requires Attention**
- Automatic processing blocked
- Manual review needed
- Additional information required
- User action necessary

**🔄 Retrying**
- Temporary failure occurred
- System automatically retrying
- Retry attempts counted
- Will fail after max retries

**Workflow Detail View:**

**Header Information:**
- Workflow ID (unique identifier)
- Type (KYB, AML, LEI, etc.)
- Status (current state)
- Created date/time
- Last updated timestamp
- Estimated completion time

**Step Progress:**

Visual progress indicator shows:
1. ✅ Completed steps (green checkmark)
2. 🔄 Current step (spinning icon)
3. ⏳ Pending steps (gray circle)
4. ❌ Failed steps (red X)

**Example: LEI Issuance Workflow**

```
1. ✅ Document Validation (Completed - 2 min ago)
2. ✅ Business Registry Check (Completed - 1 min ago)
3. 🔄 AML Screening (In Progress - ~2 min remaining)
4. ⏳ LEI Generation (Pending)
5. ⏳ GLEIF Registration (Pending)
6. ⏳ Certificate Creation (Pending)
```

**Step Details:**

For each step you can see:
- **Step Name:** What's being done
- **Status:** Current state
- **Duration:** How long it took/is taking
- **Provider:** Which service executed it
- **Result Data:** Output from the step
- **Error Message:** If step failed, why

**Example Step Detail:**

**Step:** AML Screening
**Status:** Completed
**Provider:** Dow Jones Watchlist
**Duration:** 2 minutes 34 seconds
**Started:** 2026-01-26 10:30:00
**Completed:** 2026-01-26 10:32:34
**Result:** Clear - No matches found
**Details:**
- Checked 50+ global sanctions lists
- Screened 3 beneficial owners
- No PEP matches
- No adverse media found
- Risk Score: 2/100 (Low)

**Viewing Your Workflows:**

**Method 1: Dashboard Widget**
- Shows active workflows only
- Quick status overview
- Click for details
- Limited to 5 most recent

**Method 2: Workflows Page**
- Complete workflow history
- Filter by type, status, date
- Sort by various fields
- Export to CSV
- Advanced search

**Method 3: Related Entity**
- View from application detail
- See all related workflows
- Timeline view
- Contextual information

**Workflow Filters:**

**By Type:**
- KYB Verification
- AML Screening
- LEI Issuance
- vLEI Credential
- Document Verification
- Facial Verification

**By Status:**
- Active (In Progress, Paused, Retrying)
- Completed (Success)
- Failed (Errors)
- Requires Attention
- All

**By Date Range:**
- Last 24 hours
- Last 7 days
- Last 30 days
- Last 90 days
- Custom range

**Understanding Workflow Timing:**

**Average Duration by Type:**

| Workflow Type | Typical Duration | Range |
|--------------|------------------|-------|
| Document Validation | 5 minutes | 2-10 min |
| AML Screening | 10 minutes | 5-30 min |
| KYB Verification | 2 hours | 1-4 hours |
| LEI Generation | 30 seconds | Instant-2 min |
| vLEI Issuance | 1 minute | 30 sec-3 min |
| Facial Verification | 5 minutes | 2-15 min |

**Factors Affecting Duration:**
- System load (peak vs. off-peak hours)
- Data complexity (multiple owners, locations)
- External provider response times
- Manual review requirements
- Network connectivity

**When Workflows Require Attention:**

**Common Reasons:**

**1. Document Quality Issues**
- Uploaded document not readable
- Wrong document type
- Missing pages
- Expired document

**Action:** Upload clear, complete, current document

**2. Information Mismatch**
- Application data doesn't match documents
- Business registry shows different information
- Address inconsistencies

**Action:** Correct information or provide explanation

**3. AML Screening Match**
- Potential match on sanctions list
- PEP identified
- Adverse media found

**Action:** Provide additional documentation, clarify

**4. External System Unavailable**
- Business registry offline
- Third-party service down
- Network issues

**Action:** System will auto-retry, or try again later

**5. Payment Required**
- Fee payment pending
- Insufficient credits
- Billing issue

**Action:** Complete payment or update billing

**How to Respond:**

**Step 1: Review Details**
- Click into workflow
- Read reason for attention required
- Check which step needs action
- Review any error messages

**Step 2: Prepare Response**
- Gather requested documents
- Prepare explanations
- Correct any errors
- Consult team if needed

**Step 3: Submit**
- Click "Provide Information" button
- Upload documents if needed
- Fill in required fields
- Add notes/explanations
- Submit for review

**Step 4: Monitor**
- Workflow status changes to "In Progress"
- Receives update when reviewed
- May require additional info
- Completion notification sent

**Workflow Notifications:**

**You'll receive notifications when:**
- Workflow completes successfully
- Workflow fails with error
- Manual attention required
- Long-running process (>1 hour)
- External delay occurs

**Notification Channels:**
- Email (always)
- In-app notification (always)
- SMS (if enabled for critical)
- Webhook (if configured)

**Troubleshooting Workflows:**

**Workflow Stuck "In Progress":**
- Check step details for errors
- Look for "Requires Attention" flag
- Verify external services available
- Contact support if >2 hours with no progress

**Workflow Failed:**
- Review error message
- Check all step details
- Determine root cause
- Correct and retry
- Contact support if unclear

**Unexpected Results:**
- Review workflow output data
- Compare to input data
- Check for data mismatches
- Verify external service results
- Request manual review if needed

**Advanced Features:**

**Retry Failed Workflows:**
1. Navigate to failed workflow
2. Click "Retry Workflow"
3. Option to modify input data
4. Workflow restarts from beginning
5. Previous attempt archived

**Download Workflow Report:**
1. Open workflow detail
2. Click "Export" button
3. Choose format (PDF, JSON, Excel)
4. Report includes all steps and data
5. Use for compliance records

**Set Up Webhooks:**
1. Go to Settings → Integrations
2. Add webhook URL
3. Select workflow events to receive
4. Configure authentication
5. Receive real-time HTTP callbacks

**Workflow Analytics:**

**Your Workflow Metrics:**
- Total workflows initiated
- Success rate (%)
- Average completion time
- Most common failure reasons
- Workflows requiring attention (%)

**Performance Trends:**
- Weekly workflow volume
- Processing time trends
- Failure rate over time
- Identify bottlenecks

**Best Practices:**

**Proactive Monitoring:**
- Check workflows daily
- Respond to attention requests promptly
- Keep documentation ready
- Maintain accurate information

**Efficiency Tips:**
- Submit complete applications first time
- Upload high-quality documents
- Double-check information accuracy
- Respond to queries within 24 hours

**Record Keeping:**
- Download workflow reports
- Archive for compliance
- Track failure reasons
- Identify improvement areas
          `
        }
      ]
    },
    {
      id: 'settings',
      title: 'Settings & Account',
      icon: Settings,
      subsections: [
        {
          title: 'Managing Your Profile',
          content: `
**Overview:** Your profile contains personal information, contact preferences, and security settings. Keeping it updated ensures smooth communication and account security.

**Accessing Your Profile:**
1. Click your name in top-right corner
2. Select "Settings" from dropdown
3. Navigate to "Profile" tab

**Profile Information Fields:**

**Personal Information:**

**Full Name**
- Your legal first and last name
- Must match government ID
- Used on all official documents
- Required for identity verification

**Email Address**
- Primary contact for all communications
- Used for login (cannot be changed)
- Verified email required
- Add secondary email for backup

**Phone Number**
- Format: +[country code][number]
- Example: +44-20-1234-5678
- Used for SMS notifications
- Optional but recommended

**Job Title/Role**
- Your position in the organization
- Helps with vLEI credential issuance
- Examples: CEO, CFO, Compliance Officer
- Optional field

**Department**
- Which department you work in
- For large organization management
- Examples: Finance, Legal, Operations
- Optional field

**Organization Information:**

**Organization Name**
- Auto-populated from organization record
- Cannot be edited by regular users
- Contact admin to update
- Must match legal registration

**Organization ID**
- Internal TAS identifier
- Unique to your organization
- Used for API integration
- Display only, cannot edit

**Role in Organization**
- User: Standard access
- Administrator: Full organization access
- Assigned by organization admin
- Contact admin to change

**How to Update Profile:**

**Step 1: Edit Information**
1. Navigate to Settings → Profile
2. Click "Edit Profile" button
3. Update fields as needed
4. Ensure accuracy

**Step 2: Verify Changes**
- Review all modified fields
- Check formatting (phone numbers, etc.)
- Ensure professional information
- Double-check spelling

**Step 3: Save Changes**
1. Click "Save Changes" button
2. System validates information
3. Confirmation message appears
4. Email sent confirming updates

**Email Verification:**
- If email changed: verification link sent
- Click link to confirm new email
- Old email still active until verified
- 24-hour expiry on verification link

**Profile Picture:**

**Uploading Photo:**
1. Click on profile picture placeholder
2. Click "Upload Photo"
3. Select image from computer
4. Crop/adjust as needed
5. Save

**Photo Requirements:**
- File types: JPG, PNG
- Max size: 5MB
- Recommended: 400x400 pixels
- Professional headshot preferred
- Clear, well-lit photo

**Removing Photo:**
1. Click on current photo
2. Select "Remove Photo"
3. Reverts to initials avatar

**Communication Preferences:**

**Email Notifications:**

Configure what emails you receive:

**Account & Security:**
- [ ] Login from new device
- [ ] Password changed
- [ ] Email address updated
- [ ] Security alerts
- Always on, cannot disable

**Applications:**
- [ ] Application status changes
- [ ] Document requests
- [ ] Approval/rejection notifications
- [ ] Recommended: All enabled

**Workflows:**
- [ ] Workflow completed
- [ ] Workflow failed
- [ ] Action required
- [ ] Long-running process updates
- Recommended: All enabled

**Compliance:**
- [ ] AML alerts
- [ ] Renewal reminders
- [ ] Document expiry warnings
- [ ] Regulatory updates
- Recommended: All enabled

**Credentials:**
- [ ] Credential issued
- [ ] Credential revoked
- [ ] Credential expiring
- [ ] Credential usage notifications
- Recommended: All enabled

**Marketing & Updates:**
- [ ] Product updates
- [ ] Feature announcements
- [ ] Best practices tips
- [ ] Monthly newsletter
- Optional, adjust to preference

**Email Frequency:**
- Immediate: Real-time emails
- Daily Digest: One email per day
- Weekly Summary: Friday roundup
- Set per category

**SMS Notifications:**

**When to Send SMS:**
- Critical alerts only
- All alerts
- Never (disabled)

**SMS Quiet Hours:**
- No SMS between [start time] and [end time]
- Example: No SMS between 10 PM - 8 AM
- Based on your timezone

**Phone Number for SMS:**
- Must be verified
- Click "Verify" to receive code
- Enter 6-digit code
- Valid for 5 minutes

**In-App Notifications:**

**Notification Bell:**
- Top-right corner of every page
- Red badge shows unread count
- Click to view all notifications
- Swipe to dismiss or mark as read

**Desktop Notifications:**
- Browser permission required
- Shows pop-up even when tab not active
- Click notification to navigate
- Configure in browser settings

**Language Preference:**

**Available Languages:**
- English (US)
- English (UK)
- Spanish
- French
- German
- Chinese (Simplified)
- Arabic
- More languages coming

**How to Change:**
1. Select language from dropdown
2. Click "Apply"
3. Entire interface translates
4. Emails sent in selected language
5. Documents remain in original language

**Timezone:**

**Setting Your Timezone:**
1. Search for your city
2. Or select UTC offset
3. Affects displayed times
4. Does not affect deadlines

**Auto-Detect:**
- Option to auto-detect from browser
- Can override manually
- Updates automatically for DST

**Date/Time Format:**
- MM/DD/YYYY (US)
- DD/MM/YYYY (UK/EU)
- YYYY-MM-DD (ISO)
- 12-hour or 24-hour time

**Privacy Settings:**

**Profile Visibility:**
- Organization members: Can see your profile
- External users: Cannot see your profile
- Public directory: Opt-in to appear

**Activity Sharing:**
- Share activity with organization admins
- Keep activity private
- Affects usage reports

**Data Retention:**
- Standard: 7 years (regulatory requirement)
- Extended: Upon request
- Minimal: Not available for compliance reasons

**Security Settings:**

**Password:**
- Cannot view current password
- Click "Change Password"
- Enter current password
- Enter new password (2x)
- Requirements:
  - Minimum 12 characters
  - Uppercase and lowercase
  - At least one number
  - At least one special character
  - Cannot reuse last 5 passwords

**Two-Factor Authentication (2FA):**

**Setup 2FA:**
1. Click "Enable 2FA"
2. Choose method:
   - Authenticator app (recommended)
   - SMS codes
   - Security key
3. Follow setup wizard
4. Save backup codes
5. Test login with 2FA

**Authenticator App:**
- Google Authenticator
- Microsoft Authenticator
- Authy
- 1Password
- Scan QR code
- Enter 6-digit code
- Changes every 30 seconds

**Backup Codes:**
- Shown once during setup
- Save securely (password manager)
- Use if phone lost
- Each code single-use
- Generate new set anytime

**Security Keys:**
- YubiKey supported
- FIDO2 compliant keys
- Physical USB/NFC device
- Most secure option
- Register multiple keys

**Active Sessions:**

**View Active Sessions:**
- See all logged-in devices
- Location (approximate)
- Browser/device type
- Last activity time
- IP address

**Revoke Sessions:**
- Click "Sign Out" on any session
- All sessions: "Sign Out Everywhere"
- Current session not affected
- Use if account compromised

**Login History:**

**View Past Logins:**
- Last 90 days of login activity
- Successful and failed attempts
- Date, time, location, device
- Export to CSV for security audit

**Red Flags:**
- Login from unexpected location
- Multiple failed login attempts
- Login from new device
- Unusual activity time

**Data Export:**

**Download Your Data:**
1. Navigate to Settings → Privacy
2. Click "Download My Data"
3. Select data categories:
   - Profile information
   - Applications
   - Credentials
   - Workflows
   - Documents
   - Activity log
4. Choose format (JSON, CSV, PDF)
5. Click "Request Export"
6. Receive email with download link (24 hours)
7. Link expires in 7 days

**What's Included:**
- All personal data
- Structured format
- Portable to other systems
- Complies with data portability rights

**Account Deletion:**

**Request Account Deletion:**
1. Navigate to Settings → Privacy
2. Click "Delete Account"
3. Read implications carefully
4. Enter password to confirm
5. Select reason (optional)
6. Submit request

**What Happens:**
- Account disabled immediately
- Cannot log in
- Data retained 30 days (recovery period)
- After 30 days: permanent deletion
- Some data retained for legal/compliance

**Cannot Be Deleted If:**
- Active LEI registered to you
- Pending applications
- Outstanding payments
- Active organization admin (transfer first)

**Account Recovery:**
- Within 30 days: Contact support
- Provide identity verification
- Account reinstated
- After 30 days: Cannot recover

**Best Practices:**

**Security:**
✓ Enable 2FA (authenticator app)
✓ Use unique, strong password
✓ Review active sessions monthly
✓ Check login history regularly
✓ Update recovery email/phone

**Profile Maintenance:**
✓ Keep contact information current
✓ Professional profile photo
✓ Accurate job title/department
✓ Review quarterly

**Communications:**
✓ Enable critical notifications
✓ Set appropriate email frequency
✓ Configure quiet hours for SMS
✓ Unsubscribe from unnecessary emails

**Privacy:**
✓ Review privacy settings annually
✓ Minimize shared information
✓ Export data yearly for backup
✓ Understand data retention policy
          `
        }
      ]
    }
  ];

  // Admin User Manual Sections
  const adminSections = [
    {
      id: 'admin-dashboard',
      title: 'Admin Dashboard',
      icon: Shield,
      subsections: [
        {
          title: 'Dashboard Overview',
          content: `
**Overview:** The Admin Dashboard provides centralized control and visibility over all TAS operations, user management, compliance monitoring, and system health.

**Dashboard Layout:**

**Top Metrics Bar:**
- Total organizations registered
- Active LEI count
- Pending applications
- System health status
- 24-hour activity snapshot

**Main Sections:**

**1. Organizations Panel**
- Quick stats on total organizations
- New registrations (last 7 days)
- Organizations by type (financial, legal, fintech, etc.)
- Geographic distribution
- Click for detailed organization list

**2. Applications Queue**
- Applications requiring review
- Priority sorted (urgent first)
- SLA deadline indicators
- Color-coded by age:
  - Green: <24 hours
  - Yellow: 24-48 hours
  - Orange: 48-72 hours
  - Red: >72 hours (overdue)

**3. Compliance Monitoring**
- Active AML alerts
- Documents expiring soon
- LEI renewals due
- High-risk transactions
- Regulatory deadlines

**4. User Activity**
- Active users (last 24 hours)
- New user registrations
- Login statistics
- User role distribution
- Recent admin actions

**5. System Health**
- API uptime percentage
- Average response time
- Failed requests
- Database performance
- Provider availability

**6. Financial Metrics**
- Revenue (MTD, YTD)
- Pending invoices
- Payment success rate
- Average transaction value
- Top revenue sources

**Real-Time Updates:**
- Dashboard auto-refreshes every 60 seconds
- Live notification feed on right side
- Sound alerts for critical events (configurable)
- Real-time workflow status changes

**Customizing Your Dashboard:**

**Widget Management:**
1. Click "Customize Dashboard"
2. Drag widgets to reorder
3. Click 'X' to hide widgets
4. Click '+' to add widgets
5. Save layout (per user preference)

**Available Widgets:**
- Organizations summary
- Applications queue
- AML alerts
- User activity
- Revenue chart
- System health
- Workflow statistics
- Document expiry calendar
- Recent admin actions
- Compliance scorecard

**Date Range Filters:**
- Last 24 hours
- Last 7 days
- Last 30 days
- Last 90 days
- Year to date
- Custom range
- Applies to all time-based widgets

**Quick Actions Panel:**

**Frequently Used Actions:**
- Create organization manually
- Review pending application
- Issue vLEI credential
- Send system notification
- Generate compliance report
- Export data
- View audit logs
- System configuration

**Search & Filters:**

**Global Search Bar:**
- Search by organization name
- Search by LEI code
- Search by user email
- Search by application ID
- Search by transaction ID
- Instant results as you type

**Advanced Filters:**
- Organization type
- Application status
- User role
- Date ranges
- Geography
- Compliance status
- Payment status

**Notifications Center:**

**Admin Notifications:**
- New applications submitted
- High-value transactions
- AML screening hits
- System errors/warnings
- User escalations
- Audit events
- Scheduled task completions

**Notification Priority:**
🔴 Critical: Immediate attention (payment failures, security alerts)
🟠 High: Action required today (application reviews, compliance alerts)
🟡 Medium: Action required this week (renewals, updates)
🔵 Low: Informational (system updates, reports ready)

**Notification Actions:**
- Mark as read
- Assign to team member
- Snooze (remind later)
- Archive
- Create task from notification
- Set up automation rule

**Performance Metrics:**

**Processing Times:**
- Average application approval time
- Average AML screening duration
- Average document review time
- LEI issuance speed
- Time to first response

**Volume Metrics:**
- Applications submitted (per day/week/month)
- LEIs issued
- Credentials generated
- API calls made
- Document uploads

**Quality Metrics:**
- Application approval rate
- First-time approval rate
- Document rejection rate
- AML hit rate
- Customer satisfaction score

**Team Performance:**
- Applications reviewed per admin
- Average review time per admin
- Assigned vs completed tasks
- Response time to queries
- Escalations handled

**Reports & Analytics:**

**Pre-Built Reports:**
1. Daily Operations Summary
2. Weekly Compliance Report
3. Monthly Revenue Report
4. Quarterly Business Review
5. Annual Audit Report
6. Custom Report Builder

**Export Options:**
- PDF (formatted for printing)
- Excel (with raw data)
- CSV (for further analysis)
- JSON (for API integration)

**Scheduled Reports:**
- Configure reports to run automatically
- Email to stakeholders
- Set recurrence (daily, weekly, monthly)
- Custom recipient lists

**System Health Monitoring:**

**Uptime Tracking:**
- Current uptime percentage
- Historical uptime (30/60/90 days)
- Downtime incidents log
- Planned maintenance schedule

**Performance Metrics:**
- API response time (p50, p95, p99)
- Database query performance
- External provider latency
- Error rates
- Queue depths

**Alerts Configuration:**
- Set thresholds for alerts
- Email/SMS notification on issues
- Integration with PagerDuty, Slack
- Escalation policies

**Capacity Planning:**
- Current system load
- Resource utilization
- Growth trends
- Forecasted capacity needs
- Scaling recommendations

**Audit Trail:**

**Admin Actions Log:**
- All admin actions timestamped
- User who performed action
- Before/after values
- IP address and device
- Reason for action (if provided)

**Searchable & Filterable:**
- Search by admin user
- Filter by action type
- Date range selection
- Export for compliance

**Retention:**
- 7-year retention minimum
- Immutable log (cannot be edited)
- Encrypted storage
- Regular backups

**Quick Tips:**

**Efficiency Shortcuts:**
- Press '/' to focus search
- Ctrl+K for command palette
- Click notification bell for quick actions
- Use favorites for frequent reports
- Keyboard shortcuts for navigation

**Best Practices:**
✓ Check dashboard first thing each morning
✓ Review pending applications within SLA
✓ Monitor AML alerts continuously
✓ Respond to escalations within 2 hours
✓ Generate compliance reports weekly
✓ Review system health daily
✓ Export audit logs monthly
✓ Keep dashboard widgets relevant

**Common Workflows:**

**Morning Review:**
1. Check overnight notifications
2. Review system health
3. Check pending applications queue
4. Respond to urgent AML alerts
5. Review team task assignments

**Weekly Planning:**
1. Generate weekly reports
2. Review performance metrics
3. Identify bottlenecks
4. Adjust resource allocation
5. Schedule team meetings

**Month-End Close:**
1. Generate revenue reports
2. Reconcile invoices
3. Review compliance status
4. Archive completed applications
5. Export audit logs
6. Prepare board reports
          `
        },
        {
          title: 'Managing Organizations',
          content: `
**Overview:** Admin users can create, view, edit, and manage all organizations registered on the TAS platform, including their settings, users, and billing.

**Accessing Organization Management:**
1. Navigate to Admin Dashboard
2. Click "Organizations" in sidebar
3. View complete organization list

**Organization List View:**

**Table Columns:**
- Organization Name
- Type (Financial, Fintech, Legal, etc.)
- LEI Status (Active, Pending, Lapsed)
- Registration Date
- Country
- Active Users
- Status (Active, Suspended, Under Review)
- Actions

**Filtering & Search:**

**Quick Filters:**
- All Organizations
- Active LEI
- Pending Applications
- Suspended
- High Value Customers
- Recently Registered (last 30 days)

**Advanced Filters:**
- Organization type
- Registration country
- LEI status
- Billing tier
- User count range
- Revenue range
- Registration date range
- Compliance status

**Search:**
- By organization name
- By LEI code
- By registration number
- By contact email
- By country

**Sorting:**
- Alphabetical (A-Z, Z-A)
- Registration date (newest/oldest)
- User count (high to low)
- Revenue (high to low)
- Last activity

**Creating Organization Manually:**

**Use Cases:**
- TAS operator initiating onboarding
- Partner referral
- Manual account setup
- Special enterprise customer

**Step 1: Click "Create Organization"**

**Step 2: Enter Organization Details**

**Legal Information:**
- Legal Name (required)
- Trading Name/DBA (optional)
- Business Registration Number (required)
- Entity Legal Form (dropdown)
- Registration Country (dropdown)
- Registration Date
- Industry/Sector

**Addresses:**
- Legal Address (from registration)
- Headquarters Address (if different)
- Mailing Address (if different)
- Each address includes:
  - Street address
  - City
  - State/Province
  - Postal code
  - Country

**Contact Information:**
- Primary Contact Name
- Primary Contact Email (required)
- Primary Contact Phone
- Secondary Contact (optional)
- Preferred communication language

**Step 3: Organization Type & Settings**

**Organization Type:**
- Financial Institution
- Fintech
- Law Firm
- Company Secretary
- Insurance
- Trade/Commodity
- Other

**Billing Tier:**
- Starter
- Business
- Enterprise
- Custom

**Features Enabled:**
- [ ] vLEI Issuance
- [ ] API Access
- [ ] White Label
- [ ] Priority Support
- [ ] Advanced Analytics
- [ ] Custom Integrations

**Step 4: Initial User Setup**

**Admin User:**
- Will receive onboarding email
- Can invite additional users
- Has full organization access

**Email Template Selection:**
- Standard onboarding email
- Partner welcome email
- Enterprise customer email
- Custom template

**Email Contents:**
- Welcome message
- Link to complete onboarding
- Link to complete LEI application
- Support contact information

**Step 5: Review & Create**

- Verify all information accurate
- Click "Create Organization"
- Organization created immediately
- Onboarding email sent to contact
- Organization appears in list

**Viewing Organization Details:**

**Click on any organization to view:**

**Overview Tab:**
- Organization basic info
- Current LEI status
- Active credentials count
- User count
- Registration details
- Billing information

**Users Tab:**
- List of all users
- User roles
- Last login dates
- Active sessions
- Add/remove users
- Change user roles

**Applications Tab:**
- All LEI applications
- Application history
- Current status
- Documents submitted
- Review history

**Credentials Tab:**
- Organization LEI
- Issued vLEI credentials
- Credential holders
- Expiry dates
- Revocation history

**Billing Tab:**
- Current billing tier
- Usage statistics
- Invoice history
- Payment methods
- Credit balance
- Billing contacts

**Compliance Tab:**
- AML screening results
- KYB verification status
- Document vault
- Audit logs
- Regulatory alerts
- Compliance score

**Activity Tab:**
- Recent user activity
- API usage
- Login history
- Document uploads
- Workflow executions

**Editing Organization Information:**

**What Can Be Edited:**
✓ Contact information
✓ Addresses
✓ Organization type
✓ Billing tier
✓ Feature flags
✓ Status (active/suspended)
✓ Notes

**What Cannot Be Edited:**
✗ Legal name (requires verification)
✗ Registration number (immutable)
✗ LEI code (managed by GLEIF)
✗ Creation date

**How to Edit:**
1. Open organization detail
2. Click "Edit Organization"
3. Modify fields
4. Add edit reason/notes
5. Click "Save Changes"
6. Changes logged in audit trail

**Suspending an Organization:**

**When to Suspend:**
- Payment failure (after grace period)
- Compliance violation
- Suspicious activity
- Customer request
- Legal requirement

**Suspension Process:**
1. Click "Suspend Organization"
2. Select suspension reason
3. Add detailed notes
4. Set suspension duration (if temporary)
5. Confirm suspension

**Effects of Suspension:**
- Users cannot log in
- LEI marked as "Lapsed"
- API access disabled
- Email notification sent
- Reactivation requires admin approval

**Reactivating:**
1. Resolve suspension reason
2. Click "Reactivate Organization"
3. Add reactivation notes
4. Confirm reactivation
5. LEI status restored
6. Users can log in again

**Bulk Operations:**

**Select Multiple Organizations:**
1. Check boxes next to organizations
2. "X selected" appears at top
3. Choose bulk action

**Bulk Actions:**
- Send notification email
- Change billing tier
- Export selected
- Tag organizations
- Assign to account manager
- Generate batch report

**Managing Organization Users:**

**View Users:**
- Navigate to organization → Users tab
- See all organization members
- User role indicators
- Last login timestamps

**Add User to Organization:**
1. Click "Invite User"
2. Enter email address
3. Select role (User or Admin)
4. Add welcome message (optional)
5. Click "Send Invitation"
6. Invitation email sent
7. User creates account via link

**Change User Role:**
1. Click on user
2. Click "Change Role"
3. Select new role
4. Add reason for change
5. Save changes
6. User notified of role change

**Remove User:**
1. Click on user
2. Click "Remove from Organization"
3. Confirm removal
4. User loses access immediately
5. User notified via email
6. Credentials issued to user revoked

**Organization Billing Management:**

**View Billing Details:**
- Current billing tier
- Monthly fee
- Usage-based charges
- Payment method on file
- Billing contacts
- Invoice history

**Change Billing Tier:**
1. Navigate to Billing tab
2. Click "Change Tier"
3. Select new tier
4. Preview pricing changes
5. Confirm change
6. Prorated billing adjustment
7. Customer notified

**Manual Invoice Generation:**
1. Click "Generate Invoice"
2. Select billing period
3. Review line items
4. Add custom charges (optional)
5. Generate PDF
6. Send to customer
7. Record in billing system

**Apply Credits:**
1. Navigate to Billing tab
2. Click "Add Credits"
3. Enter credit amount
4. Select credit type (promotional, referral, etc.)
5. Add reason/description
6. Apply credits
7. Customer notified

**Organization Analytics:**

**Usage Metrics:**
- API calls (last 30 days)
- Active users
- Credentials issued
- Workflows executed
- Documents uploaded
- Average response time

**Engagement Metrics:**
- Login frequency
- Feature adoption
- Support tickets opened
- Response time to requests
- Satisfaction scores

**Financial Metrics:**
- Total revenue
- Monthly recurring revenue
- Average transaction value
- Payment success rate
- Outstanding balance

**Export Data:**
- Click "Export" on organization detail
- Select data categories
- Choose format (PDF, Excel, JSON)
- Download complete organization data
- Includes all related records

**Compliance & Audit:**

**View Audit Log:**
- All changes to organization
- Who made the change
- When change was made
- Before/after values
- Reason provided

**Compliance Checks:**
- AML screening status
- Document verification status
- Beneficial ownership verification
- Ongoing monitoring alerts
- Regulatory requirements met

**Generate Compliance Report:**
1. Navigate to Compliance tab
2. Click "Generate Report"
3. Select report type
4. Choose date range
5. Include attachments (documents, etc.)
6. Generate PDF
7. Download or email

**Advanced Features:**

**White Label Settings:**
- Custom branding
- Logo upload
- Color scheme
- Custom domain
- Email templates
- Login page customization

**API Access Management:**
- Generate API keys
- Set rate limits
- View API usage
- Revoke keys
- Webhook configuration

**Custom Integrations:**
- Connect accounting systems
- ERP integration
- CRM synchronization
- Custom data feeds
- Scheduled exports

**Organization Tags:**
- Create custom tags
- Tag organizations for grouping
- Filter by tags
- Bulk tag application
- Tag-based reporting

**Account Manager Assignment:**
- Assign dedicated account manager
- Set primary contact
- Escalation path
- Account manager notes
- Relationship history

**Best Practices:**

**Organization Setup:**
✓ Verify all information accurate
✓ Complete all fields
✓ Set appropriate billing tier
✓ Enable necessary features only
✓ Assign account manager for enterprise

**Ongoing Management:**
✓ Review organization quarterly
✓ Update contact information
✓ Monitor billing and usage
✓ Check compliance status regularly
✓ Respond to support tickets promptly

**Compliance:**
✓ Conduct annual reviews
✓ Verify beneficial ownership changes
✓ Keep documents current
✓ Monitor AML alerts
✓ Maintain audit trail

**Communication:**
✓ Proactive renewal reminders
✓ Feature updates and training
✓ Regular check-ins for enterprise
✓ Quick response to inquiries
✓ Transparent pricing and billing

**Security:**
✓ Review user access quarterly
✓ Remove inactive users
✓ Monitor for suspicious activity
✓ Enforce MFA for admins
✓ Regular security audits
          `
        }
      ]
    },
    {
      id: 'admin-billing',
      title: 'Billing & Revenue',
      icon: DollarSign,
      subsections: [
        {
          title: 'Billing Plans Management',
          content: `
**Overview:** Configure, manage, and customize billing plans for different customer segments, including base pricing, component pricing, regional variations, and promotional campaigns.

**Accessing Billing Plans:**
1. Navigate to Admin → Billing
2. Click "Billing Plans" tab
3. View all active and inactive plans

**Default Plan Types:**

**1. Starter Plan**
- Small businesses
- Basic LEI issuance
- Limited API calls
- Standard support
- Monthly billing
- Self-service onboarding

**2. Business Plan**
- Growing companies
- LEI + vLEI credentials
- Higher API limits
- Priority support
- Flexible billing cycles
- Account management

**3. Enterprise Plan**
- Large organizations
- Custom configurations
- Unlimited API access
- 24/7 dedicated support
- Annual billing
- Custom integrations

**Creating a New Billing Plan:**

**Step 1: Basic Information**
- Plan Name (e.g., "Fintech Starter")
- Plan Tier (starter/business/enterprise)
- Description (internal and customer-facing)
- Status (active/inactive)

**Step 2: Base Pricing**
- Monthly base fee
- Currency (USD, EUR, GBP, etc.)
- Billing cycle (monthly, quarterly, annual)
- Discount for annual (percentage)

**Step 3: API Limits**
- Monthly API call limit
- Overage price per call
- Rate limiting rules
- Bandwidth allocation

**Step 4: Component Pricing**

**Individual Service Prices:**
- LEI Issuance: $X per issuance
- vLEI Issuance: $X per credential
- KYB Verification: $X per verification
- AML Screening: $X per screening
- Document Verification: $X per document

**Example Configuration:**
```
{
  "lei_issuance": 150.00,
  "vlei_issuance": 50.00,
  "kyb_verification": 75.00,
  "aml_screening": 25.00,
  "document_verification": 10.00
}
```

**Step 5: Progressive Pricing**

**Volume Discounts:**
Configure tiered pricing for high-volume customers

**Example: vLEI Issuance Tiers**
- 1-100 credentials: $50 each
- 101-500 credentials: $40 each
- 501-1000 credentials: $30 each
- 1001+ credentials: $25 each

**How to Configure:**
1. Select component (e.g., vLEI)
2. Click "Add Pricing Tier"
3. Set range (from-to quantity)
4. Set price for that tier
5. Add multiple tiers
6. Save configuration

**Step 6: Regional Pricing**

**Geographic Price Adjustments:**
- Different pricing for different countries
- Currency localization
- Regional compliance costs
- Market competitiveness

**Configuration:**
1. Click "Add Regional Pricing"
2. Select region type (country or continent)
3. Choose region (e.g., "United Kingdom" or "Europe")
4. Set price multiplier (e.g., 0.85 = 15% discount)
5. Or set specific component overrides
6. Save regional rule

**Example Regional Rules:**
- Europe: 0.95x (5% discount due to higher competition)
- Asia-Pacific: 1.0x (standard pricing)
- Africa: 0.80x (20% discount, market development)
- Middle East: 1.1x (10% premium, high compliance costs)

**Step 7: Promotional Pricing**

**Time-Limited Promotions:**
- Launch discounts
- Seasonal campaigns
- Competitive responses
- Customer acquisition

**Setting Up Promotion:**
1. Click "Add Promotion"
2. Set promotion name
3. Select start and end dates
4. Choose discount type:
   - Percentage discount (e.g., 20% off)
   - Fixed amount (e.g., $50 off)
   - Free credits
5. Optional: Require promo code
6. Set maximum redemptions
7. Activate promotion

**Step 8: Seasonal Campaigns**

**Recurring Promotions:**
- Q4 Compliance Rush (Oct-Dec)
- Year-End Special (December)
- New Year Launch (January)
- Industry Conference Specials

**Configuration:**
1. Click "Add Seasonal Campaign"
2. Name campaign (e.g., "Year-End 2026")
3. Select recurring type (annual, quarterly, monthly)
4. Set start/end months
5. Configure discount
6. Mark as active
7. Campaign auto-activates each year

**Step 9: Organization-Specific Discounts**

**Individual Customer Pricing:**
- Long-term contracts
- Strategic partnerships
- Volume commitments
- Early adopters

**How to Apply:**
1. Click "Add Organization Discount"
2. Search and select organization
3. Set discount percentage or fixed amount
4. Provide reason (required for audit)
5. Set valid from/until dates (or leave indefinite)
6. Save discount

**Discount automatically applied to all that organization's invoices**

**Step 10: Multi-Year Discounts**

**Contract Length Incentives:**
- 1-year: 0% discount
- 2-year: 15% discount
- 3-year: 25% discount

**Configuration:**
- Edit discount percentages
- Applies when customer selects annual billing
- Prorated if contract canceled early

**Step 11: Industry-Specific Pricing**

**Vertical Market Pricing:**
- Nonprofit organizations: 25% discount
- Government agencies: 15% discount
- Educational institutions: 30% discount
- Healthcare: 10% discount
- Financial services: Standard pricing

**Setup:**
1. Click "Add Industry Pricing"
2. Select industry type
3. Set discount percentage
4. Add any special terms
5. Save rule

**Plan Features:**

**Included Features:**
Configure what's included in each plan:
- [ ] LEI issuance
- [ ] vLEI credentials (quantity)
- [ ] API access
- [ ] Priority support
- [ ] White label branding
- [ ] Custom integrations
- [ ] Advanced analytics
- [ ] Dedicated account manager

**Add-Ons:**
Optional extras customers can purchase:
- Additional API calls: $X per 1,000 calls
- Extra vLEI credentials: $X each
- Priority processing: $X per application
- Extended support hours: $X per month
- Custom development: $X per hour

**Tax Configuration:**

**Automatic Tax Calculation:**
1. Enable "Auto-calculate tax"
2. Configure by country:

**Example Tax Rules:**
- United Kingdom: 20% VAT (B2C), Reverse charge (B2B)
- European Union: Country-specific VAT rates
- United States: No federal tax, state-specific
- Singapore: 8% GST
- UAE: 5% VAT

**Reverse Charge:**
- Applies to B2B transactions in EU
- Customer responsible for tax
- Must have valid VAT number
- Auto-detected based on customer data

**Payment Terms:**

**Default Payment Terms:**
- Immediate (pay now)
- Net 15 (payment due in 15 days)
- Net 30 (payment due in 30 days)
- Net 60 (for enterprise)
- Net 90 (for government)

**Enterprise Custom Terms:**
- Can override per organization
- Set in organization billing settings
- Requires credit approval

**White Label Pricing:**

**Reseller/Wholesale Pricing:**
- Enable for partner organizations
- Set wholesale discount (e.g., 40% off)
- Set minimum monthly volume
- Partners set their own retail pricing
- Revenue share configuration

**Referral Program:**

**Customer Referral Credits:**
1. Enable referral program
2. Set credit for referrer (e.g., $100)
3. Set credit for referee (e.g., $50)
4. Set max referrals (or unlimited)
5. Track referrals automatically
6. Credits applied to invoices

**Multi-Currency Support:**

**Supported Currencies:**
- USD (United States Dollar)
- EUR (Euro)
- GBP (British Pound)
- AED (UAE Dirham)
- SGD (Singapore Dollar)
- More...

**Currency Configuration:**
1. Select supported currencies
2. Enable auto-conversion
3. Set conversion rate source (live rates)
4. Pricing auto-converts based on customer country
5. Customer billed in local currency

**Plan Lifecycle Management:**

**Activating a Plan:**
1. Complete plan configuration
2. Review all settings
3. Click "Activate Plan"
4. Plan available for new customers
5. Existing customers unaffected

**Editing an Active Plan:**
- **Allowed:** Feature additions, add-on pricing
- **Not Allowed:** Reducing features, price increases
- **Workaround:** Create new plan version

**Deprecating a Plan:**
1. Click "Deprecate Plan"
2. Set deprecation date
3. New customers cannot select
4. Existing customers grandfathered
5. Optional: Auto-migrate to new plan

**Plan Versioning:**
- Each plan change creates new version
- Track version history
- See which customers on which version
- Compare versions side-by-side

**Customer Assignment:**

**Assigning Plan to Organization:**
1. Navigate to organization
2. Go to Billing tab
3. Click "Change Plan"
4. Select new plan
5. Preview pricing change
6. Set effective date (immediate or next billing cycle)
7. Confirm change

**Prorated Billing:**
- If changing mid-cycle, charges prorated
- Credit for unused time on old plan
- Charge for new plan from change date
- Shown on next invoice

**Plan Analytics:**

**Plan Performance Metrics:**
- Customers per plan
- Revenue per plan
- Average transaction value
- Churn rate by plan
- Upgrade/downgrade trends
- Feature adoption by plan

**Reports:**
1. Plan Comparison Report
2. Revenue by Plan
3. Customer Distribution
4. Pricing Effectiveness
5. Discount Impact Analysis

**A/B Testing Plans:**

**Test Different Pricing:**
1. Create two plan variations
2. Enable A/B testing
3. Set traffic split (e.g., 50/50)
4. Track conversion rates
5. Measure revenue impact
6. Select winning variation
7. Migrate customers

**Best Practices:**

**Pricing Strategy:**
✓ Research competitor pricing
✓ Value-based pricing model
✓ Simple, transparent tiers
✓ Clear differentiation between plans
✓ Annual discount to encourage commitment

**Discounts:**
✓ Document reason for every discount
✓ Set expiration dates
✓ Review discounts quarterly
✓ Avoid excessive discounting
✓ Use discounts strategically

**Plan Design:**
✓ 3-4 plans maximum (choice overload)
✓ Clear upgrade path
✓ Differentiate on value, not just price
✓ Include most popular as "recommended"
✓ Highlight savings on annual

**Maintenance:**
✓ Review plans quarterly
✓ Analyze metrics monthly
✓ Customer feedback integration
✓ Competitive benchmarking
✓ Regular price testing

**Compliance:**
✓ Tax rules accurate by jurisdiction
✓ Terms and conditions clear
✓ Price changes communicated 30+ days advance
✓ Grandfather existing customers
✓ Maintain pricing history
          `
        }
      ]
    }
  ];

  const allSections = isAdmin ? adminSections : businessUserSections;
  const filteredSections = searchQuery
    ? allSections.map(section => ({
        ...section,
        subsections: section.subsections.filter(sub =>
          sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sub.content.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(section => section.subsections.length > 0)
    : allSections;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-10 w-10 text-blue-600" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                {isAdmin ? 'Administrator' : 'User'} Manual
              </h1>
              <p className="text-gray-600">
                Comprehensive guide to all TAS features and functions
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search manual (e.g., 'upload documents', 'billing plans', 'AML screening')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-6 text-lg"
            />
          </div>
        </div>

        {/* Manual Content */}
        <Tabs defaultValue={filteredSections[0]?.id} className="space-y-6">
          <TabsList className="flex flex-wrap gap-2 bg-white p-2 rounded-lg shadow-sm">
            {filteredSections.map((section) => {
              const Icon = section.icon;
              return (
                <TabsTrigger
                  key={section.id}
                  value={section.id}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {section.title}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {filteredSections.map((section) => (
            <TabsContent key={section.id} value={section.id} className="space-y-4">
              {section.subsections.map((subsection, idx) => (
                <Card key={idx}>
                  <Collapsible
                    open={expandedSections[`${section.id}-${idx}`]}
                    onOpenChange={() => toggleSection(`${section.id}-${idx}`)}
                  >
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                        <CardTitle className="flex items-center justify-between">
                          <span>{subsection.title}</span>
                          <Badge variant="outline">
                            {expandedSections[`${section.id}-${idx}`] ? 'Collapse' : 'Expand'}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="prose prose-blue max-w-none">
                        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                          {subsection.content}
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>

        {searchQuery && filteredSections.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-gray-600">
                Try different keywords or browse sections above
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}