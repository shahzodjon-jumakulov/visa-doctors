export const useMyFetch = async (request, opts) => {
  // const { $i18n } = useNuxtApp();
  // const locale = $i18n.locale;
  const locale = ref("en"); // Hardcoded for now
  const config = useRuntimeConfig();
  const reqUrl = "/" + locale.value + request;

  return await useFetch(() => reqUrl, {
    baseURL: config.public.baseURL,
    onResponse({ request, response }) {
      // console.log(request);
      // console.log(response);
    },
    ...opts,
  });
};
