export const useNews = () => {
  /**
   * Fetches a list of all news posts.
   * Can accept query params for filtering or pagination.
   * @param {Object} params - Query parameters for the request.
   */
  const fetchNews = async (params: Record<string, any> = {}) => {
    return useMyFetch('/news/', {
      params,
      // Use lazy: true for client-side fetching without blocking navigation
      lazy: true,
    });
  };

  /**
   * Fetches a single news post by its slug.
   * @param {String} slug - The slug of the news post to fetch.
   */
  const fetchNewsBySlug = async (slug: string) => {
    if (!slug) {
      console.error('Slug is required to fetch a news post.');
      return;
    }
    return useMyFetch(`/news/${slug}/`, {
      // Use a unique key to prevent data from being shared between different post pages
      key: `news_${slug}`,
      lazy: true,
    });
  };

  return {
    fetchNews,
    fetchNewsBySlug,
  };
};
