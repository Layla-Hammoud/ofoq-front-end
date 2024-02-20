import style from './TestimonialSection.module.css'
import {testimonials} from './testimonialDataSection'
import TestimonialCard from '../TestimonialCard/TestimonialCard'
 const TestimonialSection = () => {
  return (
    <>
    <section className={style.TestimonialSection}>
      <h3 className={style.TestimonialTitle}>Testimonials</h3>
      <p className={style.TestimonialSubTitle}> What our client say about use</p>
      <div className={style.cardWrapper}>
      {testimonials.map((testimonial, index) => (
        <TestimonialCard key={index} testimonial={testimonial} />
      ))}
      </div>
      </section>
    </>
  )
}
export default TestimonialSection