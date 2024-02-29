interface DummyButtonProps {
  size?: number;
}

export default function DummyButton({ size = 30 }: DummyButtonProps) {
  return (
    <>
      <button className={`size-${size}`} />
    </>
  );
}
