import { OneButtonModal } from '@/components/modal/OneButtonModal';
import { Provider } from 'jotai';

export default function SearchPage() {
  return (
    <Provider>
      <SearchPageContent />
    </Provider>
  );
}

function SearchPageContent() {
  const handleConfirmClick = () => {};
  return (
    <>
      <OneButtonModal isOpen={true} confirmModal={handleConfirmClick} />
    </>
  );
}
