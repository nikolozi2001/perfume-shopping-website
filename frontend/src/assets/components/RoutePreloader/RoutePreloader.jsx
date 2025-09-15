import { useEffect } from 'react';
import { preloadRoute } from '../../../utils/routeUtils';

/**
 * Component to preload routes based on user interaction patterns
 */
const RoutePreloader = () => {
  useEffect(() => {
    // Preload critical routes after initial load
    const preloadCriticalRoutes = async () => {
      // Wait a bit to avoid interfering with initial page load
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Preload most commonly accessed routes
      const criticalRoutes = ['/air', '/climate', '/water', '/reports'];
      
      for (const route of criticalRoutes) {
        await preloadRoute(route);
        // Small delay between preloads to avoid blocking
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    };

    preloadCriticalRoutes();

    // Preload routes on hover for navigation links
    const handleMouseEnter = (event) => {
      const link = event.target.closest('a[href]');
      if (link) {
        const href = link.getAttribute('href');
        // Check if it's an internal route
        if (href && href.startsWith('/')) {
          const routePath = href.split('/').slice(2).join('/'); // Remove language prefix
          if (routePath) {
            preloadRoute(`/${routePath}`);
          }
        }
      }
    };

    // Add hover listeners to navigation
    document.addEventListener('mouseenter', handleMouseEnter, true);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, true);
    };
  }, []);

  // This component doesn't render anything
  return null;
};

export default RoutePreloader;