import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'
import { useState } from 'react'

const useRepositories = (variables) => {
  const { data, error, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    })
  }

  return { 
    repositories: data?.repositories,
    loading,
    fetchMore: handleFetchMore,
    ...result, 
    error
  }
}

export default useRepositories