
import { useAtomValue } from "jotai"
import { ingredients } from "@/stores/stores"

export function MyRecipes() {
  const ingredientData = useAtomValue(ingredients);


  return <></>;
}
