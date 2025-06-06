import { useState } from "react"
import { usePrompt } from "react-router-prompt-plus"
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom"
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material"

function FormPage() {
  const [isDirty, setIsDirty] = useState(false)
  const { showPrompt, handleConfirm, handleCancel } = usePrompt({
    when: isDirty,
    ignoreHash: true,
  })

  const onConfirm = () => {
    handleConfirm()
    setIsDirty(false)
  }

  const onCancel = () => {
    handleCancel()
  }

  return (
    <Container maxWidth="sm">
      <h2>Form Page</h2>
      <TextField
        label="Name"
        variant="outlined"
        onChange={() => setIsDirty(true)}
        placeholder="Type something..."
      />
      <br />
      <br />
      <Link to="/other">Go to Other Page</Link>
      <Link to="#tab-1">Home tab 1</Link>
      <Link to="#tab-2">Home tab 2</Link>

      <Dialog
        open={showPrompt}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p>Changes are not saved. Leave anyway?</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onConfirm}>Leave</Button>
          <Button onClick={onCancel} autoFocus>
            Stay
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

function OtherPage() {
  return <Container maxWidth="sm">Other Page</Container>
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
