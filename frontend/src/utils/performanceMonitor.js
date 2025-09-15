/**
 * Performance monitoring utilities for route navigation
 */

class RoutePerformanceMonitor {
  constructor() {
    this.navigationStart = null;
    this.routeTimings = new Map();
  }

  /**
   * Start timing a route navigation
   */
  startNavigation(routePath) {
    this.navigationStart = performance.now();
    console.log(`🚀 Starting navigation to: ${routePath}`);
  }

  /**
   * End timing a route navigation
   */
  endNavigation(routePath) {
    if (this.navigationStart) {
      const duration = performance.now() - this.navigationStart;
      this.routeTimings.set(routePath, duration);
      
      console.log(`✅ Navigation to ${routePath} completed in ${duration.toFixed(2)}ms`);
      
      // Log performance warning if route takes too long
      if (duration > 1000) {
        console.warn(`⚠️ Slow route detected: ${routePath} took ${duration.toFixed(2)}ms`);
      }
      
      this.navigationStart = null;
      return duration;
    }
    return null;
  }

  /**
   * Get performance statistics
   */
  getStats() {
    const timings = Array.from(this.routeTimings.entries());
    if (timings.length === 0) return null;

    const durations = timings.map(([, duration]) => duration);
    const average = durations.reduce((sum, d) => sum + d, 0) / durations.length;
    const max = Math.max(...durations);
    const min = Math.min(...durations);

    return {
      routeCount: timings.length,
      averageTime: average,
      maxTime: max,
      minTime: min,
      slowRoutes: timings
        .filter(([, duration]) => duration > average * 1.5)
        .map(([route]) => route),
      routeTimings: Object.fromEntries(timings)
    };
  }

  /**
   * Monitor Core Web Vitals for routes
   */
  measureWebVitals() {
    // Measure Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log(`📊 LCP: ${lastEntry.startTime.toFixed(2)}ms`);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // Measure First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        console.log(`📊 FID: ${entry.processingStart - entry.startTime}ms`);
      });
    }).observe({ entryTypes: ['first-input'] });

    // Measure Cumulative Layout Shift (CLS)
    new PerformanceObserver((entryList) => {
      let clsValue = 0;
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      if (clsValue > 0) {
        console.log(`📊 CLS: ${clsValue.toFixed(4)}`);
      }
    }).observe({ entryTypes: ['layout-shift'] });
  }

  /**
   * Monitor resource loading for routes
   */
  monitorResourceLoading() {
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        if (entry.initiatorType === 'script' || entry.initiatorType === 'link') {
          const duration = entry.responseEnd - entry.startTime;
          if (duration > 500) {
            console.warn(`🐌 Slow resource: ${entry.name} (${duration.toFixed(2)}ms)`);
          }
        }
      });
    }).observe({ entryTypes: ['resource'] });
  }

  /**
   * Export performance data for analysis
   */
  exportData() {
    const stats = this.getStats();
    const data = {
      timestamp: new Date().toISOString(),
      performance: stats,
      userAgent: navigator.userAgent,
      connection: navigator.connection ? {
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink,
        rtt: navigator.connection.rtt
      } : null
    };
    
    console.log('📈 Performance Report:', data);
    return data;
  }
}

// Create singleton instance
const routePerformanceMonitor = new RoutePerformanceMonitor();

// Initialize monitoring if in development
if (import.meta.env.DEV) {
  routePerformanceMonitor.measureWebVitals();
  routePerformanceMonitor.monitorResourceLoading();
  
  // Export data every 30 seconds in development
  setInterval(() => {
    routePerformanceMonitor.exportData();
  }, 30000);
}

export default routePerformanceMonitor;