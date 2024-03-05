import { db } from '@/api/pocketbase';
import { nicknameAtom, nicknameValidAtom } from '@/stores/stores';
import { debounce } from '@/util/debounce';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useRef, useState } from 'react';

interface NicknameComponentProps {
  placeholder: string;
}

const labelFocusWithin = 'text-black';
const labelFocusWithout = 'text-gray-500';

export default function NicknameComponent({
  placeholder,
}: NicknameComponentProps) {
  const [isNicknameFocused, setIsNicknameFocused] = useState(false);
  const [nicknameValue, setNicknameValue] = useAtom(nicknameAtom);
  const [isNicknameAvailable, setIsNicknameAvailable] =
    useAtom(nicknameValidAtom);
  const nicknameValueRef = useRef(nicknameValue);

  useEffect(() => {
    nicknameValueRef.current = nicknameValue;
  }, [nicknameValue]);

  const checkNickname = async (nickname: string) => {
    const data = await db.collection('users').getFullList();
    const isAvailable = !data.some((user) => user.username === nickname);
    setIsNicknameAvailable(isAvailable);
  };

  const debouncedCheckNickname = useCallback(
    debounce(() => {
      checkNickname(nicknameValueRef.current);
    }, 300),
    []
  );

  useEffect(() => {
    if (nicknameValue.trim()) {
      debouncedCheckNickname();
    }
  }, [debouncedCheckNickname, nicknameValue]);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNicknameValue(e.target.value);
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
