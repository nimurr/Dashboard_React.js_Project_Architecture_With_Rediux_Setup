import { baseApi } from "../../baseApi/baseApi";

const settingAllApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSettings: builder.query({
            query: () => ({
                url: "/general-info",
                method: "GET",
                providesTags: ["Setting"],
            }),
        }),
    }),
});

export const { useGetAllSettingsQuery } = settingAllApi;