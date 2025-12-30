import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 2000,

  customClass: {
    popup: "custom-toast",
    title: "custom-toast-title",
    timerProgressBar: "custom-toast-progress",
  },

  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const toast = {
  success(message: string) {
    Toast.fire({
      icon: "success",
      title: message,
      iconColor: "#22c55e", 
    });
  },

    successDelete(message: string) {
    Toast.fire({
      icon: "info",
      title: message,
    });
  },
  error(message: string) {
    Toast.fire({
      icon: "error",
      title: message,
      iconColor: "#ef4444", 
    });
  },

  warning(message: string) {
    Toast.fire({
      icon: "warning",
      title: message,
      iconColor: "#f59e0b", 
    });
  },

  info(message: string) {
    Toast.fire({
      icon: "info",
      title: message,
      iconColor: "#3b82f6", 
    });
  },
};
