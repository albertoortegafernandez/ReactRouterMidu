import { Suspense, lazy } from "react";
import { Router } from "./Router.jsx";
import { Route } from "./Route.jsx";
import Page404 from "./pages/404.jsx";
import { SearchPage } from "./pages/Search.jsx";

const LazyAboutPage = lazy(() => import("./pages/About"));
const LazyHomePage = lazy(() => import("./pages/Home"));

const appRoutes = [
  {
    path: "/search/:query",
    Component: SearchPage,
  },
];

function App() {
  return (
    <main>
      <Suspense fallback={null}>
        <Router routes={appRoutes} defaultComponent={Page404}>
          <Route path="/" Component={LazyHomePage} />
          <Route path="/about" Component={LazyAboutPage} />
        </Router>
      </Suspense>
    </main>
  );
}

export default App;
