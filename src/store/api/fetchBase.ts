import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";

const BASE_URL = `https://petstore.swagger.io/v2`;
const customBaseQuery = () => {
  const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });
  return async (args: string | FetchArgs, api: BaseQueryApi) => {
    const response = await baseQuery(args, api, {});
    return response;
  };
};
export default customBaseQuery;
