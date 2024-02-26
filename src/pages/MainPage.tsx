import { Form } from "react-router-dom"



export default function MainPage() {
  return (
    <div>
      <Form method="post" action="/events">
        <input type="text" name="title" />
        <input type="text" name="description" />
        <button type="submit">Create</button>
      </Form>
      <p>This is the main page</p>
    </div>
  )
}