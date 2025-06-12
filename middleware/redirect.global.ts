export default defineNuxtRouteMiddleware((to) => {
  const path = to.path;
  const regex = /^\/([a-zA-Z0-9_-]+)-survey\/?$/;
  const match = path.match(regex);

  if (match && match[1]) {
    const source = match[1];
    const newPath = `/survey/survey/${source}`;

    return navigateTo(newPath, { redirectCode: 301 });
  }
});
