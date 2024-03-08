import { useAtom, useSetAtom } from 'jotai';
import OpenAI from 'openai';
import { ingredients, seasoning, nutrition } from '@/stores/stores';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const promptContent = '너는 우리가 주는 정보들을 바탕으로 해당 식품의 영양정보를 알려주는 도우미야. 예를 들어, [{"name":"감자","amount":"3개"},{"name":"간장", "amount":"2스푼"}]라고 하면 감자 3개와 딸기 2개에 해당하는 영양정보를 총합해서 {"calories":"칼로리양", "carbs":"탄수화물", "protein":"단백질", "fat":"지발"} 형식으로 돌려줘. 이걸 JSON 형식으로 알려줘.'

async function useOpenAPI() {
  const ingredientData = useAtom(ingredients);
  const seasoningData = useAtom(seasoning);
  const setNutritionData = useSetAtom(nutrition);
  
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
    // getNutritionData();
    console.log('test');


  return {getNutritionData}
}


export default useOpenAPI;
