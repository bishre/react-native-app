import { useMutation } from '@apollo/client'
import { CREATE_REVIEW } from '../graphql/mutations'

const useCreateReview = () => {
  const { createReview, result } = useMutation(CREATE_REVIEW)

  const addReview = async ({
    owner,
    repository,
    rating,
    review
  }) => {
    const result = await createReview({ variables: { owner, repository, rating, review }})
  }

  return [ addReview, result ]
}

export default useCreateReview