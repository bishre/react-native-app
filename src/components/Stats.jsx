import React from 'react'
import { StyleSheet, View } from 'react-native'
import Text from './Text'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})

const Stats = ({ stargazersCount, forksCount, reviewCount, ratingAverage }) => {
  function formatNumber(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  }

  return (
    <View style={styles.container}>
      <View>
        <Text fontWeight="bold" style={{ textAlign: 'center' }}>{stargazersCount >= 1000 ? formatNumber(stargazersCount) : stargazersCount}</Text>
        <Text color="textSecondary">Stars</Text>
      </View>
      <View>
        <Text fontWeight="bold" style={{ textAlign: 'center' }}>{forksCount >= 1000 ? formatNumber(forksCount) : forksCount}</Text>
        <Text color="textSecondary">Forks</Text>
      </View>
      <View>
        <Text fontWeight="bold" style={{ textAlign: 'center' }}>{reviewCount}</Text>
        <Text color="textSecondary">Reviews</Text>
      </View>
      <View>
        <Text fontWeight="bold" style={{ textAlign: 'center' }}>{ratingAverage}</Text>
        <Text color="textSecondary">Rating</Text>
      </View>
    </View>
  )
}

export default Stats