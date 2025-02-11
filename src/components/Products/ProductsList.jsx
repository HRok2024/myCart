import React, { useEffect, useState } from "react";
import "./ProductsList.css";
import ProductCard from "./ProductCard";
import useData from "../Hook/useData";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";
import Pagenation from "../Common/Pagenation";

const ProductsList = () => {
  const [search, setSearch] = useSearchParams(); //요청주소 뒤의 쿼리스트링
  console.log(search);
  const category = search.get("category"); //'category=값' 이 값을 가져온다
  const page = search.get("page"); //몇번째 페이지
  const searchQuery = search.get("search");
  const { data, error, isLoading } = useData(
    "products",
    {
      params: {
        search: searchQuery,
        category: category,
        page: page,
      },
    },
    [searchQuery, category, page]
  );
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];
  const handlePageChange = (page) => {
    //기존의 검색한 카테고리가 있으면 유지하면서 페이지만 업데이트
    const currentParams = Object.fromEntries([...search]);
    setSearch({ ...currentParams, page: page });
  };
  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>상품목록</h2>
        <select name="sort" id="" className="products_sorting">
          <option value="">정렬방법</option>
          <option value="price desc">가격높은순</option>
          <option value="price asc">가격낮은순</option>
          <option value="rate desc">평점높은순</option>
          <option value="rate asc">평점낮은순</option>
        </select>
      </header>

      <div className="products_list">
        {error && <em className="form_error">{error}</em>}
        {isLoading && skeletons.map((n) => <ProductCardSkeleton key={n} />)}

        {data.products &&
          !isLoading &&
          data.products.map((p) => <ProductCard key={p._id} product={p} />)}
      </div>
      {/* 페이지네이션 */}
      {data && (
        <Pagenation
          total={data.totalProducts}
          perPage={8}
          onClick={handlePageChange}
          currentPage={page}
        />
      )}
    </section>
  );
};

export default ProductsList;
