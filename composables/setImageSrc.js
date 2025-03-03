export default (html) => {
  const { baseURL } = useRuntimeConfig().public;
  const regex = /<img [^>]*src="([^"]*)"/g;
  let updatedHtml = html;
  let match;

  while ((match = regex.exec(html)) !== null) {
    const src = match[1];
    if (src.startsWith("/"))
      updatedHtml = updatedHtml.replace(src, baseURL + src);
  }
  return updatedHtml;
};
