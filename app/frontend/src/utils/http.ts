// src/http.ts
import axios from 'axios';
import NProgress from 'nprogress';
import { useRequestStore } from '@/stores/request.store'; // Adjust the path if needed

NProgress.configure({ showSpinner: false, trickleSpeed: 200 });


Object.assign(axios.defaults, {
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 10000,
  withCredentials: true
});

// Request Interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (!(config as { doNotShowLoading?: boolean })?.doNotShowLoading) {
      const requestStore = useRequestStore.getState();
      if (requestStore.requestQueueSize === 0) {
        NProgress.start();
      }
      requestStore.incrementRequestQueueSize();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axios.interceptors.response.use(
    (response) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!response.config.doNotShowLoading) {
      setProgressBarDone();
    }
    return response;
  },
  async (error) => {
    if (!error.config.doNotShowLoading) {
      setProgressBarDone();
    }
    if (error.response) {
      const { data, status } = error.response;

      if (status === 401 && ['TOKEN_EXPIRED'].includes(data.code)) {
        // Handle token expiration (e.g., redirect to login)
        // const { toast } = useToast(); // Uncomment and use if toast is needed
        // await toast({
        //   title: 'Token expired',
        //   description: 'Your token has expired, please login again',
        //   variant: 'destructive'
        // });
        // toLogin(); // Uncomment and use if redirect is needed
        return Promise.reject(error);
      }

      if (status === 401) {
        // Handle unauthorized access (e.g., redirect to login)
        // toLogin(); // Uncomment and use if redirect is needed
        return Promise.reject(error);
      }

      if (status === 403) {
        // Handle forbidden access (e.g., show permission denied message)
        // const { toast } = useToast(); // Uncomment and use if toast is needed
        // await toast({
        //   title: 'Permission denied',
        //   description: "You don't have permission to access this resource",
        //   variant: 'destructive'
        // });
      }
    }
    return Promise.reject(error);
  }
);

async function setProgressBarDone() {
  const requestStore = useRequestStore.getState();
  requestStore.decrementRequestQueueSize();
  if (requestStore.requestQueueSize > 0) {
    NProgress.inc();
  } else {
    NProgress.done();
  }
}

export default axios;
