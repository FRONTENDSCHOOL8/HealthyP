import Lottie from 'react-lottie';
import animationData from './json/loading.json'; // 애니메이션 파일 경로

const LoadingAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="flex flex-col justify-center items-center gap-20pxr">
      <Lottie options={defaultOptions} height={200} width={400} isClickToPauseDisabled speed={1.5} />
      <span className="animate-bounce animate-infinite animate-ease-in-out text-title-1-em">레시피 작성중...</span>
    </div>
  );
};

export default LoadingAnimation;
