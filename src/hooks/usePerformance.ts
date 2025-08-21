import { useCallback, useRef } from 'react';

interface PerformanceOptions {
  delay?: number;
  maxRetries?: number;
}

export const usePerformance = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const retryCountRef = useRef(0);

  // Debounce function to prevent excessive API calls
  const debounce = useCallback(<T extends (...args: any[]) => any>(
    func: T,
    delay: number = 300
  ): ((...args: Parameters<T>) => void) => {
    return (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }, []);

  // Throttle function to limit execution frequency
  const throttle = useCallback(<T extends (...args: any[]) => any>(
    func: T,
    limit: number = 300
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }, []);

  // Retry function with exponential backoff
  const retry = useCallback(async <T>(
    fn: () => Promise<T>,
    options: PerformanceOptions = {}
  ): Promise<T> => {
    const { maxRetries = 3, delay = 1000 } = options;
    
    try {
      return await fn();
    } catch (error) {
      if (retryCountRef.current < maxRetries) {
        retryCountRef.current++;
        const backoffDelay = delay * Math.pow(2, retryCountRef.current - 1);
        
        await new Promise(resolve => setTimeout(resolve, backoffDelay));
        return retry(fn, options);
      }
      throw error;
    }
  }, []);

  // Lazy load function for heavy components
  const lazyLoad = useCallback(<T>(
    importFn: () => Promise<{ default: T }>,
    fallback?: T
  ): Promise<T> => {
    return new Promise((resolve) => {
      // Use requestIdleCallback if available, otherwise setTimeout
      const scheduleLoad = () => {
        importFn()
          .then(module => resolve(module.default))
          .catch(() => {
            if (fallback) resolve(fallback);
            else throw new Error('Failed to load component');
          });
      };

      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(scheduleLoad);
      } else {
        setTimeout(scheduleLoad, 0);
      }
    });
  }, []);

  // Batch updates to prevent excessive re-renders
  const batchUpdate = useCallback(<T>(
    updates: (() => T)[],
    batchSize: number = 10
  ): Promise<T[]> => {
    return new Promise((resolve) => {
      const results: T[] = [];
      let currentIndex = 0;

      const processBatch = () => {
        const batch = updates.slice(currentIndex, currentIndex + batchSize);
        const batchResults = batch.map(update => update());
        results.push(...batchResults);
        currentIndex += batchSize;

        if (currentIndex < updates.length) {
          // Use requestAnimationFrame for smooth UI updates
          requestAnimationFrame(processBatch);
        } else {
          resolve(results);
        }
      };

      processBatch();
    });
  }, []);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    retryCountRef.current = 0;
  }, []);

  return {
    debounce,
    throttle,
    retry,
    lazyLoad,
    batchUpdate,
    cleanup
  };
};
