import React, { useState } from "react";
import UsersSelect from "./UsersSelect";
import { setUserSession } from "./Utils/Common";

function Login(props) {
  const [loading, setLoading] = useState(false);
  const mailField = useFormInput("");
  const passwordField = useFormInput("");
  const [error, setError] = useState(null);
  const LOGIN_PATH = "http://localhost:8081/api/auth/login";

  const handleLogin = () => {
    setError(null);
    setLoading(true);
    var request = new XMLHttpRequest();
    request.open("POST", LOGIN_PATH);
    request.setRequestHeader("Content-Type", "application/json");
    var userMail = mailField.value;
    try {
      request.send(
        JSON.stringify({ mail: userMail, password: passwordField.value })
      );
      request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 200) {
            var token = JSON.parse(request.response, function (key, value) {
              if (key === "token") {
                let tokenValue = JSON.stringify(value);
                if (tokenValue.length !== 0) {
                  console.log(tokenValue);
                   UsersSelect obj; 
              
                }
              }
            });
            console.log(token);
            setLoading(false);
          } else {
            setError("invalid credentials");
          }
        }
      };
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      Login
      <br />
      <br />
      <div>
        Mail
        <br />
        <input type="text" {...mailField} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password
        <br />
        <input type="password" {...passwordField} autoComplete="new-password" />
      </div>
      {error && (
        <>
          <small style={{ color: "red" }}>{error}</small>
          <br />
        </>
      )}
      <br />
      <input
        type="button"
        value={loading ? "Loading..." : "Login"}
        onClick={handleLogin}
        disabled={loading}
      />
      <br />
    </div>
  );
}

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default Login;
