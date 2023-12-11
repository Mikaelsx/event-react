import React, { useContext, useEffect, useState } from "react";
import ImageIllustrator from "../../components/ImageIllustartor/ImageIllustartor";
import logo from "../../assets/images/logo-pink.svg";
import { Input, Button } from "../../components/FormComponents/FormComponents";

import "./LoginPage.css";
import loginImage from "../../assets/images/login.svg"
import api from '../../Services/Service'
import { UserContext, userDecodeToken } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [user, setUser] = useState({email: "admin.admin@gmail.com", senha: "12345"});
  const navigate = useNavigate();
  const {userData, setUserData} = useContext(UserContext);

  useEffect(() => {
    if(userData.name) navigate("/")
  }, [userData])

  

  async function handleSubmit(e) {
    e.preventDefault();
    if (user.email.length >= 5 && user.senha.length > 3) {
        try {
            const promise = await api.post("/Login", {
                email: user.email,
                senha: user.senha
            });

            console.log(promise.data.token);

            const userFullToken = userDecodeToken(promise.data.token);

            setUserData(userFullToken);
            localStorage.setItem("token", JSON.stringify(userFullToken));
            navigate("/");
            
        } catch (error) {
            alert("Ooops... parece que o(a) email / senha foi digitado(a) de forma errada. ")
        }
    } else {
        alert("Ooops... parece que o(a) email / senha foi digitado(a) de forma errada. ")
    }
    console.log(user)
  }

  return (
    <div className="layout-grid-login">
      <div className="login">
        <div className="login__illustration">
          <div className="login__illustration-rotate"></div>
          <ImageIllustrator
            imageRender={loginImage}
            altText="Imagem de um homem em frente de uma porta de entrada"
            additionalClass="login-illustrator "
          />
        </div>

        <div className="frm-login">
          <img src={logo} className="frm-login__logo" alt="" />

          <form className="frm-login__formbox" 
          onSubmit={handleSubmit}>
            <Input
              className="frm-login__entry"
              type="email"
              id="login"
              name="login"
              required={true}
              value={user.email}
              manipulationFunction={(e) => {
                setUser({
                    ...user,
                    email: e.target.value
                })
              }}
              placeholder="Username"
            />
            <Input
              className="frm-login__entry"
              type="password"
              id="senha"
              name="senha"
              required={true}
              value={user.senha}
              manipulationFunction={(e) => {
                setUser({
                    ...user,
                    senha: e.target.value
                })
              }}
              placeholder="****"
            />

            <a href="" className="frm-login__link">
              Esqueceu a senha?
            </a>

            <Button
              text="Login"
              id="btn-login"
              name="btn-login"
              type="submit"
              className="frm-login__button"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
