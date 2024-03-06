interface FnButtonProps {
  image: string;
  clickHandler?: (React.MouseEventHandler<HTMLButtonElement>);
  altText?: string;
  size?: string;
}

export default function FnButton({
  image,
  clickHandler,
  altText,
  size = 'size-30pxr',
}: FnButtonProps) {

  return (
    <>
      <button
        aria-label={altText}
        className={`${size} flex justify-center items-center`}
        onClick={clickHandler}
      >
        <img src={image} alt="" className="w-full" />
      </button>
    </>
  );
}
