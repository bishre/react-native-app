import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 12,
    borderRadius: 5
  },
  language: {
    padding: 6,
    borderRadius: 5,
    color: theme.colors.white,
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start'
  }
})

const Avatar = ({ ownerAvatarUrl, fullName, description, language }) => {
  return (
    <View style={styles.container}>
      <View>
        <Image
        style={styles.avatar}
        source={{ uri: ownerAvatarUrl }}/>
      </View>
      <View style={styles.avatarText}>
        <Text fontWeight="bold" color="textPrimary" fontSize="subheading">{fullName}</Text>
        <Text color="textSecondary" style={{ paddingTop: 6, paddingBottom: 8 }}>{description}</Text>
        <Text style={styles.language}>{language}</Text>
      </View>
    </View>
  )
}

export default Avatar