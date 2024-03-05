import { useAtom } from "jotai"
import { ingredients } from "@/stores/stores"

export function MyRecipes() {
  const [ingredientData, setIngredientData] = useAtom(ingredients);

  return (
    <>
      <p>{ingredientData}</p>
    </>
  )
}