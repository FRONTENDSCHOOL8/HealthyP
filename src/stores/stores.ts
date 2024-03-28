import { RecipesRatingExpand, MyNotification, MyReview } from '@/types';
import { atom } from 'jotai';
import { ListResult, RecordModel } from 'pocketbase';

// 유효성
export const rememberMe = atom(false); // 자동 로그인
export const nicknameValidAtom = atom(true); // 닉네임 유효성
export const passwordValid = atom(false); // 비밀번호 유효성
export const passwordConfirmValid = atom(false); // 비밀번호 확인 유효성
export const emailValid = atom(false); // 이메일 유효성

// 입력값
export const emailAtom = atom(''); // 이메일 입력값
export const passwordAtom = atom(''); // 패스워드 입력값
export const nicknameAtom = atom(''); // 닉네임 입력값

// 생성 페이지 (temp_data는 삭제 예정)
export const ingredients = atom([]);
export const seasoning = atom([]);
export const recipeSteps = atom('[]');
export const keywords = atom('');
export const category = atom('건강식');
export const nutrition = atom<string | null>('');
export const title = atom('');
export const image = atom<File | null>(null);
export const image2 = atom<FileList | null>(null);
export const description = atom('');
export const step_images = atom<File[]>([]);
export const time = atom(0); // 조리 시간
export const difficulty = atom('쉬움'); // 난이도 선택
export const modalError = atom(false); // 에러 발생 여부

// 로그인 페이지
export const isStore = atom(false); // 로컬저장소에 pocketbase_auth가 있는지 여부
export const storeData = atom({}); // 로컬저장소의 pocketbase_auth 데이터

// 마이페이지
export const profileImage = atom<File | null>(null);
export const userCollection = atom('');
export const userRecordId = atom('');
export const userNameAtom = atom('');
export const imageUrlAtom = atom('');
export const modalAtom = atom<boolean>(false);
export const recentRecipesAtom = atom<RecordModel[]>([]);
export const deleteRecentRecipeAtom = atom('');
export const myRecipesAtom = atom<ListResult<RecordModel> | undefined>(undefined);
export const reviewDataAtom = atom<MyReview[]>([]);
export const deleteReviewAtom = atom('');

// SearchComponent
export const searchQuery = atom(''); // 검색어
export const searchResult = atom([]); // 입력 결과
export const chooseQuery = atom<RecipesRatingExpand[]>([]); // 선택 결과
export const isClick = atom(false); // 클릭 여부

// 알림 페이지
export const userIdAtom = atom('');
export const notificationDataAtom = atom<MyNotification[]>([]);
export const deleteNotificationAtom = atom('');
export const countNotificationAtom = atom<string>('');
