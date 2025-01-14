import { useMemo } from "react";
import SearchInput from "../../components/Search";
import { Typography } from "@mui/material";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { JwtPayloadUser } from "../../types/interfaceJwt";
import LogIn from "../LogIn";

const FindPetById = () => {
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
              <SearchInput />
            </>
          )}
        </>
      ) : (
        <LogIn />
      )}
    </>
  );
};

export default FindPetById;
