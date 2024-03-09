import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { db } from "@/api/pocketbase";
import { RecordModel } from "pocketbase";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation, Pagination} from 'swiper/modules';


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

  useEffect(() => {
    async function getRecipeSteps() {
      if (recipeId === undefined) return;
  
      try {
        const record = await db.collection('recipes').getOne(recipeId);
        if(record === null) alert("등록된 요리 단계가 없습니다");
        const parsedSteps = JSON.parse(record.steps);
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
    <div className="flex flex-col gap-22pxr h-full w-full relative px-16pxr py-10 rounded-t-2xl ">
      <h1 className="text-title-1-em pb-18pxr">{`Step ${swiperIndex + 1} / ${stepsData?.length}`}</h1>
      <Swiper
        modules={[Navigation, Pagination, Keyboard]}
        pagination={{clickable: true}}
        spaceBetween={0}
        slidesPerView={1}
        onActiveIndexChange={(e) => setSwiperIndex(e.realIndex)}
        onSlideChange={() => {}}
        className="w-full h-full"
        style={{
          // @ts-expect-error 스타일 적용시 에러 메세지가 뜨지만 스타일 잘 작용됨, Swiper API와 타입스크립트 호환성 문제 예상
          "--swiper-pagination-color" : "#C6C6C7",
          "--swiper-pagination-bullet-inactive-color" : "#F0F0F1",
          "--swiper-pagination-bullet-inactive-opacity" : 1,
          "--swiper-pagination-bullet-height" : "5px",
          "--swiper-pagination-padding" : "0px"
        }}
        >
        {stepsData?.map((item : StepsInterface) => {
          return (
            <SwiperSlide key={item.id} className="w-full h-full overflow-scroll gap-22pxr flex flex-col justify-center items-center">
              <div className="flex flex-col gap-22pxr h-full items-center">
                <img
                  src={item.image}
                  alt={item.description}
                  className="object-cover w-full h-216pxr rounded-xl"
                />
                <p className="w-full">국회의원의 수는 법률로 정하되, 200인 이상으로 한다. 제2항의 재판관중 3인은 국회에서 선출하는 자를, 3인은 대법원장이 지명하는 자를 임명한다. </p>
                {/* <p className="w-full">{item.description}</p> */}
                <div className="w-full text-[#E86100]">
                  <p>Tips</p>
                  <p>새로운 회계연도가 개시될 때까지 예산안이 의결되지 못한 때에는 정부는 국회에서 예산안이 의결될 때까지 다음의 목적을 위한 경비는 전년도 예산에 준하여 집행할 수 있다.</p>
                  {/* <p>{item.tips === "" ? 'tips' : item.tips}</p> */} 
                </div>
              </div>
              
            </SwiperSlide>
          );
        })}
      </Swiper>

    </div>
  )
}
