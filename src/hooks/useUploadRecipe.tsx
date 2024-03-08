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
  keywords, 
  nutrition} from "@/stores/stores";

import OpenAI from "openai";
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
  nutrition: string | null;
  rating: string[];
}

interface UseUploadRecipeResult {
  uploadRecipe: () => void;
  getNutritionData: () => void;
  isLoading: boolean;
  error: string | null;
}

const promptContent = '너는 우리가 주는 정보들을 바탕으로 해당 식품의 영양정보를 알려주는 도우미야. 예를 들어, [{"name":"감자","amount":"3개"},{"name":"간장", "amount":"2스푼"}]라고 하면 감자 3개와 딸기 2개에 해당하는 영양정보를 총합해서 {"calories":"칼로리양", "carbs":"탄수화물", "protein":"단백질", "fat":"지발"} 형식으로 돌려줘. 이걸 JSON 형식으로 알려줘.'
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function useUploadRecipe(): UseUploadRecipeResult {
  const [titleField,] = useAtom(title);
  // const [seasoningData,] = useAtom(seasoning);
  const ingredientData = useAtomValue(ingredients);
  const seasoningData = useAtomValue(seasoning);
  const imageFile = useAtomValue(image);
  const categoryData = useAtomValue(category)
  const keywordsData = useAtomValue(keywords);
  const [nutritionData, setNutritionData] = useAtom(nutrition);
  const descriptionText = useAtomValue(description);
  const steps = useAtomValue(recipeSteps);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  
  async function getNutritionData() {
    const completion = await openai.chat.completions.create({
      n: 1,
      messages: [
        {
          role: 'system',
          content:
            `${promptContent}`,
        },
        {
          role: 'user',
          content:
            `${ingredientData}, ${seasoningData} 해당 정보에 대한 영양정보를 알려줘.`,
        },
      ],
      model: 'gpt-3.5-turbo-0125',
      response_format: { type: 'json_object' },
    });
    console.log(completion.choices[0].message.content);
    const result = completion.choices[0].message.content;
    setNutritionData(result);
  }
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
        nutrition: nutritionData,
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

  return { uploadRecipe, getNutritionData, isLoading, error };
}