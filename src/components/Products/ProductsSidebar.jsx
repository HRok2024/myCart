import React, { useEffect, useState } from "react";
import "./ProductsSidebar.css";
import LinkWithIcon from "../Navbar/LinkWithIcon";
import useData from "../Hook/useData";

const ProductsSidebar = () => {
  const { data: categories, error } = useData("category");
  return (
    <aside className="products_sidebar">
      <h2>카테고리</h2>

      <div className="category_links">
        {error && <em>{error}</em>}
        {categories &&
          categories.map((c) => (
            <LinkWithIcon
              key={c._id}
              title={c.name}
              link={`/products?category=${c.name}`}
              emoji={`http://localhost:5000/category/${c.image}`}
              sidebar={true}
            />
          ))}
      </div>
    </aside>
  );
};

export default ProductsSidebar;
