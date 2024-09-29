
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import ReactDOM from "react-dom/client"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import store from "./store/store"
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

serviceWorker.unregister()
