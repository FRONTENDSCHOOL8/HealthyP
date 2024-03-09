import { Outlet } from 'react-router-dom';
export { DetailPage } from './DetailPage';
export { StepsPage } from './StepsPage';

export function DetailLayout() {
  return (
    <>
      <Outlet />
    </>
  )
}