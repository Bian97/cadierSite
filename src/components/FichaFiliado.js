import React, { useState, useEffect, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import {
  Card, CardContent, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel,
  Radio, Select, MenuItem, Grid, Button
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCargos, useCondicao } from '../constants/Constants';
import '../css/FichaFiliado.css';
import { fetchFiliadoDataById } from '../actions/ControleFiliadosActions';
import { useNavigate } from 'react-router-dom';

const FichaFiliado = ({ token, fetchFiliadoDataById, isAttendant }) => {
  const { t } = useTranslation();
  const { numeroRol } = useParams();
  const cargos = useCargos();
  const condicoes = useCondicao();
  const navigate = useNavigate();

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
  const [loading, setLoading] = useState(true);


  const handleVoltar = () => {
    if(isAttendant)
      navigate('/inicio?t=ControleFiliados');
    else
      navigate('/inicio');
  };

  useEffect(() => {
    if (numeroRol) {
      setFormValues(initialState.current);
      fetchFiliadoDataById(token, numeroRol);
    }
  }, [token, numeroRol, fetchFiliadoDataById]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFiliadoDataById(token, numeroRol);
      if (data) {
        setFormValues({
          rol: data.rol || '',
          nome: data.nome || '',
          profissao: data.profissao || '',
          email: data.email || '',
          filiacao: data.filiacao || '',
          telefone1: data.telefone1 || '',
          telefone2: data.telefone2 || '',
          dataNascimento: data.dataNascimento ? data.dataNascimento.substring(0, 10) : '',
          sexo: data.sexo || '',
          conjuge: data.conjuge || '',
          cpf: data.cpf || '',
          rg: data.rg || '',
          cargo: data.cargo || '',
          cep: data.cep || '',
          logradouro: data.logradouro || '',
          bairro: data.bairro || '',
          cidade: data.cidade || '',
          estado: data.estado || '',
          pais: data.pais || '',
          obs: data.obs || '',
          dataEntrada: data.dataEntrada ? data.dataEntrada.substring(0, 10) : '',
          dataUltimaVisita: data.dataUltimaVisita ? data.dataUltimaVisita.substring(0, 10) : '',
          filiado: data.filiado ? 'sim' : 'não',
          condicao: data.condicao || ''
        });
      }
      setLoading(false);
    };
    fetchData();
  }, [token, numeroRol, fetchFiliadoDataById]);

  useEffect(() => {
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

  if (loading) {
    return <div>{t("textosFichaFiliado.carregando")}</div>;
  } else {
    return (
      <Card className="card">
        <CardContent>
          <legend style={{ fontFamily: 'inherit', fontWeight: 'bold' }}>{t("textosFichaFiliado.fichaFiliado")}</legend>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                name="rol"
                label={t("textosControleFiliados.numeroRol")}
                value={formValues.rol}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6} container alignItems="center">
              <FormControl component="fieldset" margin="normal" style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', padding: '10px' }}>
                <FormLabel component="legend">{t("geral.filiado")}?</FormLabel>
                <RadioGroup row name="filiado" value={formValues.filiado} onChange={handleInputChange}>
                  <FormControlLabel value="sim" control={<Radio />} label={t("geral.true")} />
                  <FormControlLabel value="não" control={<Radio />} label={t("geral.false")} />
                </RadioGroup>
              </FormControl>
              <FormControl component="fieldset" margin="normal" style={{ marginLeft: '20px', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', padding: '10px' }}>
                <FormLabel component="legend">{t("geral.sexo")}</FormLabel>
                <RadioGroup row name="sexo" value={formValues.sexo} onChange={handleInputChange}>
                  <FormControlLabel value="masculino" control={<Radio />} label={t("geral.masculino")} />
                  <FormControlLabel value="feminino" control={<Radio />} label={t("geral.feminino")} />
                </RadioGroup>
              </FormControl>
            </Grid>
            <FormControl fullWidth margin="normal" style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', padding: '1%', paddingLeft: '1%' }}>
              <legend style={{ fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'bold' }}>{t("geral.informacoesBasicas")}</legend>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="nome"
                    label={t("geral.nome")}
                    value={formValues.nome}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="profissao"
                    label={t("textosFichaFiliado.profissao")}
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
                    label={t("geral.telefone")}
                    value={formValues.telefone1}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="telefone2"
                    label={t("geral.telefone")}
                    value={formValues.telefone2}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="dataNascimento"
                    label={t("textosFichaFiliado.dataNascimento")}
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
                    label={t("textosFichaFiliado.conjuge")}
                    value={formValues.conjuge}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="filiacao"
                    label={t("textosFichaFiliado.filiacao")}
                    value={formValues.filiacao}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="cpf"
                    label={t("formularioLoginTextos.cpf")}
                    value={formValues.cpf}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="rg"
                    label={t("textosFichaFiliado.rg")}
                    value={formValues.rg}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="normal">
                    <FormLabel>{t("geral.cargo")}</FormLabel>
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
                          <em>{t("geral.selecionarCargo")}</em>
                      </MenuItem>
                      {cargos.map(cargo => (
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
              <legend style={{ fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'bold' }}>{t("geral.endereco")}</legend>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    name="cep"
                    label={t("geral.cep")}
                    value={formValues.cep}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="logradouro"
                    label={t("geral.endereco")}
                    value={formValues.logradouro}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="bairro"
                    label={t("geral.bairro")}
                    value={formValues.bairro}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="cidade"
                    label={t("geral.cidade")}
                    value={formValues.cidade}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="estado"
                    label={t("geral.estado")}
                    value={formValues.estado}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="pais"
                    label={t("geral.pais")}
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
                label={t("textosFichaFiliado.obs")}
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
                label={t("textosFichaFiliado.dataEntrada")}
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
                label={t("textosFichaFiliado.dataUltimaVisita")}
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
                <FormLabel>{t("geral.condicao")}</FormLabel>
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
                    <em>{t("geral.selecionarCondicao")}</em>
                  </MenuItem>
                  {condicoes.map(condicao => (
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
            {t("textosControleFiliados.verPedidos")}
          </Button>
          <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
            {t("textosControleFiliados.verPessoaJuridica")}
          </Button>
          <Button variant="contained" onClick={handleVoltar}>
            {t("geral.voltar")}
          </Button>
        </Grid>
      </Card>
    );
  }  
}

const mapStateToProps = state => ({
  token: state.user.token,
  isAttendant: state.user.atendente
});

const mapDispatchToProps = dispatch => ({
  fetchFiliadoDataById: (token, numeroRol) => dispatch(fetchFiliadoDataById(token, numeroRol))
});

export default connect(mapStateToProps, mapDispatchToProps)(FichaFiliado);