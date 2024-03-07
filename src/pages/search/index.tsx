import { Provider } from 'jotai';

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

  return <>검색페이지</>;
}
