import { createApi, FetchArgs } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./fetchBase";
import { IPet, IUser, LoginResponse, UserInfo } from "../../types/types";

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
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        if (!token) throw new Error("Token không tồn tại");

        return {
          url: `/user/${username}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
