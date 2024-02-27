import { getDataAtomFamily } from "@/util";
import { useAtom } from "jotai";



type ReivewProps = {
  review : string;
}

const List = () => {
  const [data] = useAtom(getDataAtomFamily({item: 'ratings', typeOfGetData: 'getFullList', options: {expand: 'creator'}}));
  
  console.log(data);
}

export default function Review({review='100'}: ReivewProps) {

  
  
  
  return (
    <>
      <List/>
      <p className="text-foot">리뷰 {review}개</p>
    </>
  )
}