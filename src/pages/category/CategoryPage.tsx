import { db } from '@/api/pocketbase';
import { Header, LargeCard } from '@/components';
import getPbImage from '@/util/data/getPBImage';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {DefaultLoader} from '@/components';
import { useInifinityCard } from '@/hooks/useInfinityCard';

export function CategoryPage() {
  const {title} = useParams();
  
  async function getRecipeData({pageParam = 1}) {
    if(title === "오늘의 레시피") {
      const recordsData = await db.collection('recipes').getList(pageParam, 6, { 
        expand: 'rating, profile', 
        sort: '-views' });
      return recordsData.items;
    } else {
      const recordsData = await db.collection('recipes').getList(pageParam, 6, { 
        expand: 'rating, profile',
        filter: `category = "${title}"`,
        sort: '-created'
      });
      return recordsData.items
    }
  }

  const { data, status, isFetchingNextPage, userData, ref } = useInifinityCard(getRecipeData);
  const contents = data?.pages.map((recipes) =>
    recipes.map((recipe, index) => {
      const url = getPbImage('recipes', recipe.id, recipe.image);
      if (recipes.length === index + 1)
        return (
          <LargeCard
            innerRef={ref}
            key={index}
            id={recipe.id}
            userData={userData}
            rating={recipe.expand?.rating}
            url={recipe.image && url}
            desc={recipe.desc}
            title={recipe.title}
            profile={recipe.expand?.profile}
            keywords={recipe.keywords}
          />
        );
      return (
        <LargeCard
          key={index}
          id={recipe.id}
          userData={userData}
          rating={recipe.expand?.rating}
          url={recipe.image && url}
          desc={recipe.desc}
          title={recipe.title}
          profile={recipe.expand?.profile}
          keywords={recipe.keywords}
        />
      );
    })
  );

  if (status === 'pending') return <DefaultLoader />;
  if (status === 'error') return <DefaultLoader />;

  return (
    <div className="w-full h-full bg-gray-200 overflow-auto">
      <Helmet>
        <title>HealthyP | {title}</title>
      </Helmet>
      <Header option="titleWithBack" title={title}/>
      <div className="grid gap-6pxr pb-140pxr grid-cols-card justify-center w-full">{contents}</div>
      {isFetchingNextPage && <p className='mx-auto w-full'>로딩중</p>}
    </div>
  );
}
