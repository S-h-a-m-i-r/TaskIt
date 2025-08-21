import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  domContentLoaded: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  timeToInteractive: number;
}

const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (import.meta.env.DEV) {
      setIsVisible(true);
    }

    const measurePerformance = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
      
      const firstContentfulPaint = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
      const largestContentfulPaint = paint.find(entry => entry.name === 'largest-contentful-paint')?.startTime || 0;
      
      // Estimate time to interactive (simplified)
      const timeToInteractive = Math.max(loadTime, largestContentfulPaint);

      setMetrics({
        loadTime,
        domContentLoaded,
        firstContentfulPaint,
        largestContentfulPaint,
        timeToInteractive
      });
    };

    // Wait for page to fully load
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
      return () => window.removeEventListener('load', measurePerformance);
    }
  }, []);

  if (!isVisible || !metrics) return null;

  const getPerformanceColor = (time: number) => {
    if (time < 1000) return 'text-green-600';
    if (time < 3000) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 max-w-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-900">Performance Metrics</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-600">Load Time:</span>
          <span className={getPerformanceColor(metrics.loadTime)}>
            {metrics.loadTime.toFixed(0)}ms
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">DOM Ready:</span>
          <span className={getPerformanceColor(metrics.domContentLoaded)}>
            {metrics.domContentLoaded.toFixed(0)}ms
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">First Paint:</span>
          <span className={getPerformanceColor(metrics.firstContentfulPaint)}>
            {metrics.firstContentfulPaint.toFixed(0)}ms
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Largest Paint:</span>
          <span className={getPerformanceColor(metrics.largestContentfulPaint)}>
            {metrics.largestContentfulPaint.toFixed(0)}ms
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Time to Interactive:</span>
          <span className={getPerformanceColor(metrics.timeToInteractive)}>
            {metrics.timeToInteractive.toFixed(0)}ms
          </span>
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-gray-100">
        <div className="text-xs text-gray-500">
          Bundle: {metrics.loadTime < 1000 ? '✅ Optimized' : '⚠️ Needs attention'}
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;
