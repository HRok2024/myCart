import React from "react";
import "./FeaturedProducts.css";
import ProductCard from "../Products/ProductCard";
import useData from "../Hook/useData";
import ProductCardSkeleton from "../Products/ProductCardSkeleton";

const FeaturedProducts = () => {
  const { data: products, error, isLoading } = useData("products/featured");
  console.log(products);
  const skeletons = [1, 2, 3];
  return (
    <section className="featured_products">
      <h2>주요제품</h2>

      <div className="align_center featured_products_list">
        {error && <em className="form_error">{error}</em>}
        {isLoading && skeletons.map((n) => <ProductCardSkeleton key={n} />)}

        {products &&
          !isLoading &&
          products.map((p) => <ProductCard key={p._id} product={p} />)}
      </div>
    </section>
  );
};

export default FeaturedProducts;
