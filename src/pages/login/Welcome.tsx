import { useEffect } from "react"
import { useNavigate } from "react-router-dom"



export function Welcome() {
  const navigate = useNavigate();


  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000)
  })

  return (
    <>
      <p className="text-xl bg-yellow-400">Welcome Back</p>
    </>
  )
}