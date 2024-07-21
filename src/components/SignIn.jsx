import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import Text from './Text';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';

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
  error: {
    borderColor: '#d73a4a'
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

export const TextField = (props) => {
  const textFieldStyles = [
    styles.input,
    props.error && styles.error
  ];
  return (
    <TextInput
      {...props}
      style={textFieldStyles}
    />
  )
}

export const SignInContainer = ({ onSubmit }) => {

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required'),
    password: yup
      .string()
      .required('Password is required')
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })

  return (
    <View style={styles.container}>
      <TextField
        placeholder='username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        error={formik.errors.username}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.username}</Text>
      )}
      <TextField
        placeholder='password'
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        error={formik.errors.password}
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.password}</Text>
      )}
      <Pressable
        onPress={formik.handleSubmit}
        style={styles.signin}
      >
        <Text color="white" style={{ textAlign: 'center' }}>Sign-in</Text>
      </Pressable>
    </View>
  );
}

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values
    try {
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  }

  return <SignInContainer onSubmit={onSubmit}/>
  // const navigate = useNavigate();

  // const validationSchema = yup.object().shape({
  //   username: yup
  //     .string()
  //     .required('Username is required'),
  //   password: yup
  //     .string()
  //     .required('Password is required')
  // })

  // const onSubmit = async (values) => {
  //   const { username, password } = values
  //   try {
  //     await signIn({ username, password });
  //     navigate('/');
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // const formik = useFormik({
  //   initialValues,
  //   validationSchema,
  //   onSubmit
  // })
  // return (
  //   <View style={styles.container}>
  //     <TextField
  //       placeholder='username'
  //       value={formik.values.username}
  //       onChangeText={formik.handleChange('username')}
  //       error={formik.errors.username}
  //     />
  //     {formik.touched.username && formik.errors.username && (
  //       <Text style={{ color: '#d73a4a' }}>{formik.errors.username}</Text>
  //     )}
  //     <TextField
  //       placeholder='password'
  //       value={formik.values.password}
  //       onChangeText={formik.handleChange('password')}
  //       error={formik.errors.password}
  //       secureTextEntry
  //     />
  //     {formik.touched.password && formik.errors.password && (
  //       <Text style={{ color: '#d73a4a' }}>{formik.errors.password}</Text>
  //     )}
  //     <Pressable
  //       onPress={formik.handleSubmit}
  //       style={styles.signin}
  //     >
  //       <Text color="white" style={{ textAlign: 'center' }}>Sign-in</Text>
  //     </Pressable>
  //   </View>
  // );
};

export default SignIn;