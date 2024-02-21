import style from './Courses.module.css'
import Card from '../../components/Card/Card'
import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import useApi from '../../hooks/useApi'
import Loader from '../../components/Loader/Loader'
 const Courses = () => {
  const {user, fetchUserData} = useContext(AuthContext)
  const [courses, setCourses] = useState(null);
  const { apiCall, loading, error } = useApi();
  useEffect(() => {
      const fetchCourses = async () => {
        const response = await apiCall({ url: "course/get-courses-by-domain", method: "post" , data:{domainId:user.domainId._id} });
        setCourses(response.data);
      };
      if(user){
        fetchCourses();
      }
    }, [user]);
  return (
    <>
    <div className={style.pageWrapper}>
      <h1 className={style.title}>Courses for {user && user.domainId.name}</h1>
      {loading && <Loader heigth={"50vw"}/>}
      <div className={style.CardWrapper}>
      {courses && courses.map((course, index)=>(<Card type={'course'} key={index} image={course.image} name={course.name} description={course.description} itemId={course._id}/>))}
      </div>
      </div>
    </>
  )
}
export default Courses