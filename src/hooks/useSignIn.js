import { useApolloClient, useMutation } from '@apollo/client'
import { SIGN_IN } from '../graphql/mutations'
import useAuthStorage from './useAuthStorage'

const useSignIn = () => {
  const [ authenticate, result ] = useMutation(SIGN_IN)
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();


  const signIn = async ({ username, password }) => {
    const credentials = { username, password }
    const result = await authenticate({ variables: { credentials } })
    await authStorage.setAccessToken(result.data.authenticate.accessToken)
    apolloClient.resetStore();
    return result
  }

  return [signIn, result];
}

export default useSignIn