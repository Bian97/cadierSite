import React, { useState } from "react";
import { connect } from 'react-redux';
import { Card, CardContent, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import { Form } from 'react-bootstrap';
// import { Table, Pagination, Form } from 'react-bootstrap';
//import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { CARGOS, CONDICAO } from '../constants/Constants';
import BootstrapTable from 'react-bootstrap-table-next';
//import paginationFactory from 'react-bootstrap-table2-paginator';
import { paginationFactory, pageListRenderer, selectRow, pagination } from './util/DatatableHelper';


const ControleFiliados = ({ filiados }) => {
  const { t, i18n } = useTranslation();
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

//Valores Mockados para teste da Grid
  const [filiadosState, setFiliadosState] = useState([
    { id: 1, coluna1: 'Valor1', coluna2: 'Valor2', coluna3: 'Valor3', coluna4: 'Valor4', coluna5: 'Valor5', coluna6: 'Valor6', coluna7: 'Valor7', coluna8: 'Valor8' },
    { id: 2, coluna1: 'Valor1', coluna2: 'Valor2', coluna3: 'Valor3', coluna4: 'Valor4', coluna5: 'Valor5', coluna6: 'Valor6', coluna7: 'Valor7', coluna8: 'Valor8' },
    { id: 3, coluna1: 'Valor1', coluna2: 'Valor2', coluna3: 'Valor3', coluna4: 'Valor4', coluna5: 'Valor5', coluna6: 'Valor6', coluna7: 'Valor7', coluna8: 'Valor8' },
    { id: 4, coluna1: 'Valor1', coluna2: 'Valor2', coluna3: 'Valor3', coluna4: 'Valor4', coluna5: 'Valor5', coluna6: 'Valor6', coluna7: 'Valor7', coluna8: 'Valor8' },
    { id: 5, coluna1: 'Valor1', coluna2: 'Valor2', coluna3: 'Valor3', coluna4: 'Valor4', coluna5: 'Valor5', coluna6: 'Valor6', coluna7: 'Valor7', coluna8: 'Valor8' },
    { id: 6, coluna1: 'Valor1', coluna2: 'Valor2', coluna3: 'Valor3', coluna4: 'Valor4', coluna5: 'Valor5', coluna6: 'Valor6', coluna7: 'Valor7', coluna8: 'Valor8' },
     { id: 7, coluna1: 'Valor1', coluna2: 'Valor2', coluna3: 'Valor3', coluna4: 'Valor4', coluna5: 'Valor5', coluna6: 'Valor6', coluna7: 'Valor7', coluna8: 'Valor8' },
     { id: 8, coluna1: 'Valor1', coluna2: 'Valor2', coluna3: 'Valor3', coluna4: 'Valor4', coluna5: 'Valor5', coluna6: 'Valor6', coluna7: 'Valor7', coluna8: 'Valor8' },
     { id: 9, coluna1: 'Valor1', coluna2: 'Valor2', coluna3: 'Valor3', coluna4: 'Valor4', coluna5: 'Valor5', coluna6: 'Valor6', coluna7: 'Valor7', coluna8: 'Valor8' },
     { id: 10, coluna1: 'Valor1', coluna2: 'Valor2', coluna3: 'Valor3', coluna4: 'Valor4', coluna5: 'Valor5', coluna6: 'Valor6', coluna7: 'Valor7', coluna8: 'Valor8' },
     { id: 11, coluna1: 'Valor1', coluna2: 'Valor2', coluna3: 'Valor3', coluna4: 'Valor4', coluna5: 'Valor5', coluna6: 'Valor6', coluna7: 'Valor7', coluna8: 'Valor8' },
    // Adicione quantos objetos desejar
  ]);

  const columns = [
    { dataField: 'coluna1', text: t("textosControleFiliados.numeroRol"), width: 150 },
    { dataField: 'coluna2', text: t("geral.nome"), width: 150 },
    { dataField: 'coluna3', text: t("geral.cargo"), width: 150 },
    { dataField: 'coluna4', text: t("geral.endereco"), width: 150 },
    { dataField: 'coluna5', text: t("textosControleFiliados.nomeIgreja"), width: 150 },
    { dataField: 'coluna6', text: t("geral.telefone"), width: 150 },
    { dataField: 'coluna7', text: t("geral.filiado"), width: 150 },
    { dataField: 'coluna8', text: t("geral.detalhes"), width: 150 },
  ];


  const handleChange = event => {
    const { name, value, type, checked } = event.target;
    const filterValue = type === "checkbox" ? checked : value;
    setFilters({ ...filters, [name]: filterValue });
  };

  const handleCheckAll = (isChecked) => {
    const updatedFiliadosState = filiadosState.map(item => ({ ...item, coluna1: isChecked }));
    setFiliadosState(updatedFiliadosState);
  };  

  const handleSearch = () => {
    // Aqui você pode implementar a lógica para realizar a pesquisa com os filtros
    console.log("Filtros aplicados:", filters);
  };

  return (
    <Card className="card">
      <CardContent>
        <legend>Controle de Filiados</legend>
        <fieldset>
          <div className="row">
            <div className="form-group col-md-3 mb-3">
              <TextField className="form-control" type="text" name="numeroRol" label="Número do Rol" />
            </div>
            <div className="form-group col-md-3 mb-3">
              <TextField className="form-control" type="text" name="documento" label="Documento" />
            </div>            
            <div className="form-group col-md-3 mb-3">
              <TextField className="form-control" type="text" name="numeroRolIgreja" label="Número do Rol da Igreja" />
            </div>
            <div className="form-group col-md-3 mb-3">
              <TextField className="form-control" type="text" name="nomeIgreja" label="Nome da Igreja" />
            </div>            
            <div className="form-group col-md-3 mb-3">
              <TextField className="form-control" type="text" name="cidade" label="Cidade" />
            </div>
            <div className="form-group col-md-3 mb-3">
              <TextField className="form-control" type="text" name="estado" label="Estado" />
            </div>
            <div className="form-group col-md-3 mb-3">
              <TextField className="form-control" type="text" name="pais" label="País" />
            </div>
            <div className="form-group col-md-3 mb-3">
              <Form.Select className="form-control" name="cargo" label="Cargo">
              <option value="">Selecionar Cargo</option>
              {
                CARGOS.map(cargo => (
                  <option value={cargo.id}>{cargo.nome}</option>
                ))
              }
              </Form.Select>
            </div>
            <div className="form-group col-md-3 mb-3">
              <Form.Select className="form-control" name="condicao" label="Condição">
                <option value="">Selecionar Condição</option>
              {
                CONDICAO.map(condicao => (
                  <option value={condicao.id}>{condicao.nome}</option>
                ))
              }
              </Form.Select>              
            </div>
            <div className="form-group col-md-3 mb-3">
              <FormControlLabel control={<Checkbox name="filiado" />} label="Filiado" />
            </div>
          </div>
                        
          {/* <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '0.3%' }}>
            <TextField style={ { width: '45%' } } type="text" name="numeroRol" label="Número do Rol" />
            <TextField style={ { width: '55%' } } type="text" name="documento" label="Documento" />
            <TextField style={ { width: '65%' } } type="text" name="numeroRolIgreja" label="Número do Rol da Igreja" />
            <TextField style={ { width: '100%' } } type="text" name="nomeIgreja" label="Nome da Igreja" />

            <TextField style={ { width: '40%' } } type="text" name="cidade" label="Cidade" />
            <TextField style={ { width: '20%' } } type="text" name="estado" label="Estado" />
            <TextField style={ { width: '35%' } } type="text" name="pais" label="País" />
          </div> */}

          {/* <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1%', padding: '0.3%' }}>
            <Form.Select style={ { width: '35%' } } name="cargo" label="Cargo">
              <option value="">Selecionar Cargo</option>
              {CARGOS.map(cargo => (
                <option value={cargo.id}>{cargo.nome}</option>
              ))}
            </Form.Select>
            <Form.Select style={ { width: '35%' } } name="condicao" label="Condição">
              <option value="">Selecionar Condição</option>
              {CONDICAO.map(condicao => (
                <option value={condicao.id}>{condicao.nome}</option>
              ))}
            </Form.Select>

            <FormControlLabel control={<Checkbox name="filiado" />} label="Filiado" />
            <Button style={ { width: '25%' } } variant="contained" onClick={handleSearch}>Pesquisar</Button>
          </div>       */}
        </fieldset>
        <div style={{ height: '100%', width: '100%' }}>
          <BootstrapTable keyField='id' data={ filiadosState } columns={ columns } selectRow={selectRow} pagination={ pagination } />        
        </div>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = state => ({
  filiados: state.filiados
});

export default connect(mapStateToProps)(ControleFiliados);
