interface DummyButtonProps {
  size?: string;
}

export default function DummyButton({ size = 'size-30pxr' }: DummyButtonProps) {
  return (
    <>
      <button className={`${size}`} />
    </>
  );
}
