<script setup>
const props = defineProps({
  pdfUrl: {
    type: String,
    required: true
  },
  pdfParams: {
    type: Object,
    required: true
  }
});

const isLoading = ref(false);
const toast = useToast();
const { t } = useI18n();

const downloadPdf = async () => {
  try {
    isLoading.value = true;

    // Send request to backend
    const { data, error } = await useMyFetch('/visas/download-pdf/', {
      method: 'POST',
      body: {
        pdf_url: toRaw(props.pdfUrl),
        pdf_params: props.pdfParams,
      },
      responseType: 'blob',
    });

    if (error.value) {
      console.error('Error response from download proxy:', error.value.data);
      throw new Error(error.value.data?.message || 'Download failed');
    }

    if (!data.value) {
      throw new Error('Download failed');
    }

    // Create download link
    const blob = new Blob([data.value], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `visa_${props.pdfParams.EV_SEQ}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading PDF:', error.message);
    toast.add({
      title: t('visa_status.download_error'),
      description: error.message,
      timeout: 5000
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <button
    @click="downloadPdf"
    :disabled="isLoading"
    class="bg-red-main hover:bg-red-main/90 disabled:bg-red-main/70 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-colors"
  >
    <IconDownload v-if="!isLoading" class="w-5 h-5" />
    <IconSpinner v-else class="w-5 h-5 animate-spin" />
    <span class="font-medium">{{ $t('download_visa') }}</span>
  </button>
</template> 