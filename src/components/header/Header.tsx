import { DummyButton, FnButton, SearchComponent } from '@/components';
import { useNavigate } from 'react-router-dom';

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
    | 'alarmWithLogout'
    | 'titlewithCloseAndFn';
  title?: string;
  bgColor?: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  hasNotification?: boolean;
  logout?: () => void;
}

const defaultSizing = 'w-full px-10pxr py-12pxr flex items-center justify-between sticky top-0 z-20';

function useMapping({ title, option, bgColor, handleClick, hasNotification, logout }: HeaderProps) {
  const navigate = useNavigate();

  const headerMappings = {
    onlyArrow: (
      <header className={`${bgColor} ${defaultSizing}`}>
        <FnButton image={'arrowBig'} clickHandler={() => navigate(-1)} altText="뒤로가기" />
        <DummyButton size={'30pxr'} />
      </header>
    ),
    onlyClose: (
      <header className={`${bgColor} ${defaultSizing}`}>
        <DummyButton size={'size-30pxr'} />
        <FnButton image={'close'} clickHandler={() => navigate('/main')} altText="닫기" />
      </header>
    ),
    titleWithBack: (
      <header className={`${bgColor} ${defaultSizing}`}>
        <FnButton image={'arrowBig'} clickHandler={() => navigate(-1)} />
        <HeaderTitle title={title} />
        <DummyButton />
      </header>
    ),
    titleWithClose: (
      <header className={`${bgColor} ${defaultSizing}`}>
        <DummyButton />
        <HeaderTitle title={title} />
        <FnButton image={'close'} clickHandler={() => navigate('/main')} />
      </header>
    ),
    searchWithBack: (
      <header className={`${bgColor} gap-12pxr ${defaultSizing}`}>
        <FnButton image={'arrowBig'} clickHandler={() => navigate(-1)} />
        <SearchComponent />
      </header>
    ),
    onlySearch: (
      <header className={`${bgColor} ${defaultSizing}`}>
        <SearchComponent />
      </header>
    ),
    prevWithBookMark: (
      <header className={`${bgColor} ${defaultSizing}`}>
        <FnButton image={'arrowBig'} clickHandler={() => navigate(-1)} />
        <FnButton image={'bookmark'} clickHandler={handleClick} />
      </header>
    ),
    onlyAlarm: (
      <header className={`${bgColor} ${defaultSizing}`}>
        <DummyButton />
        <FnButton image={hasNotification ? 'bellWithAlarm' : 'bell'} clickHandler={handleClick} />
      </header>
    ),
    alarmWithLogout: (
      <header className={`${bgColor} ${defaultSizing}`}>
        <FnButton image={'power'} clickHandler={logout} />
        <FnButton image={hasNotification ? 'bellWithAlarm' : 'bell'} clickHandler={handleClick} />
      </header>
    ),
    titlewithCloseAndFn: (
      <header className={`${bgColor} ${defaultSizing}`}>
        <DummyButton size={'size-30pxr'} />
        <HeaderTitle title={title} />
        <FnButton image={'close'} clickHandler={handleClick} />
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
  bgColor = 'bg-white',
  handleClick,
  hasNotification = false,
  logout,
}: HeaderProps) {
  const headerComponent = useMapping({
    title,
    option,
    bgColor,
    handleClick,
    hasNotification,
    logout,
  }) || <></>;

  // Handle unexpected option values
  if (!headerComponent) {
    console.warn(`Unhandled option: ${option}`);
  }

  return headerComponent;
}
