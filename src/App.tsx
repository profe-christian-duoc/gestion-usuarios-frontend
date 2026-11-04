import { Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import InicioPage from "./pages/InicioPage";
import UsuariosPage from "./pages/UsuariosPage";
import AcercaPage from "./pages/AcercaPage";
import NoEncontradoPage from "./pages/NoEncontradoPage";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<InicioPage />} />
        <Route path="usuarios" element={<UsuariosPage />} />
        <Route path="acerca" element={<AcercaPage />} />
        <Route path="*" element={<NoEncontradoPage />} />
      </Route>
    </Routes>
  );
}
