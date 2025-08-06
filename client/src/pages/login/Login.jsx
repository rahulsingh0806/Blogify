// import axios from "axios";
// import { useContext, useRef } from "react";
// import { Link } from "react-router-dom";
// import { Context } from "../../context/Context";
// import "./login.css";

// export default function Login() {
//   const userRef = useRef();
//   const passwordRef = useRef();
//   const { dispatch, isFetching } = useContext(Context);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     dispatch({ type: "LOGIN_START" });
//     try {
//       const res = await axios.post("/auth/login", {
//         username: userRef.current.value,
//         password: passwordRef.current.value,
//       });
//       dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
//     } catch (err) {
//       dispatch({ type: "LOGIN_FAILURE" });
//     }
//   };

//   return (
//     <div className="login">
//       <span className="loginTitle">Login</span>
//       <form className="loginForm" onSubmit={handleSubmit}>
//         <label>Username</label>
//         <input
//           type="text"
//           className="loginInput"
//           placeholder="Enter your username..."
//           ref={userRef}
//         />
//         <label>Password</label>
//         <input
//           type="password"
//           className="loginInput"
//           placeholder="Enter your password..."
//           ref={passwordRef}
//         />
//         <button className="loginButton" type="submit" disabled={isFetching}>
//           Login
//         </button>
//       </form>
//       <button className="loginRegisterButton">
//         <Link className="link" to="/register">
//           Register
//         </Link>
//       </button>
//     </div>
//   );
// }

import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Link, useHistory  } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState(false);
  const history = useHistory();
  const baseURL = process.env.REACT_APP_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    if (!userRef.current.value || !passwordRef.current.value) {
      setError("Please fill all fields");
      return;
    }

    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${baseURL}/auth/login`, {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      history.push("/home"); // Redirect to home on success
    } catch (err) {
      setError("Invalid credentials");
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          {isFetching ? "Logging in..." : "Login"}
        </button>
        {error && <span className="loginError">{error}</span>}
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
