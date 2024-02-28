// data[0].rating[]
type Ratingtypes = {
  id: string;
  creater: string;
  review_stars: number;
  review_text: string;
};

export default function Star(ratings: Ratingtypes[]) {
  // data가 불러온 레시피들 리스트 중 하나만 가져오게

  const getStarCount = () => {
    const total = ratings.reduce((acc, cur) => acc + cur.review_stars, 0);
    return (total / ratings.length).toFixed(1) + '점';
  };

  return (
    <div>
      <span className="bg-star-icon size-14pxr" aria-hidden></span>
      <p>{getStarCount()}</p>
    </div>
  );
}
