interface FnButtonProps {
  image: string;
  clickHandler?: (React.MouseEventHandler<HTMLButtonElement>);
  altText?: string;
  size?: number;
}

export default function FnButton({
  image,
  clickHandler,
  altText,
  size,
}: FnButtonProps) {
  return (
    <>
      <button
        aria-label={altText}
        className={`size-${size}pxr flex justify-center items-center`}
        onClick={clickHandler}
      >
        <img src={image} alt="" className="w-full" />
      </button>
    </>
  );
}
