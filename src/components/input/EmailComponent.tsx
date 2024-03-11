import { db } from '@/api/pocketbase';
import { emailAtom, emailValid } from '@/stores/stores';
import { UsersResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { memo, useEffect, useRef, useState } from 'react';

const labelFocusWithin = 'text-black';
const labelFocusWithout = 'text-gray-500';
const warning = 'border-warning border';

function emailReg(text: string) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(text).toLowerCase());
}

interface EmailComponentProps {
  label?: boolean;
  error?: boolean;
  valid?: boolean;
  style?: string;
}

async function fetchEmail(): Promise<UsersResponse[]> {
  const response = await db.collection('users').getFullList<UsersResponse>();
  return response;
}

function EmailComponent({ label, error, style, valid = false }: EmailComponentProps) {
  const [, setEmailValid] = useAtom(emailValid); // 이메일 유효성 체크
  const [isDuplicate, setIsDuplicate] = useState<boolean | undefined>(false); // 중복 이메일 체크
  const [emailBorder, setEmailBorder] = useState(''); // 이메일 경계선
  const [emailValue, setEmailValue] = useAtom(emailAtom); // 이메일 값
  const isEmailFocused = useRef(false);

  const { data: allUsers } = useQuery<UsersResponse[]>({
    queryKey: ['users'],
    queryFn: fetchEmail,
    staleTime: 1000 * 10,
  });

  useEffect(() => {
    const userEmail = allUsers?.map((user) => user.email);
    const isDuplicateEmail = userEmail?.includes(emailValue);
    setIsDuplicate(isDuplicateEmail);
  }, [allUsers, emailValue]);

  // 이메일 중복 체크
  const handleValidateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = emailReg(e.target.value);
    setEmailValue(e.target.value);
    setEmailBorder(isValid ? '' : warning);
    setEmailValid(isValid);
  };

  const handleFocus = () => {
    isEmailFocused.current = true;
  };

  const handleBlur = () => {
    isEmailFocused.current = false;
  };

  return (
    <>
      <label
        htmlFor="email-input"
        className={`mb-8pxr ml-2pxr text-foot-em ${isEmailFocused ? labelFocusWithin : labelFocusWithout} ${label ? 'block' : 'hidden'}`}
      >
        이메일
      </label>
      <input
        id="email-input"
        type="email"
        className={`w-full h-48pxr py-0 px-10pxr bg-gray_150 rounded-md ${emailBorder} focus:outline-primary ${style}`}
        placeholder="이메일을 입력해주세요"
        value={emailValue}
        onChange={handleValidateEmail}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <div className={`h-30pxr ${error ? 'block' : 'hidden'}`}>
        <p className={`text-cap-1 text-warning ${emailBorder ? 'block' : 'hidden'}`}>
          올바른 이메일 형식을 작성해주세요.
        </p>
        {valid && (
          <p className={`text-cap-1 text-warning ${isDuplicate ? 'block' : 'hidden'}`}>이미 가입된 이메일입니다.</p>
        )}
      </div>
    </>
  );
}

export const MemoizedEmailComponent = memo(EmailComponent);
