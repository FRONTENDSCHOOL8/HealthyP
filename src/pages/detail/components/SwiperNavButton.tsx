import { useSwiper } from "swiper/react"



export default function SwiperNavButton() {

  const swiper = useSwiper();

  return (
    <button type="button" onClick={() => { swiper.slidePrev() }}>이전</button>
  )
}