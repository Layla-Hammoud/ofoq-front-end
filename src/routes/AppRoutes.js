import { Route, Routes } from "react-router-dom";
import SignupPage from "../pages/SignUp/SignUp";
import PageLayout from "../layouts/PageLayout/PageLayout";
import Home from "../pages/Home/Home";
import Courses from "../pages/Courses/Courses";
import SingInPage from "../pages/SignIn/SignIn";
import TeacherRequest from "../pages/TeacherRequest/TeacherRequest";
import Chapters from "../pages/Chapters/Chapters";
import AllSessions from "../pages/AllSessions/AllSessions";
import ContactUs from "../pages/ContactUs/ContactUs";
import Footer from "../layouts/Footer/Footer";
import NotFound from "../pages/NotFound/NotFound";
import SingleSession from "../pages/SingleSession/SingleSession";
import Path from "../pages/Path/Path";
import Sessions from "../pages/Dashboard/Sessions/Sessions";
// import GridPromotion from "../pages/Dashboard/pomo/promo";
import HomePath from "../components/HomePath/HomePath";
import Profile from "../pages/profile/Profile";
const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/path/:itemId" element={<Path />}></Route>
        <Route path="/courses" element={<Courses />}></Route>
        <Route path="/contact-us" element={<ContactUs />}></Route>
        <Route path="/chapters/:itemId" element={<Chapters />}></Route>
        <Route path="/session/:eventId" element={<SingleSession />}></Route>
        <Route path="/sessions" element={<AllSessions />}></Route>
        <Route path="/profile/:profileId" element={<Profile />}></Route>
      </Route>
      <Route path="/test" element={<Sessions />}></Route>
      <Route path="/teacher-request" element={<TeacherRequest />}></Route>
      {/* <Route path="/signup" element={<SignupPage />}></Route> */}
      <Route path="/sign-up" element={<SignupPage />}></Route>
      <Route path="/log-in" element={<SingInPage />}></Route>
      <Route path="/*" element={<NotFound />}></Route>
    </Routes>
  );
};

export default AppRoutes;
