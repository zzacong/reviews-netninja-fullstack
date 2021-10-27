import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'
import ReactMarkdown from 'react-markdown'

import { client } from '../../lib/config/apollo'
import { useFetch } from '../../lib/hooks'

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

// export default function ReviewDetailsPage({ review: initialData }) {
export default function ReviewDetailsPage() {
  const router = useRouter()
  const { id } = router.query

  // const {
  //   data: review,
  //   loading,
  //   error,
  // } = useFetch(`/reviews/${id}`, { initialData })
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
      <ReactMarkdown>{review.body}</ReactMarkdown>
    </div>
  )
}

// export async function getStaticPaths() {
//   const { data } = await client.query({
//     query: gql`
//       query GetDetails {
//         reviews {
//           id
//         }
//       }
//     `,
//   })

//   const paths = data.reviews.map(r => ({
//     params: { id: r.id },
//   }))

//   return { paths, fallback: 'blocking' }
// }

// export async function getStaticProps({ params }) {
//   const { data } = await client.query({
//     query: REVIEW,
//     variables: { id: params.id },
//   })

//   return {
//     props: { review: data.review },
//     revalidate: 1,
//   }
// }
