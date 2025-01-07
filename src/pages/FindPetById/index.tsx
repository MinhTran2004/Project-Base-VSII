import PetTable from "../../components/Table";
import { useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { useGetPetByIdQuery, useGetPetsQuery } from "../../store/api/apiCaller";
import SearchInput from "../../components/Search";

const FindPetById = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  // const { data } = useGetPetsQuery();
  const debounce = useDebounce(inputValue);
  const [errMess, setErrMess] = useState<string>("");
  const { data: PropID, isLoading, error } = useGetPetByIdQuery(debounce);

  const handleChangInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!Number(e.target.value)) {
      setErrMess("Please enter number*");
      return false;
    } else {
      setInputValue(Number(e.target.value));
      setErrMess("");
      // console.log({ debounce });
    }
  };

  return (
    <>
      <SearchInput handleChangInput={handleChangInput} errMess={errMess} />
      <PetTable propsData={PropID} error={error} isLoading={isLoading} />
    </>
  );
};

export default FindPetById;
