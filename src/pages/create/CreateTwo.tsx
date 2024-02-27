import { Link } from "react-router-dom"


export function CreateTwo() {
  return (
    <>
      <Link to="../three" relative="path" className="bg-red-400 p-2 flex justify-center">페이지 2</Link>
    </>
  )
}