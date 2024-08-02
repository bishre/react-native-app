import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';
import ReviewForm from './ReviewForm';
import Signup from './Signup';
import Reviews from './Reviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.grey
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />}/>
        <Route path=':id' element={<SingleRepository />}/>
        <Route path='/signin' element={<SignIn />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='*' element={<Navigate to="/" replace />}/>
        <Route path='/review' element={<ReviewForm />}/>
        <Route path='/myreviews' element={<Reviews />}/>
      </Routes>
    </View>
  );
};

export default Main;