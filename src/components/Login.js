import React, { useState, startTransition } from "react";
import { useDispatch } from "react-redux";
import { loginUser, loginSemContaUser } from "../actions/UserActions";
import "../css/Login.css"
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAttendant, setIsAttendant] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const userPlaceholder = isAttendant ? t("formularioLoginTextos.cpf") : t("formularioLoginTextos.cpf");
  const passwordPlaceholder = isAttendant ? t("formularioLoginTextos.numeroAtendente") : t("formularioLoginTextos.numeroRol");

  const dispatch = useDispatch();
  const entrarSemConta = async () => 
  {
    startTransition(async () => {
      await loginSemContaUser(dispatch); 
      navigate(`/inicio`);
    });   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      try 
      {        
          await loginUser(username, password, isAttendant, dispatch);
          navigate(`/inicio`);
      } 
      catch (error) 
      {
        document.querySelector(".erroLogin").style.display = "block";
        if(error.response != null)
        {
          switch(error.response.status)
          {
            case 401:
              document.querySelector(".erroLogin").textContent = t("formularioLoginTextos.erroLoginInvalido");
              break;
            case 400:
              document.querySelector(".erroLogin").textContent = t("formularioLoginTextos.erroLogin");
              break;
          }        
        }
        else
            document.querySelector(".erroLogin").textContent = t("formularioLoginTextos.servidorFora");    
      }
    });
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
              type="number"
              className="form-control"
              placeholder={userPlaceholder}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group mt-2">
            <input
              type="password"
              className="form-control"
              placeholder={passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />            
          </div>
          <div className="form-group mt-2">
            <label
              className="erroLogin"
            >
            </label>
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
              <button className="btn btn-secondary mt-2" onClick={ async() => entrarSemConta()} type="button">{t("formularioLoginTextos.entrarSemConta")}</button>
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