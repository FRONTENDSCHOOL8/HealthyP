

interface SearchComponentProps {
  bgColor?: string;
  changeHandler?: (React.ChangeEventHandler<HTMLInputElement>);
}

export default function SearchComponent({bgColor, changeHandler}: SearchComponentProps) {
  return (
    <>
      <label htmlFor="search-input" className="sr-only">
        검색
      </label>
      <input
        id="search-input"
        className={`basis-full h-36pxr py-0 px-10pxr bg-gray_150 ${bgColor} rounded-md focus:outline-primary`}
        type="text"
        placeholder="재료, 해시태그, 요리로 검색해주세요"
        onChange={changeHandler}
      />
    </>
  )

}
