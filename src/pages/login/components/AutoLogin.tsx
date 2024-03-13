import { rememberMe } from '@/stores/stores';
import { useAtom } from 'jotai';
import { memo } from 'react';

function AutoLogin() {
  const [, setAutoLogin] = useAtom(rememberMe);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutoLogin(e.target.checked);
  };

  return (
    <div role="group" className="flex items-center gap-1 mb-14pxr" onChange={handleChange}>
      <input type="checkbox" name="remember" id="remember" />
      <label htmlFor="remember" className="text-cap-1 text-gray-500">
        자동 로그인
      </label>
    </div>
  );
}

export const MemoizedAutoLogin = memo(AutoLogin);
