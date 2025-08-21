export const useScrollTo = () => {
  const scrollTo = (target: string | number, options: ScrollToOptions = {}) => {
    const defaultOptions: ScrollToOptions = {
      behavior: 'smooth',
      ...options,
    };

    if (typeof target === 'string') {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView(defaultOptions);
      } else {
        // Fallback to top if element not found
        window.scrollTo({ top: 0, ...defaultOptions });
      }
    } else {
      window.scrollTo({ top: target, ...defaultOptions });
    }
  };

  const scrollToTop = (options?: ScrollToOptions) => {
    scrollTo(0, options);
  };

  const scrollToElement = (selector: string, options?: ScrollToOptions) => {
    scrollTo(selector, options);
  };

  return {
    scrollTo,
    scrollToTop,
    scrollToElement,
  };
};
