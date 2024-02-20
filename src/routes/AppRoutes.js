import { Route, Routes } from "react-router-dom";
import SignupPage from "../pages/SignUp/SignUp";
import PageLayout from "../layouts/PageLayout/PageLayout";
import Home from "../pages/Home/Home";
import Courses from "../pages/Courses/Courses";
import SingInPage from '../pages/SignIn/SignIn'
import EventCard from "../components/EventCard/EventCard";
import Path from '../pages/Path/Path'
const AppRoutes = () => {
  return (
      <Routes>
        <Route element={<PageLayout />}>
         <Route path="/" element={<Home />}></Route>
         <Route path="/path/:itemId" element={<Path/>}></Route>
         <Route path="/courses" element={<Courses/>}></Route>
         </Route>
         <Route path="/test" element={<EventCard/>}></Route>
         {/* <Route path="/signup" element={<SignupPage />}></Route> */}
         <Route path="/sign-up" element={<SignupPage />}></Route>
         <Route path="/log-in" element={<SingInPage />}></Route>

      </Routes>
  );
};

export default AppRoutes;