import { useCallback } from 'react';
import { event } from '../lib/analytics';

export const useAnalytics = () => {
  const trackEvent = useCallback((eventName: string, parameters?: Record<string, any>) => {
    if (process.env.NEXT_PUBLIC_GA_ID) {
      event({
        name: eventName,
        parameters,
      });
    }
  }, []);

  const trackButtonClick = useCallback(
    (buttonName: string, location?: string) => {
      trackEvent('button_click', {
        button_name: buttonName,
        location,
      });
    },
    [trackEvent]
  );

  const trackFormSubmit = useCallback(
    (formName: string, success: boolean = true) => {
      trackEvent('form_submit', {
        form_name: formName,
        success,
      });
    },
    [trackEvent]
  );

  const trackPageView = useCallback(
    (pageName: string) => {
      trackEvent('page_view', {
        page_name: pageName,
      });
    },
    [trackEvent]
  );

  return {
    trackEvent,
    trackButtonClick,
    trackFormSubmit,
    trackPageView,
  };
};
