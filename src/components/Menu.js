import React, { useState, useEffect, startTransition } from "react";
import { connect, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { logOut } from "../actions/UserActions";
import { persistor } from '../store';
import "../css/Menu.css";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Inicio from "../components/Inicio";
import ControleFiliados from "../components/ControleFiliados";
import FichaFiliado from "../components/FichaFiliado";
import { useNavigate, useLocation, useParams } from 'react-router-dom';

// Apagar constantes após criação de componentes e importação dos mesmos
const FiliadosScreen = () => <div>Filiados</div>;
const CalendarioScreen = () => <div>Calendario</div>;
const ApoioSocialScreen = () => <div>ApoioSocial</div>;
const SobreNosScreen = () => <div>SobreNos</div>;
const FaleConoscoScreen = () => <div>FaleConosco</div>;
const FiliarPessoaJuridicaScreen = () => <div>FiliarPessoaJuridica</div>;
const EnvioDocumentosScreen = () => <div>EnvioDocumentos</div>;
const ComunicarPagamentoScreen = () => <div>ComunicarPagamento</div>;
const DownloadsScreen = () => <div>Downloads</div>;
const DepartamentosScreen = () => <div>Departamentos</div>;
const LojaScreen = () => <div>Loja</div>;
const SecretariaScreen = () => <div>Secretaria</div>;
const PedidosLojaScreen = () => <div>PedidosLoja</div>;
const CadastroCalendarioScreen = () => <div>CadastroCalendario</div>;
const ExpedicaoDocumentosScreen = () => <div>ExpedicaoDocumentos</div>;

const Menu = ({ isAuthenticated, isAttendant, idNumber }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentScreen, setCurrentScreen] = useState(null);
  const { tela } = useParams();

  const sairConta = async () => {
    startTransition(async () => {
      persistor.purge();
      await dispatch(logOut);
      navigate(`/login`);
    });
  };

  useEffect(() => {
    if (tela && telas[tela]) {
      setCurrentScreen(() => telas[tela]);
    } else {
      setCurrentScreen(() => telas['Inicio']);
    }
  }, [tela]);

  const telas = {
    Inicio: <Inicio />,
    Filiados: <FiliadosScreen />,
    Calendario: <CalendarioScreen />,
    ApoioSocial: <ApoioSocialScreen />,
    SobreNos: <SobreNosScreen />,
    FaleConosco: <FaleConoscoScreen />,
    FiliarPessoaFisica: <FichaFiliado />,
    FiliarPessoaJuridica: <FiliarPessoaJuridicaScreen />,
    EnvioDocumentos: <EnvioDocumentosScreen />,
    ComunicarPagamento: <ComunicarPagamentoScreen />,
    Downloads: <DownloadsScreen />,
    Departamentos: <DepartamentosScreen />,
    Loja: <LojaScreen />,
    Secretaria: <SecretariaScreen />,
    ControleFiliados: <ControleFiliados />,
    PedidosLoja: <PedidosLojaScreen />,
    CadastroCalendario: <CadastroCalendarioScreen />,
    ExpedicaoDocumentos: <ExpedicaoDocumentosScreen />,
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
    { label: "ExpedicaoDocumentos", role: "ATENDENTE" }
  ];

  const filteredMenuItems = menuItems.filter(
    (item) => item.role === "GERAL" || (isAuthenticated && item.role === "FILIADO" && !isAttendant) || (isAuthenticated && item.role === "ATENDENTE" && isAttendant)
  );

  const handleMenuItemClick = (tela, event) => {
    event.preventDefault();
    navigate(`/inicio/${tela}`);
  };

  const handleCustomRedirect = (tela, event) => {
    event.preventDefault();
    navigate(`/${tela}`);
  };

  return (
    <div>
      <div id="header">
        <ul className="navBarUl">
          {filteredMenuItems.map((item) => (
          <li className="navBarLi" key={item.label} onClick={(event) => handleMenuItemClick(item.label, event)}>
            <a href="#">{t(`textosMenu.${item.label.toLowerCase()}`)}</a>
          </li>
          ))}
          
          {
            isAuthenticated ? (
              <DropdownButton
                as={ButtonGroup}
                key={'Danger'}
                id={`dropdown-variants-Danger`}
                variant={'danger'}
                title={t("textosMenu.perfil")}
              >
                {!isAttendant && (
                  <Dropdown.Item eventKey="1">
                    <a className="dropdown-item" onClick={(event) => handleCustomRedirect(`fichaDeFiliado/${idNumber}`, event)}>
                      {t("textosMenu.editarConta")}
                    </a>
                  </Dropdown.Item>
                )}
                {!isAttendant && <Dropdown.Divider />}
                <Dropdown.Item eventKey="2">
                  <button className="dropdown-item" type="button" onClick={async () => sairConta()}>
                    {t("textosMenu.sair")}
                  </button>
                </Dropdown.Item>
              </DropdownButton>
            ) : (
              <li className="navBarLi login-button">
                <button onClick={() => navigate('/login')}>
                  {t("formularioLoginTextos.entrar")}
                </button>
              </li>
            )
          }
        </ul>      
      </div>
      <div id="body">
        {currentScreen && React.isValidElement(currentScreen) && (
          <div>
            {React.createElement(currentScreen.type)}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.possuiConta,
  isAttendant: state.user.atendente,
  idNumber: state.user.numero
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);