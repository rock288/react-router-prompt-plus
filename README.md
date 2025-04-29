# react-router-prompt-plus

Block navigation in React Router and show a custom confirmation dialog before leaving the page.

## ✨ Features

- ✅ Blocks route transitions (`react-router-dom@6+`)
- ✅ Supports `beforeunload` (tab close, reload)
- ✅ UI agnostic – _you write your own confirmation UI_
- ✅ Built with TypeScript

---

## 📦 Installation

```bash
npm install react-router-prompt-plus
```

### 🚀 Usage

```typescript
import { usePrompt } from "react-router-prompt-plus"

function MyForm() {
  const [isDirty, setIsDirty] = useState(false)

  const { showPrompt, handleConfirm, handleCancel } = usePrompt({
    when: isDirty,
  })

  return (
    <div>
      <input onChange={() => setIsDirty(true)} />
      {showPrompt && (
        <div className="modal">
          <p>Are you sure you want to leave this page?</p>
          <button onClick={handleConfirm}>Yes</button>
          <button onClick={handleCancel}>No</button>
        </div>
      )}
    </div>
  )
}
```

### ⚙️ API

`usePrompt(options: UsePromptOptions): UsePromptReturn`

Options

| Name         |  Type   | Default |                    Description |
| :----------- | :-----: | ------: | -----------------------------: |
| when         | boolean |         |    Whether to block navigation |
| beforeUnload | boolean |    true | Block browser tab close/reload |

- Returns

```typescript
{
  showPrompt: boolean;
  handleConfirm: () => void;
  handleCancel: () => void;
}
```

### 🛠️ License

MIT – Made by `Rock288`
