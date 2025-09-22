// composables/useContent.ts
export const useContent = () => {
  /**
   * Takes an HTML string and replaces relative media paths with a proxy path.
   * Ensures that images embedded in CKEditor content are loaded correctly via the Nuxt proxy.
   * @param {string | null | undefined} html - The HTML content string.
   * @returns {string} - The formatted HTML string.
   */
  const formatContent = (html: string | null | undefined): string => {
    if (!html) {
      return '';
    }
    // Replace relative media paths with the new proxy path
    return html.replace(/src="\/media\//g, 'src="/_media/');
  };

  return {
    formatContent,
  };
};
