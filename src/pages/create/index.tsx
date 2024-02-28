import Button from '@/components/buttons/Button';
import Footer from '@/components/Footer';
import { Outlet } from 'react-router-dom';

export { CreateOne } from './CreateOne';
export { CreateTwo } from './CreateTwo';
export { CreateThree } from './CreateThree';
export { CreateComplete } from './CreateComplete';

export function CreateLayout() {
  return (
    <div className="w-full h-full relative">
      <p>This is the create page</p>
      <Outlet />
      {/* <Button text="버튼" /> */}
      <Footer />
    </div>
  );
}
