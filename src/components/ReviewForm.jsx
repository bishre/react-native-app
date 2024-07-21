import { useFormik } from 'formik'
import React from 'react'
import * as yup from 'yup';
import { Pressable, View } from 'react-native'
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import Text from './Text';
import { CREATE_REVIEW } from '../graphql/mutations';
import { TextField } from './SignIn';

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
      .required("username is required"),
    repositoryName: yup
      .string()
      .required('repositoryName name is required'),
    rating: yup
      .string()
      .min(0)
      .max(100)
      .required('Rating is required'),
    text: yup
      .string()
  })

  const onSubmit = async (values) => {
    console.log('second')
    const { ownerName, repositoryName, rating, text } = values
    const numRating = Number(rating)
    console.log(typeof numRating)
    const review = { ownerName, repositoryName, rating, text }
    console.log(values)
    try {
      await createReview({ variables: { review } })
      console.log(data)
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
    <View>
      <TextField
        placeholder='ownerName'
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        error={formik.errors.ownerName}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.ownerName}</Text>
      )}
      <TextField
        placeholder='repositoryName'
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        error={formik.errors.repositoryName}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.repositoryName}</Text>
      )}
      <TextField
        placeholder='rating'
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        error={formik.errors.rating}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.rating}</Text>
      )}
      <TextField
        placeholder='text'
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        error={formik.errors.text}
        multiline
      />
      <Pressable
        onPress={formik.handleSubmit}
      >
        <Text color="white" style={{ textAlign: 'center' }}>Add review</Text>
      </Pressable>
    </View>
  )
}

export default ReviewForm