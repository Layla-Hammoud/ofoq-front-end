import style from './Courses.module.css'
import Card from '../../components/Card/Card'
 const Courses = () => {
  return (
    <>
    <div className={style.pageWrapper}>
      <h1 className={style.title}>name</h1>
      <div className={style.CardWrapper}>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      </div>
      </div>
    </>
  )
}
export default Courses