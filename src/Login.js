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
    var userMail = mailField.value;
    setError(null);
    setLoading(true);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", LOGIN_PATH);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(
      JSON.stringify({ mail: userMail, password: passwordField.value })
    );
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var tokenValue = JSON.parse(xhr.responseText).token;
        if (tokenValue.length !== 0) {
          console.log(tokenValue);

          const USERS_API_URL = "http://localhost:8081/api/users";
          var getUsersRequest = new XMLHttpRequest();
          getUsersRequest.open("GET", USERS_API_URL);
          getUsersRequest.setRequestHeader(
              "Authorization",
              `Bearer ${tokenValue}`
          );

          getUsersRequest.onreadystatechange = function () {
            if (getUsersRequest.status === 200) {
              var response = getUsersRequest.responseText;
              console.log(response);
            }
          };
          getUsersRequest.send();
        }
        setLoading(false);
      } else {
        setError("invalid credentials");
      }
    };
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
