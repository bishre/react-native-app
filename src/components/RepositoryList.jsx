import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const respositoryNodes = repositories
  ? repositories.edges.map(edge => edge.node)
  : [];
  console.log(respositoryNodes)
  const navigate = useNavigate();
  return (
    <FlatList
      data={respositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      // other props
      renderItem={({item}) => (
        <Pressable
          onPress={() => navigate(`/${item.id}`)}
        >
          <RepositoryItem item={item}/>
        </Pressable>
      )}
    />
  );
}
const RepositoryList = () => {
  const { repositories } = useRepositories()

  return <RepositoryListContainer repositories={repositories}/>;
};

export default RepositoryList;