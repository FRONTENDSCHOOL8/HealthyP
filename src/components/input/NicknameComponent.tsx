import { db } from '@/api/pocketbase';
import { getDataAtomFamily } from '@/util';
import { useAtom } from 'jotai';
import { debounce, set } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

interface NicknameComponentProps {
  placeholder: string;
}

const labelFocusWithin = 'text-black';
const labelFocusWithout = 'text-gray-500';

export default function NicknameComponent({
  placeholder,
}: NicknameComponentProps) {
  const [isNicknameFocused, setIsNicknameFocused] = useState(false);
  const [nicknameValue, setNicknameValue] = useState('');
  const [nicknameData, setNicknameData] = useState(null);

  const fetchNicknameData = async () => {
    const data = await db
      .collection('users')
      .getFullList({ filter: `${nicknameValue}` });
    setNicknameData(data);
  };

  const debouncedFetchNicknameData = useCallback(
    debounce(async () => {
      const data = await db
        .collection('users')
        .getFullList({ filter: `${nicknameValue}` });
      setNicknameData(data);
    }, 300), // 300ms의 디바운스 시간
    []
  );

  useEffect(() => {
    if (nicknameValue) {
      debouncedFetchNicknameData(nicknameValue);
    }
  }, [nicknameValue, debouncedFetchNicknameData]);

  const handleNicknameChange = (e) => {
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
          className={`text-cap-1 text-warning ${nicknameData ? 'block' : 'hidden'}`}
        >
          이미 사용중인 닉네임입니다.
        </p>
      </div>
    </div>
  );
}
