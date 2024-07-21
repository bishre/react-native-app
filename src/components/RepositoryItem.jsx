import * as Linking from 'expo-linking';
import { Pressable, StyleSheet, View } from 'react-native'
import theme from '../theme'
import Stats from './Stats'
import Avatar from './Avatar'
import Text from './Text';
import ReviewForm from './ReviewForm';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: theme.colors.white
  }
})

const RepositoryItem = ({ item, githubLink }) => {
  return (
      <View testID='repositoryItem' style={styles.container}>
        <Avatar {...item}/>
        <Stats {...item}/>
        {githubLink && (
          <Pressable
            onPress={() => Linking.openURL(item.url)}
          >
            <Text color="white" style={{ textAlign: 'center', backgroundColor: theme.colors.primary, padding: 8, marginTop: 8 }}>Open in GitHub</Text>
          </Pressable>
        )}
    </View>
  )
}

export default RepositoryItem