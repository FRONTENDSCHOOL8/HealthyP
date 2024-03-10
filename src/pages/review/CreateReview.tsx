import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import image from "@/assets/images/flower3.jpg";


export function CreateReview() {
  const navigate = useNavigate();


  return (
    <AnimatePresence>
      <div className="fixed bottom-0 w-full h-full bg-gray_500/70">
        <button type="button" onClick={() => {navigate(-1)}} className="h-full w-full"></button>
        <motion.div 
          initial={{ y: 1000 }}
          animate={{ y: 0 }}
          exit={{ opacity: 1000 }}
          transition={{ duration: .1  }}
          className="absolute bottom-0 bg-gray-700 px-17pxr h-4/5 w-full rounded-t-3xl">
          <button className="w-full pt-16pxr pb-50pxr flex justify-center">
            <hr className="h-3pxr w-67pxr bg-gray-200 border-0 rounded-full"></hr>
          </button>
          <div className="flex gap-17pxr w-full py-14pxr">
            <img src={image} alt="레시피 사진" className="w-60pxr h-60pxr object-cover rounded-xl" />
            <div className="flex flex-col gap-4pxr">
              <h2 className="text-sub-em">청양 알감자 조림</h2>
              <p className="text-foot">청양 알감자 조림</p>
            </div>
          </div>
          <div className="w-full py-36pxr flex flex-col items-center border-t border-b border-gray-200 gap-14pxr">
            <h2 className="text-body-em">레시피는 어떠셨나요?</h2>
            <button>hello</button>
          </div>
          <footer className="absolute left-0 bottom-0 w-full flex justify-center px-14pxr gap-8pxr pt-14pxr pb-46pxr">
            <button 
              type="button" 
              aria-label="이전" 
              className="w-1/3 bg-gray_150 py-12pxr text-gray_700 rounded-[7px] cursor">이전
            </button>
            <button 
              type="button" 
              aria-label="이전" 
              className="w-2/3 bg-primary py-12pxr text-white rounded-[7px] cursor">완료
            </button>
          </footer>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}