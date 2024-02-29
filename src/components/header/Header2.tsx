import { useNavigate } from 'react-router-dom';
import arrowBig from '@/assets/icons/arrowBig.svg';
import close from '@/assets/icons/close.svg';
import bookmark from '@/assets/icons/bookmark.svg';
import InputComponent from '@/components/input/InputComponent';
import { FnButton, DummyButton } from '@/components/buttons/FnButton';
import bell from '@/assets/icons/bell.svg';

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

interface CallbackObject {
  callback?: () => void;
  callbackLeft?: () => void;
  allbackRight?: () => void;
  title?: string;
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
  headerObj?: CallbackObject;
}

const commonClass: string =
  'w-full bg-white px-10pxr py-12pxr flex items-center justify-between sticky top-0';

const headerMappings = {
  onlyArrow(params: CallbackObject) {
    return (
      <header className={`${commonClass}`}>
        <FnButton image={arrowBig} clickHandler={params.callback} />
      </header>
    );
  },

  onlyClose(params: CallbackObject) {
    return (
      <header className={`${commonClass}`}>
        <DummyButton />
        <FnButton image={close} clickHandler={params.callback} />
      </header>
    );
  },

  titleWithBack(params: CallbackObject) {
    return (
      <header className={`${commonClass}`}>
        <FnButton image={arrowBig} clickHandler={params.callback} />
        <HeaderTitle title={params.title} />
        <DummyButton />
      </header>
    );
  },

  titleWithClose(params: CallbackObject) {
    return (
      <header className={`${commonClass}`}>
        <DummyButton />
        <HeaderTitle title={params.title} />
        <FnButton image={close} clickHandler={params.callback} />
      </header>
    );
  },
  searchWithBack(params: CallbackObject) {
    return (
      <header className={`${commonClass}`}>
        <FnButton image={arrowBig} clickHandler={params.callback} />
        <InputComponent
          option="search"
          placeholder="재료, 해시태그, 요리로 검색해주세요"
        />
      </header>
    );
  },

  onlySearch() {
    return (
      <header className={`${commonClass}`}>
        <InputComponent
          option="search"
          placeholder="재료, 해시태그, 요리로 검색해주세요"
          bgColor="bg-white"
        />
      </header>
    );
  },

  prevWithBookMark(params: CallbackObject) {
    return (
      <header className={`${commonClass}`}>
        <FnButton image={arrowBig} clickHandler={params.callbackLeft} />
        <FnButton image={bookmark} clickHandler={params.allbackRight} />
      </header>
    );
  },

  onlyAlarm(params: CallbackObject) {
    return (
      <header className={`${commonClass}`}>
        <DummyButton />
        <FnButton image={bell} clickHandler={params.callback} />
      </header>
    );
  },
};

export default function Header({ option, headerObj }: HeaderProps) {
  const navigate = useNavigate();
  const callback = headerObj?.callback && (() => navigate(-1));
  const params = { callback, ...headerObj };
  const headerComponent = headerMappings[option](params);

  if (headerComponent) {
    return headerComponent;
  }

  // Handle unexpected option values
  console.warn(`Unhandled option: ${option}`);
  return null;
}
