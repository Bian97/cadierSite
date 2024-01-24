import React, { useState, startTransition } from "react";
import { connect, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { logOut } from "../actions/UserActions";
import { persistor } from '../store';
import "../css/Menu.css";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Inicio from "../components/Inicio";

// Apagar constantes após criação de componentes e importação dos mesmos
const FiliadosScreen = () => <div>Filiados</div>;
const CalendarioScreen = () => <div>Calendario</div>;
const ApoioSocialScreen = () => <div>ApoioSocial</div>;
const SobreNosScreen = () => <div>SobreNos</div>;
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
    Inicio: <Inicio />,
    Filiados: <FiliadosScreen />,
    Calendario: <CalendarioScreen />,
    ApoioSocial: <ApoioSocialScreen />,
    SobreNos: <SobreNosScreen />,
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
    { label: "Inicio", role: "GERAL" },
    { label: "Filiados", role: "GERAL" },
    { label: "Calendario", role: "GERAL" },
    { label: "ApoioSocial", role: "GERAL" },
    { label: "SobreNos", role: "GERAL" },
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

  const handleMenuItemClick = (tela, event) => {
    event.preventDefault();
    setCurrentScreen(() => telas[tela]);
  };

  return (
    <div>
      <ul>
        {filteredMenuItems.map((item) => (
          <li key={item.label} onClick={(event) => handleMenuItemClick(item.label, event)}>
          <a href="#">{t(`textosMenu.${item.label.toLowerCase()}`)}</a>
        </li>
        ))}
        <DropdownButton
            as={ButtonGroup}
            key={'Danger'}
            id={`dropdown-variants-Danger`}
            variant={'danger'}
            title={t("textosMenu.perfil")}
          >
            <Dropdown.Item eventKey="1"><a className="dropdown-item" href="#">{t("textosMenu.editarConta")}</a></Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="2"><button className="dropdown-item" type="button" onClick={async () => sairConta()}>{t("textosMenu.sair")}</button></Dropdown.Item>
          </DropdownButton>
      </ul>

      {currentScreen && React.isValidElement(currentScreen) && (
        <div>
          {React.createElement(currentScreen.type)}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.possuiConta,
  isAttendant: state.user.atendente,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);