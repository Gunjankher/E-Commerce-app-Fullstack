import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import "swiper/css"
import "swiper/css/navigation"

function Carousel() {
  return (
    <div className='h-52 w-full flex items-center justify-center ml-[150px] relative left-8'>
      <Swiper
        className='h-64'
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

      <div></div>
    </div>

  )
}

export default Carousel