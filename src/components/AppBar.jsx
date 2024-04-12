import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>
        <Link to="/signin">
          <Text style={styles.text}>Sign-in</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;