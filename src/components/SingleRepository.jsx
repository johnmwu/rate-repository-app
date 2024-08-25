import { useParams } from "react-router-native";

import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";

const SingleRepository = () => {
  const id = useParams().id;
  const { repository } = useRepository(id);

  return <RepositoryItem repository={repository} showLink={true} />;
};

export default SingleRepository;
