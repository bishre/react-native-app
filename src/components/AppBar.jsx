import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useApolloClient, useQuery } from '@apollo/client'
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';
import { GET_ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    paddingBottom: 10,
    paddingLeft: 10,
    // ...
  },
  // ...
  text: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
    marginRight: 12
  }
});

const AppBar = () => {
  const { data } = useQuery(GET_ME);
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()

  const handleSignout = async () => {
    await authStorage.removeAccessToken()
    apolloClient.resetStore()
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>
        {data?.me ?
          <Pressable
            onPress={handleSignout}
          >
            <Text style={styles.text}>Sign out</Text>
          </Pressable>
          :
          <Link to="/signin">
            <Text style={styles.text}>Sign-in</Text>
          </Link>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;