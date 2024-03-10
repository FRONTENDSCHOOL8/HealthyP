import { getRangeArray } from '@/util';

interface ReviewStarsProps {
  ratingNumber: number;
  height?: number;
  width?: number;
}

export function ReviewStars({ ratingNumber, height = 25, width = 25 }: ReviewStarsProps) {
  const arr = getRangeArray(1, 6);

  return (
    <>
      {arr.map((_, idx) => {
        return idx < ratingNumber ? (
          <svg
            key={idx}
            width={width}
            height={height}
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.8673 24.905C5.24005 25.235 4.5283 24.6567 4.65505 23.9184L6.0038 16.0353L0.278936 10.4422C-0.255687 9.91884 0.0221868 8.9622 0.73881 8.85887L8.69804 7.69891L12.247 0.487484C12.5672 -0.162495 13.4333 -0.162495 13.7534 0.487484L17.3024 7.69891L25.2616 8.85887C25.9782 8.9622 26.2561 9.91884 25.7199 10.4422L19.9966 16.0353L21.3454 23.9184C21.4721 24.6567 20.7604 25.235 20.1331 24.905L12.9978 21.1451L5.8673 24.905Z"
              fill="#f9d200"
            />
          </svg>
        ) : (
          <svg
            key={idx}
            width={width}
            height={height}
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.8673 24.905C5.24005 25.235 4.5283 24.6567 4.65505 23.9184L6.0038 16.0353L0.278936 10.4422C-0.255687 9.91884 0.0221868 8.9622 0.73881 8.85887L8.69804 7.69891L12.247 0.487484C12.5672 -0.162495 13.4333 -0.162495 13.7534 0.487484L17.3024 7.69891L25.2616 8.85887C25.9782 8.9622 26.2561 9.91884 25.7199 10.4422L19.9966 16.0353L21.3454 23.9184C21.4721 24.6567 20.7604 25.235 20.1331 24.905L12.9978 21.1451L5.8673 24.905Z"
              fill="#E7E7E7"
            />
          </svg>
        );
      })}
    </>
  );
}
