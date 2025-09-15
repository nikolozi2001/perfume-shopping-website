/**
 * Advanced route configuration with feature flags and optimization settings
 */

export const routeConfig = {
  // Performance settings
  performance: {
    enablePreloading: true,
    preloadDelay: 2000,
    criticalRoutes: ['/air', '/climate', '/water', '/reports'],
    enablePerformanceMonitoring: import.meta.env.DEV,
    maxPreloadConcurrency: 2
  },

  // Feature flags
  features: {
    enableBreadcrumbs: true,
    enableErrorBoundaries: true,
    enableRouteGuards: false, // Set to true when authentication is needed
    enableAnalytics: true,
    enablePrefetch: true
  },

  // SEO and metadata defaults
  seo: {
    defaultTitle: 'Environmental Data Portal',
    titleSeparator: ' | ',
    defaultDescription: 'Comprehensive environmental data and statistics portal for Georgia',
    defaultKeywords: ['environment', 'data', 'statistics', 'georgia', 'climate', 'water', 'nature'],
    siteName: 'Environmental Data Portal'
  },

  // Language configuration
  languages: {
    default: 'ge',
    supported: ['ge', 'en'],
    fallback: 'ge'
  },

  // Error handling
  errors: {
    enableFallbackRoutes: true,
    enable404Redirect: true,
    redirectTo404: '/ge',
    enableErrorReporting: import.meta.env.PROD
  },

  // Cache settings for route data
  cache: {
    enableRouteDataCache: true,
    cacheDuration: 5 * 60 * 1000, // 5 minutes
    maxCacheSize: 10 // Maximum number of cached route data entries
  }
};

/**
 * Generate route metadata based on configuration
 */
export const generateRouteMetadata = (route, handle) => {
  const { seo } = routeConfig;
  
  return {
    title: handle?.title ? `${handle.title}${seo.titleSeparator}${seo.siteName}` : seo.defaultTitle,
    description: handle?.description || seo.defaultDescription,
    keywords: handle?.keywords ? [...seo.defaultKeywords, ...handle.keywords] : seo.defaultKeywords,
    canonical: route,
    siteName: seo.siteName
  };
};

/**
 * Check if a feature is enabled
 */
export const isFeatureEnabled = (feature) => {
  return routeConfig.features[feature] || false;
};

/**
 * Get performance settings
 */
export const getPerformanceConfig = () => {
  return routeConfig.performance;
};

export default routeConfig;