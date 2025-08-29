export const useMyFetch = async (request, opts) => {
  const { $i18n } = useNuxtApp();
  const locale = $i18n.locale;
  const reqUrl = "/" + locale.value + request;

  return await useFetch(() => "/api" + reqUrl, {
    ...opts,
  });
};
