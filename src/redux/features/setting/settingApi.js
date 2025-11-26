import { baseApi } from "../../baseApi/baseApi";

const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllSettings: builder.query({
      query: () => ({
        url: "/general-info",
        method: "GET",
        providesTags: ["Setting"],
      }),
    }),

    updatePrivacyPolicyAll: builder.mutation({  // ✅ FIXED: Use mutation instead of query
      query: (data) => ({
        url: "/general-info/update/privacy-policy",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Setting"],
    }),


    addFaqMain: builder.mutation({  // ✅ FIXED: Use mutation instead of query
      query: (data) => ({
        url: "/general-info/add-new-faq",
        method: "POST",
        body: data,
      }),
    }),
    deleteFaq: builder.mutation({  // ✅ FIXED: Use mutation instead of query
      query: (data) => ({
        url: `/general-info/delete-faq`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Setting"],
    }),

    updateTramsAndConditionsAll: builder.mutation({  // ✅ FIXED: Use mutation instead of query
      query: (data) => ({
        url: "/general-info/update/terms-and-conditions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Setting"],
    }),
    updateAboutUs: builder.mutation({  // ✅ FIXED: Use mutation instead of query
      query: (data) => ({
        url: "/general-info/update/about-us",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Setting"],
    }),


    getUserProfile: builder.query({
      query: () => ({
        url: "/get-settings-data",
        method: "GET",
        providesTags: ["Profile"],
      }),
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/update-profile",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),


    getAllNotification: builder.query({
      query: () => ({
        url: "/notifications",
        method: "GET",
        providesTags: ["Notification"],
      }),
    }),




  }),
});

export const {
  useGetAllSettingsQuery,
  useUpdatePrivacyPolicyAllMutation, // ✅ FIXED: Mutation hook 
  useUpdateTramsAndConditionsAllMutation,

  useAddFaqMainMutation,
  useDeleteFaqMutation,

  useUpdateAboutUsMutation,
  useGetUserProfileQuery,
  useUpdateProfileMutation,

  useGetAllNotificationQuery
} = settingApi;
