import { ref } from 'vue';

export function useModal() {
  const visible = ref(false);
  const title = ref('');
  const content = ref<any>(null);

  const openModal = (modalTitle: string, modalContent:any) => {
    title.value = modalTitle;
    content.value = modalContent;
    visible.value = true;
  };

  const closeModal = () => {
    visible.value = false;
  };

  return {
    visible,
    title,
    content,
    openModal,
    closeModal,
  };
}
