import React, { useState, useEffect, useRef  } from 'react';
import { connect, useSelector } from 'react-redux';
import {
    Card, CardContent, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel,
    Radio, Select, MenuItem, Grid, Button
  } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CARGOS, CONDICAO } from '../constants/Constants';
import '../css/FichaFiliado.css';
import { fetchFiliadoDataById } from '../actions/ControleFiliadosActions';

const FichaFiliado = ({ token, fetchFiliadoDataById }) => {
  const { t } = useTranslation();
  const { numeroRol } = useParams();
  const filiadoData = useSelector((state) => state.filiado.filiadoData);
  const error = useSelector((state) => state.filiado.error);

  const initialState = useRef({
    rol: '',
    nome: '',
    profissao: '',
    email: '',
    telefone1: '',
    telefone2: '',
    dataNascimento: '',
    sexo: '',
    conjuge: '',
    filiacao: '',
    cpf: '',
    rg: '',
    cargo: '',
    cep: '',
    logradouro: '',
    bairro: '',
    cidade: '',
    estado: '',
    pais: '',
    obs: '',
    dataEntrada: '',
    dataUltimaVisita: '',
    condicao: '',
    atendente: '',
    filiado: 'não'
  });

  const [formValues, setFormValues] = useState(initialState.current);

  useEffect(() => {
    // Limpar campos ao sair da tela
    return () => {
      setFormValues(initialState.current);
    };
  }, []);

  useEffect(() => {
    if (numeroRol) {
      // Limpar campos ao mudar de ID
      setFormValues(initialState.current);
      fetchFiliadoDataById(token, numeroRol);
    }
  }, [token, numeroRol, fetchFiliadoDataById]);

  useEffect(() => {
    if (filiadoData) {
      setFormValues({
        ...filiadoData,
        dataNascimento: filiadoData.dataNascimento ? filiadoData.dataNascimento.substring(0, 10) : '',
        dataEntrada: filiadoData.dataEntrada ? filiadoData.dataEntrada.substring(0, 10) : '',
        dataUltimaVisita: filiadoData.dataUltimaVisita ? filiadoData.dataUltimaVisita.substring(0, 10) : '',
        filiado: filiadoData.filiado ? 'sim' : 'não',
        condicao: filiadoData.condicao,
        cargo: filiadoData.cargo
      });
    }
  }, [filiadoData]);

  useEffect(() => {
    // Limpar campos ao sair da tela
    return () => {
      setFormValues(initialState.current);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  
  return (
    <Card className="card">
      <CardContent>
        <legend style={{ fontFamily: 'inherit', fontWeight: 'bold' }}>Ficha de Filiado</legend>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              name="rol"
              label="Rol"
              value={formValues.rol}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6} container alignItems="center">
          <FormControl component="fieldset" margin="normal" style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', padding: '10px' }}>
            <FormLabel component="legend">É Filiado?</FormLabel>
            <RadioGroup row name="filiado" value={formValues.filiado} onChange={handleInputChange}>
                <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="não" control={<Radio />} label="Não" />
            </RadioGroup>
            </FormControl>
            <FormControl component="fieldset" margin="normal" style={{ marginLeft: '20px', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', padding: '10px' }}>
            <FormLabel component="legend">Sexo</FormLabel>
            <RadioGroup row name="sexo" value={formValues.sexo} onChange={handleInputChange}>
                <FormControlLabel value="masculino" control={<Radio />} label="Masculino" />
                <FormControlLabel value="feminino" control={<Radio />} label="Feminino" />
            </RadioGroup>
          </FormControl>
          </Grid>
          <FormControl fullWidth margin="normal" style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', padding: '1%', paddingLeft: '1%' }}>
          <legend style={{ fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'bold' }}>Informações Básicas</legend>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        name="nome"
                        label="Nome"
                        value={formValues.nome}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                        name="profissao"
                        label="Profissão"
                        value={formValues.profissao}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                        name="email"
                        label="E-mail"
                        value={formValues.email}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                        name="telefone1"
                        label="Telefone 1"
                        value={formValues.telefone1}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                        name="telefone2"
                        label="Telefone 2"
                        value={formValues.telefone2}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                        name="dataNascimento"
                        label="Data de Nascimento"
                        type="date"
                        value={formValues.dataNascimento}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                        name="conjuge"
                        label="Cônjuge"
                        value={formValues.conjuge}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                        name="filiacao"
                        label="Filiação"
                        value={formValues.filiacao}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                        name="cpf"
                        label="CPF"
                        value={formValues.cpf}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                        name="rg"
                        label="RG"
                        value={formValues.rg}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth margin="normal">
                          <FormLabel>Cargo</FormLabel>
                          <Select
                            name="cargo"
                            value={formValues.cargo}
                            onChange={handleInputChange}
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  maxHeight: 224,
                                  width: 250,
                                },
                              },
                            }}
                          >
                            <MenuItem value="">
                              <em>Selecionar Condição</em>
                            </MenuItem>
                            {CARGOS.map(cargo => (
                              <MenuItem key={cargo.id} value={cargo.id}>
                                {cargo.nome}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </FormControl>
        <FormControl fullWidth margin="normal" style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', padding: '1%', paddingLeft: '1%' }}>
          <legend style={{ fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'bold' }}>Endereço</legend>
          <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField
                    name="cep"
                    label="CEP"
                    value={formValues.cep}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                </Grid>
            <Grid item xs={12}>
                <TextField
                name="logradouro"
                label="Logradouro"
                value={formValues.logradouro}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                name="bairro"
                label="Bairro"
                value={formValues.bairro}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                name="cidade"
                label="Cidade"
                value={formValues.cidade}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                name="estado"
                label="Estado"
                value={formValues.estado}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                name="pais"
                label="País"
                value={formValues.pais}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                />
            </Grid>
          </Grid>
        </FormControl>
          <Grid item xs={12}>
            <TextField
              name="obs"
              label="OBS"
              value={formValues.obs}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="dataEntrada"
              label="Data de Entrada"
              type="date"
              value={formValues.dataEntrada}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="dataUltimaVisita"
              label="Data da Última Visita"
              type="date"
              value={formValues.dataUltimaVisita}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <FormLabel>Condição</FormLabel>
              <Select
                name="condicao"
                value={formValues.condicao}
                onChange={handleInputChange}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 224,
                      width: 250,
                    },
                  },
                }}
              >
                <MenuItem value="">
                  <em>Selecionar Condição</em>
                </MenuItem>
                {CONDICAO.map(condicao => (
                  <MenuItem key={condicao.id} value={condicao.id}>
                    {condicao.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
      <Grid container justifyContent="flex-end" style={{ padding: '10px' }}>
        <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
          Pedidos
        </Button>
        <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
          Ver Pessoa Jurídica
        </Button>
        <Button variant="contained">
          Voltar
        </Button>
      </Grid>
    </Card>
  );
}

const mapStateToProps = state => ({
  token: state.user.token
});

const mapDispatchToProps = dispatch => ({
  fetchFiliadoDataById: (token, numeroRol) => dispatch(fetchFiliadoDataById(token, numeroRol))
});

export default connect(mapStateToProps, mapDispatchToProps)(FichaFiliado);