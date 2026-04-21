// Allow dynamic imports from HTTPS CDN URLs (e.g. threejs-components via jsDelivr).
// TypeScript cannot statically resolve external URLs, so we declare them here.
declare module "https://*" {
  const value: unknown;
  export default value;
  export * from "https://*";
}
