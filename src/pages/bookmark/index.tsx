import Review from "@/components/reviews/Review";
import separateComma from "@/util/separateComma";



export function BookmarkPage() {
  const itemsString = "쌀국수, 고수가좋아,고수가고수처럼고수먹방"
  const itemsArray = separateComma(itemsString);

  console.log(itemsArray);
  return (
    <Review id="ka5sini1xvt9itq" caseType="literal"/>
  )
}