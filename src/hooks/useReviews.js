import { useQuery } from '@apollo/client'
import { GET_ME } from '../graphql/queries'

const useReviews = () => {
  const { data, error, loading, refetch } = useQuery(GET_ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network'
  })

  return { reviews: data?.me.reviews, loading, error, refetch }
}

export default useReviews