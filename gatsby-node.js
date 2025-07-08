const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

// Create slug field
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

// Tell GraphQL about the slug field
exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions;

    createTypes(`
        type Mdx implements Node {
            fields: MdxFields
        }

        type MdxFields {
            slug: String
        }
    `);
};

// Create pages using slug
exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions;

    const result = await graphql(`
        {
            allMdx {
                    nodes {
                        id
                        internal {
                            contentFilePath
                    }
                    fields {
                        slug
                    }
                }
            }
        }
    `);

    if (result.errors) {
        reporter.panic("Error loading MDX results", result.errors);
    }

    result.data.allMdx.nodes.forEach(node => {
        createPage({
            path: `/posts${node.fields.slug}`,
            component: `${path.resolve(
                "./src/templates/post.js"
            )}?__contentFilePath=${node.internal.contentFilePath}`,
            context: {
                id: node.id,
            },
        });
    });
};
