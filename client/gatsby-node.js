const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    if (node.internal.type === "Mdx") {
        const slug = createFilePath({ node, getNode, basePath: "src/posts" });

        createNodeField({
            node,
            name: "slug",
            value: slug,
        });
    }
};

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const result = await graphql(`
        {
            allMdx {
                    nodes {
                    id
                    fields {
                        slug
                    }
                    internal {
                        contentFilePath
                    }
                }
            }
        }
    `);

    const postTemplate = path.resolve(`./src/templates/post.js`);

    result.data.allMdx.nodes.forEach((node) => {
        createPage({
            path: `/posts${node.fields.slug}`,
            component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
            context: {
                id: node.id,
            },
        });
    });
};
