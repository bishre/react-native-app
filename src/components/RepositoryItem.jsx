import React from 'react'
import { StyleSheet, View } from 'react-native'
import theme from '../theme'
import Stats from './Stats'
import Avatar from './Avatar'

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: theme.colors.white
  }
})

const RepositoryItem = ({ item }) => {
  return (
      <View style={styles.container}>
        <Avatar {...item}/>
        <Stats {...item}/>
    </View>
  )
}

export default RepositoryItem