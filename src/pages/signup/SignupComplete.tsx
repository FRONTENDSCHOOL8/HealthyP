import { useState } from 'react';
import { fetchNutritionInfo } from '@/util/data/gpt';

export function SignupComplete() {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetchNutritionInfo(
      `영양 정보에 대해 알려주세요: ${query}`
    );
    setAnswer(response);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="질문을 입력하세요..."
        />
        <button type="submit">물어보기</button>
      </form>
      <p>답변: {answer}</p>
    </div>
  );
}
