/**
 * Performance monitoring utilities for route navigation
 */

class RoutePerformanceMonitor {
  constructor() {
    this.navigationStart = null;
    this.currentRoute = null;
    this.routeTimings = new Map();
  }

  /**
   * Start timing a route navigation
   */
  startNavigation(routePath) {
    this.navigationStart = performance.now();
    this.currentRoute = routePath;
  }

  /**
   * End timing a route navigation
   */
  endNavigation(routePath) {
    if (this.navigationStart) {
      const duration = performance.now() - this.navigationStart;
      this.routeTimings.set(routePath, duration);
      
      // Log performance warning if route takes too long
      if (duration > 1000) {
        // Route took longer than expected - could be logged to analytics instead
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
      const _lastEntry = entries[entries.length - 1];
      // LCP measurement: _lastEntry.startTime
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // Measure First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(() => {
        // FID measurement could be tracked here
      });
    }).observe({ entryTypes: ['first-input'] });

    // Measure Cumulative Layout Shift (CLS)
    new PerformanceObserver((entryList) => {
      let _clsValue = 0;
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          _clsValue += entry.value;
        }
      });
      // CLS measurement: _clsValue
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
            // Slow resource detected - could be logged to analytics instead
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
    
    // Performance data collected - could be sent to analytics instead
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