import React, { useState, startTransition } from "react";
import { connect, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { logOut } from "../actions/UserActions";
import { persistor } from '../store';

const Menu = ({ isAuthenticated }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const sairConta = async () => {
    startTransition(async () => {
      persistor.purge();
      await logOut(dispatch);
    });
  };

  return (
    <div>
      <ul>
        <li>Home</li>
        {isAuthenticated ? 
        (
          <>
            <li>Opção para usuários logados</li>
            <li>
              <button
                className="btn btn-secondary mt-2"
                onClick={async () => sairConta()}
                type="button"
              >
                {t("textosMenu.sair")}
              </button>
            </li>
          </>
        ) : 
        (
            <>
            <li>Opção para usuários não logados</li>
            <li>
                <button
                    className="btn btn-secondary mt-2"
                    onClick={async () => sairConta()}
                    type="button"
                >
                    {t("formularioLoginTextos.entrar")}
                </button>
                </li>
            </>
        )}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.possuiConta,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
