import { AnimatePresence, motion } from 'framer-motion';
import { memo } from 'react';

interface TwoButtonModalProps {
  isOpen: boolean;
  confirmModal: () => void;
}

/**
 * 원버튼 모달
 *
 * confirmModal에는 useState를 활용한 handleClick 함수를 넣을 것을 추천.
 *
 * ex) const [isOpen, setIsOpen] = useState(false);
 *
 *    const handleClick = () => {
 *
 *    setIsOpen(false);
 *
 *   };
 * @param isOpen  모달 오픈 여부
 * @param confirmModal  확인 버튼 클릭시 실행할 함수. button의 onClick에 할당.
 * @returns
 */
function OneButtonModalComponent({
  isOpen = true,
  confirmModal,
}: TwoButtonModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-gray_500 backdrop-blur-[3px] flex justify-center items-center"
        >
          <div className="flex flex-col justify-center items-center bg-white p-24pxr rounded-[20px] gap-6">
            <div className="items-center flex flex-col gap-10pxr">
              <h1 className="text-body-em">🥹 서비스 준비중 입니다.</h1>
              <div
                role="group"
                className="flex flex-col text-foot text-gray_700 justify-center items-center"
              >
                <span>빠른 시일 내에 업데이트 하겠습니다!</span>
                <span>이용에 불편을 드려 죄송합니다.</span>
              </div>
            </div>
            <div className="flex gap-2 text-body-em">
              <button
                onClick={confirmModal}
                className="px-95pxr py-12pxr bg-primary text-white rounded-[7px]"
              >
                확인
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export const OneButtonModal = memo(OneButtonModalComponent);
