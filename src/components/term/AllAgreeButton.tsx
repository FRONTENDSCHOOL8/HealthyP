interface AllAgreeButtonProps {
  isCheckedAll: boolean;
  handleAllCheckedChange: () => void;
}

const PRIMARY_COLOR = '#91BD14';
const DEFAULT_COLOR = '#B2B2B3';
const TEXT_BLACK = 'text-[#000000]';
const TEXT_GRAY = 'text-[#3C3C43B2]';

export default function AllAgreeButton({
  isCheckedAll,
  handleAllCheckedChange,
}: AllAgreeButtonProps) {
  return (
    <div role="group" className="flex items-center pb-10pxr">
      <input
        type="checkbox"
        name="agreeAll"
        id="agreeAll"
        className="hidden cursor-pointer"
        onChange={handleAllCheckedChange}
        checked={isCheckedAll}
      />
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleAllCheckedChange}
        className="cursor-pointer"
      >
        <path
          d="M10.601 14.1664L8.28897 11.8496C8.15145 11.7153 7.98718 11.6465 7.79617 11.6433C7.60515 11.6401 7.43881 11.7093 7.29714 11.851C7.15227 11.9959 7.07984 12.1622 7.07984 12.35C7.07984 12.5378 7.15081 12.7011 7.29274 12.8398L10.001 15.5481C10.1704 15.7237 10.3698 15.8115 10.5991 15.8115C10.8285 15.8115 11.0307 15.7237 11.2058 15.5481L16.6885 10.0654C16.8237 9.93014 16.8929 9.767 16.8962 9.57597C16.8994 9.38495 16.8301 9.21701 16.6885 9.07214C16.5436 8.93047 16.3773 8.85964 16.1894 8.85964C16.0016 8.85964 15.838 8.92937 15.6985 9.06884L10.601 14.1664ZM12.0023 21.2981C10.7164 21.2981 9.50757 21.0537 8.37567 20.5649C7.24377 20.0762 6.25917 19.4129 5.42187 18.5751C4.58457 17.7372 3.92192 16.7534 3.43394 15.6237C2.94596 14.4939 2.70197 13.2868 2.70197 12.0023C2.70197 10.7164 2.94634 9.50757 3.43509 8.37567C3.92382 7.24377 4.58712 6.25917 5.42497 5.42187C6.2628 4.58457 7.24659 3.92192 8.37634 3.43394C9.50609 2.94596 10.7132 2.70197 11.9977 2.70197C13.2836 2.70197 14.4925 2.94634 15.6244 3.43509C16.7563 3.92382 17.7409 4.58711 18.5782 5.42496C19.4155 6.2628 20.0781 7.24659 20.5661 8.37634C21.0541 9.50609 21.2981 10.7132 21.2981 11.9977C21.2981 13.2836 21.0537 14.4925 20.5649 15.6244C20.0762 16.7563 19.4129 17.7409 18.5751 18.5782C17.7372 19.4155 16.7534 20.0781 15.6237 20.5661C14.4939 21.0541 13.2868 21.2981 12.0023 21.2981Z"
          fill={isCheckedAll ? PRIMARY_COLOR : DEFAULT_COLOR}
        />
      </svg>
      <label
        htmlFor="agreeAll"
        className={`ml-8pxr text-body-em cursor-pointer ${isCheckedAll ? TEXT_BLACK : TEXT_GRAY}`}
      >
        전체 동의하기
      </label>
    </div>
  );
}
