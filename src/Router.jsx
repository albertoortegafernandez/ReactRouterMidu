import { Children, useEffect, useState } from "react";
import { EVENTS } from "./utils/consts";
import { match } from "path-to-regexp";
import {getCurrentPath} from "./utils/getCurrentPath.js"

export function Router({
  children,
  routes = [],
  defaultComponent: DefaultComponent = () => <h1>404 Error</h1>,
}) {
  const [currentPath, setCurrentPath] = useState(getCurrentPath());

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath());
    };
    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
    window.addEventListener(EVENTS.POPSTATE, onLocationChange);
    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange);
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange);
    };
  }, []);

  let routeParams = {};

  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type;
    const isRoute = name === "Route";
    return isRoute ? props : null;
  });

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean);

  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true;

    const marcherUrl = match(path, { decode: decodeURIComponent });
    const matched = marcherUrl(currentPath);
    if (!matched) return false;

    // /search/:query
    routeParams = matched.params; // {query:'javascript} /search/javascript
    return true;
  })?.Component;

  return Page ? (
    <Page routeParams={routeParams} />
  ) : (
    <DefaultComponent routeParams={routeParams} />
  );
}
