
import { Outlet } from 'react-router-dom';
export { CreateOne } from './CreateOne';
export { CreateTwo } from './CreateTwo';
export { CreateThree } from './CreateThree';
export { CreateComplete } from './CreateComplete';

export function CreateLayout() {

  return (
    <div className="w-full h-full relative bg-white">
      
      <Outlet />
      
    </div>
  );
}
