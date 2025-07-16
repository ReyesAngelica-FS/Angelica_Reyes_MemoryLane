import * as React from "react"
import { graphql, Link, withPrefix } from "gatsby"
import Layout from "../components/Layout"

const IndexPage = ({ data }) => {
    return (
        <Layout>
            <h2>Welcome to Memory Lane</h2>
            <p>Enjoy some reflections on tech, tools, and what I’m learning.</p>

            {data.allMdx.nodes.map(post => {
                const cleanSlug = post.fields.slug.replace(/^\/+/, "")
                const path = withPrefix(`/posts/${cleanSlug}/`)
                return (
                    <article key={post.id}>
                        <h3>
                            <Link to={path}>
                                {post.frontmatter.title}
                            </Link>
                        </h3>
                        <p>{post.frontmatter.date}</p>
                    </article>
                )
            })}
        </Layout>
    )
}

export const query = graphql`
    query {
        allMdx(sort: { frontmatter: { date: DESC } }) {
            nodes {
                id
                frontmatter {
                    title
                    date(formatString: "MMMM D, YYYY")
                }
                fields {
                    slug
                }
            }
        }
    }
`

export default IndexPage
