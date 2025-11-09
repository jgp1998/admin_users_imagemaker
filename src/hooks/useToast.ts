import { toast } from 'react-toastify';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastOptions {
  position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
  autoClose?: number | false;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
}

const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const useToast = () => {
  const showToast = (message: string, type: ToastType = 'info', options?: ToastOptions) => {
    const finalOptions = { ...defaultOptions, ...options };

    toast[type](message, finalOptions);
  };

  const success = (message: string, options?: ToastOptions) => {
    showToast(message, 'success', options);
  };

  const error = (message: string, options?: ToastOptions) => {
    showToast(message, 'error', options);
  };

  const info = (message: string, options?: ToastOptions) => {
    showToast(message, 'info', options);
  };

  const warning = (message: string, options?: ToastOptions) => {
    showToast(message, 'warning', options);
  };

  return {
    success,
    error,
    info,
    warning,
    showToast,
  };
};
