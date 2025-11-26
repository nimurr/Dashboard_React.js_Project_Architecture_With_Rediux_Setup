import { baseApi } from "../../baseApi/baseApi";

const earningsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEarnings: builder.query({
      query: ({ from = 0, to = 10 }) => ({
        url: `/payment?from=${from}&to=${to}`, // ✅ Fixed API URL
        method: "GET",
      }),
      transformResponse: (response) => response?.data, // ✅ Returns only needed data
    }),
  }),
});

export const { useGetEarningsQuery } = earningsApi;
