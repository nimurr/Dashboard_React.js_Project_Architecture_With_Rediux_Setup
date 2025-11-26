import { baseApi } from "../../baseApi/baseApi";

const lawyerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllLawyer: builder.query({
            query: () => ({
                url: "/lawyer/get-lawyer-data",
                method: "GET",
                providesTags: ["Lawyer"],
            }),
        }),
        createLawyer: builder.mutation({
            query: (data) => ({
                url: "/lawyer/add-lawyer",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Lawyer"],
        }),
        deleteLawyer: builder.mutation({
            query: (data) => ({
                url: `/lawyer/delete-lawyer`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Lawyer"],
        }),
    })
})

export const { useGetAllLawyerQuery, useCreateLawyerMutation, useDeleteLawyerMutation } = lawyerApi