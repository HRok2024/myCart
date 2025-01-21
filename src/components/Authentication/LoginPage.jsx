import React, { useRef, useState } from "react";
import "./LoginPage.css";

const LoginPage = () => {
  // const passwordRef = useRef(null);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    setUser({ email: "", password: "" });
  };
  return (
    <section className="align_center form_page">
      {/* 버튼 태그가 아니라 form에 onSubmit을 해줘야한다 */}
      <form onSubmit={handleSubmit} className="authentication_form">
        <h2>로그인 폼</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form_text_input"
              placeholder="이메일 입력..."
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              value={user.email}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              // ref={passwordRef}
              id="password"
              className="form_text_input"
              placeholder="패스워드"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              value={user.password}
            />
            {/* <button
              type="button"
              onClick={() => (passwordRef.current.type = "password")}
            >
              비밀번호 숨기기
            </button>
            <button
              type="button"
              onClick={() => (passwordRef.current.type = "text")}
            >
              비밀번호 보이게
            </button> */}
          </div>

          <button type="submit" className="search_button form_submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
