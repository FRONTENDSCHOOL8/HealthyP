import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export function CreateComplete() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000)
  })

  return (
    <>
      <p className="bg-primary">Register Complete!</p>
    </>
  )
}