import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://api.budbox.fun/api/v1",
    baseUrl: "https://apurbo6000.sobhoy.com/api/v1/admin/v2",
    // baseUrl: "http://10.0.60.207:6000/api/v1/admin/v2",
    prepareHeaders: (headers, { getState }) => {
      // Retrieve the token from your store or local storage
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Categories", "ComboBox", "Products", "BuildBox", 'User-2', "Subscription", "Setting", 'Privacy-Policy', "Profile", "Document", "Lawyer"],
  endpoints: () => ({}),
});
