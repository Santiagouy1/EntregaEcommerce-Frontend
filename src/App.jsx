import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./utils/guard/ProtectedRoute";

import Main from "./layouts/main/Main";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import AdminUser from "./pages/adminUser/AdminUser";
import AdminProduct from "./pages/adminProduct/AdminProduct";
import LogIn from "./pages/logIn/LogIn";
import ProductDetail from "./pages/productDetail/ProductDetail";
import NotFound from "./pages/notFound/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LogIn title="TecnoMart | LogIn" />} />

      <Route path="/" element={<Main />}>
        <Route
          index
          element={<Home title="TecnoMart | Tu mundo digital empieza aquí" />}
        />
        <Route path="/about" element={<About title="TecnoMart | Sobre nosotros" />} />
        <Route path="/contact" element={<Contact title="TecnoMart | Contacto" />} />
        <Route path="/register" element={<Register title="TecnoMart | Registrarse" />} />

        <Route path="/pages/products/:id" element={<ProductDetail />} />

        {/* Rutas protegidas para admin */}
        <Route
          path="/admin-products"
          element={
            <ProtectedRoute>
              <AdminProduct title="TecnoMart | Administrador de productos" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-users"
          element={
            <ProtectedRoute>
              <AdminUser title="TecnoMart | Administrador de usuarios" />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
