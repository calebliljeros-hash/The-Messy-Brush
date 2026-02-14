import { Link } from "react-router-dom"

const Footer = () => (
  <footer className="footer-section">
    <div className="footer-nav">
      <Link to="/">Home</Link> |{" "}
      <Link to="/login">Login</Link> |{" "}
      <Link to="/register">Register</Link>
    </div>

    <p>© {new Date().getFullYear()} The Messy Brush. All rights reserved.</p>
    <p>Built with ❤️ using React & TypeScript by Vandana Arora, Caleb Liljeros, and Frank Spitzock</p>
  </footer>
)

export default Footer

