<script setup>
import { useReCaptcha } from "vue-recaptcha-v3";

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

const executeRecaptcha = ref(null);
const isReady = ref(false);

// Initialize reCAPTCHA
onMounted(() => {
  const recaptcha = useReCaptcha();
  if (recaptcha) {
    executeRecaptcha.value = recaptcha.executeRecaptcha;
    isReady.value = true;
  }
});

const downloadPdf = async () => {
  try {
    isLoading.value = true;

    // Get reCAPTCHA token
    if (!isReady.value || !executeRecaptcha.value) {
      toast.add({
        title: t("error_recaptcha"),
        timeout: 5000
      });
      return;
    }

    const recaptchaToken = await executeRecaptcha.value('download_visa');

    const response = await useMyFetch('/visas/download-pdf/', {
      method: 'POST',
      body: {
        pdf_url: props.pdfUrl,
        pdf_params: props.pdfParams
      },
      headers: { 
        "X-Recaptcha-Token": recaptchaToken 
      },
      responseType: 'blob'
    });

    if (!response.data.value) {
      throw new Error('Download failed');
    }

    // Create download link
    const blob = new Blob([response.data.value], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `visa_${props.pdfParams.EV_SEQ}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading PDF:', error);
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