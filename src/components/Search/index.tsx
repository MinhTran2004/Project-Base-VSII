import { Button, TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { SearchStyle } from "./styled";
import { useRef } from "react";

const SearchInput = ({
  errMess,
  handleChangInput,
}: {
  errMess: string;
  handleChangInput: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => false | undefined;
}) => {
  const htmlRef = useRef<HTMLDivElement>(null);
  const onFocus = () => {
    if (htmlRef.current) {
      htmlRef.current.focus();
    }
  };
  return (
    <SearchStyle>
      <TextField
        sx={{ mr: "0.5rem", width: "30%" }}
        autoFocus
        size="small"
        onChange={handleChangInput}
        placeholder="Search pet by Id..."
        error={errMess.length ? true : false}
        helperText={errMess}
        inputRef={htmlRef}
      />

      <Button variant="contained" onClick={onFocus}>
        <SearchOutlinedIcon />
      </Button>
    </SearchStyle>
  );
};

export default SearchInput;
