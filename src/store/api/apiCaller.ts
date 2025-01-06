import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./fetchBase";
import { IPet } from "../../types/types";

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
  }),
});

export const { useGetPetsQuery, useGetPetByIdQuery } = apiCaller;
