import { defineConfig } from "astro/config";

const repoName = "BioScript";
const isGithubActions = process.env.GITHUB_ACTIONS === "true";

export default defineConfig({
  site: "https://hardik-s.github.io",
  base: isGithubActions ? `/${repoName}/` : "/",
  output: "static"
});
