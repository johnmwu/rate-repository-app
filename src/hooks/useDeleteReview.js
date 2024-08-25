import { useMutation, useApolloClient } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);
  const apolloClient = useApolloClient();

  const deleteReview = async (id) => {
    const result = await mutate({
      variables: { deleteReviewId: id },
    });
    console.log(result);
    apolloClient.resetStore();

    return result;
  };

  return [deleteReview, result];
};

export default useDeleteReview;
