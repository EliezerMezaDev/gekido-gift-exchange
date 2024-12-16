import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import GekidoContext from "./context/GekidoContext";

import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  const [student, setStudent] = useState<any>({});

  const getStudentData = () => {
    return student;
  };

  const setStudentData = (student: Gekido.Student) => {
    setStudent(student);
  };

  return (
    <GekidoContext.Provider value={{ getStudentData, setStudentData }}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path="*" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GekidoContext.Provider>
  );
}

export default App;
