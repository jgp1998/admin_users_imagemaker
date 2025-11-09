
export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastOptions {
    position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
    autoClose?: number | false;
    hideProgressBar?: boolean;
    closeOnClick?: boolean;
    pauseOnHover?: boolean;
    draggable?: boolean;
}