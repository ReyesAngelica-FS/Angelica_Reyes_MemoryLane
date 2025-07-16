const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

// 1. Add slug field to each MDX node
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

// 2. Add GraphQL schema definition for custom fields
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

// 3. Dynamically create pages for each post
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
        reporter.panic("Error loading MDX nodes", result.errors);
    }

    const postTemplate = path.resolve("./src/templates/post.js");

    result.data.allMdx.nodes.forEach((node) => {
        createPage({
            path: node.fields.slug, 
            component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
            context: {
                id: node.id,
            },
        });
    });
};
