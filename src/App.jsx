import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { jwtDecode } from "jwt-decode";
import {
  addToCartAPI,
  decreaseProductAPI,
  getCartAPI,
  increaseProductAPI,
  removeFromCartAPI,
} from "./services/cartServices";
import setAuthToken from "./utils/setAuthToken";
import { ToastContainer, toast } from "react-toastify";
import UserContext from "./contexts/UserContext";
import CartContext from "./contexts/CartContext";

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
      .then((res) => toast.success("상품 추가 성공"))
      .catch((err) => toast.error("상품 추가 실패"));
  };

  //장바구니에서 물건 삭제
  const removeFromCart = (id) => {
    const oldCart = [...cart]; //현재 카트 복사
    const newCart = oldCart.filter((item) => item.product._id != id); //id와 같지않는 항목만 남는다
    setCart(newCart);
    removeFromCartAPI(id).catch((err) =>
      toast.error("장바구니 상품 삭제 실패")
    );
  };

  const updateCart = (type, id) => {
    const updatedCart = [...cart];
    const i = updatedCart.findIndex((item) => item.product._id === id);
    if (type === "increase") {
      updatedCart[i].quantity += 1; //해당 상품의 수량을 1 증가
      setCart(updatedCart);
      increaseProductAPI(id).catch((err) => toast.err("상품 증가 에러"));
    }
    if (type === "decrease") {
      updatedCart[i].quantity -= 1; //해당 상품의 수량을 1 감소
      setCart(updatedCart);
      decreaseProductAPI(id).catch((err) => toast.err("상품 감소 에러"));
    }
  };

  //서버에서 장바구니 정보를 가져온다
  const getCart = () => {
    getCartAPI()
      .then((res) => setCart(res.data))
      .catch((err) => toast.error("카트 가져오기 실패"));
  };

  useEffect(() => {
    if (user) getCart();
  }, [user]);

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
    <UserContext.Provider value={user}>
      <CartContext.Provider
        value={{ cart, addToCart, removeFromCart, updateCart }}
      >
        <div className="app">
          <Navbar user={user} cartCount={cart.length} />
          <main>
            <ToastContainer position="bottom-right" />
            <Routing />
          </main>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
