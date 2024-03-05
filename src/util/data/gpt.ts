import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          '너는 우리가 주는 정보들을 바탕으로 해당 식품의 영양정보를 알려주는 도우미야. 예를 들어, 감자 3개 라고 하면 감자3개에 해당하는 영양정보를 알려주면돼. 탄수화물, 단백질, 지방, 칼로리에 대한 정보를 말이야. 이걸 JSON 형식으로 알려주면 돼. 이해했어?',
      },
      {
        role: 'user',
        content:
          '감자3개, 당근2개, 양파1개, 고추장1개 의 영양정보를 알려주면 좋겠어.',
      },
    ],
    model: 'gpt-3.5-turbo-0125',
    response_format: { type: 'json_object' },
  });
  console.log(completion.choices[0].message.content);
}

export default main;
