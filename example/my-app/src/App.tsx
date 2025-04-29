import { useState } from "react"
import { usePrompt } from "react-router-prompt-plus"
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom"

function FormPage() {
  const [isDirty, setIsDirty] = useState(false)
  const { showPrompt, handleConfirm, handleCancel } = usePrompt({
    when: isDirty,
  })

  return (
    <div>
      <h2>Form Page</h2>
      <input
        onChange={() => setIsDirty(true)}
        placeholder="Type something..."
      />
      <br />
      <Link to="/other">Go to Other Page</Link>

      {showPrompt && (
        <div style={{ background: "#eee", padding: 20 }}>
          <p>Changes are not saved. Leave anyway?</p>
          <button onClick={handleConfirm}>Leave</button>
          <button onClick={handleCancel}>Stay</button>
        </div>
      )}
    </div>
  )
}

function OtherPage() {
  return <h2>Other Page</h2>
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <FormPage />,
    errorElement: <div>Error Home Page</div>,
  },
  {
    path: "/other",
    element: <OtherPage />,
    errorElement: <div>Error Other Page</div>,
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
