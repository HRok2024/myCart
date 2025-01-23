import apiClient from "../utils/api-client";

//제품 id와 수량을 db에 저장한다
export function addToCartAPI(id, quantity) {
  return apiClient.post(`cart/${id}`, { quantity });
}
