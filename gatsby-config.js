module.exports = {
    pathPrefix: "/Angelica_Reyes_MemoryLane", // ✅ Required for GitHub Pages
    siteMetadata: {
        title: "Memory Lane",
        author: "Angelica Reyes",
        description: "A simple static blog built with Gatsby and React.",
        siteUrl: "https://reyesangelica-fs.github.io/Angelica_Reyes_MemoryLane", // ✅ Used for SEO
    },
    plugins: [
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "posts",
                path: `${__dirname}/src/posts/`, // ✅ Your markdown files
            },
        },
        {
            resolve: "gatsby-plugin-mdx",
            options: {
                extensions: [".mdx", ".md"],
                gatsbyRemarkPlugins: [
                    {
                    resolve: "gatsby-remark-images",
                        options: {
                            maxWidth: 800,
                        },
                    },
                ],
            },
        },
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        "gatsby-plugin-image",
        {
            resolve: "gatsby-plugin-react-helmet",
        },
    ],
};
