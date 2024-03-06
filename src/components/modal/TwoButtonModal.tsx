import { AnimatePresence, motion } from 'framer-motion';
import { memo } from 'react';

interface TwoButtonModalProps {
  isOpen: boolean;
  headline: string;
  closeModal: () => void;
  confirmModal: () => void;
}

function TwoButtonModalComponent({
  isOpen,
  headline,
  closeModal,
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
          className="fixed inset-0 bg-gray_500  backdrop-blur-[3px] flex justify-center items-center"
        >
          <div className="flex flex-col justify-center items-center bg-white p-24pxr rounded-[20px] gap-6">
            <div className="items-center flex flex-col gap-10pxr">
              <h1 className="text-body-em">{headline}</h1>
              <div
                role="group"
                className="flex flex-col text-foot text-gray_700 justify-center items-center"
              >
                <span>확인을 누르시면 저장되지 않고</span>
                <span>이전페이지로 이동합니다.</span>
              </div>
            </div>
            <div className="flex gap-2 text-body-em">
              <button
                onClick={closeModal}
                className="px-38pxr py-12pxr bg-gray_150 text-gray_700 rounded-[7px]"
              >
                취소
              </button>
              <button
                onClick={confirmModal}
                className="px-38pxr py-12pxr bg-primary text-white rounded-[7px]"
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

export const TwoButtonModal = memo(TwoButtonModalComponent);
