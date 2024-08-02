import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable, TextInput } from 'react-native';
import { useNavigate } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import {Picker} from '@react-native-picker/picker';
import { useDebouncedCallback } from 'use-debounce';
import { Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryOrder = ({ principle, setPrinciple }) => {
  return (
    <View>
      <Picker
        selectedValue={principle.label}
        onValueChange={(itemValue, itemIndex) => {
          switch (itemIndex) {
            case 0:
              setPrinciple({ label: "Latest repositories", orderBy: "CREATED_AT", orderDirection: "DESC" })
              return
            case 1:
              setPrinciple({ label: "Highest rated repositories", orderBy: "RATING_AVERAGE", orderDirection: "DESC" })
              return
            case 2:
              setPrinciple({ label: "Lowest rated repositories", orderBy: "RATING_AVERAGE", orderDirection: "ASC" })
              return
            default:
              setPrinciple({ label: "Latest repositories", orderBy: "CREATED_AT", orderDirection: "DESC" })
          }
        }
        }
        style={{ width: "100%" }}
        mode="dropdown"
      >
        <Picker.Item label="Latest repositories" value="Latest repositories" />
        <Picker.Item label="Highest rated repositories" value="Highest rated repositories" />
        <Picker.Item label="Lowest rated repositories" value="Lowest rated repositories" />
      </Picker>
    </View>
  );
};

const RepositoryListHeader = ({ principle, setPrinciple, setSearchKeyword }) => {    
  const debounced = useDebouncedCallback(value => {
    setSearchKeyword(value)
  }, 500);

  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={(text) => debounced(text)}
        clearIcon={true}
        style={{ backgroundColor: 'white', borderRadius: 0, width: "100%" }}
      />
      <RepositoryOrder principle={principle} setPrinciple={setPrinciple} />
    </>
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    // this.props contains the component's props
    const props = this.props;
    // ...
    return (
      <RepositoryListHeader {...props} />
    );
  };

  render() {
    const { repositories, navigate, onEndReach } = this.props
    const respositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

    return (
      <FlatList
        data={respositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        // other props
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
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
}

// To use the navigate hook with a class component
const withNavigate = (Component) => {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
};

const RepositoryList = ({ navigate }) => {
  const [principle, setPrinciple] = useState({ label: "Latest repositories", orderBy: "CREATED_AT", orderDirection: "DESC" })
  const [searchKeyword, setSearchKeyword] = useState('')

  const { repositories, fetchMore } = useRepositories({
    orderBy: principle.orderBy,
    orderDirection: principle.orderDirection,
    searchKeyword: searchKeyword,
    first: 4
  })

  const onEndReach = () => {
    fetchMore()
  }

  return <RepositoryListContainer 
    repositories={repositories}
    principle={principle}
    setPrinciple={setPrinciple}
    setSearchKeyword={setSearchKeyword}
    navigate={navigate} 
    onEndReach={onEndReach}
  />;
};

export default withNavigate(RepositoryList);