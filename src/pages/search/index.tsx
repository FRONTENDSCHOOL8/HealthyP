import Header from "@/components/header/Header"
import InputComponent from "@/components/input/InputComponent"
import getDataAtomFamily from "@/hooks/useFetch"
import { useAtom } from "jotai"

// original code for search page
export default function SearchPage() {
  const [data] = useAtom(
    getDataAtomFamily({
      item: 'recipes',
      typeOfGetData: 'getFullList', 
      options: {expand: 'rating'}
    }));
  console.log(data);
  return (
    <div>
      <Header option="onlyAlarm"/>
      <InputComponent option="password" />
    </div>
  )
}