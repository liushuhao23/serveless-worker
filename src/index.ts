/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-04-03 22:15:08
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-04-06 17:37:34
 */

// const namespaces: any = ''
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
  'Access-Control-Max-Age': '86400',
};

async function handleRequest(request: Request) {
  const value = await MY_KV.get("data", {type: 'json'})
  console.log(value, 'value')
  const params = {
    code: 200,
    success: true,
    data: JSON.parse((JSON.stringify(value)))
  }
  console.log(params, 'params')
  if (value === null) {
    return new Response("Value not found", {
      status: 404, headers: {
        'Allow': 'GET, HEAD, POST, OPTIONS',
        'content-type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
      },
    })
  }

  return new Response(JSON.stringify(params), {
    headers: {
      'Allow': 'GET, HEAD, POST, OPTIONS',
      'content-type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
    },
  })
}

addEventListener('fetch', async event => {
  const request = event.request;
  if (request.method === 'OPTIONS') {
    // Handle CORS preflight requests
    event.respondWith(handleOptions(request));
  } else if (request.method === 'GET' || request.method === 'HEAD' || request.method === 'POST') {
    // Handle requests to the API server
    return event.respondWith(
      handleRequest(request)
    );
  }
});

const handleOptions = (request: Request) => {
  const headers = request.headers;
  if (
    headers.get('Origin') !== null &&
    headers.get('Access-Control-Request-Method') !== null &&
    headers.get('Access-Control-Request-Headers') !== null
  ) {
    const respHeaders = {
      ...corsHeaders,
      'Access-Control-Allow-Headers': request.headers.get('Access-Control-Request-Headers'),
    };

    return new Response(null, {
      headers: respHeaders as any,
    });
  } else {
    return new Response(null, {
      headers: {
        Allow: 'GET, HEAD, POST, OPTIONS',
      },
    });
  }
}
