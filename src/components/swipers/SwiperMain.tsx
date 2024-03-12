import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useState } from 'react';
import foodBanner from '@/assets/images/foodBanner.jpg';
import foodBanner2 from '@/assets/images/foodBanner2.jpg';
import foodBanner3 from '@/assets/images/foodBanner3.jpg'
import foodBanner4 from '@/assets/images/foodBanner4.jpg';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';

const bannerData = [
  {
    id: '1',
    text: '나만의 레시피를 세상에 알린다',
    image: foodBanner,
    alt: '건강하고 맛있는 요리고기 레시피',
  },
  {
    id: '2',
    text: '다양한 재료로 만든 건강한 맛, 에너지 가득한 레시피!',
    image: foodBanner2,
    alt: '다양한 재료를 사용한 볶음밥',
  },
  {
    id: '3',
    text: '맛있고 건강한 레시피를 한눈에',
    image: foodBanner3,
    alt: '건강한 닭 요리',
  },
  {
    id: '4',
    text: '건강 다이어트의 시작, 식사도 즐겁게!',
    image: foodBanner4,
    alt: '에그 셀러드',
  },
];

export default function SwiperMain() {
  const [, setSwiperIndex] = useState(0);

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Keyboard, Autoplay]}
        pagination={{ clickable: true }}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
        }}
        loop={true}
        onActiveIndexChange={(e) => setSwiperIndex(e.realIndex)}
        onSlideChange={() => {}}
        className="bg-gray-600 h-389pxr relative w-full"
      >
        {bannerData.map((item) => {
          return (
            <SwiperSlide key={item.id} className="w-full h-full">
              <div className="w-full h-full relative">
                <img src={item.image} alt={item.alt} className="object-cover w-full h-full" />
                <div className="w-full h-full bg-gradient-to-t opacity-50 from-zinc-900 to-none absolute top-0 left-0"></div>
              </div>
              <h2 className="absolute bottom-40pxr left-20pxr text-white text-title-2-em max-w-200pxr">{item.text}</h2>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
