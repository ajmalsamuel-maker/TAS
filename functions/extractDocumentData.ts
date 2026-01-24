import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { file_urls, json_schema } = await req.json();

    if (!file_urls || file_urls.length === 0) {
      return Response.json({ error: 'No files provided' }, { status: 400 });
    }

    const results = [];

    for (const file_url of file_urls) {
      const result = await base44.integrations.Core.ExtractDataFromUploadedFile({
        file_url,
        json_schema
      });

      results.push({
        file_url,
        status: result.status,
        data: result.output,
        error: result.details
      });
    }

    return Response.json({
      status: 'success',
      extracted_data: results
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});