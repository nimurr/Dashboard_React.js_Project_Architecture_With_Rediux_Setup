import { baseApi } from "../../baseApi/baseApi";


const subScriptionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSubScription: builder.query({
            query: () => ({
                url: `/subscription-packages`, // ✅ Fixed API URL
                method: "GET",
            }),
            providesTags: ["Subscription"],
        }),
        createSubScription: builder.mutation({
            query: (formData) => ({
                url: `/subscription/add`, // ✅ Fixed API URL
                method: "POST",
                body: formData,

            }),
            invalidatesTags: ["Subscription"],
        }),
        updateScription: builder.mutation({
            query: (formData) => ({
                url: `/subscription/edit`, // ✅ Fixed API URL
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Subscription"],
        }),

        deleteSubScription: builder.mutation({
            query: (id) => ({
                url: `/subscription/delete/${id}`, // ✅ Fixed API URL
                method: "POST",
            }),
            invalidatesTags: ["Subscription"],
        }),
    }),
});

export const { useGetSubScriptionQuery, useCreateSubScriptionMutation, useUpdateScriptionMutation, useDeleteSubScriptionMutation } = subScriptionApi;
