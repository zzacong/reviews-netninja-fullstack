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
    }
  }
`

export default function ReviewDetailsPage() {
  const router = useRouter()
  const { id } = router.query

  // const { data: review, loading, error } = useFetch(`/reviews/${id}`)
  const {
    data: { review },
    loading,
    error,
  } = useQuery(REVIEW, { variables: { id } })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  return (
    <div className="review-card">
      <div className="rating">{review.rating}</div>
      <h2>{review.title}</h2>
      <small>console list</small>
      <p>{review.body}</p>
    </div>
  )
}
