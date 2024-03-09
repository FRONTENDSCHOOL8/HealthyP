import { useParams } from "react-router-dom"



export function StepsPage() {
  const {recipeId} = useParams();

  return (
    <>
      <p>{recipeId}</p>
    </>
  )
}