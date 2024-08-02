import { useFormik } from 'formik'
import React from 'react'
import * as yup from 'yup';
import { Pressable, View } from 'react-native'
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import Text from './Text';
import { CREATE_REVIEW } from '../graphql/mutations';
import { TextField } from './SignIn';
import theme from '../theme';

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: 0,
  text: ''
}

const ReviewForm = () => {
  const navigate = useNavigate()
  const [ createReview, { data, loading, error} ] = useMutation(CREATE_REVIEW)

  const validationSchema = yup.object().shape({
    ownerName: yup
      .string()
      .required("Repository owner name is required"),
    repositoryName: yup
      .string()
      .required('Repository name is required'),
    rating: yup
      .number()
      .min(0)
      .max(100)
      .required('Rating is required'),
    text: yup
      .string()
  })

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values
    const numRating = Number(rating)
    const review = { ownerName, repositoryName, rating: numRating, text }
    try {
      await createReview({ variables: { review } })
      navigate('/');
    } catch (e) {
      console.log(e)
    }
  }

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit
  })

  return (
    <View style={{ padding: 10 }}>
      <TextField
        placeholder='Repository owner name'
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        error={formik.errors.ownerName}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={{ color: '#d73a4a', marginBottom: 8 }}>{formik.errors.ownerName}</Text>
      )}
      <TextField
        placeholder='Repository name'
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        error={formik.errors.repositoryName}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={{ color: '#d73a4a', marginBottom: 8 }}>{formik.errors.repositoryName}</Text>
      )}
      <TextField
        placeholder='Rating between 0 and 100'
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        error={formik.errors.rating}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={{ color: '#d73a4a', marginBottom: 8 }}>{formik.errors.rating}</Text>
      )}
      <TextField
        placeholder='Review'
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        error={formik.errors.text}
        multiline
      />
      <Pressable
        onPress={formik.handleSubmit}
      >
        <Text color="white" style={{ textAlign: 'center', backgroundColor: theme.colors.primary, padding: 8, marginTop: 8, borderRadius: 5 }}>Add review</Text>
      </Pressable>
    </View>
  )
}

export default ReviewForm