import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'

// import { useFetch } from '../../lib/hooks'

const REVIEW = gql`
  query GetReview($id: ID!) {
    review(id: $id) {
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

export default function ReviewDetailsPage() {
  const router = useRouter()
  const { id } = router.query

  // const { data: review, loading, error } = useFetch(`/reviews/${id}`)
  const { data, loading, error } = useQuery(REVIEW, { variables: { id } })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  const { review } = data

  return (
    <div className="review-card">
      <div className="rating">{review.rating}</div>
      <h2>{review.title}</h2>
      {review.categories.map(c => (
        <small key={c.id}>{c.name}</small>
      ))}
      <p>{review.body}</p>
    </div>
  )
}
