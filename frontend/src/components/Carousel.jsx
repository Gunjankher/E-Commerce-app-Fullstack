import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import "swiper/css"
import "swiper/css/navigation"

function Carousel() {
  return (
    <div className='h-[700px]'>
      <Swiper
        className='h-20'
        navigation={true}
        spaceBetween={0}
        pagination={{
          clickable: true
        }}
        autoplay={{
          delay: 3000
        }}
        modules={[Navigation, Autoplay, Pagination]}
      >


        <SwiperSlide><img src="../images/carousel_1.jpg" alt="" /></SwiperSlide>
        <SwiperSlide className="bg-black ">
          <video controls>
            <source src={"../images/carousel_vid.mp4"} type="video/mp4" />
          </video>
        </SwiperSlide>
        <SwiperSlide><img src="../images/carousel_2.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="../images/carousel_3.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="../images/carousel_4.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="../images/carousel_5.jpg" alt="" /></SwiperSlide>
      </Swiper>

      <div className='bg-stone-300 h-[300px] w-full'></div>
    </div>

  )
}

export default Carousel