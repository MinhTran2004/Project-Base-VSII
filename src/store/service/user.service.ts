import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../types/types";

type UserResponse = IUser

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://petstore.swagger.io/v2",
        prepareHeaders: ((headers) => {
            headers.set("Content-Type", "application/json")
            return headers;
        })
    }),
    tagTypes: ["User"],
    endpoints: (build) => ({
        getUser: build.query<UserResponse, string>({
            query: (username) => `/user/${username}`,
            providesTags: (_result, _error, id) => [{ type: 'User', id }],
        }),

        addUser: build.mutation<UserResponse, Omit<IUser, "id">>({
            query: (body) => {
                const id = Math.floor(Math.random() * 10000) + 1;
                return {
                    url: "/user",
                    method: "POST",
                    body: { ...body, id },
                };
            },
            // transformErrorResponse: (response : FetchBaseQueryError) => {response.status},
            invalidatesTags: (result, _error) => [{type: "User", id: result?.id}, {type:"User", id: "LIST"}]
        }),
        updateUser: build.mutation<UserResponse, Partial<IUser>>({
            query: (body) => ({
                url: `/user/${body.username}`,
                method: "POST",
                body: {...body}
            }),
            // transformErrorResponse: (response) => {response.data},
            invalidatesTags: (_result, _error, {id}) => [{type: "User", id}]
        })
    })
})

export const {useGetUserQuery, useAddUserMutation, useUpdateUserMutation } = userApi