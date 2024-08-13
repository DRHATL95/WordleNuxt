export const useToast = () => {
  const visible = ref(false);
  const message = ref("");

  const showToast = (msg: string) => {
    message.value = msg;
    visible.value = true;
    setTimeout(() => {
      visible.value = false;
    }, 3000); // Hide the toast after 3 seconds
  };

  return {
    visible,
    message,
    showToast,
  };
}
