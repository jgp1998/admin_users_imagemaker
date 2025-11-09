import { toast } from 'react-toastify';
import type { ToastOptions, ToastType } from '../types';

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
