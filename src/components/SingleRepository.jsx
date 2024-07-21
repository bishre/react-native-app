import { useParams } from 'react-router-native';
import { format } from 'date-fns';
import useRepository from '../hooks/useRepository'
import RepositoryItem from './RepositoryItem'
import { FlatList, StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  review: {
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    backgroundColor: theme.colors.white,
  },
  separator: {
    height: 8,
  },
  rating: {
    width: 24,
    height: 24,
    marginRight: 6,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: theme.colors.primary,
    textAlign: 'center',
    verticalAlign: 'middle',
    color: theme.colors.primary
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  return (
    <View>
      <RepositoryItem item={repository} githubLink />
    </View>
  )
}

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.review}>
      <View>
        <Text style={styles.rating}>{review.rating}</Text>
      </View>
      <View>
        <Text fontWeight="bold">{review.user.username}</Text>
        <Text>{format(new Date(review.createdAt), 'dd.mm.yyyy')}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  )
}

const SingleRepository = () => {
  const { id } = useParams();
  const { repository } = useRepository({ id });

  const reviewsNodes = repository
  ? repository.reviews.edges.map(edge => edge.node)
  : [];

  return (
    <FlatList
      data={reviewsNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    />
  );
}

export default SingleRepository