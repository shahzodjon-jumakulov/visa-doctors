// server/api/media/[...slug].ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const path = event.path.replace(/^\/api\/media/, '');
  const targetUrl = new URL(`/media${path}`, config.baseURL).toString();

  try {
    // This is a simplified proxy. For a production scenario, you might need
    // to handle headers, response streaming for large files, etc.
    return await proxyRequest(event, targetUrl);
  } catch (error: any) {    
    throw createError({
      statusCode: error.response?.status || 500,
      statusMessage: error.response?._data?.detail || 'Internal Server Error',
      data: error.response?._data,
    });
  }
});
