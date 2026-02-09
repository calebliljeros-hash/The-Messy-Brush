import { Link } from "react-router-dom"

interface ArtCardProps {
  id: number
  title: string
  description: string
  price: number
  imageUrl?: string
  isAuthenticated: boolean
}

const ArtCard = ({
  id,
  title,
  description,
  price,
  imageUrl,
  isAuthenticated,
}: ArtCardProps) => {
  // Build root path to public folder
  const imgSrc = imageUrl ? `${imageUrl}` : "/Placeholder.png" // fallback

  return (
    <div className="art-card">
      <img src={imgSrc} alt={title} className="art-image" />

      <h3>{title}</h3>
      <p>{description}</p>
      <p className="price">${price.toFixed(2)}</p>

      {isAuthenticated ? (
        <Link to={`/purchase/${id}`} className="btn btn-primary">
          Purchase
        </Link>
      ) : (
        <Link to="/login" className="btn btn-secondary">
          Login to Purchase
        </Link>
      )}
    </div>
  )
}

export default ArtCard
