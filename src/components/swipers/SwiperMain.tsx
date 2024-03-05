import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useState } from 'react';
import flower from '@/assets/images/flower3.jpg';
import whiteHealth from '@/assets/images/whiteHealth.webp';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';

const bannerData = [
  {
    id: '1',
    text: 'MZ사이에서 유행하는 코스트코 가방',
    image: flower,
    alt: '꽃 사진',
  },
  {
    id: '2',
    text: 'MZ사이에서 유행하는 코스트코 가방',
    image: whiteHealth,
    alt: '꽃 사진',
  },
  {
    id: '3',
    text: 'MZ사이에서 유행하는 코스트코 가방',
    image: flower,
    alt: '꽃 사진',
  },
  {
    id: '4',
    text: 'MZ사이에서 유행하는 코스트코 가방',
    image: flower,
    alt: '꽃 사진',
  },
];

import InputComponent from '../../pages/create/components/InputComponent';

export default function SwiperMain() {
  // const[swiper, setSwiper] = useState<SwiperClass>();
  const [, setSwiperIndex] = useState(0);

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Keyboard, Autoplay]}
        pagination={{ clickable: true }}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
        }}
        loop={true}
        onActiveIndexChange={(e) => setSwiperIndex(e.realIndex)}
        onSlideChange={() => {}}
        className="bg-gray-600 h-389pxr relative w-full"
      >
        {bannerData.map((item, index) => {
          return (
            <SwiperSlide key={item.id} className="w-full h-full">
              <img
                src={item.image}
                alt={item.alt}
                className="object-cover w-full h-full"
              />
              {index === 1 ? (
                // 두 번째 슬라이드에만 적용되는 텍스트
                <h2 className="absolute bottom-60pxr right-20pxr text-black text-title-2-em max-w-200pxr">
                  <span className="whitespace-nowrap">
                    <span className="text-primary">건강</span>
                    하고 <span className="text-primary">
                      맛있는
                    </span> 레시피 <br />{' '}
                    <span>
                      오직 <span className="text-primary">HealthyP</span> 에서만
                    </span>
                  </span>
                </h2>
              ) : (
                // 나머지 슬라이드에 적용되는 일반 텍스트
                <h2 className="absolute bottom-40pxr left-20pxr text-white text-title-2-em max-w-200pxr">
                  {item.text}
                </h2>
              )}
            </SwiperSlide>
          );
        })}
        <div className="absolute w-full flex px-10pxr top-10pxr z-10">
          <InputComponent option="search" />
        </div>
      </Swiper>
    </>
  );
}
