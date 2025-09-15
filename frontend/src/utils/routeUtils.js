import { useEffect } from 'react';
import { useMatches } from 'react-router-dom';
import performanceMonitor from './performanceMonitor.js';

/**
 * Hook to manage document title and meta tags based on route metadata
 */
export const useRouteMetadata = () => {
  const matches = useMatches();

  useEffect(() => {
    // Find the last match with handle data
    const currentMatch = matches
      .filter(match => match.handle)
      .pop();

    if (currentMatch?.handle) {
      const { title, description } = currentMatch.handle;
      
      // Update document title
      if (title) {
        document.title = title;
      }
      
      // Update meta description
      if (description) {
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
          metaDescription = document.createElement('meta');
          metaDescription.name = 'description';
          document.head.appendChild(metaDescription);
        }
        metaDescription.content = description;
      }
    }
  }, [matches]);

  return matches;
};

/**
 * Route guard hook for authentication/authorization
 */
export const useRouteGuard = (requiredPermissions = []) => {
  // This is a placeholder for authentication logic
  // You can expand this based on your authentication system
  
  const checkPermissions = () => {
    // Add your permission checking logic here
    // You can access requiredPermissions from the outer scope
    // For now, returning true as a placeholder
    return true;
  };

  const hasAccess = requiredPermissions.length === 0 || 
                   checkPermissions();

  return {
    hasAccess,
    redirectPath: hasAccess ? null : '/ge' // Redirect to home if no access
  };
};

/**
 * Preload route components for better performance
 */
export const preloadRoute = async (routePath) => {
  try {
    // This would map route paths to their lazy-loaded components
    const routeMap = {
      '/air': () => import('../assets/components/Pages/Air/Air'),
      '/climate': () => import('../assets/components/Pages/Climate/Climate'),
      '/water': () => import('../assets/components/Pages/Water/Water'),
      '/nature': () => import('../assets/components/Pages/Nature/Nature'),
      '/energy': () => import('../assets/components/Pages/Energy/Energy'),
      '/transport': () => import('../assets/components/Pages/Transport/Transport'),
      '/waste': () => import('../assets/components/Pages/Waste/Waste'),
      '/other': () => import('../assets/components/Pages/Other/Other'),
      '/reports': () => import('../assets/components/Pages/Reports/Reports'),
    };

    const loader = routeMap[routePath];
    if (loader) {
      await loader();
    }
  } catch (error) {
    console.warn(`Failed to preload route ${routePath}:`, error);
  }
};

/**
 * Analytics tracking for route changes
 */
export const useRouteAnalytics = () => {
  const matches = useMatches();

  useEffect(() => {
    // Track page views and performance
    const currentPath = matches[matches.length - 1]?.pathname;
    if (currentPath) {
      // Start performance timing
      performanceMonitor.startNavigation(currentPath);
      
      // Add your analytics tracking here
      // Example: gtag('config', 'GA_TRACKING_ID', { page_path: currentPath });
      console.log('Page view tracked:', currentPath);
      
      // End performance timing after a small delay to capture render time
      setTimeout(() => {
        performanceMonitor.endNavigation(currentPath);
      }, 100);
    }
  }, [matches]);
};