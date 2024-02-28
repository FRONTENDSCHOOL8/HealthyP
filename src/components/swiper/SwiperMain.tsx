import {Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';
import { Pagination } from "swiper/modules";
import { useState } from "react";
import flower from "@/assets/images/flower3.jpg";


const bannerData = [
  {
    "id":"1",
    "text":"MZ사이에서 유행하는 코스트코 가방",
    "image": flower,
    "alt": "꽃 사진"
  },
  {
    "id":"2",
    "text":"MZ사이에서 유행하는 코스트코 가방",
    "image": flower,
    "alt": "꽃 사진"
  },
  {
    "id":"3",
    "text":"MZ사이에서 유행하는 코스트코 가방",
    "image": flower,
    "alt": "꽃 사진"
  },
  {
    "id":"4",
    "text":"MZ사이에서 유행하는 코스트코 가방",
    "image": flower,
    "alt": "꽃 사진"
  }
]


import InputComponent from "../input/InputComponent";

export default function SwiperMain() {
  // const[swiper, setSwiper] = useState<SwiperClass>();
  const[swiperIndex, setSwiperIndex] = useState(0);

  return (
    <>
      <Swiper
          modules={[Pagination]}
          pagination={{clickable:true}}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 2000
          }}
          loop={true}
          onActiveIndexChange={(e) => setSwiperIndex(e.realIndex)}
          onSlideChange={() => {
          }}
          onSwiper={(swiper) => console.log(swiper)}
          className="bg-gray-600 h-389pxr relative w-full"
        >
        
        {bannerData.map(item => {
          return (
            <SwiperSlide key={item.id} className="w-full h-full">
              <img src={item.image} alt={item.alt} className="object-cover h-full"/>
              <h2 className="absolute bottom-40pxr left-20pxr text-white text-title-2-em max-w-200pxr">{item.text}</h2>
            </SwiperSlide>
          )
        })}
        <div className="absolute w-full flex px-10pxr top-10pxr z-10">
          <InputComponent option="search"/>
        </div>
        
      </Swiper>
    </>

  
  )
}