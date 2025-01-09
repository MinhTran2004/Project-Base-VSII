import PetTable from "../../components/Table";
import { useMemo, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { useGetPetByIdQuery } from "../../store/api/apiCaller";
import SearchInput from "../../components/Search";
import { Typography } from "@mui/material";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { JwtPayloadUser } from "../../types/interfaceJwt";

const FindPetById = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const debounce = useDebounce(inputValue);
  const [errMess, setErrMess] = useState<string>("");
  const {
    data: dataPropID,
    isLoading,
    error,
  } = useGetPetByIdQuery(debounce, { skip: !inputValue });

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
  const checkedUser = useMemo(() => {
    if (Cookies.get("token")) {
      const token = `${Cookies.get("token")}`;
      const decoded = jwtDecode<JwtPayloadUser>(token);
      return decoded;
    }
  }, [Cookies.get("token")]);

  return (
    <>
      {Cookies.get("token") ? (
        <>
          {checkedUser && (
            <>
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
                variant="h4"
                color="warning"
              >
                FIND PET BY ID
              </Typography>
              <SearchInput
                handleChangInput={handleChangInput}
                errMess={errMess}
              />
              <PetTable
                propsData={dataPropID}
                error={error}
                isLoading={isLoading}
              />
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default FindPetById;
