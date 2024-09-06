import { BrowserRouter, Route, Routes } from "react-router-dom"
import Widgets from "./Widgets"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Widgets />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
