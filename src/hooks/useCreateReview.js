import { useMutation, useApolloClient } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const apolloClient = useApolloClient();

  const createReview = async (review) => {
    const variables = {
      review: { ...review, rating: parseInt(review.rating) },
    };
    console.log("variables", variables);
    const result = await mutate({
      variables: variables,
    });
    console.log(result);
    apolloClient.resetStore();

    return result;
  };

  return [createReview, result];
};

export default useCreateReview;
