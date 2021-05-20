import React from "react";
import { useAppSelector } from "../store/hooks";
import ContainerList from "../components/containers/ContainerList";
import Loader from "../components/Loader";

const SearchPage = () => {
  const { searchedGames, isLoading } = useAppSelector((state) => state.games);

  return (
    <div>
      {isLoading ? (
        <Loader height={400} width={400} />
      ) : (
        //TODO aggiungere come titolo la stringa cercata
        <ContainerList
          title="Results"
          itemTypeError={null}
          type="grid"
          items={searchedGames}
        />
      )}
    </div>
  );
};

export default SearchPage;
