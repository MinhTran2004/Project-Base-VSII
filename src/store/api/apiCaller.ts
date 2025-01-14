import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./fetchBase";
import { IPet, LoginResponse, UserInfo } from "../../types/types";

export const apiCaller = createApi({
  reducerPath: "apiCaller",
  refetchOnMountOrArgChange: 30,
  baseQuery: customBaseQuery(),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getPets: builder.query<IPet[], void>({
      query() {
        return {
          url: `/pet`,
          method: "GET",
        };
      },
      providesTags: [{ type: "Posts" }],
    }),
    getPetById: builder.query<IPet, number>({
      query: (id) => `/pet/${id}`,
      providesTags: [{ type: "Posts" }],
    }),

    loginUser: builder.mutation<
      LoginResponse,
      { username: string; password: string }
    >({
      query: ({ username, password }) => ({
        url: `/user/login`,
        method: "GET",
        params: { username, password },
      }),
    }),
    getUserInfo: builder.query<UserInfo, string>({
      query: (username) => {
        return {
          url: `/user/${username}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetPetsQuery,
  useGetPetByIdQuery,
  useLoginUserMutation,
  useGetUserInfoQuery,
} = apiCaller;
