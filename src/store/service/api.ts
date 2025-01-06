import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchBaseQueryError,
  BaseQueryApi,
} from "@reduxjs/toolkit/query";
import setCookieWithExpiration from "../../utils/setCookieWithExpiration";
import { deleteCookie } from "../../utils/deleteCookie";
import { expireSession } from "../slice/sessionSlice";
import { createApi } from "@reduxjs/toolkit/query/react";
import { handleError } from "../../utils/handleError";
interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  message: string;
}

interface ApiResponse {
  sessionId: string;
  expirationTime: number;
}

const baseQuery = fetchBaseQuery({
  baseUrl: "https://petstore.swagger.io/v2",
});

const baseQueryWithReauth: BaseQueryFn<
  unknown,
  unknown,
  FetchBaseQueryError
> = async (args: any, api: BaseQueryApi, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    handleError(result.error, api);
  }

  return result;
};

// export const api = createApi({
//   reducerPath: "api",
//   baseQuery: baseQueryWithReauth,
//   endpoints: (builder: EndpointBuilder<any, any, any>) => ({
//     login: builder.mutation<ApiResponse, LoginCredentials>({
//       query: (credentials: LoginCredentials) => ({
//         url: "/user/login",
//         method: "GET",
//         params: {
//           username: credentials.username,
//           password: credentials.password,
//         },
//       }),
//       transformResponse: (response: LoginResponse) => {
//         const sessionId = response.message.split(":")[1];

//         const loginTime = new Date();
//         const expiresAfter = new Date(loginTime.getTime() + 10 * 60 * 1000);
//         const expirationTime = expiresAfter.getTime();

//         setCookieWithExpiration("sessionId", sessionId, expiresAfter);
//         setCookieWithExpiration("expiresAfter", expirationTime, expiresAfter);

//         return { sessionId, expirationTime };
//       },
//     }),
//     logout: builder.mutation<void, void>({
//       query: () => ({
//         url: "/user/logout",
//         method: "GET",
//       }),
//     }),
//   }),
// });

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse, LoginCredentials>({
      query: (credentials: LoginCredentials) => ({
        url: "/user/login",
        method: "GET",
        params: {
          username: credentials.username,
          password: credentials.password,
        },
      }),
      transformResponse: (response: LoginResponse) => {
        const sessionId = response.message.split(":")[1];
        const loginTime = new Date();
        const expiresAfter = new Date(loginTime.getTime() + 30 * 1000);
        const expirationTime = expiresAfter.getTime();

        setCookieWithExpiration("sessionId", sessionId, expiresAfter);
        setCookieWithExpiration("expiresAfter", expirationTime, expiresAfter);

        return { sessionId, expirationTime };
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/user/logout",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = api;
