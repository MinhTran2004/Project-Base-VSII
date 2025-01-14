import { Button, TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { SearchStyle } from "./styled";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "../../hooks";
import { useGetPetByIdQuery } from "../../store/api/apiCaller";
import PetTable from "../Table";
import { IPropData } from "../../types/types";

const SearchInput = () => {
  const htmlRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState<number>(0);
  const [errMess, setErrMess] = useState<string>("");
  const debounce = useDebounce(inputValue);
  const [dataSearch, setDataSearch] = useState<IPropData>();
  const { data, isLoading, error } = useGetPetByIdQuery(debounce);

  // const { data: dataPropID, isLoading, error } = useGetPetByIdQuery();
  // const onFocus = () => {
  //   if (htmlRef.current) {
  //     htmlRef.current.focus();
  //   }
  // };
  const handleChangInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!Number(e.target.value)) {
      setErrMess("Please enter number*");
      return false;
    } else {
      setInputValue(Number(e.target.value));
      setErrMess("");
    }
  };
  const onClick = () => {
    setDataSearch({ data, loading: isLoading, error });
  };
  useEffect(() => {
    onClick();
  }, [data, debounce]);

  return (
    <>
      <SearchStyle>
        <TextField
          sx={{ mr: "0.5rem", width: "30%" }}
          autoFocus
          size="small"
          onChange={handleChangInput}
          placeholder="Search pet by Id..."
          error={errMess.length ? true : false}
          helperText={errMess}
          // inputRef={htmlRef}
        />

        <Button variant="contained" onClick={() => onClick()}>
          <SearchOutlinedIcon />
        </Button>
      </SearchStyle>
      {/* <PetTable propsData={dataPropID} error={error} isLoading={isLoading} /> */}
      <PetTable propsData={dataSearch} />
    </>
  );
};

export default SearchInput;
