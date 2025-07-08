module.exports = {
        pathPrefix: "/Angelica_Reyes_MemoryLane", // Needed for GitHub Pages deployment
        siteMetadata: {
            title: "Memory Lane",
            author: "Angelica Reyes",
            description: "A simple static blog built with Gatsby and React.",
            siteUrl: "https://reyesangelica-fs.github.io/Angelica_Reyes_MemoryLane",
        },
        plugins: [
            {
                resolve: "gatsby-source-filesystem",
                options: {
                    name: "posts",
                    path: `${__dirname}/src/posts/`, // Folder for MDX/Markdown blog posts
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
        "gatsby-plugin-react-helmet", // Optional but useful for SEO
    ],
}
