import { db } from '@/api/pocketbase';
import { debounce } from '@/util/debounce';
import { useCallback, useEffect, useState } from 'react';

interface NicknameComponentProps {
  placeholder: string;
  updateValidity: (isValid: boolean) => void;
}

const labelFocusWithin = 'text-black';
const labelFocusWithout = 'text-gray-500';

export default function NicknameComponent({
  placeholder,
  updateValidity,
}: NicknameComponentProps) {
  const [isNicknameFocused, setIsNicknameFocused] = useState(false);
  const [nicknameValue, setNicknameValue] = useState('');
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(true);

  const checkNickname = async (nickname: string) => {
    const data = await db.collection('users').getFullList();
    const isAvailable = !data.some((user) => user.username === nickname);
    setIsNicknameAvailable(isAvailable);
  };

  const debouncedCheckNickname = useCallback(
    debounce((nickname) => {
      checkNickname(nickname);
    }, 300),
    []
  );

  useEffect(() => {
    updateValidity(isNicknameAvailable);
  }, [isNicknameAvailable, updateValidity]);

  useEffect(() => {
    if (nicknameValue.trim()) {
      debouncedCheckNickname(nicknameValue);
    }
  }, [nicknameValue]);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setNicknameValue(newValue);
  };

  return (
    <div>
      <label
        htmlFor="nickname-input"
        className={`mb-8pxr ml-2pxr text-foot-em ${isNicknameFocused ? labelFocusWithin : labelFocusWithout}`}
      >
        닉네임
      </label>
      <input
        id="nickname-input"
        type="text"
        className="w-full h-48pxr py-0 px-10pxr bg-gray_150 rounded-md focus:outline-primary"
        placeholder={placeholder}
        value={nicknameValue}
        onFocus={() => setIsNicknameFocused(true)}
        onBlur={() => setIsNicknameFocused(false)}
        onChange={handleNicknameChange}
      />
      <div className="h-30pxr">
        <p
          className={`text-cap-1 text-warning ${!isNicknameAvailable ? 'block' : 'hidden'}`}
        >
          이미 사용중인 닉네임입니다.
        </p>
      </div>
    </div>
  );
}
