export const useMyFetch = (request, opts) => {
  const { $i18n } = useNuxtApp();
  const config = useRuntimeConfig();

  const baseURL = config.public.baseURL;

  // Helper function to recursively transform URLs in the response data
  const transformUrls = (data) => {
    if (typeof data === 'string' && data.startsWith(baseURL)) {
      return data.replace(`${baseURL}/media`, '/api/media');
    }
    if (Array.isArray(data)) {
      return data.map(transformUrls);
    }
    if (data !== null && typeof data === 'object') {
      return Object.entries(data).reduce((acc, [key, value]) => {
        acc[key] = transformUrls(value);
        return acc;
      }, {});
    }
    return data;
  };

  const locale = $i18n.locale.value;
  let reqUrl = request.startsWith('/') ? request : `/${request}`;

  // Conditionally prefix with locale, but not for /actions routes
  if (!reqUrl.startsWith('/actions')) {
    reqUrl = `/${locale}${reqUrl}`;
  }

  // Determine the final URL for useFetch
  const finalUrl = reqUrl.startsWith('/actions') ? reqUrl : `/api${reqUrl}`;

  return useFetch(finalUrl, {
    ...opts,
    onResponse({ response }) {
      // Transform URLs only on the server side to hide them from the client source
      if (process.server && response._data) {
        response._data = transformUrls(response._data);
      }
    },
  });
};
