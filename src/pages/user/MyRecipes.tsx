import { useAtom } from "jotai"
import { ingredients } from ".."

export function MyRecipes() {
  const [ingredientData, setIngredientData] = useAtom(ingredients);

  return (
    <>
      <p>{ingredientData}</p>
    </>
  )
}