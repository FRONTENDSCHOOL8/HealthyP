import { useNavigate } from 'react-router-dom';
import arrowBig from '@/assets/icons/arrowBig.svg';
import close from '@/assets/icons/close.svg';
import bookmark from '@/assets/icons/bookmark.svg';
import bell from '@/assets/icons/bell.svg';
import { FnButton, DummyButton, SearchComponent } from '@/components';

interface HeaderTitleProps {
  title?: string;
}

function HeaderTitle({ title }: HeaderTitleProps) {
  return (
    <>
      <h1 className="mr-auto ml-auto text-body-em">{title}</h1>
    </>
  );
}

interface HeaderProps {
  option:
    | 'onlyArrow'
    | 'onlyClose'
    | 'titleWithBack'
    | 'titleWithClose'
    | 'searchWithBack'
    | 'onlySearch'
    | 'prevWithBookMark'
    | 'onlyAlarm'
    | 'titlewithCloseAndFn';
  title?: string;
  bgColor?: string;
  handleClick?: () => void;
}

function useMapping({ title, option, bgColor, handleClick }: HeaderProps) {
  const navigate = useNavigate();

  const headerMappings = {
    onlyArrow: (
      <header
        className={`w-full bg-white ${bgColor} px-10pxr py-12pxr sticky top-0`}
      >
        <FnButton
          image={arrowBig}
          clickHandler={() => navigate(-1)}
          altText="뒤로가기"
        />
      </header>
    ),
    onlyClose: (

      <header
        className={`w-full ${bgColor} px-10pxr py-12pxr flex items-center justify-between sticky top-0`}
      >
        <DummyButton size={'size-30pxr'} />
        <FnButton image={close} clickHandler={() => navigate(-1)} />
      </header>
    ),
    titleWithBack: (
      <header className={`w-full ${bgColor} px-10pxr py-12pxr flex items-center justify-between sticky top-0`}>
        <FnButton image={arrowBig} clickHandler={() => navigate(-1)} />
        <HeaderTitle title={title} />
        <DummyButton  />
      </header>
    ),
    titleWithClose: (
      <header className={`w-full ${bgColor} px-10pxr py-12pxr flex items-center justify-between sticky top-0`}>
        <DummyButton />
        <HeaderTitle title={title} />
        <FnButton image={close} clickHandler={() => navigate(-1)} />
      </header>
    ),
    searchWithBack: (
      <header className={`w-full ${bgColor} gap-12pxr px-10pxr py-12pxr flex items-center justify-between sticky top-0`}>
        <FnButton image={arrowBig} clickHandler={() => navigate(-1)} />
        <SearchComponent />
      </header>
    ),
    onlySearch: (
      <header className={`w-full px-10pxr py-12pxr ${bgColor} flex items-center justify-between sticky top-0`}>
        <SearchComponent />
      </header>
    ),
    prevWithBookMark: (
      <header className={`w-full px-10pxr py-12pxr ${bgColor} flex items-center justify-between sticky top-0`}>
        <FnButton image={arrowBig} clickHandler={() => navigate(-1)} />
        <FnButton image={bookmark} clickHandler={() => navigate(-1)} />
      </header>
    ),
    onlyAlarm: (
      <header className="w-full bg-white px-10pxr py-12pxr flex items-center justify-between sticky top-0">
        <DummyButton />
        <FnButton image={bell} clickHandler={() => navigate(-1)} />
      </header>
    ),
    titlewithCloseAndFn: (
      <header className="w-full bg-white px-10pxr py-12pxr flex items-center justify-between sticky top-0">
        <DummyButton size={30} />
        <HeaderTitle title={title} />
        <FnButton image={close} clickHandler={handleClick} />
      </header>
    ),
  };

  const headerComponent = headerMappings[option];

  if (headerComponent) {
    return headerComponent;
  }
}

export default function Header({
  option,
  title,
  bgColor,
  handleClick,
}: HeaderProps) {
  const headerComponent = useMapping({
    title,
    option,
    bgColor,
    handleClick,
  }) || <></>;

  // Handle unexpected option values
  if (!headerComponent) {
    console.warn(`Unhandled option: ${option}`);
  }

  return headerComponent;
}
