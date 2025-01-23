import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { jwtDecode } from "jwt-decode";
import { addToCartAPI } from "./services/cartServices";
import setAuthToken from "./utils/setAuthToken";
import { ToastContainer, toast } from "react-toastify";

//만약 토큰이 있다면 axios 설정에 추가된다
setAuthToken(localStorage.getItem("token"));

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]); //장바구니
  const addToCart = (product, quantity) => {
    const updatedCart = [...cart]; //장바구니 복사
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product._id
    );
    if (productIndex === -1) {
      updatedCart.push({ product, quantity });
    } else {
      updatedCart[productIndex].quantity += quantity;
    }
    setCart(updatedCart);

    addToCartAPI(product._id, quantity)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const jwtUser = jwtDecode(jwt);
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        window.location.reload(); //새로고침
      }
      setUser(jwtUser);
    } catch (error) {} //토큰이 없는 경우는 그냥 간다
  }, []);
  return (
    <div className="app">
      <Navbar user={user} cartCount={cart.length} />
      <main>
        <Routing addToCart={addToCart} />
      </main>
    </div>
  );
}

export default App;
