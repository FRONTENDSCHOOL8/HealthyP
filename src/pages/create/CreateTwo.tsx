import { Link } from "react-router-dom"

import { Header, Button } from "@/components"
import bulbPrimary from '@/assets/icons/bulbYellow.svg';
import addPrimary from '@/assets/icons/addPrimary.svg';


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
      <Link to='../three' className="w-full py-16pxr flex justify-center gap-4pxr items-center sticky top-0 bg-white rounded-full text-body">
        <img src={addPrimary} alt="" />추가하기
      </Link>
    </>
  )
}

function StepContainer() {
  return (
    <div className="w-full grow bg-gray_150 relative p-14pxr">
      <AddButton />
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
            route={[() => '/create', () => '/']} />
        </footer>
    </div>
  )
}