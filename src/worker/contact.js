/**
 * Cloudflare Worker - Contact Form Proxy
 * Proxies contact form submissions to Web3Forms
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders, status: 204 });
    }

    // Handle contact form submission
    if (url.pathname === '/contact' && request.method === 'POST') {
      try {
        const body = await request.json();

        // Validate required fields
        if (!body.name || !body.email || !body.subject || !body.message) {
          return new Response(
            JSON.stringify({ success: false, error: 'Missing required fields' }),
            { headers: corsHeaders, status: 400 }
          );
        }

        // Create FormData for Web3Forms
        const formData = new FormData();
        formData.append('access_key', 'bfa326d0-3b49-4894-9196-1d0c18c3483a');
        formData.append('name', body.name);
        formData.append('email', body.email);
        formData.append('subject', body.subject);
        formData.append('message', body.message);
        formData.append('from_name', 'Blessing Portfolio Contact');

        // Forward to Web3Forms
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          return new Response(
            JSON.stringify({ success: true, message: 'Message sent successfully!' }),
            { headers: corsHeaders, status: 200 }
          );
        } else {
          return new Response(
            JSON.stringify({ success: false, error: 'Failed to send message' }),
            { headers: corsHeaders, status: 500 }
          );
        }
      } catch (error) {
        console.error('Contact form error:', error);
        return new Response(
          JSON.stringify({ success: false, error: 'Server error' }),
          { headers: corsHeaders, status: 500 }
        );
      }
    }

    return new Response('Not Found', { status: 404 });
  }
};
