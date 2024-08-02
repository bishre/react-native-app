import React from 'react'
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Pressable, StyleSheet, View } from 'react-native'
import Text from './Text';
import { TextField } from './SignIn';
import { CREATE_USER } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import theme from '../theme';
import { useNavigate } from 'react-router-native';

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
  password: '',
  passwordConfirmation: ''
}

const Signup = () => {
  const navigate = useNavigate()
  const [ createUser, { data, loading, error} ] = useMutation(CREATE_USER)

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(5, 'Username must be at least 5 characters')
      .max(30, 'Username must be at most 30 characters')
      .required('Username is required'),
    password: yup
      .string()
      .min(5, 'Password must be at least 5 characters')
      .max(50, 'Password must be at most 50 characters')

      .required('Password is required'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Password confirmation is required')
  })

  const onSubmit = async (values) => {
    const { username, password } = values
    const newUser = { username, password }
    try {
      await createUser({ variables: { user: newUser } });
      console.log(data);
      navigate('/signin');
    } catch (e) {
      console.log(e);
    }
  }

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
      <TextField
        placeholder='password confirmation'
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange('passwordConfirmation')}
        error={formik.errors.passwordConfirmation}
        secureTextEntry
      />
      {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.passwordConfirmation}</Text>
      )}
      <Pressable
        onPress={formik.handleSubmit}
        style={styles.signin}
      >
        <Text color="white" style={{ textAlign: 'center' }}>Sign-in</Text>
      </Pressable>
    </View>
  )
}

export default Signup