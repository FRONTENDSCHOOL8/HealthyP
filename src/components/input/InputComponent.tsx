interface InputProps {
  option: string;
  placeholder: string;
  bgColor?: string;
}

export default function InputComponent({option, placeholder, bgColor} : InputProps) {
  if(option === "search") {
    return (
      <>
        <input style={{backgroundColor: bgColor}} className="w-full h-36pxr py-0 px-10pxr bg-gray_150 rounded-md" type="text" placeholder={placeholder} />
      </>
    )
  } else if(option === "email") {
    return (
      <>
        <input type="email" className="w-full h-36pxr py-0 px-10pxr bg-gray_150 rounded-md" placeholder={placeholder} />
      </>
    )
  } else if(option === "password") {
    return (
      <>
        <input type="email" className="w-full h-36pxr py-0 px-10pxr bg-gray_150 rounded-md" placeholder={placeholder} />
      </>
    )
  }

  return null;
}
