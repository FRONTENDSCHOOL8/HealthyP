import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { db } from "@/api/pocketbase";
import { RecordModel } from "pocketbase";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation, Pagination} from 'swiper/modules';
import SwiperNavButton from "./components/SwiperNavButton";
import { AnimatePresence, motion } from 'framer-motion';
import { Footer, FnButton } from "@/components";
import getPbImage from "@/util/data/getPBImage";
interface StepsInterface {
  id: string;
  description: string;
  image: string;
  tips: string;
}

export function StepsPage() {
  const {recipeId} = useParams();
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [stepsData, setStepsData] = useState<RecordModel>();
  const [loading, setLoading] = useState(true);
  const [stepImages, setStepImages] = useState<Array<string>>([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    async function getRecipeSteps() {
      if (recipeId === undefined) return;
      try {
        const record = await db.collection('recipes').getOne(recipeId);
        if(record === null) alert("등록된 요리 단계가 없습니다");
        const parsedSteps = JSON.parse(record.steps);
        const stepImageData = await db.collection('step_images').getFirstListItem(`recipe="${recipeId}"`);
        const images = [...stepImageData.images]
        const imageURL = images.map(item => {
          return (getPbImage('step_images', stepImageData.id, item));
        })
        setStepImages(imageURL);
        setStepsData(parsedSteps);
      } catch (error) {
        console.error("Error fetching recipe steps:", error);
      } finally {
        setLoading(false);
      }
    }
  
    getRecipeSteps();
  }, [recipeId]);
  
  if (loading) {
    return <p>Loading...</p>;
  }
  
  return (
    <AnimatePresence>
      <motion.main 
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: .4 }}
        className="flex flex-col gap-22pxr h-full w-full relative pb-16pxr pt-20pxr rounded-t-2xl"
      >
        <header className="flex justify-between px-16pxr">
          <h1 className="text-title-1-em pb-18pxr">{`Step ${swiperIndex + 1} / ${stepsData?.length}`}</h1>
          <FnButton image='close' clickHandler={() => {navigate(-1)}} altText="닫기"/>
        </header>
        <Swiper
          modules={[Navigation, Pagination, Keyboard]}
          pagination={
            { clickable: true }
          }
          spaceBetween={0}
          slidesPerView={1}
          onActiveIndexChange={(e) => setSwiperIndex(e.realIndex)}
          onSlideChange={() => {}}
          className="w-full h-full mb-80pxr"
          style={{
            // @ts-expect-error 스타일 적용시 에러 메세지가 뜨지만 스타일 잘 작용됨, Swiper API와 타입스크립트 호환성 문제 예상
            "--swiper-pagination-color" : "#91BD14",
            "--swiper-pagination-bullet-inactive-color" : "#F0F0F1",
            "--swiper-pagination-bullet-inactive-opacity" : 1,
            "--swiper-pagination-bullet-height" : "5px",
          }}
          >
          {stepsData?.map((item : StepsInterface, index : number) => {
            return (
              <SwiperSlide 
                key={item.id} 
                className="w-full overflow-y-auto gap-18pxr flex flex-col px-16pxr justify-center items-center"
                >
                <div className="flex flex-col gap-22pxr h-full items-center">
                  <img
                    src={stepImages[index]}
                    alt={item.description}
                    className="object-cover w-full h-216pxr rounded-xl"
                  />
                  <p className="w-full text-gray_700 text-sub">{item.description}</p>
                  {item.tips ? 
                    <div className="w-full text-tip_color text-foot">
                      <p>Tips</p>
                      <p>{item.tips}</p> 
                    </div> 
                    : null}
                </div>
              </SwiperSlide>
            );
          })}
          <Footer>
            <SwiperNavButton />
          </Footer>
        </Swiper>
      </motion.main>
    </AnimatePresence>
  )
}
