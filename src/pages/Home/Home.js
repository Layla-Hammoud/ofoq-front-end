import Hero from "../../components/Hero/Hero"
import HomePath from "../../components/HomePath/HomePath"
import TestimonialSection from '../../components/TestimonialSection/TestimonialSection'
import Footer from "../../layouts/Footer/Footer"
import SuccessHome from "../../components/SuccessHome/SuccessHome"
 const Home = ()=> {
  return (
    <>
      <Hero/>
      <HomePath/>
      <SuccessHome/>
      <TestimonialSection/>
      <Footer/>
    </>
  )
}
export default Home