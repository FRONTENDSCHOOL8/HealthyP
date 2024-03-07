import { FooterButton, Footer } from '@/components';
import notFound404 from '../assets/images/not_found.png';

export default function MissingPage() {
  const goToHome = () => {
    return '/';
  };

  return (
    <>
      <div className="flex flex-col gap-45pxr justify-center items-center py-100pxr">
        <img src={notFound404} alt="404" />
        <div className="flex flex-col gap-12pxr">
          <p className="text-title-1-em">페이지를 찾을 수 없습니다</p>
          <div className="flex flex-col justify-center items-center text-sub text-gray_500">
            <p>방문하시려는 페이지의 주소가 잘못되었거나</p>
            <p>페이지의 주소가 변경 혹은 삭제되어</p>
            <p>요청하신 페이지를 찾을 수 없습니다.</p>
          </div>
        </div>
      </div>
      <Footer>
        <FooterButton
          text={['홈으로 돌아가기']}
          route={[goToHome]}
          buttonCase="large"
        />
      </Footer>
    </>
  );
}
