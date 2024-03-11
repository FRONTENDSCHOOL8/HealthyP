import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useState } from 'react';
import salad from '@/assets/images/salad.jpg';
import foodBanner from '@/assets/images/foodBanner.jpg';
import foodBanner2 from '@/assets/images/foodBanner2.jpg';
import whiteHealth from '@/assets/images/whiteHealth.webp';
import { SearchComponent } from '@/components';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';

const bannerData = [
  {
    id: '1',
    text: '나만의 레시피를 세상에 알린다',
    image: foodBanner,
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
    text: '맛있고 건강한 레시피를 한눈에',
    image: foodBanner2,
    alt: '꽃 사진',
  },
  {
    id: '4',
    text: 'MZ사이에서 유행하는 코스트코 가방',
    image: salad,
    alt: '꽃 사진',
  },
];



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
          delay: 5000,
        }}
        loop={true}
        onActiveIndexChange={(e) => setSwiperIndex(e.realIndex)}
        onSlideChange={() => {}}
        className="bg-gray-600 h-389pxr relative w-full"
      >
        {bannerData.map((item, index) => {
          return (
            <SwiperSlide key={item.id} className="w-full h-full">
              <div className='w-full h-full relative'>
                <img
                  src={item.image}
                  alt={item.alt}
                  className="object-cover w-full h-full"
                />
                <div className='w-full h-full bg-gradient-to-t opacity-50 from-zinc-900 to-none absolute top-0 left-0'></div>
              </div>
              {index === 1 ? (
                // 두 번째 슬라이드에만 적용되는 텍스트
                <h2 className="absolute bottom-60pxr right-20pxr text-white text-title-2-em max-w-200pxr">
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
          <SearchComponent />
        </div>
      </Swiper>
    </>
  );
}
