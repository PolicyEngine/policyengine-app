import appsData from "./apps.json";

export const apps = appsData.map((app) => ({
  ...app,
  slug: app.slug || app.title.toLowerCase().replace(/\s+/g, "-"),
}));
