import * as React from "react"
import { Link } from "gatsby"
import "./styles.css" 


const Layout = ({ children }) => {
    return (
        <div className="layout">
        <header>
            <h1>
            <Link to="/">📝 Memory Lane</Link>
            </h1>
        </header>

        <main>{children}</main>

        <footer>
            <p>© {new Date().getFullYear()} Angelica Reyes</p>
        </footer>
        </div>
    )
}

export default Layout
