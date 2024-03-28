export default function SkeletonLargeCard() {
  return (
    <div className="h-max overflow-hidden p-14pxr bg-white max-w-430pxr shrink-0 shadow-default">
      <div className="flex justify-between min-h-54pxr items-center">
        <div className="flex gap-4pxr items-center">
          <div className="size-30pxr bg-gray_400 rounded-[30px] animate-shimmer bg-gradient-custom bg-custom" />
          <div className="w-30pxr h-12pxr bg-gray_400 rounded-[5px] animate-shimmer bg-gradient-custom bg-custom" />
        </div>
        <div className="w-20pxr h-12pxr bg-gray_400 rounded-[5px] animate-shimmer bg-gradient-custom bg-custom" />
      </div>
      <div className="w-full h-181pxr bg-gray_400 rounded-[5px] mb-20pxr animate-shimmer bg-gradient-custom bg-custom" />
      <div className="flex gap-5pxr mb-20pxr">
        <div className="w-50pxr h-30pxr bg-gray_400 rounded-[5px] animate-shimmer bg-gradient-custom bg-custom" />
        <div className="w-50pxr h-30pxr bg-gray_400 rounded-[5px] animate-shimmer bg-gradient-custom bg-custom" />
      </div>
      <div className="w-170pxr h-30pxr bg-gray_400 rounded-[5px] mb-10pxr animate-shimmer bg-gradient-custom bg-custom" />
      <div className="w-full h-44pxr bg-gray_400 rounded-[5px] animate-shimmer bg-gradient-custom bg-custom" />
      <div className="flex px-2pxr pt-20pxr pb-36pxr gap-4pxr items-center">
        <div className="w-50pxr h-20pxr bg-gray_400 rounded-[5px] animate-shimmer bg-gradient-custom bg-custom" />
        <div className="w-50pxr h-20pxr bg-gray_400 rounded-[5px] animate-shimmer bg-gradient-custom bg-custom" />
      </div>
    </div>
  );
}
