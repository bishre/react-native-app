import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories()

  const respositoryNodes = repositories
  ? repositories.edges.map(edge => edge.node)
  : []
  return (
    <FlatList
      data={respositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      // other props
      renderItem={({item}) => (
        <RepositoryItem item={item}/>
      )}
    />
  );
};

export default RepositoryList;