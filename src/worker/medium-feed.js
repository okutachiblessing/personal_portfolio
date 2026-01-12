/**
 * Cloudflare Worker to fetch Medium RSS feed
 * Deployed as /api/medium-feed
 * 
 * Usage: GET /api/medium-feed?user=username
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const username = url.searchParams.get('user') || 'okutachiblessing';

    // Only allow GET requests
    if (request.method !== 'GET') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      // Fetch Medium RSS feed
      const mediumRssUrl = `https://medium.com/feed/@${username}`;
      const rssResponse = await fetch(mediumRssUrl);

      if (!rssResponse.ok) {
        return new Response(
          JSON.stringify({ 
            error: 'Failed to fetch Medium feed',
            articles: [] 
          }),
          { 
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      const rssText = await rssResponse.text();
      const articles = parseMediumRSS(rssText);

      return new Response(
        JSON.stringify({ articles }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    } catch (error) {
      console.error('Worker error:', error);
      return new Response(
        JSON.stringify({ 
          error: 'Server error',
          articles: [] 
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  }
};

/**
 * Parse Medium RSS feed and extract article data
 */
function parseMediumRSS(rssText) {
  try {
    // Parse RSS XML
    const items = rssText.match(/<item>[\s\S]*?<\/item>/g) || [];
    
    return items.slice(0, 6).map(item => {
      // Extract title
      const titleMatch = item.match(/<title>(!?\[CDATA\[)?([\s\S]*?)(\]\])?\<\/title>/);
      const title = titleMatch ? decodeHTML(titleMatch[2].trim()) : 'Untitled';

      // Extract description/excerpt
      const descMatch = item.match(/<description>(!?\[CDATA\[)?([\s\S]*?)(\]\])?\<\/description>/);
      let excerpt = descMatch ? decodeHTML(descMatch[2].trim()) : '';
      // Remove HTML tags from excerpt
      excerpt = excerpt.replace(/<[^>]*>/g, '').substring(0, 150) + '...';

      // Extract publication date
      const pubDateMatch = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
      const pubDate = pubDateMatch ? new Date(pubDateMatch[1]) : new Date();
      const date = formatDate(pubDate);

      // Extract link
      const linkMatch = item.match(/<link>([\s\S]*?)<\/link>/);
      const url = linkMatch ? linkMatch[1].trim() : '#';

      // Estimate read time (average 200 words per minute)
      const wordCount = excerpt.split(/\s+/).length;
      const readTime = Math.ceil(wordCount / 200);

      return {
        title,
        excerpt,
        date,
        readTime: `${readTime} min read`,
        tags: ['Agile', 'PMI-ACP', 'Leadership'],
        url,
        source: 'Medium'
      };
    });
  } catch (error) {
    console.error('RSS parsing error:', error);
    return [];
  }
}

/**
 * Decode HTML entities
 */
function decodeHTML(html) {
  const entities = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' '
  };

  return html.replace(/&[#\w]+;/g, (entity) => entities[entity] || entity);
}

/**
 * Format date to readable format
 */
function formatDate(date) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}
