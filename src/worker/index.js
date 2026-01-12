/**
 * Cloudflare Worker - Visitor Counter
 * Handles real-time visitor tracking using Cloudflare KV storage
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': import.meta.env.VITE_CORS_ORIGIN || '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
      'Content-Type': 'application/json',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders, status: 204 });
    }

    // Visitor counter endpoint
    if (path === '/visitors' && request.method === 'POST') {
      try {
        // Increment visitor count
        const currentCount = await env.COUNTER_KV.get('visitor_count');
        const count = (parseInt(currentCount) || 0) + 1;

        // Store updated count
        await env.COUNTER_KV.put('visitor_count', count.toString());

        // Also store daily count for analytics
        const today = new Date().toISOString().split('T')[0];
        const dailyKey = `visitors:${today}`;
        const dailyCount = await env.COUNTER_KV.get(dailyKey);
        const updatedDailyCount = (parseInt(dailyCount) || 0) + 1;
        await env.COUNTER_KV.put(dailyKey, updatedDailyCount.toString());

        return new Response(
          JSON.stringify({
            success: true,
            count,
            timestamp: new Date().toISOString(),
          }),
          {
            headers: corsHeaders,
            status: 200,
          }
        );
      } catch (error) {
        console.error('Visitor counter error:', error);
        return new Response(
          JSON.stringify({ success: false, error: 'Internal server error' }),
          {
            headers: corsHeaders,
            status: 500,
          }
        );
      }
    }

    // Get visitor count endpoint
    if (path === '/visitors' && request.method === 'GET') {
      try {
        const count = await env.COUNTER_KV.get('visitor_count');

        return new Response(
          JSON.stringify({
            success: true,
            count: parseInt(count) || 0,
            timestamp: new Date().toISOString(),
          }),
          {
            headers: corsHeaders,
            status: 200,
          }
        );
      } catch (error) {
        console.error('Visitor fetch error:', error);
        return new Response(
          JSON.stringify({ success: false, error: 'Internal server error' }),
          {
            headers: corsHeaders,
            status: 500,
          }
        );
      }
    }

    // Health check endpoint
    if (path === '/health') {
      return new Response(
        JSON.stringify({ status: 'healthy', timestamp: new Date().toISOString() }),
        {
          headers: corsHeaders,
          status: 200,
        }
      );
    }

    // 404 Not Found
    return new Response(
      JSON.stringify({ success: false, error: 'Not found' }),
      {
        headers: corsHeaders,
        status: 404,
      }
    );
  },
};
