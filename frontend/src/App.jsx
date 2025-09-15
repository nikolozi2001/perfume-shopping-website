import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Header from "./assets/components/Header/Header";
import LoadingSpinner from "./assets/components/LoadingSpinner/LoadingSpinner";
import ErrorBoundary from "./assets/components/ErrorBoundary/ErrorBoundary";
import { useRouteMetadata, useRouteAnalytics } from "./utils/routeUtils";
// import Footer from "./assets/components/Footer/Footer";

function App() {
  // Update page metadata and track analytics
  useRouteMetadata();
  useRouteAnalytics();

  return (
    <ErrorBoundary title="Application Error" message="There was an error loading the application.">
      <Header />
      <main className="main">
        <Suspense fallback={<LoadingSpinner text="Loading page..." />}>
          <ErrorBoundary title="Page Error" message="There was an error loading this page content.">
            <Outlet />
          </ErrorBoundary>
        </Suspense>
      </main>
      {/* <Footer /> */}
    </ErrorBoundary>
  );
}

export default App;
