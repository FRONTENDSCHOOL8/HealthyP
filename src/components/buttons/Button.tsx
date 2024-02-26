





// type ButtonArgs = {
//   clickHandler : ,
//   text : string
// }


interface ButtonArgs = {
  clickHandler: Function,
}

export default function Button(props) {
  return (
    <>
      <button onClick={props.clickHandler}>{props.text}</button>
    </>
  )
}