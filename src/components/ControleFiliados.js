import React, { useState, startTransition } from "react";
import { connect, useDispatch } from 'react-redux';
import { Card, CardContent, TextField, Button, Checkbox, FormControlLabel, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useCargos, useCondicao } from '../constants/Constants';
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
  const cargos = useCargos();
  const condicoes = useCondicao();
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
      text: t("geral.cargo"),
      formatter: (cell) => {
        const cargo = cargos.find(cargo => cargo.id === cell);
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
          <Button variant="contained" color="primary" onClick={() => handleVerFicha(row)}>{t("textosControleFiliados.verFicha")}</Button>
          <span style={{ margin: '1%' }}></span>
          <Button variant="contained" color="primary" onClick={() => handleVerPedidos(row)}>{t("textosControleFiliados.verPedidos")}</Button>
          <span style={{ margin: '1%' }}></span>
          <Button variant="contained" color="primary" onClick={() => handleVerPessoaJuridica(row)}>{t("textosControleFiliados.verPessoaJuridica")}</Button>
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
        <legend>{t("textosMenu.controlefiliados")}</legend>
        <fieldset>
          <div className="row">
            <div className="form-group col-md-3 mb-3">
              <TextField className="form-control" type="text" onChange={handleChange} name="numeroRol" label={t("textosControleFiliados.numeroRol")} />
            </div>
            <div className="form-group col-md-3 mb-3">
              <TextField className="form-control" type="text" onChange={handleChange} name="documento" label={t("formularioLoginTextos.cpf")} />
            </div>            
            <div className="form-group col-md-3 mb-3">
              <TextField className="form-control" type="text" onChange={handleChange} name="numeroRolIgreja" label={t("textosControleFiliados.numeroRolIgreja")} />
            </div>
            <div className="form-group col-md-3 mb-3">
              <TextField className="form-control" type="text" onChange={handleChange} name="nomeIgreja" label={t("textosControleFiliados.nomeIgreja")} />
            </div>            
            <div className="form-group col-md-3 mb-3">
              <TextField className="form-control" type="text" onChange={handleChange} name="cidade" label={t("geral.cidade")} />
            </div>
            <div className="form-group col-md-3 mb-3">
              <TextField className="form-control" type="text" onChange={handleChange} name="estado" label={t("geral.estado")} />
            </div>
            <div className="form-group col-md-3 mb-3">
              <TextField className="form-control" type="text" onChange={handleChange} name="pais" label={t("geral.pais")} />
            </div>            
            <FormControl className="form-group col-md-3 mb-3">
              <InputLabel id="condicao-select-label">{t("geral.condicao")}</InputLabel>
              <Select
                labelId="condicao-select-label"                
                onChange={handleChange}
                name="condicao"
              >
                <MenuItem value="">
                  <em>{t("geral.selecionarCondicao")}</em>
                </MenuItem>
                {condicoes.map(condicao => (
                  <MenuItem key={condicao.id} value={condicao.id}>
                    {condicao.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="form-group col-md-3 mb-3">
              <FormControlLabel control={<Checkbox name="filiado" onChange={handleChange} />} label={t("geral.filiado")} />
              <Button className="m-2" variant="contained" onClick={handleSearch}>{t("geral.pesquisar")}</Button>
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