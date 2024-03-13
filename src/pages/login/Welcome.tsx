import FullPageInfo from '@/components/FullPageInfo';
import checkCirclePrimary from '@/assets/icons/checkCirclePrimary.svg';
import { useAtom } from 'jotai';
import { nicknameAtom } from '@/stores/stores';

export function Welcome() {
  const [name] = useAtom(nicknameAtom);

  return (
    <>
      <FullPageInfo
        icons={[checkCirclePrimary, '로그인완료']}
        route={() => '/main'}
        text={[`${name}님`, 'いらっしゃいませ!!']}
        hasDetailedDescription={false}
      />
    </>
  );
}
