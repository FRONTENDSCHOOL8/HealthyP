import { Provider } from 'jotai';

export default function SearchPage() {
  return (
    <Provider>
      <SearchPageContent />
    </Provider>
  );
}

function SearchPageContent() {
  return <>hi</>;
}
