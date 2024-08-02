import { useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { Alert, Button, FlatList, Text, View } from 'react-native'
import { GET_ME } from '../graphql/queries'
import { ItemSeparator, ReviewItem } from './SingleRepository'
import useReviews from '../hooks/useReviews'
import { useNavigate } from 'react-router-native'
import { DELETE_REVIEW } from '../graphql/mutations'
import theme from '../theme'

const Reviews = () => {
  const { reviews, refetch } = useReviews()
  const navigate = useNavigate()
  const reviewNodes = reviews
    ? reviews.edges.map(edge => edge.node)
    : [];

    const [deleteReview] = useMutation(DELETE_REVIEW)

  const handleDelete = (id) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Delete", onPress: async () => {
          try {
            await deleteReview({ variables: { id } })
            refetch()
          } catch (e) {
            console.log(e)
          }

        } }
      ]
    );
  }

  return (
    <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        // other props
        renderItem={({item}) => (
          <View style={{ backgroundColor: "white", paddingBottom: 8 }}>
            <ReviewItem review={item}/>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <Button title="View repository" onPress={() => navigate(`/${item.repository.id}`)}/>
              <Button color={theme.colors.red} title="Delete review" onPress={() => handleDelete(item.id)}/>
            </View>
          </View>
        )}
      />
  )
}

export default Reviews