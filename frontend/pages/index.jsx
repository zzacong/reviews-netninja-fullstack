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
      categories {
        id
        name
      }
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
      {data.reviews.map(r => (
        <div key={r.id} className="review-card">
          <div className="rating">{r.rating}</div>
          <h2>{r.title}</h2>
          {r.categories.map(c => (
            <small key={c.id}>{c.name}</small>
          ))}
          <p>{r.body.slice(0, 200)}...</p>
          <Link href={`/reviews/${r.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  )
}
