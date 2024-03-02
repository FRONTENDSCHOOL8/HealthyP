import { Link } from "react-router-dom"
import { useAtom } from "jotai";
import { Header, Button } from "@/components"
import { recipeSteps } from ".";
import bulbPrimary from '@/assets/icons/bulbYellow.svg';
import addPrimary from '@/assets/icons/addPrimary.svg';
import move from '@/assets/icons/move.svg';



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

function StepContainer() {
  const [steps, setSteps] = useAtom(recipeSteps);


  return (
    <div className="w-full grow bg-gray_150 relative p-14pxr flex flex-col gap-8pxr">
      <AddButton />
      {
        steps.map((item, index) => {
          return (
            <>  
              <div className="flex items-center gap-10pxr p-6pxr bg-white rounded-xl">
                <img src={item.image} alt="" className="w-64pxr h-64pxr rounded-lg"/>
                <div className="w-4/5">
                  <h2 className="text-foot-em flex justify-between">Step {index+1}. {item.tips !== "" ? <span>tips</span> : <></>}</h2>
                  <p className="text-cap-1-em">{item.description}</p>
                </div>
                <button className="border-l-2 w-50pxr h-full px-10pxr">
                  <img src={move} alt="정렬" className="w-full"/>
                </button>
              </div>
            </>
          )
        })
        
      }
    </div>
  )
}


export function CreateTwo() {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="sticky top-0">
        <Header option="titleWithClose" title="레시피 등록하기" />
        <TipContainer />
      </div>
      <StepContainer />
      <footer className="w-full px-14pxr pt-14pxr pb-46pxr bg-white">
        <Button
          buttonCase="medium"
          text={['이전', '완료']}
          route={[() => '/create', () => '../complete']} />
      </footer>
    </div>
  )
}