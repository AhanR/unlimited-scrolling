import React, { useState } from 'react'

export const Context = React.createContext();
export default function CountContext({ children }) {

    const [count, setCount] = useState(0);

  return (
    <Context.Provider value={{count, setCount}} >
        {children}
    </Context.Provider>
  )
}