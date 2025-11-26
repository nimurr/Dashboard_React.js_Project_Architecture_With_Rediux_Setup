import { baseApi } from "../../baseApi/baseApi";

const comboboxApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllComboBox: builder.query({
      query: (type) => {
        const params = new URLSearchParams();
        if (type) {
          params.append("categoryType", type);
        }
        return {
          url: `/admin/budboxs`,
          method: "GET",
          params,
        };
      },
      providesTags: ["ComboBox"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    addComboBox: builder.mutation({
      query: (data) => ({
        url: "/admin/budbox",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ComboBox"],
      transformResponse: (response) => response.data,
    }),
    getComboBoxById: builder.query({
      query: (id) => ({
        url: `/admin/budbox/${id}`,
        method: "GET",
      }),
      providesTags: ["ComboBox"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    updateComboBox: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/budbox/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ComboBox"],
      transformResponse: (response) => response.data,
    }),
    deleteCombobox: builder.mutation({
      query: (id) => ({
        url: `admin/budbox/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ComboBox"],
    }),
  }),
});

export const {
  useGetAllComboBoxQuery,
  useAddComboBoxMutation,
  useDeleteComboboxMutation,
  useGetComboBoxByIdQuery,
  useUpdateComboBoxMutation,
} = comboboxApi;
