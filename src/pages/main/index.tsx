import getPbImage from '@/util/data/getPBImage';
import { db } from '@/api/pocketbase';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ListResult, RecordModel } from 'pocketbase';
import { SwiperMain, RecipeCard } from '@/components';
import healthyFood from '@/assets/icons/healthy_food.png'
import bulk from '@/assets/icons/bulk.png'
import diet from '@/assets/icons/diet.png'
import vegan from '@/assets/icons/vegan.png'
import foodDefaultImg from '@/assets/images/flower3.jpg';
import { Helmet } from 'react-helmet-async';

const categories = [
  {
    label: '건강식',
    image: healthyFood
  },
  {
    label: '다이어트',
    image: diet
  },
  {
    label: '벌크업',
    image: bulk
  },
  {
    label: '비건',
    image: vegan
  }
]

function CategoryButtons() {
  return (
    <div className='w-full flex px-40pxr py-30pxr justify-between'>
      {
        categories.map(item => {
          return (
            <Link key={item.label} to={`/category/${item.label}`} className='h-74pxr w-60pxr flex flex-col items-center gap-4pxr'>
              <div className='size-50pxr flex justify-center items-center rounded-full border hover:bg-gray-200'>
                <img src={item.image} alt={item.label} className='size-32pxr'/>
              </div>
              <h2 className='text-sub'>{item.label}</h2>
            </Link>
          )
        })
      }
    </div>
  )
}

export function MainPage() {
  const [data, setData] = useState<ListResult<RecordModel>>();

  useEffect(() => {
    async function fetchData() {
      const recipeData = await db.collection('recipes').getList(1, 10, { expand: 'rating', sort: '-views' });
      setData(recipeData);
    }
    fetchData();
  }, []);

  return (
    <div className="overflow-y-scroll overflow-x-hidden h-full w-full pb-90pxr no-scrollbar">
      <Helmet>
        <meta charSet="utf-8" />
        <title>HealthyP | 홈</title>
      </Helmet>
      <SwiperMain />
      <CategoryButtons />
      <section>
        <Link to={'/category/오늘의 레시피'} className="flex pl-14pxr pr-10pxr py-10pxr text-title-2-em justify-between">
          <h2>오늘의 레시피</h2>
          <span className="size-30pxr bg-arrow-small-icon rotate-[270deg] bg-center"></span>
        </Link>
        <div className="w-full overflow-x-auto no-scrollbar">
          <div className="flex gap-2 px-side w-max pb-2">
            {data?.items &&
              data?.items.map(({ id, title, expand, image }) => {
                const url = getPbImage('recipes', id, image);
                return (
                  <RecipeCard
                    key={id}
                    id={id}
                    title={title}
                    url={image ? url : foodDefaultImg}
                    rating={expand?.rating}
                  />
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
}
