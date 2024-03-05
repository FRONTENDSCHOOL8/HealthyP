import { Link } from "react-router-dom"
import { useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { Header, Button } from "@/components"
import bulbPrimary from '@/assets/icons/bulbYellow.svg';
import addPrimary from '@/assets/icons/addPrimary.svg';
import move from '@/assets/icons/move.svg';
import { db } from "@/api/pocketbase";
import {title, ingredients, recipeSteps, image, description} from '.';
import { motion, AnimatePresence } from "framer-motion";


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

const DELETE_BTN_WIDTH = 70

const MESSAGE_DELETE_ANIMATION = { height: 0, opacity: 0 }
const MESSAGE_DELETE_TRANSITION = {
  opacity: {
    transition: {
      duration: 0
    }
  }
}

function StepContainer() {
  const [steps, setSteps] = useAtom(recipeSteps);

  function handleDragEnd (info, stepId) {
    const dragDistance = info.point.x
    if(dragDistance < -DELETE_BTN_WIDTH) {
      const stepData = JSON.parse(steps).filter(item => item.id !== stepId);
      setSteps(JSON.stringify(stepData));
    }
  }



  return (
    <div className="w-full grow bg-gray_150 relative p-14pxr flex flex-col gap-8pxr">
      <AddButton />
      <ul className="flex flex-col gap-10pxr">
        <AnimatePresence>
          {JSON.parse(steps).map((item, index) => (
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
                className="flex items-center gap-10pxr p-6pxr z-10 relative bg-white rounded-xl"
              >
                <img
                  src={item.image}
                  alt=""
                  className="w-64pxr h-64pxr rounded-lg"
                />
                <div className="w-4/5">
                  <h2 className="text-foot-em flex justify-between">
                    Step {index + 1}. {item.tips !== "" ? <span>tips</span> : <></>}
                  </h2>
                  <p className="text-cap-1-em">{item.description}</p>
                </div>
                <button className="border-l-2 w-50pxr h-full px-10pxr">
                  <img src={move} alt="정렬" className="w-full" />
                </button>
              </motion.div>
              <div className="
                absolute bg-red rounded-xl   right-2pxr top-1/2 transform -translate-y-1/2 h-[calc(100%-2px)] w-70pxr flex justify-center items-center">삭제</div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  )
}



interface RecipeData {
  title: string;
  ingredients: string;
  steps: string;
  views: number;
  category: string;
  keywords: string;
  desc: string;
  image: File | null;
  rating: string[];
}

interface UseUploadRecipeResult {
  uploadRecipe: () => void; // Adjust the return type according to your data structure
  isLoading: boolean;
  error: string | null;
}



function useUploadRecipe(): UseUploadRecipeResult {
  const [titleField,] = useAtom(title);
  // const [seasoningData,] = useAtom(seasoning);
  const ingredientData = useAtomValue(ingredients);
  const imageFile = useAtomValue(image);
  const descriptionText = useAtomValue(description);
  const steps = useAtomValue(recipeSteps);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  

  async function uploadRecipe() {
    try {
      setIsLoading(true);

      console.log(JSON.stringify(ingredientData));
      console.log(JSON.parse(steps));


      const data: RecipeData = {
        title: titleField,
        ingredients: ingredientData,
        steps: steps,
        views: 0,
        category: "test",
        keywords: "test",
        desc: descriptionText,
        image: imageFile,
        rating: []
      };

      console.log(data);
      const record = await db.collection('recipes_duplicate').create(data);

      setIsLoading(false);
      setError(null);

      return record; 
    } catch (error) {
      setIsLoading(false);
      
      throw error; 
    }
  }

  return { uploadRecipe, isLoading, error };
}



export function CreateTwo() {
  const {uploadRecipe} = useUploadRecipe();
  const [steps, setStep] = useAtom(recipeSteps)
  console.log(steps);


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