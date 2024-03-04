export const fetchNutritionInfo = async (query) => {
  const response = await fetch(
    'https://api.openai.com/v1/engines/davinci/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: query,
        max_tokens: 150,
      }),
    }
  );

  const data = await response.json(); // 응답 데이터를 JSON 형태로 변환

  return data.choices[0].text.trim(); // 변환된 데이터에서 원하는 정보 추출
};
