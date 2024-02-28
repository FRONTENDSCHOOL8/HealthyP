import { getDataAtomFamily } from '@/util';
import { useAtom } from 'jotai';
import SwiperMain from '@/components/swiper/SwiperMain';
import { Link } from 'react-router-dom';


function FakeButtons() {
  return (
    <ul className='flex w-full justify-center py-30pxr gap-32pxr'>
      <li className='flex flex-col items-center'>
        <Link to="../search" className='h-50pxr w-50pxr bg-gray-400'></Link>
        <p>건강식</p>
      </li>
      <li className='flex flex-col items-center'>
        <Link to="../search" className='h-50pxr w-50pxr bg-gray-400'></Link>
        <p>다이어트</p>
      </li>
      <li className='flex flex-col items-center'>
        <Link to="../search" className='h-50pxr w-50pxr bg-gray-400'></Link>
        <p>벌크업</p>
      </li>
      <li className='flex flex-col items-center'>
        <Link to="../search" className='h-50pxr w-50pxr bg-gray-400'></Link>
        <p>비건</p>
      </li>
    </ul>
  )
}

function FakeRankings() {
  return (
    <>
      <ul className='flex gap-8pxr px-10pxr'>
        <li>
          <div className='w-136pxr h-136pxr bg-gray-400'></div>
          <h3 className='text-sub-em'>청양 알감자 간장 조림</h3>
          <div className='flex items-center gap-4pxr'>
            <div className='w-10pxr h-10pxr bg-gray-400 inline-block'></div>
            <span className='text-foot-em'>4.9점</span>
            <span className='text-foot'>{`(100+)`}</span>
          </div>
        </li>
        <li>
          <div className='w-136pxr h-136pxr bg-gray-400'></div>
          <h3 className='text-sub-em'>청양 알감자 간장 조림</h3>
          <div className='w-10pxr h-10pxr bg-gray-400 inline-block'></div>
          <span className='text-foot-em'>4.9점</span>
          <span className='text-foot'>{`(63)`}</span>
        </li>
        <li>
          <div className='w-136pxr h-136pxr bg-gray-400'></div>
          <h3 className='text-sub-em'>청양 알감자 간장 조림</h3>
          <div className='w-10pxr h-10pxr bg-gray-400 inline-block'></div>
          <span className='text-foot-em'>4.9점</span>
          <span className='text-foot'>{`(12)`}</span>
        </li>
      </ul>
    </>
  )
}

function FakeRankingsContainer() {
  return (
    <>
      <div className='w-full px-15pxr py-10pxr flex justify-between items-center'>
        <h2 className='text-title-2-em'>오늘의 레시피</h2>
        <div className='h-20pxr w-20pxr bg-gray-400'></div>
      </div>
      <FakeRankings />
    </>
  )
}


export function MainPage() {
  const [{ data, loading, error }] = useAtom(
    getDataAtomFamily({
      item: 'recipes',
      typeOfGetData: 'getOne',
      options: { expand: 'rating' },
      setting: '5p9kta3jipwrunq',
    })
  );

  if (loading)
    return (
      <div>
        <p>스켈레톤 ui 나올듯?</p>
      </div>
    );

  if (error)
    return (
      <div>
        <p>에러</p>
      </div>
    );

  return (
    <div className='overflow-y-scroll overflow-x-hidden h-full w-full pb-90pxr no-scrollbar'>
      <SwiperMain />
      <FakeButtons />
      <FakeRankingsContainer />
    </div>
  );
}
