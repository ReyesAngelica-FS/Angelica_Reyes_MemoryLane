import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import { MDXProvider } from "@mdx-js/react"


export const query = graphql`
    query ($id: String!) {
        mdx(id: { eq: $id }) {
            frontmatter {
                title
                date(formatString: "MMMM D, YYYY")
            }
            body
        }
    }
`

const PostTemplate = ({ data }) => {
    const { frontmatter, body } = data.mdx

    return (
        <Layout>
            <article>
                <h1>{frontmatter.title}</h1>
                <p>{frontmatter.date}</p>
                <MDXProvider>
                    <div>{body}</div>
                </MDXProvider>
            </article>
        </Layout>
    )
}

export default PostTemplate
