import React, { createContext } from 'react'
// import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import App from './App'
import Store from './store/store'

interface State {
  store: Store,
}

const store = new Store()

export const Context = createContext<State>({
  store,
})

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
    <Context.Provider value={{
      store
    }}>
    <App />
    </Context.Provider>
)

// ReactDOM.render(
//     <Context.Provider value={{
//       store
//     }}>
//     <App />
//     </Context.Provider>,
//     document.getElementById('root')
// )