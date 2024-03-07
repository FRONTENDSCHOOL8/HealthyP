import { useAtom, useAtomValue } from "jotai"
import { useState } from "react";
import { db } from "@/api/pocketbase";
import { title, ingredients, image, description, recipeSteps } from "@/stores/stores";

interface RecipeData {
  title: string;
  ingredients: string;
  steps: string;
  views: number;
  category: string;
  keywords: string;
  desc: string;
  image: File | null;
  rating: string[];
}

interface UseUploadRecipeResult {
  uploadRecipe: () => void;
  isLoading: boolean;
  error: string | null;
}



export default function useUploadRecipe(): UseUploadRecipeResult {
  const [titleField,] = useAtom(title);
  // const [seasoningData,] = useAtom(seasoning);
  const ingredientData = useAtomValue(ingredients);
  const imageFile = useAtomValue(image);
  const descriptionText = useAtomValue(description);
  const steps = useAtomValue(recipeSteps);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  

  async function uploadRecipe() {
    try {
      setIsLoading(true);

      const data: RecipeData = {
        title: titleField,
        ingredients: ingredientData,
        steps: steps,
        views: 0,
        category: "test",
        keywords: "test",
        desc: descriptionText,
        image: imageFile,
        rating: []
      };

      const record = await db.collection('recipes').create(data);

      setIsLoading(false);
      setError(null);

      return record; 
    } catch (error) {
      setIsLoading(false);
      
      throw error; 
    }
  }

  return { uploadRecipe, isLoading, error };
}