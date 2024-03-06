import { Link } from "react-router-dom"
import { useAtom } from "jotai";
import { Header, Button } from "@/components"
import bulbPrimary from '@/assets/icons/bulbYellow.svg';
import addPrimary from '@/assets/icons/addPrimary.svg';
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import useUploadRecipe from "@/hooks/useUploadRecipe";
import { recipeSteps } from "@/stores/stores";

function TipContainer() {
  return (
    <div className="w-full px-14pxr py-20pxr">
      <div className="flex flex-col rounded-lg gap-8pxr px-14pxr pt-14pxr pb-20pxr bg-gray-100 border-2 border-gray-200">
        <div className="flex items-center">
          <img src={bulbPrimary} alt=""/>
          <h2 className="text-foot-em">Tip</h2>
        </div>
        <p className="text-cap-1">레시피를 상세하게 적어주세요. 단계별로 명확한 내용을 적어주면 보다 친절한 레시피를 제공할 수 있습니다.</p>
      </div>
    </div>
  )
}

function AddButton() {
  return (
    <>
      <Link to='../three' className="w-full py-16pxr flex justify-center gap-4pxr items-center sticky top-0 bg-white rounded-full text-body shadow-md mb-20pxr">
        <img src={addPrimary} alt="" />추가하기
      </Link>
    </>
  )
}

// Animation Properties
const DELETE_BTN_WIDTH = 70
const MESSAGE_DELETE_ANIMATION = { height: 0, opacity: 0 }
const MESSAGE_DELETE_TRANSITION = {
  opacity: {
    transition: {
      duration: 0
    }
  }
}

interface stepType {
  id: string;
  image: string;
  description: string;
  tips: string;
}

function StepContainer() {
  const [steps, setSteps] = useAtom(recipeSteps);


  console.log(steps);
  function handleDragEnd (info : PanInfo, stepId : string) {
    const dragDistance = info.point.x
    
    if(dragDistance < -DELETE_BTN_WIDTH) {
      const stepData = JSON.parse(steps).filter((item : stepType) => item.id !== stepId);
      setSteps(JSON.stringify(stepData));
    }
  }



  return (
    <div className="w-full grow bg-gray_150 relative p-14pxr flex flex-col gap-8pxr">
      <AddButton />
      <ul className="flex flex-col gap-10pxr">
        <AnimatePresence>
          {JSON.parse(steps).map((item : stepType, index : number) => {
            return (
            <motion.li
              key={item.id}
              exit={MESSAGE_DELETE_ANIMATION}
              transition={MESSAGE_DELETE_TRANSITION}
              className="relative "
            >
              <motion.div
                drag="x"
                dragConstraints={{left: 0, right: 0}}
                onDragEnd={(_, info) => handleDragEnd(info, item.id)}
                key={item.id}
                className="flex items-center h-full gap-10pxr px-10pxr py-8pxr z-10 relative bg-white rounded-xl"
              >
                <div className="w-64pxr h-64pxr rounded-lg">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full rounded-lg object-cover"
                  />
                </div>
                <div className="w-full h-full">
                  <h2 className="text-foot-em flex justify-between">
                    Step {index + 1}. {item.tips !== "" ? <span className="text-gray-400">tips</span> : <></>}
                  </h2>
                  <p className="text-cap-1-em line-clamp-2">{item.description}</p>
                </div>
                {/* <button className="border-l-2 w-50pxr h-full px-10pxr">
                  <img src={move} alt="정렬" className="w-full" />
                </button> */}
              </motion.div>
              <div className="
                absolute bg-red rounded-xl right-2pxr top-1/2 transform -translate-y-1/2 h-[calc(100%-2px)] w-70pxr flex justify-center items-center">삭제</div>
            </motion.li>
          )})}
        </AnimatePresence>
      </ul>
    </div>
  )
}


export function CreateTwo() {
  const {uploadRecipe} = useUploadRecipe();

  return (
    <div className="h-full w-full flex flex-col">
      <div className="">
        <Header option="titleWithClose" title="레시피 등록하기" />
        <TipContainer />
      </div>
      <StepContainer />
      <footer className="w-full px-14pxr pt-14pxr pb-46pxr bg-white flex flex-col gap-10pxr">
        <Button
          buttonCase="medium"
          text={['이전', '완료']}
          route={[() => '/create', () => '../complete']} />
        <Link
          to="../complete"
          className=" text-center w-full py-10pxr bg-primary text-white rounded-lg"
          onClick={() => {
            uploadRecipe()
          }}>완료</Link>
      </footer>
    </div>
  )
}