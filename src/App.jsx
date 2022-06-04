import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./pages/UserList";
import User from "./pages/User";
import { NewUser } from "./pages/NewUser";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import NewProduct from "./pages/NewProduct";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import { currentUser } from "./requestMethods";

const App = () => {
  const adminCheck = currentUser !== null && currentUser.isAdmin;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {adminCheck && (
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:userId" element={<User />} />
            <Route path="/newUser" element={<NewUser />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:productId" element={<Product />} />
            <Route path="/newProduct" element={<NewProduct />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
