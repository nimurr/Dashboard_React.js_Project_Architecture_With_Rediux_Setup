import { baseApi } from "../../baseApi/baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStatus: builder.query({
      query: () => ({
        url: "/get-dashboard-data",
        method: "GET",
      }),
      transformResponse: (response) => response,
    }),
    getIncomeRatio: builder.query({
      query: (year) => ({
        url: `/admin/getIncomeRatio?year=${year}`,
        method: "GET",
      }),
      transformResponse: (response) => response,
    }),
  }),
});

export const { useGetDashboardStatusQuery, useGetIncomeRatioQuery } =
  dashboardApi;
