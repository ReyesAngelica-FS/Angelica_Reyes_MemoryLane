module.exports = {
  pathPrefix: "/Angelica_Reyes_DOW-App", // 👈 Required for GitHub Pages deployment!
  siteMetadata: {
    title: "Angelica's Blog",
    siteUrl: "https://reyesangelica-fs.github.io/Angelica_Reyes_DOW-App",
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
      },
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/posts`,
      },
    },
    "gatsby-plugin-react-helmet",
  ],
}
