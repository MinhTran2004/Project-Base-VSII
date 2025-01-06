// import { Autocomplete, TextField } from "@mui/material";
// import React, { useState } from "react";
// import useDebounce from "../../hooks/useDebounce";

// const SearchInput = (propsData) => {
//   const [inputValue, setInputValue] = useState<string>("");
//   const debounceValue = useDebounce<string>(inputValue, 500);
//   return (
//     <Autocomplete
//       freeSolo
//       fullWidth
//       disableClearable
//       sx={{ display: { xs: "none", xl: "block" } }}
//       options={productList}
//       onChange={(_, option) =>
//         data?.map((product) => {
//           if (product.title === option) {
//             window.location.href = `/products/${product.id}`;
//           }
//         })
//       }
//       renderInput={(params) => {
//         return (
//           <TextField
//             {...params}
//             label="Tìm kiếm sản phẩm..."
//             onChange={handleChangeInput}
//             InputProps={{
//               ...params.InputProps,
//               type: "search",
//             }}
//             inputRef={htmlRef}
//           />
//         );
//       }}
//     />
//   );
// };

// export default SearchInput;
