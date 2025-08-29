export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  // Use event.path to get the full path after /api/
  // This is more reliable than using the slug parameter.
  const path = event.path.replace(/^\/api/, '');
  const targetUrl = new URL(path, config.baseURL).toString();

  try {
    // Explicitly handle request method and body to ensure correct proxying
    return await $fetch(targetUrl, {
      method: event.node.req.method as any,
      // Only read body for methods that typically have one
      body: ['POST', 'PUT', 'PATCH'].includes(event.node.req.method || '') ? await readBody(event) : undefined,
      // Forward query parameters
      query: getQuery(event),
      // You can add logic here to forward specific headers if needed
    });
  } catch (error: any) {
    // Forward the error from the backend API
    throw createError({
      statusCode: error.response?.status || 500,
      statusMessage: error.response?._data?.detail || 'Internal Server Error',
      data: error.response?._data,
    });
  }
});
