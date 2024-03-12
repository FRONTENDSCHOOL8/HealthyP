import { Link, useNavigate } from 'react-router-dom';
import { useAtom, useAtomValue } from 'jotai';
import { Header, FooterButton, Footer } from '@/components';
import bulbPrimary from '@/assets/icons/bulbYellow.svg';
import addPrimary from '@/assets/icons/addPrimary.svg';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import useUploadRecipe from '@/hooks/useUploadRecipe';
import { recipeSteps, step_images } from '@/stores/stores';
import { TwoButtonModal } from '@/components/modal/TwoButtonModal';
import { useState } from 'react';

function TipContainer() {
  return (
    <div className="w-full px-14pxr py-20pxr">
      <div className="flex flex-col rounded-lg gap-8pxr px-14pxr pt-14pxr pb-20pxr bg-gray-100 border-2 border-gray-200">
        <div className="flex items-center">
          <img src={bulbPrimary} alt="" />
          <h2 className="text-foot-em">Tip</h2>
        </div>
        <p className="text-cap-1">
          레시피를 상세하게 적어주세요. 단계별로 명확한 내용을 적어주면 보다 친절한 레시피를 제공할 수 있습니다.
        </p>
      </div>
    </div>
  );
}

function AddButton() {
  return (
    <>
      <Link
        to="../three"
        className="w-full py-16pxr flex justify-center gap-4pxr items-center sticky top-0 bg-white rounded-full text-body shadow-md mb-20pxr"
      >
        <img src={addPrimary} alt="" />
        추가하기
      </Link>
    </>
  );
}

// Animation Properties
const DELETE_BTN_WIDTH = 70;
const MESSAGE_DELETE_ANIMATION = { height: 0, opacity: 0 };
const MESSAGE_DELETE_TRANSITION = {
  opacity: {
    transition: {
      duration: 0,
    },
  },
};

interface stepType {
  id: string;
  image: string;
  description: string;
  tips: string;
}

function StepContainer() {
  const [steps, setSteps] = useAtom(recipeSteps);
  const [stepImages, setStepImages] = useAtom(step_images);

  const images = [...stepImages];
  const imageUrls = images.map((item) => {
    return URL.createObjectURL(item);
  });

  function handleDragEnd(info: PanInfo, stepId: string, itemIndex: number) {
    const dragDistance = info.point.x;

    if (dragDistance < -DELETE_BTN_WIDTH) {
      const stepData = JSON.parse(steps).filter((item: stepType) => item.id !== stepId);
      const filteredImages = stepImages.filter((item, idx) => idx !== itemIndex);
      setStepImages([...filteredImages])
      setSteps(JSON.stringify(stepData));
    }
  }

  return (
    <div className="w-full grow bg-gray_150 relative pt-14pxr px-14pxr flex flex-col gap-8pxr pb-120pxr">
      <AddButton />
      <ul className="flex flex-col gap-10pxr">
        <AnimatePresence>
          {JSON.parse(steps).map((item: stepType, index: number) => {
            return (
              <motion.li
                key={item.id}
                exit={MESSAGE_DELETE_ANIMATION}
                transition={MESSAGE_DELETE_TRANSITION}
                className="relative "
              >
                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => handleDragEnd(info, item.id, index)}
                  key={item.id}
                  className="flex items-center h-full gap-10pxr px-10pxr py-8pxr z-10 relative bg-white rounded-xl"
                >
                  <div className="w-64pxr h-64pxr rounded-lg">
                    <img src={imageUrls[index]} alt="" className="w-full h-full rounded-lg object-cover" />
                  </div>
                  <div className="w-full h-full">
                    <h2 className="text-foot-em flex justify-between">
                      Step {index + 1}. {item.tips !== '' ? <span className="text-gray-400">tips</span> : <></>}
                    </h2>
                    <p className="text-cap-1-em line-clamp-2">{item.description}</p>
                  </div>
                  {/* <button className="border-l-2 w-50pxr h-full px-10pxr">
                  <img src={move} alt="정렬" className="w-full" />
                </button> */}
                </motion.div>
                <div
                  className="
                absolute bg-red rounded-xl right-2pxr top-1/2 transform -translate-y-1/2 h-[calc(100%-2px)] w-70pxr flex justify-center items-center"
                >
                  삭제
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </div>
  );
}

export function CreateTwo() {
  const [isOpen, setIsOpen] = useState(false);
  const { uploadRecipe } = useUploadRecipe();
  const navigate = useNavigate();

  const goToComplete = () => {
    return '../complete';
  };
  const path: string = goToComplete();

  const handleHeaderClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleConfirm = () => {
    navigate('/');
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="">
        <Header option="titlewithCloseAndFn" title="레시피 등록하기" handleClick={handleHeaderClick} />
        <TipContainer />
      </div>
      <StepContainer />
      <Footer>
        <FooterButton
          buttonCase="medium"
          text={['이전', '완료']}
          route={[() => '/create', () => '../complete']}
          onClickTwo={() => {
            uploadRecipe();
            navigate(path);
          }}
        />
      </Footer>
      <TwoButtonModal
        isOpen={isOpen}
        headline="정말 나가시겠습니까?"
        closeModal={handleClose}
        confirmModal={handleConfirm}
        isAnimated={false}
        where="메인페이지"
      />
    </div>
  );
}
