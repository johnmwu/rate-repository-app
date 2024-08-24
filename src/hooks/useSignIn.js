import { useMutation, useApolloClient } from "@apollo/client";
import { LOGIN } from "../graphql/mutations";
import useAuthStorage from "../hooks/useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(LOGIN);
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const result = await mutate({
      variables: { credentials: { username, password } },
    });
    console.log(result);
    await authStorage.setAccessToken(result.data.authenticate.accessToken);
    apolloClient.resetStore();
  };

  return [signIn, result];
};

export default useSignIn;
