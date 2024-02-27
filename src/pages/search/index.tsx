import { useNavigate } from "react-router-dom"
import arrowBig from '/src/assets/icons/arrowBig.svg';
import close from '/src/assets/icons/close.svg';
import InputComponent from "@/components/input/InputComponent";
interface PrevPageProps {
  image?: string;
}

function PrevPage({image} : PrevPageProps) {
  const navigate = useNavigate();
  return (
    <>
      <button className="w-30pxr h-30pxr" onClick={() => navigate(-1)}>
        <img src={image} alt="" />
      </button>
    </>
  )
}

interface HeaderTitleProps {
  title?: string;
}

function HeaderTitle({title} : HeaderTitleProps) {
  return (
    <>
      <h1 className="mr-auto ml-auto">{title}</h1>
    </>
  )
}

function DummyButton() {
  return (
    <>
      <button className="w-30pxr h-30pxr"/>
    </>
  )
}

interface HeaderProps {
  option: string;
  title?: string;
}

function Header({option, title} : HeaderProps) { 
  if(option === "onlyArrow") {
    return (
      <header className="w-full bg-white px-10pxr py-12pxr">
        <PrevPage />
      </header>
    )
  } else if(option === "onlyClose") {
    return (
      <header className="w-full bg-white px-10pxr py-12pxr flex items-center justify-between">
        <DummyButton/>
        <PrevPage image={close} />
      </header>
    )
  } else if (option === "titleWithBack") {
    return (
      <header className="w-full bg-white px-10pxr py-12pxr flex items-center justify-between">
        <PrevPage image={arrowBig} />
        <HeaderTitle title={title}/>
        <DummyButton />
      </header>
    )
  } else if(option === "titleWithClose") {
    return (
      <header className="w-full bg-white px-10pxr py-12pxr flex items-center justify-between">
        <DummyButton/>
        <HeaderTitle title={title}/>
        <PrevPage image={close} />
      </header>
    )
  } else if(option === "searchWithBack") {
    return (
      <header className="w-full bg-white gap-12pxr px-10pxr py-12pxr flex items-center justify-between">
        <PrevPage image={arrowBig} />
        <InputComponent option="search" placeholder="재료, 해시태그, 요리로 검색해주세요"/>
      </header>
    )
  } else if(option === "onlySearch") {
    return (
      <header className="w-full px-10pxr py-12pxr flex items-center justify-between">
        <InputComponent option="search" placeholder="재료, 해시태그, 요리로 검색해주세요" bgColor="white"/>
      </header>
    )
  }

  return null;
}


// original code for search page



export default function SearchPage() {
  return (
    <div>
      <Header option="onlySearch" title="hello"/>
    </div>
  )
}