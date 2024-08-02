import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation SignIn($credentials: AuthenticateInput!){
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      repository {
        reviews {
          edges {
            node {
              rating
            }
          }
        }
      }
    }
  }
`;

// Define the mutation for deleting a review
export const DELETE_REVIEW = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
      username
    }
  }
`;