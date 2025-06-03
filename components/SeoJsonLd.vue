<script setup>
const { t } = useI18n();
const route = useRoute();
const { localeRoute } = useLocaleRoute();

const currentUrl = computed(() => {
  return `https://visadoctors.uz${route.fullPath}`;
});

const baseSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: t('og_title'),
  url: 'https://visadoctors.uz',
  description: t('og_description'),
  inLanguage: ['uz', 'en']
}));

const organizationSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Visa Doctors',
  url: 'https://visadoctors.uz',
  logo: 'https://visadoctors.uz/logo.svg',
  description: t('og_description'),
  sameAs: [
    'https://t.me/koreyagaviza',
    'https://instagram.com/visa_doctors'
  ]
}));

const serviceSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Korean Visa Application Service',
  provider: {
    '@type': 'Organization',
    name: 'Visa Doctors'
  },
  description: t('og_description'),
  areaServed: 'Uzbekistan',
  audience: {
    '@type': 'Audience',
    audienceType: 'Students'
  }
}));

const breadcrumbSchema = computed(() => {
  const paths = route.path.split('/').filter(Boolean);
  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: t('main_page'),
      item: 'https://visadoctors.uz'
    }
  ];

  if (paths.length > 0) {
    const pathMap = {
      'survey': t('fill_survey'),
      'visa-status': t('visa_status.title'),
      'about': t('about_us'),
      'awards': t('awards'),
      'categories': t('required_docs'),
      'terms': t('terms.title')
    };

    const segment = paths[paths.length - 1];
    if (pathMap[segment]) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: pathMap[segment],
        item: currentUrl.value
      });
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems
  };
});

// Use useHead to add JSON-LD scripts to head
useHead({
  script: [
    {
      type: 'application/ld+json',
      key: 'base-schema',
      children: computed(() => JSON.stringify(baseSchema.value))
    },
    {
      type: 'application/ld+json',
      key: 'organization-schema',
      children: computed(() => JSON.stringify(organizationSchema.value))
    },
    {
      type: 'application/ld+json',
      key: 'service-schema',
      children: computed(() => JSON.stringify(serviceSchema.value))
    },
    {
      type: 'application/ld+json',
      key: 'breadcrumb-schema',
      children: computed(() => JSON.stringify(breadcrumbSchema.value))
    }
  ]
});
</script>

<template>
  <!-- Component does not render visible content, all data is added to head -->
  <div class="hidden"></div>
</template>
