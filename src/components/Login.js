import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN, LOGOUT } from "../actions/UserActions";
import "../css/Login.css"
import { useTranslation } from 'react-i18next';
// import brazilFlag from "../images/brazil.svg";
// import usaFlag from "../images/usa.svg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAttendant, setIsAttendant] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const dispatch = useDispatch();

  const userPlaceholder = isAttendant ? t("formularioLoginTextos.matriculaAtendente") : t("formularioLoginTextos.cpf");
  const passwordPlaceholder = isAttendant ? t("formularioLoginTextos.numeroAtendente") : t("formularioLoginTextos.numeroRol");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({
      type: LOGIN,
      payload: {
        username,
        password,
      },
    });

    setUsername("");
    setPassword("");
  };    

  const handleAttendantChange = (e) => {
    setIsAttendant(e.target.checked);
  };

  return (
    <div className="login-container background-image">      
      <div className="login-form">
        <h1>{t("formularioLoginTextos.entrarTitulo")}</h1>        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder={userPlaceholder}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mt-2">
            <input
              type="password"
              className="form-control"
              placeholder={passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group mt-2">
            <label>
              <input
                type="checkbox"
                checked={isAttendant}
                onChange={handleAttendantChange}
              /> {t("formularioLoginTextos.atendente")}
            </label>
          </div>
          <div className="mt-2">
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary" type="submit">{t("formularioLoginTextos.entrar")}</button>
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-secondary mt-2" type="button">{t("formularioLoginTextos.entrarSemConta")}</button>
            </div>
          </div>
          <div className="mt-2">
            <div className="language-buttons">
              <button type="button" className="button-brazil" onClick={() => changeLanguage('pt')}></button>
              <button type="button" className="button-usa" onClick={() => changeLanguage('en')}></button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;