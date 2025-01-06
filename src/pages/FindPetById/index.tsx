import PetTable from "../../components/Table";
import { useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { useGetPetByIdQuery, useGetPetsQuery } from "../../store/api/apiCaller";
import { TextField } from "@mui/material";

const FindPetById = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  // const { data } = useGetPetsQuery();
  const debounce = useDebounce(inputValue);
  const { data: PropID } = useGetPetByIdQuery(debounce);

  const handleChangInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!Number(e.target.value)) {
      return false;
    } else {
      setInputValue(Number(e.target.value));
      console.log({ debounce });
    }
  };

  return (
    <>
      <TextField
        autoFocus
        onChange={handleChangInput}
        placeholder="Search pet by Id..."
      />
      <PetTable propsData={PropID} />
    </>
  );
};

export default FindPetById;
