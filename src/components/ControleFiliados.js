import React, { useState, startTransition } from "react";
import { connect, useDispatch } from 'react-redux';
import { Card, CardContent, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { CARGOS, CONDICAO } from '../constants/Constants';
import BootstrapTable from 'react-bootstrap-table-next';
import { selectRow, pagination } from './util/DatatableHelper';
import { getFiliados } from "../actions/ControleFiliadosActions";
import { logOut } from "../actions/UserActions";
import { persistor } from '../store';
import { useNavigate } from 'react-router-dom';


const ControleFiliados = ({ token }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    numeroRol: "",
    documento: "",
    numeroRolIgreja: "",
    nomeIgreja: "",
    cidade: "",
    estado: "",
    pais: "",
    cargo: "",
    condicao: "",
    filiado: false
  });

  const [filiadosState, setFiliadosState] = useState([]);

  const columns = [
    { dataField: 'idPFisica', text: t("textosControleFiliados.numeroRol"), width: 150 },
    { dataField: 'nome', text: t("geral.nome"), width: 150 },
    { 
      dataField: 'cargo',
      text: 'Cargo',
      formatter: (cell) => {
        const cargo = CARGOS.find(cargo => cargo.id === cell);
        return cargo ? cargo.nome : '';
      },
      width: 150 
    },
    { dataField: 'endereco.rua', text: t("geral.endereco"), width: 150 },
    { dataField: 'pessoaJuridica.nome', text: t("textosControleFiliados.nomeIgreja"), width: 150 },
    { dataField: 'telefone1', text: t("geral.telefone"), width: 150 },
    { dataField: 'situacaoCadastral.eFiliado', text: t("geral.filiado"), 
      formatter: (cell) => 
      { 
        return t("geral."+cell);
      },
      width: 150 },
    { 
      dataField: 'detalhes', 
      text: t("geral.detalhes"), 
      formatter: (cell, row) => {
        return (
        <>
          <Button variant="contained" color="primary" onClick={() => handleVerFicha(row)}>Ver Ficha</Button>
          <span style={{ margin: '1%' }}></span>
          <Button variant="contained" color="primary" onClick={() => handleVerPedidos(row)}>Ver Pedidos</Button>
          <span style={{ margin: '1%' }}></span>
          <Button variant="contained" color="primary" onClick={() => handleVerPessoaJuridica(row)}>Ver Pessoa Jurídica</Button>
        </>
        );
      },
      width: 300 
    },  
  ];

  const handleVerFicha = (row) => {
    navigate(`/fichaDeFiliado/${row.idPFisica}`);
  };

  const handleVerPedidos = (row) => {
    // Lógica para mostrar a ficha do filiado
    console.log("Ver pedidos de:", row.nome);
  };

  const handleVerPessoaJuridica = (row) => {
    // Lógica para mostrar a ficha do filiado
    console.log("Ver pessoa jurídica de:", row.nome);
  };

  const handleChange = event => {
    const { name, value, type, checked } = event.target;
    const filterValue = type === "checkbox" ? checked : value;
    setFilters({ ...filters, [name]: filterValue });
  };

  // const handleCheckAll = (isChecked) => {
  //   const updatedFiliadosState = filiadosState.map(item => ({ ...item, coluna1: isChecked }));
  //   setFiliadosState(updatedFiliadosState);
  // };  

  const handleSearch = async () => {
    console.log("Filtros aplicados:", filters);
    startTransition(async () => {
      try 
      {
          setFiliadosState(await getFiliados(filters, token));
      } 
      catch(error)
      {
        console.log("ERRO:" + error);
        if(error.response != null)
          {
            switch(error.response.status)
            {
              // case 401:
              //   startTransition(async () => {
              //     persistor.purge();
              //     await dispatch(logOut);
              //     navigate(`/login`);
              //   });
              //   break;
              default:
                console.log(error);
                break;
            }
          }
      }
    });
  };

  return (
    <Card className="card">
      <CardContent>
        <legend>Controle de Filiados</legend>
        <fieldset>
          <div className="row">
            <div className="form-group col-md-3 mb-3">
              <TextField className="form-control" type="text" onChange={handleChange} name="numeroRol" label="Número do Rol" />
            </div>
            <div className="form-group col-md-3 mb-3">
              <TextField className="form-control" type="text" onChange={handleChange} name="documento" label="Documento" />
            </div>            
            <div className="form-group col-md-3 mb-3">
              <TextField className="form-control" type="text" onChange={handleChange} name="numeroRolIgreja" label="Número do Rol da Igreja" />
            </div>
            <div className="form-group col-md-3 mb-3">
              <TextField className="form-control" type="text" onChange={handleChange} name="nomeIgreja" label="Nome da Igreja" />
            </div>            
            <div className="form-group col-md-3 mb-3">
              <TextField className="form-control" type="text" onChange={handleChange} name="cidade" label="Cidade" />
            </div>
            <div className="form-group col-md-3 mb-3">
              <TextField className="form-control" type="text" onChange={handleChange} name="estado" label="Estado" />
            </div>
            <div className="form-group col-md-3 mb-3">
              <TextField className="form-control" type="text" onChange={handleChange} name="pais" label="País" />
            </div>
            {/* <div className="form-group col-md-3 mb-3">
              <Form.Select className="form-control" name="cargo" label="Cargo">
              <option value="">Selecionar Cargo</option>
              {
                CARGOS.map(cargo => <option key={cargo.id} value={cargo.id}>{cargo.nome}</option>)
              }
              </Form.Select>
            </div> */}
            <div className="form-group col-md-3 mb-3">
              <Form.Select className="form-control" onChange={handleChange} name="condicao" label="Condição">
                <option value="">Selecionar Condição</option>
              {
                CONDICAO.map(condicao => <option key={condicao.id} value={condicao.id}>{condicao.nome}</option>)
              }
              </Form.Select>              
            </div>
            <div className="form-group col-md-3 mb-3">
              <FormControlLabel control={<Checkbox name="filiado" onChange={handleChange} />} label="Filiado" />
              <Button className="m-2" variant="contained" onClick={handleSearch}>Pesquisar</Button>
            </div>

            
          </div>
        </fieldset>
        <div style={{ height: '100%', width: '100%' }}>
          <BootstrapTable keyField='id' data={ filiadosState } columns={ columns } selectRow={selectRow} pagination={ pagination } />        
        </div>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = state => ({
  filiados: state.filiados,
  token: state.user.token
});

export default connect(mapStateToProps)(ControleFiliados);