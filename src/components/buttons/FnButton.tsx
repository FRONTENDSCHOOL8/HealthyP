import bell from '@/assets/icons/bell.svg';
import bellWithAlarm from '@/assets/icons/bellWithAlarm.svg';
import close from '@/assets/icons/close.svg';
import arrowBig from '@/assets/icons/arrowBig.svg';
import arrowSmall from '@/assets/icons/arrowSmall.svg';
import bookmark from '@/assets/icons/bookmark.svg';
import bookmarkFill from '@/assets/icons/bookmarkFill.svg';

const BUTTON_IMAGES = {
  bell,
  bellWithAlarm,
  close,
  arrowBig,
  arrowSmall,
  bookmark,
  bookmarkFill,
};

interface FnButtonProps {
  image: 'bell' | 'bellWithAlarm' | 'close' | 'arrowBig' | 'bookmark' | 'bookmarkFill' | 'arrowSmall';
  clickHandler?: React.MouseEventHandler<HTMLButtonElement>;
  altText?: string;
  size?: string;
}
export default function FnButton({ image, clickHandler, altText, size = 'size-30pxr' }: FnButtonProps) {
  return (
    <>
      <button aria-label={altText} className={`${size} flex justify-center items-center`} onClick={clickHandler}>
        <img src={BUTTON_IMAGES[image]} alt="" className="w-full" />
      </button>
    </>
  );
}
