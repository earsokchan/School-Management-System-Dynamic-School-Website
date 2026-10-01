const EDGE_TO_EDGE_PATHS = new Set([
  "/admin/academics",
  "/admin/teachers",
  "/admin/pages/home",
  "/admin/pages/about",
  "/admin/pages/academics",
  "/admin/pages/students",
  "/admin/pages/teachers",
  "/admin/pages/news",
  "/admin/pages/events",
  "/admin/pages/gallery",
  "/admin/pages/contact",
]);

export function usesEdgeToEdgeLayout(pathname: string): boolean {
  return EDGE_TO_EDGE_PATHS.has(pathname);
}