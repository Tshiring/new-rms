import { lazy } from "react";
import * as path from "./path";
import { Route, Routes } from "react-router";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoutes";
import PageNotFound from "../views/PageNotFound";

const Signin = lazy(() => import("@/views/auth/Signin"));
const Signup = lazy(() => import("@/views/auth/UserSignup"));
const Home = lazy(() => import("@/views/landing"));
const DashboardLayout = lazy(() =>
  import("@/components/layout/DashboardLayout")
);
const Dashboard = lazy(() => import("@/views/Dashboard"));
const RestaurantSignup = lazy(() => import("@/views/auth/RestaurantSignup"));
const OTP = lazy(() => import("@/views/auth/OTP"));
const BuildProfile = lazy(() => import("@/views/restaurantAdmin/BuildProfile"));
const MenuManagement = lazy(() => import("@/views/menu-management"));
const AddMenu = lazy(() => import("@/views/menu-management/AddMenu"));
const Superadmindash = lazy(() =>
  import("@/views/superadmin/pages/Superadmindash")
);
const Addservices = lazy(() => import("@/views/servicee/Addservices"));

const Router = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route element={<PublicRoute />}>
        <Route path={path.HOME} element={<Home />} />
        <Route path={path.SIGNIN} element={<Signin />} />
        <Route path={path.SIGNUP} element={<Signup />} />
        <Route path={path.RESTAURANT_SIGNUP} element={<RestaurantSignup />} />
        <Route path={path.OTP} element={<OTP />} />
      </Route>
      {/* PRIVATE ROUTES */}
      <Route element={<ProtectedRoute />}>
        <Route path={path.BUILD_PROFILE} element={<BuildProfile />} />
        <Route element={<DashboardLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.MENU_MANAGEMENT} element={<MenuManagement />} />
          <Route path={path.ADD_MENU} element={<AddMenu />} />
          <Route path={path.SUPERADMIN_DASH} element={<Superadmindash />}>
            <Route path={path.ADDSERVICES} element={<Addservices />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
