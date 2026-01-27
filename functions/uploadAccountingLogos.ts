import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user || user.role !== 'admin') {
            return Response.json({ error: 'Unauthorized' }, { status: 403 });
        }

        // Fetch and upload Zoho Books logo
        const zohoResponse = await fetch('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69745611ba890597a348b91e/b8799f259_download9.png');
        const zohoBlob = await zohoResponse.blob();
        const zohoFile = new File([zohoBlob], 'zoho-books-logo.png', { type: 'image/png' });
        
        const { file_url: zohoUrl } = await base44.asServiceRole.integrations.Core.UploadFile({ file: zohoFile });

        // Fetch and upload accounting logos collage
        const logosResponse = await fetch('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69745611ba890597a348b91e/0a6cc61f8_download8.png');
        const logosBlob = await logosResponse.blob();
        const logosFile = new File([logosBlob], 'accounting-logos.png', { type: 'image/png' });
        
        const { file_url: logosUrl } = await base44.asServiceRole.integrations.Core.UploadFile({ file: logosFile });

        // Fetch and upload additional logos
        const moreLogosResponse = await fetch('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69745611ba890597a348b91e/9ee777209_download5.jpg');
        const moreLogosBlob = await moreLogosResponse.blob();
        const moreLogosFile = new File([moreLogosBlob], 'accounting-logos-2.jpg', { type: 'image/jpeg' });
        
        const { file_url: moreLogosUrl } = await base44.asServiceRole.integrations.Core.UploadFile({ file: moreLogosFile });

        return Response.json({
            success: true,
            logos: {
                zohoBooks: zohoUrl,
                collage1: logosUrl,
                collage2: moreLogosUrl
            }
        });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});