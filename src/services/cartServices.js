import apiClient from "../utils/api-client";

//제품 id와 수량을 db에 저장한다
export function addToCartAPI(id, quantity) {
  return apiClient.post(`cart/${id}`, { quantity });
}

//유저별로 저장된 카트정보를 가져오기
export function getCartAPI() {
  return apiClient.get("cart");
}
