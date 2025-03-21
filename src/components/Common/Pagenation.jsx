import React from "react";
import "./Pagenation.css";

//전체 아이템 개수, 한페이지 표시 아이템수, 클릭함수, 현재페이지
const Pagenation = ({ total, perPage, onClick, currentPage }) => {
  let pages = []; //페이지 배열
  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pages.push(i);
  }
  currentPage = currentPage ? currentPage : 1; //현재페이지 없으면 1
  return (
    <>
      {pages.length > 1 && (
        <ul className="pagination">
          {pages.map((page) => (
            <li key={page}>
              <button
                className={
                  parseInt(currentPage) === page
                    ? "pagination_button active"
                    : "pagination_button"
                }
                onClick={() => onClick(page)}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Pagenation;
