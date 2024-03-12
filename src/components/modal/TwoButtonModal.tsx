import { AnimatePresence, motion } from 'framer-motion';
import { memo } from 'react';
import FocusLock from 'react-focus-lock';

interface TwoButtonModalProps {
  isOpen: boolean;
  headline: string;
  closeModal: () => void;
  confirmModal: () => void;
  component?: React.ReactNode;
  isActive?: boolean;
  isAnimated?: boolean;
  where?: string;
  textFirstLine?: string;
}

const buttonBasic = 'px-38pxr py-12pxr rounded-[7px]';
const buttonConfirm = `${buttonBasic} bg-primary text-white`;

const buttonVariant = {
  active: {
    scale: 1,
    background: '#91BD14',
    color: '#ffffff',
    transition: { duration: 0.5 },
  },
  inactive: {
    scale: 1,
    background: '#D9D9DA',
    color: '#3C3C4359',
    transition: { duration: 0.5 },
  },
  default: {
    scale: 1,
    background: '#91BD14',
    color: '#ffffff',
  },
};

function TwoButtonModalComponent({
  isOpen,
  headline,
  closeModal,
  confirmModal,
  component,
  isActive = true,
  isAnimated = true,
  where = '이전페이지',
  textFirstLine = '확인을 누르시면 저장되지 않고',
}: TwoButtonModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <FocusLock>
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-gray_500  backdrop-blur-[3px] flex justify-center items-center z-50"
          >
            <div className="flex flex-col justify-center items-center bg-white p-24pxr rounded-[20px] gap-6">
              <div className="items-center flex flex-col gap-10pxr">
                <h1 className="text-body-em">{headline}</h1>
                <div role="group" className="flex flex-col text-foot text-gray_700 justify-center items-center">
                  {component ? (
                    <>
                      <div className="pt-20pxr">{component}</div>
                    </>
                  ) : (
                    <>
                      <span>{textFirstLine}</span>
                      <span>{where}로 이동합니다.</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex gap-2 text-body-em">
                <button onClick={closeModal} className={`${buttonBasic} bg-gray_150 text-gray_700`} aria-label="취소">
                  취소
                </button>
                {isAnimated ? (
                  <AnimatePresence>
                    <motion.div
                      className="rounded-[7px]"
                      animate={isActive ? 'active' : 'inactive'}
                      variants={buttonVariant}
                    >
                      <button disabled={!isActive} onClick={confirmModal} className={buttonBasic} aria-label="확인">
                        확인
                      </button>
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <button disabled={!isActive} onClick={confirmModal} className={buttonConfirm} aria-label="확인">
                    확인
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </FocusLock>
      )}
    </AnimatePresence>
  );
}

export const TwoButtonModal = memo(TwoButtonModalComponent);
