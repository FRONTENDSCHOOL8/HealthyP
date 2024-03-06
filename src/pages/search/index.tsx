import { Provider } from 'jotai';
import { Link } from 'react-router-dom';

import { Header } from '@/components';
import { OneButtonModal } from '@/components/modal/OneButtonModal';

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
    <>
      <div className="w-full relative">
        <Header option="onlyArrow" />
        <Link to={'/detail/h3cosrv65gjr0mq'}>Click on me</Link>
      </div>
      <OneButtonModal isOpen confirmModal={() => {}} />
    </>
  );
}
