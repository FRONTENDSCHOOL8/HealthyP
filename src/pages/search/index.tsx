import { Provider } from 'jotai';


import { Header } from '@/components';


export default function SearchPage() {
  return (
    <Provider>
      <SearchPageContent />
    </Provider>
  );
}

function SearchPageContent() {
  // const [password] = useAtom(passwordAtom);
  // const navigate = useNavigate();

  return (
    <div className="w-full relative">
      <Header option="onlyArrow" />
      
    </div>
  );
}
