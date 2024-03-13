import { z } from 'zod';

const 특수문자나_공백만있는거_안됨 = /^(?!^\s+|\s+$)(?![`~!@#$%^&*|\\'";:/?]+$).*$/g;
export const categories = ['건강식', '다이어트', '벌크업', '비건'];
export const difficult = ['쉬움', '보통', '어려움'];

export const schema = z.object({
  recipeMainImg: z.string().min(1),
  recipeTitle: z
    .string()
    .min(5, '5글자 이상 30글자 이하로 써라')
    .max(30, '최대 글자수 넘었다')
    .regex(특수문자나_공백만있는거_안됨, '특수문자나 공백으로만 작성하면 안된다'),
  recipeDesc: z
    .string()
    .min(10, '10글자 이상 500글자 이하로 써라')
    .max(500, '최대 글자수 넘었다')
    .regex(특수문자나_공백만있는거_안됨, '특수문자나 공백으로만 작성하면 안된다'),
  ingredients: z.object({ name: z.string(), amount: z.string() }).array().min(1),
  seasoning: z.object({ name: z.string(), amount: z.string() }).array(),
  category: z.string(),
  difficult: z.string(),
});
