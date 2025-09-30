const giscusConfig = {
  id: "comments",
  // Values sourced from the script tag provided by the user
  repo: "dipakrathod-tech/blog-site",
  repoId: "R_kgDOP5SpMQ",
  category: "blog comments",
  categoryId: "DIC_kwDOP5SpMc4CwFWB",

  // Giscus mapping and appearance
  mapping: "pathname",
  // 'term' is not used with pathname mapping; keep empty or remove
  term: "",
  strict: "0",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "bottom",
  theme: "preferred_color_scheme",
  lang: "en",
  loading: "lazy",
} as const;

export default giscusConfig;
