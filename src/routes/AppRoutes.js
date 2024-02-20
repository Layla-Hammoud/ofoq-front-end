import { Route, Routes } from "react-router-dom";
import SignupPage from "../pages/SignUp/SignUp";
import PageLayout from "../layouts/PageLayout/PageLayout";
import Home from "../pages/Home/Home";
import TestimonialSection from "../components/TestimonialSection/TestimonialSection";
import Courses from "../pages/Courses/Courses";
import Path from '../pages/Path/Path'
const AppRoutes = () => {
  return (
      <Routes>
        <Route element={<PageLayout />}>
         <Route path="/" element={<Home />}></Route>
         <Route path="/path/:itemId" element={<Path/>}></Route>
         </Route>
         <Route path="/test" element={<TestimonialSection/>}></Route>
         {/* <Route path="/signup" element={<SignupPage />}></Route> */}
         <Route path="/sign-up" element={<SignupPage />}></Route>

      </Routes>
  );
};

export default AppRoutes;