import { useSwiper } from "swiper/react"



export default function SwiperNavButton() {

  const swiper = useSwiper();

  return (
    <div className="flex gap-8pxr">
      <button 
        type="button" 
        aria-label="이전" 
        onClick={() => { swiper.slidePrev()}}
        className="w-1/3 bg-gray_150 py-12pxr text-gray_700 rounded-[7px]"
        >이전</button>
      <button 
        type="button" 
        aria-label="다음" 
        onClick={() => { swiper.slideNext() }}
        className="w-2/3 bg-primary py-12pxr text-white rounded-[7px] cursor"
        >다음</button>
    </div>
    
  )
}