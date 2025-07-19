// src/pages/index.js
import * as React from "react"
import { graphql, Link } from "gatsby"
import Projects from "../components/Projects" 

const IndexPage = ({ data }) => {
  const posts = data.allMdx.nodes

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Welcome to Angelica's Blog 🚀</h1>
      <p>This is my custom Gatsby site, created as part of my DOW assignment.</p>

      <h2>📚 Latest Posts</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map(post => (
          <li key={post.id} style={{ marginBottom: "2rem" }}>
            <h3 style={{ marginBottom: "0.3rem" }}>
              <Link to={`/posts${post.fields.slug}`} style={{ textDecoration: "none", color: "#663399" }}>
                {post.frontmatter.title}
              </Link>
            </h3>
            <p style={{ fontStyle: "italic", color: "#555" }}>{post.frontmatter.date}</p>
          </li>
        ))}
      </ul>

      {/* 🧶 Knitting Projects from Express API */}
      <Projects />
    </main>
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

export const Head = () => <title>DOW App</title>
