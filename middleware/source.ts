export default defineNuxtRouteMiddleware((to) => {
  const sourceMap: Record<string, string> = {
    'fb-survey': 'facebook',
    'ig-survey': 'instagram',
    'wa-survey': 'whatsapp',
    'vk-survey': 'vk',
    'yt-survey': 'youtube',
    'li-survey': 'linkedin',
    'x-survey': 'twitter',
    'tt-survey': 'tiktok',
    'tg-survey': 'telegram',
    'survey': 'website'
  };

  const path = to.path.split('/').pop() || '';
  const source = sourceMap[path] || 'website';

  // Store the source in the state
  const surveyStore = useState('survey');
  surveyStore.value = { source };
}); 