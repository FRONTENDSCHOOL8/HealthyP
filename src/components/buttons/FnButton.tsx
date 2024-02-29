


interface FnButtonProps {
  image: string;
  clickHandler?: () => void;
  altText?: string;
  size?: number;
}

export function FnButton({image, clickHandler, altText, size} : FnButtonProps) {
  return (
    <>
      <button aria-label={altText} className={`size-${size}pxr flex justify-center items-center`} onClick={clickHandler}>
        <img src={image} alt="" />
      </button>
    </>
  )
}


interface DummyButtonProps {
  size: number
}

export function DummyButton({size}:DummyButtonProps) {
  return (
    <>
      <button className={`size-${size}`}/>
    </>
  )
}