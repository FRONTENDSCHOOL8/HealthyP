import PocketBase from 'pocketbase';
import { TypedPocketBase } from 'typed-pocketbase';

// 명령어로 자동 생성된 타입 정의 파일에서 Schema를 가져옵니다.
import { Schema } from '@/types/Database';


export const pb = new PocketBase(import.meta.env.VITE_PB_URL);

// 사용할 PocketBase 주소를 지정합니다.
export const db = new TypedPocketBase<Schema>(import.meta.env.VITE_PB_URL);