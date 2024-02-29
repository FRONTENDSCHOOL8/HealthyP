import { useNavigate } from 'react-router-dom';
import arrowBig from '@/assets/icons/arrowBig.svg';
import close from '@/assets/icons/close.svg';
import bookmark from '@/assets/icons/bookmark.svg';
import bell from '@/assets/icons/bell.svg';
import { FnButton, DummyButton, InputComponent } from '@/components';

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
    | 'onlyAlarm';
  title?: string;
}

function useMapping({ title, option }: HeaderProps) {
  const navigate = useNavigate();

  const headerMappings = {
    onlyArrow: (
      <header className="w-full bg-white px-10pxr py-12pxr sticky top-0">
        <FnButton
          image={arrowBig}
          clickHandler={() => navigate(-1)}
          altText="뒤로가기"
          size={30}
        />
      </header>
    ),
    onlyClose: (
      <header className="w-full bg-white px-10pxr py-12pxr flex items-center justify-between sticky top-0">
        <DummyButton size={30} />
        <FnButton image={close} clickHandler={() => navigate(-1)} />
      </header>
    ),
    titleWithBack: (
      <header className="w-full bg-white px-10pxr py-12pxr flex items-center justify-between sticky top-0">
        <FnButton image={arrowBig} clickHandler={() => navigate(-1)} />
        <HeaderTitle title={title} />
        <DummyButton size={30} />
      </header>
    ),
    titleWithClose: (
      <header className="w-full bg-white px-10pxr py-12pxr flex items-center justify-between sticky top-0">
        <DummyButton size={30} />
        <HeaderTitle title={title} />
        <FnButton image={close} clickHandler={() => navigate(-1)} />
      </header>
    ),
    searchWithBack: (
      <header className="w-full bg-white gap-12pxr px-10pxr py-12pxr flex items-center justify-between sticky top-0">
        <FnButton image={arrowBig} clickHandler={() => navigate(-1)} />
        <InputComponent
          option="search"
          placeholder="재료, 해시태그, 요리로 검색해주세요"
        />
      </header>
    ),
    onlySearch: (
      <header className="w-full px-10pxr py-12pxr flex items-center justify-between sticky top-0">
        <InputComponent
          option="search"
          placeholder="재료, 해시태그, 요리로 검색해주세요"
          bgColor="bg-white"
        />
      </header>
    ),
    prevWithBookMark: (
      <header className="w-full px-10pxr py-12pxr flex items-center justify-between sticky top-0">
        <FnButton image={arrowBig} clickHandler={() => navigate(-1)} />
        <FnButton image={bookmark} clickHandler={() => navigate(-1)} />
      </header>
    ),
    onlyAlarm: (
      <header className="w-full bg-white px-10pxr py-12pxr flex items-center justify-between sticky top-0">
        <DummyButton size={30} />
        <FnButton image={bell} clickHandler={() => navigate(-1)} />
      </header>
    ),
  };

  const headerComponent = headerMappings[option];

  if (headerComponent) {
    return headerComponent;
  }
}

export default function Header({ option, title }: HeaderProps) {
  const headerComponent = useMapping({ title, option }) || <></>;

  // Handle unexpected option values
  if (!headerComponent) {
    console.warn(`Unhandled option: ${option}`);
  }

  return headerComponent;
}
