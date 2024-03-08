import { useAtom, useAtomValue } from "jotai"
import { useState } from "react";
import { db } from "@/api/pocketbase";
import { 
  title, 
  ingredients, 
  image, 
  description, 
  recipeSteps, 
  seasoning, 
  category,
  keywords } from "@/stores/stores";

interface RecipeData {
  title: string;
  ingredients: string;
  seasoning: string;
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
  const seasoningData = useAtomValue(seasoning);
  const imageFile = useAtomValue(image);
  const categoryData = useAtomValue(category)
  const keywordsData = useAtomValue(keywords);
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
        seasoning: seasoningData,
        steps: steps,
        views: 0,
        category: categoryData,
        keywords: keywordsData,
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