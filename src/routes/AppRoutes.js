import { Route, Routes } from "react-router-dom";
import SignupPage from "../pages/SignUp/SignUp";
import PageLayout from "../layouts/PageLayout/PageLayout";
import Home from "../pages/Home/Home";
import HomePath from "../components/HomePath/HomePath";
const AppRoutes = () => {
  return (
      <Routes>
        <Route element={<PageLayout />}>
         <Route path="/" element={<Home />}></Route>
         </Route>
         {/* <Route path="/signup" element={<SignupPage />}></Route> */}
         <Route path="/sign-up" element={<SignupPage />}></Route>
         <Route path="/test" element={<HomePath/>}></Route>
      </Routes>
  );
};

export default AppRoutes;