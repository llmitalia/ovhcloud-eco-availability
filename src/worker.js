export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    if (url.pathname === '/api/check-availability') {
      try {
        const response = await fetch('https://eu.api.ovh.com/v1/dedicated/server/datacenter/availabilities?planCode=24ska01', {
          headers: {'accept': 'application/json'},
          cf: {
            cacheTtl: 5,
            cacheEverything: true
          }
        });
        
        const data = await response.json();
        return new Response(JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=5'
          }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }
    }

    return env.ASSETS.fetch(request);
  }
}