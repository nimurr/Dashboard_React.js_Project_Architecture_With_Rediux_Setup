import { baseApi } from "../../baseApi/baseApi";

const documentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllDocument: builder.query({
            query: () => "/get-data-of-unapproved-auth-card-image",
            providesTags: ["Document"],
        }),
        approveDocument: builder.mutation({
            query: (data) => ({
                url: `/approve-or-reject-authcard-image`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Document"],
        }),
    }),
});

export const { useGetAllDocumentQuery , useApproveDocumentMutation } = documentApi;














// get-data-of-unapproved-auth-card-image