export const useNews = () => {
  const newsItems = ref([
    {
      slug: 'visa-policy-changes-2025',
      title: 'news.posts.visa_policy_changes_2025.title',
      category: 'news.categories.visa_policy',
      excerpt: 'news.posts.visa_policy_changes_2025.excerpt',
      content: 'news.posts.visa_policy_changes_2025.content',
      date: '9/6/2025',
      image: 'https://picsum.photos/seed/visa/800/600',
    },
    {
      slug: 'embassy-interview-tips',
      title: 'news.posts.embassy_interview_tips.title',
      category: 'news.categories.tips',
      excerpt: 'news.posts.embassy_interview_tips.excerpt',
      content: 'news.posts.embassy_interview_tips.content',
      date: '9/2/2025',
      image: 'https://picsum.photos/seed/tips/800/600',
    },
    {
      slug: 'medical-visa-requirements',
      title: 'news.posts.medical_visa_requirements.title',
      category: 'news.categories.health',
      excerpt: 'news.posts.medical_visa_requirements.excerpt',
      content: 'news.posts.medical_visa_requirements.content',
      date: '8/28/2025',
      image: 'https://picsum.photos/seed/health/800/600',
    }
  ]);

  return {
    newsItems
  };
};
