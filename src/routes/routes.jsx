/* eslint-disable no-unused-vars */
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import DashboardHome from "../page/DashboardHome/DashboardHome";
import ForgetPassword from "../page/Auth/ForgetPassword/ForgetPassword";
import SignIn from "../page/Auth/SignIn/SignIn";
import Otp from "../page/Auth/Otp/Otp";
import NewPassword from "../page/Auth/NewPassword/NewPassword";
import PersonalInformationPage from "../page/PersonalInformation/PersonalInformationPage";
import SettingsPage from "../page/Settings/SettingsPage";
import PrivacyPolicyPage from "../page/PrivacyPolicy/PrivacyPolicyPage";
import TermsconditionPage from "../page/TermsCondition/TermsconditionPage";
import AboutUsPage from "../page/AboutUs/AboutUsPage";
import UsersPage from "../page/Users/UsersPage";
// import AddItemPage from "../page/AddItem/AddItemPage";
import Notification from "../component/Main/Notification/Notification";
import EditPersonalInformationPage from "../page/EditPersonalInformationPage/EditPersonalInformationPage";
// import AdminRoutes from "./AdminRoutes";
import EditPrivacyPolicy from "../page/EditPrivacyPolicy/EditPrivacyPolicy";
import EditTermsConditions from "../page/EditTermsConditions/EditTermsConditions";
import EditAboutUs from "../page/EditAboutUs/EditAboutUs";
import CategoriesPage from "../page/Categories/CategoriesPage";
import EditCategoriesBoxPage from "../page/EditCategoriesBox/EditCategoriesBoxPage";
import EventViewItemPage from "../page/EventViewItem/EventViewItemPage";
import EventItemsPage from "../page/Event/EventPage";
import WelcomePage from "../page/WelcomePage/welcomePage";
import SuggestionPage from "../page/Suggestion/suggestion";
import DonationPage from "../page/DonationPage/DonationPage";
import EditWelcomePage from "../page/EditWelcomePage/EditWelcomePage";
import AddCategoryPage from "../page/AddCategoryPage/AddCategoryPage";
import UsersRequest from "../page/Users/UserRequest";
import UserDetails from "../page/Users/UserDetails";
import UserRequestDetails from "../page/Users/UserRequestDetails";
import UserRequestList from "../page/Users/UserRequestList";
import UserRequestListDetails from "../page/Users/UserRequestListDetails";
import EventItemsPageTonamentDetials from "../page/Event/EventItemsPageTonamentDetials";
import EventItems from "../component/Main/Event/EventItems";
import EventItemsPageTonamentEdit from "../page/Event/EventItemsPageTonamentEdit";
import Earnings from "../page/Earnings/Earnings";
import Collaborator from "../page/Collaborator/Collaborator";
import CollaboratorDetails from "../page/Collaborator/CollaboratorDetails";
import Subscription from "../page/Subscription/Subscription";
import Personalinfo from "../page/ProfileInfo/Personalinfo";
import PersonalinfoEdit from "../page/ProfileInfo/PersonalinfoEdit";
import AllFaq from "../page/Faq/AllFaq";
import AllDocument from "../component/Main/AllDocument/AllDocument";
import Lawyera from "../page/Lawyer/Lawyera";
import PrivetRoute from "../PrivetRoute/PrivetRoute";



const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <AdminRoutes>
      // </AdminRoutes>
      // <PrivetRout1e>  
        <MainLayout />
      // </PrivetRout1e>
    ),
    errorElement: <h1>Error</h1>,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "users/:id",
        element: <UserDetails />,
      },

      {
        path: "lawyer",
        element: <Lawyera />,
      },


      {
        path: "assets",
        element: <CategoriesPage />,
      },

      {
        path: "collaborator",
        element: <Collaborator />,
      },
      {
        path: "collaborator/:id",
        element: <CollaboratorDetails />,
      },

      {
        path: "subscription",
        element: <Subscription />,
      },

      {
        path: "earnings",
        element: <Earnings />,
      },

      {
        path: "/notification",
        element: <Notification />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "settings/all-faq",
        element: <AllFaq />,
      },
      {
        path: "settings/personal-info",
        element: <Personalinfo />,
      },
      {
        path: "settings/personal-info/edit",
        element: <PersonalinfoEdit />,
      },
      {
        path: "settings/privacy-policy",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "/settings/edit-privacy-policy",
        element: <EditPrivacyPolicy />,
      },
      {
        path: "settings/terms-conditions",
        element: <TermsconditionPage />,
      },
      {
        path: "/settings/edit-terms-conditions/:id",
        element: <EditTermsConditions />,
      },
      {
        path: "settings/about-us",
        element: <AboutUsPage />,
      },
      {
        path: "/settings/edit-about-us/:id",
        element: <EditAboutUs />
      },






      {
        path: "/all-document",
        element: <AllDocument />,
      },



      // {
      //   path: "subscription/edit-box/:id",
      //   element: <EditCategoriesBoxPage />,
      // },
      // {
      //   path: "allevent",
      //   element: <EventItems />,
      // },
      // {
      //   path: "allevent/recent-tournament/:id",
      //   element: <EventItemsPageTonamentDetials />,
      // },
      // {
      //   path: "allevent/edit/:id",
      //   element: <EventItemsPageTonamentEdit />,
      // },


      // {
      //   path: "earnings",
      //   element: <Earnings />,
      // },
      // {
      //   path: "allevent/view-item/:id",
      //   element: <EventViewItemPage />,
      // },
      // {
      //   path: "Donation",
      //   element: <DonationPage />,
      // },
      // {
      //   path: "suggestion",
      //   element: <SuggestionPage />,
      // },
      // {
      //   path: "settings/personal-info",
      //   element: <PersonalInformationPage />,
      // },
      // {
      //   path: "settings/edit-personal-info",
      //   element: <EditPersonalInformationPage />,
      // },

      // {
      //   path: "settings/welcome-page",
      //   element: <WelcomePage />,
      // },
      // {
      //   path: "settings/welcome-page/edit",
      //   element: <EditWelcomePage />,
      // },
    ],
  },
  {
    path: "/auth",
    errorElement: <h1>Auth Error</h1>,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
      {
        path: "login",  // Remove the leading slash here
        element: <SignIn />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "otp/:email",
        element: <Otp />,
      },
      {
        path: "new-password/:email",
        element: <NewPassword />,
      },
    ],
  }

]);

export default router;
