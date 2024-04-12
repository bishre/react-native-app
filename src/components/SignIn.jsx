import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 8
  },
  input: {
    padding: 4,
    marginBottom: 4,
    borderColor: theme.colors.black,
    borderWidth: 1,
    borderRadius: 2
  },
  signin: {
    padding: 8,
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
  }
})

const initialValues = {
  username: '',
  password: ''
}

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values)
  }

  const formik = useFormik({
    initialValues,
    onSubmit
  })
  return (
    <View style={styles.container}>
      <TextInput
        placeholder='username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={styles.input}
      />
      <TextInput
        placeholder='password'
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        style={styles.input}
      />
      <Pressable
        onPress={formik.handleSubmit}
        style={styles.signin}
      >
        <Text color="white" style={{ textAlign: 'center' }}>Sign-in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;