import { z } from 'zod';

const 특수문자나_공백만있는거_안됨 = /^(?!^\s+|\s+$)(?![`~!@#$%^&*|\\'";:/?]+$).*$/g;
const 특수문자나_공백만있는거_안됨2 = /(?!^\s+|\s+$)(?![`~!@#$%^&*|\\'";:/?]+$).*/g;
export const categories = ['건강식', '다이어트', '벌크업', '비건'];
export const difficult = ['쉬움', '보통', '어려움'];
const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const schema = z.object({
  recipeMainImg: z
    .any()
    .refine((files) => files?.length, '이미지 넣어야 한다.')
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `최대 이미지 사이즈는 5MB, 5MB 이하 파일을 업로드해`)
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), '.jpg, .jpeg, .png, .webp 파일포멧만 된다'),
  recipeTitle: z
    .string()
    .min(5, '5글자 이상 30글자 이하로 써라')
    .max(30, '최대 글자수 넘었다')
    .regex(특수문자나_공백만있는거_안됨, '특수문자나 공백으로만 작성하면 안된다'),
  recipeDesc: z
    .string()
    .min(10, '10글자 이상 500글자 이하로 써라')
    .max(500, '최대 글자수 넘었다')
    .regex(특수문자나_공백만있는거_안됨2, '특수문자나 공백으로만 작성하면 안된다'),
  ingredients: z.object({ name: z.string(), amount: z.string() }).array().min(1),
  seasoning: z.object({ name: z.string(), amount: z.string() }).array(),
  category: z.string(),
  difficult: z.string(),
  keywords: z.string(),
  time: z.string().min(1, '필수입력란'),
});
