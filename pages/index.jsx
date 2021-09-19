import Link from 'next/link'
import { useQuery, gql } from '@apollo/client'

// import { useFetch } from '../lib/hooks'

const REVIEWS = gql`
  query GetReviews {
    reviews {
      id
      title
      rating
      body
    }
  }
`

export default function HomePage() {
  // const { data, loading, error } = useFetch('/reviews') // REST API
  const { data, loading, error } = useQuery(REVIEWS) // GRAPHQL

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  return (
    <div>
      {data.reviews.map(review => (
        <div key={review.id} className="review-card">
          <div className="rating">{review.rating}</div>
          <h2>{review.title}</h2>
          <small>console list</small>
          <p>{review.body.slice(0, 200)}...</p>
          <Link href={`/details/${review.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  )
}
