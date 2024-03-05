import { atom } from 'jotai';

// 유효성
export const nicknameValidAtom = atom(true); // 닉네임 유효성
export const passwordValid = atom(false); // 비밀번호 유효성
export const passwordConfirmValid = atom(false); // 비밀번호 확인 유효성
export const emailValid = atom(false); // 이메일 유효성

// 입력값
export const emailAtom = atom(''); // 이메일 입력값
export const passwordAtom = atom(''); // 패스워드 입력값
export const nicknameAtom = atom(''); // 닉네임 입력값

// 생성 페이지 (temp_data는 삭제 예정)
export const ingredients = atom('[]');
export const seasoning = atom('[]');
export const recipeSteps = atom('[]');
export const title = atom('');
export const image = atom<File | null>(null);
export const description = atom('');
export const temp_image = atom<File | null>(null);

// 로그인 페이지
export const isStore = atom(false); // 로컬저장소에 pocketbase_auth가 있는지 여부
export const storeData = atom({}); // 로컬저장소의 pocketbase_auth 데이터
