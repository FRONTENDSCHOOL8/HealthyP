


interface FnButtonProps {
  image: string;
  clickHandler?: () => void;
}

export function FnButton({image, clickHandler} : FnButtonProps) {
  return (
    <>
      <button className="w-30pxr h-30pxr flex justify-center items-center" onClick={clickHandler}>
        <img src={image} alt="" />
      </button>
    </>
  )
}

export function DummyButton() {
  return (
    <>
      <button className="w-30pxr h-30pxr"/>
    </>
  )
}