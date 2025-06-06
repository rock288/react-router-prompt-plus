# react-router-prompt-plus

Block navigation in React Router and show a custom confirmation dialog before leaving the page.

## ✨ Features

- ✅ Blocks route transitions (`react-router-dom@6.4.0 - latest`) and shall be ideally used with [data routers](https://reactrouter.com/6.28.1/routers/picking-a-router#using-v64-data-apis)
- ✅ Supports `beforeunload` (tab close, reload)
- ✅ UI agnostic – _you write your own confirmation UI_
- ✅ Built with TypeScript

---

## 📦 Installation

```bash
npm install react-router-prompt-plus
```

## [✨ Example](https://github.com/rock288/react-router-prompt-plus/blob/main/example/my-app/src/App.tsx)

## [✨ Demo react-router-dom version 6.4.0 - latest version 6](https://codesandbox.io/p/sandbox/wvm2s3?file=%2Fsrc%2FApp.js%3A15%2C28)

## [✨ Demo react-router-dom version 7](https://codesandbox.io/p/devbox/z5hsxf?file=%2Fsrc%2FApp.jsx%3A25%2C2)

## 🚀 Usage

```typescript
import { usePrompt } from "react-router-prompt-plus"

function MyForm() {
  const [isDirty, setIsDirty] = useState(false)

  const { showPrompt, handleConfirm, handleCancel } = usePrompt({
    when: isDirty,
    ignoreHash: true,
    ignoreSearch: true,
  })

  const onConfirm = () => {
    handleConfirm()
    setIsDirty(false)
  }

  const onCancel = () => {
    handleCancel()
  }

  return (
    <div>
      <input onChange={() => setIsDirty(true)} />
      {showPrompt && (
        <div className="modal">
          <p>Are you sure you want to leave this page?</p>
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      )}
    </div>
  )
}
```

## ⚙️ API

`usePrompt(options: UsePromptOptions): UsePromptReturn`

Options

| Name         |  Type   | Default |                                                            Description |
| :----------- | :-----: | ------: | ---------------------------------------------------------------------: |
| when         | boolean |         |                                            Whether to block navigation |
| beforeUnload | boolean |    true |                                         Block browser tab close/reload |
| ignoreHash   | boolean |    true |   Ignore comparing the hash field of currentLocation and nextLocation. |
| ignoreSearch | boolean |    true | Ignore comparing the search field of currentLocation and nextLocation. |

- Returns

```typescript
{
  showPrompt: boolean;
  handleConfirm: () => void;
  handleCancel: () => void;
}
```

## 🛠️ License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
