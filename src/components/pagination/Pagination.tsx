import { motion } from 'framer-motion';

export const ProgressBar = ({
  init,
  progress,
}: {
  init: number;
  progress: number;
}) => {
  // 마커의 위치를 정의합니다. 여기서는 33%, 66%에 마커를 두었습니다.
  // const markers = [33, 66];

  return (
    <div className="relative w-full bg-[#F0F0F1] h-1 mb-3">
      {/* {markers.map((marker) => (
        <div
          key={marker}
          className="absolute top-0 h-1 bg-white"
          style={{ width: '3px', left: `${marker}%` }}
        />
      ))} */}
      <motion.div
        initial={{ width: `${init}%` }}
        animate={{ width: `${progress}%` }}
        exit={{ width: 0 }}
        className="absolute top-0 h-1 bg-gray-300"
      />
    </div>
  );
};
