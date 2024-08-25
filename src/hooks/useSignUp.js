import { useMutation } from "@apollo/client";
import { SIGNUP } from "../graphql/mutations";

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGNUP);

  const signUp = async ({ username, password }) => {
    const result = await mutate({
      variables: { user: { username, password } },
    });
    console.log(result);

    return result;
  };

  return [signUp, result];
};

export default useSignUp;
