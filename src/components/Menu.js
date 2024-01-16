import React, { useState, startTransition } from "react";
import { connect, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { logOut } from "../actions/UserActions";
import { persistor } from '../store';

// Criar componentes para cada "tela"
// (mantive as abreviações para facilitar a visualização)
const HomeScreen = () => <div>Home</div>;
const FiliadosScreen = () => <div>Filiados</div>;
const CalendarioScreen = () => <div>Calendario</div>;
const ApoioSocialScreen = () => <div>ApoioSocial</div>;
const SobreNosScreen = () => <div>SobreNos</div>;
const DoacoesScreen = () => <div>Doacoes</div>;
const FaleConoscoScreen = () => <div>FaleConosco</div>;
const FiliarPessoaFisicaScreen = () => <div>FiliarPessoaFisica</div>;
const FiliarPessoaJuridicaScreen = () => <div>FiliarPessoaJuridica</div>;
const EnvioDocumentosScreen = () => <div>EnvioDocumentos</div>;
const ComunicarPagamentoScreen = () => <div>ComunicarPagamento</div>;
const DownloadsScreen = () => <div>Downloads</div>;
const DepartamentosScreen = () => <div>Departamentos</div>;
const LojaScreen = () => <div>Loja</div>;
const SecretariaScreen = () => <div>Secretaria</div>;
const ControleFiliadosScreen = () => <div>ControleFiliados</div>;
const PedidosLojaScreen = () => <div>PedidosLoja</div>;
const CadastroCalendarioScreen = () => <div>CadastroCalendario</div>;
const ExpedicaoDocumentosScreen = () => <div>ExpedicaoDocumentos</div>;
const ControleReunioesScreen = () => <div>ControleReunioes</div>;

const Menu = ({ isAuthenticated, isAttendant }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [currentScreen, setCurrentScreen] = useState(null);

  const sairConta = async () => {
    startTransition(async () => {
      persistor.purge();
      await logOut(dispatch);
    });
  };

  // Mapear as "telas" para os componentes correspondentes
  const telas = {
    Home: <HomeScreen />,
    Filiados: <FiliadosScreen />,
    Calendario: <CalendarioScreen />,
    ApoioSocial: <ApoioSocialScreen />,
    SobreNos: <SobreNosScreen />,
    Doacoes: <DoacoesScreen />,
    FaleConosco: <FaleConoscoScreen />,
    FiliarPessoaFisica: <FiliarPessoaFisicaScreen />,
    FiliarPessoaJuridica: <FiliarPessoaJuridicaScreen />,
    EnvioDocumentos: <EnvioDocumentosScreen />,
    ComunicarPagamento: <ComunicarPagamentoScreen />,
    Downloads: <DownloadsScreen />,
    Departamentos: <DepartamentosScreen />,
    Loja: <LojaScreen />,
    Secretaria: <SecretariaScreen />,
    ControleFiliados: <ControleFiliadosScreen />,
    PedidosLoja: <PedidosLojaScreen />,
    CadastroCalendario: <CadastroCalendarioScreen />,
    ExpedicaoDocumentos: <ExpedicaoDocumentosScreen />,
    ControleReunioes: <ControleReunioesScreen />,
  };

  const menuItems = [
    { label: "Home", role: "GERAL" },
    { label: "Filiados", role: "GERAL" },
    { label: "Calendario", role: "GERAL" },
    { label: "ApoioSocial", role: "GERAL" },
    { label: "SobreNos", role: "GERAL" },
    { label: "Doacoes", role: "GERAL" },
    { label: "FaleConosco", role: "GERAL" },
    { label: "FiliarPessoaFisica", role: "GERAL" },
    { label: "FiliarPessoaJuridica", role: "FILIADO" },
    { label: "EnvioDocumentos", role: "FILIADO" },
    { label: "ComunicarPagamento", role: "FILIADO" },
    { label: "Downloads", role: "FILIADO" },
    { label: "Departamentos", role: "FILIADO" },
    { label: "Loja", role: "FILIADO" },
    { label: "Secretaria", role: "FILIADO" },
    { label: "ControleFiliados", role: "ATENDENTE" },
    { label: "PedidosLoja", role: "ATENDENTE" },
    { label: "CadastroCalendario", role: "ATENDENTE" },
    { label: "ExpedicaoDocumentos", role: "ATENDENTE" },
    { label: "ControleReunioes", role: "ATENDENTE" },
  ];

  const filteredMenuItems = menuItems.filter(
    (item) => item.role === "GERAL" || (isAuthenticated && item.role === "FILIADO" && !isAttendant) || (isAuthenticated && item.role === "ATENDENTE" && isAttendant)
  );

  const handleMenuItemClick = (tela) => {
    setCurrentScreen(telas[tela]);
  };

  return (
    <div>
      <ul>
        {filteredMenuItems.map((item) => (
          <li key={item.label} onClick={() => handleMenuItemClick(item.label)}>
            {t(`textosMenu.${item.label.toLowerCase()}`)}
          </li>
        ))}
        <li>
          <button
            className="btn btn-secondary mt-2"
            onClick={async () => sairConta()}
            type="button"
          >
            {isAuthenticated ? t("textosMenu.sair") : t("formularioLoginTextos.entrar")}
          </button>
        </li>
      </ul>

      {/* Renderizar a "tela" atual */}
      {currentScreen}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.possuiConta,
  isAttendant: state.user.atendente,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
