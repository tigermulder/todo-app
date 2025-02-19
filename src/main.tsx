import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './main.css'
import { worker } from './mocks/browser.ts'

// 중복호출경고
// worker.start()

const root = ReactDOM.createRoot(document.getElementById('root')!)

worker
  .start({
    quiet: true,
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  })
  .then(() => {
    return root.render(
      // <React.StrictMode>
      <App />
      // </React.StrictMode>
    )
  })
