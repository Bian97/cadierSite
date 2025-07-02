import React, { useState, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  Card, CardContent, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel,
  Radio, Select, MenuItem, Grid, Button, InputLabel
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCargos, useCondicao } from '../constants/Constants';
import '../css/FichaFiliado.css';
import { fetchFiliadoDataById, updateUserData, createUserData } from '../actions/ControleFiliadosActions';
import { useNavigate } from 'react-router-dom';

const FichaFiliado = ({ token, fetchFiliadoDataById, isAttendant, attendantNumber }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { numeroRol } = useParams();
  const cargos = useCargos();
  const condicoes = useCondicao();
  const navigate = useNavigate();
  var bloqueiaEdicao = isAttendant || !numeroRol;
  var primeiroCadastro = !numeroRol;

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
    condicao: 0,
    atendente: '',
    filiado: 'não',
    idUsuarioAtendente: 0,
    idSituacaoCadastral: 0,
    idTipoMembro: 0
  });

  const [formValues, setFormValues] = useState(initialState.current);
  const [loading, setLoading] = useState(true);

  const handleVoltar = () => {
    if (isAttendant)
      navigate('/inicio/ControleFiliados');
    else
      navigate('/inicio');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formValues.rol && formValues.rol !== '') {      
      dispatch(updateUserData(formValues, token));
    } 
    else 
    {
      const createdData = await dispatch(createUserData(formValues, token));
      if (createdData && createdData.rol) {
        setFormValues((prevValues) => ({
          ...prevValues,
          rol: createdData.rol,
        }));
      }
    }
  };

  useEffect(() => {
    if (numeroRol) {
      setFormValues(initialState.current);
      fetchFiliadoDataById(token, numeroRol);
    }
    else{
      const hoje = new Date().toISOString().split('T')[0];
      setFormValues(prev => ({
        ...prev,
        filiado: 'false',
        dataUltimaVisita: hoje,
        dataEntrada: hoje,
        condicao: 2
      }));
    }
  }, [token, numeroRol, fetchFiliadoDataById]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFiliadoDataById(token, numeroRol);
      if (data) {
        setFormValues({
          rol: data.rol || null,
          nome: data.nome || null,
          profissao: data.profissao || null,
          email: data.email || null,
          filiacao: data.filiacao || null,
          telefone1: data.telefone1 || null,
          telefone2: data.telefone2 || null,
          dataNascimento: data.dataNascimento ? data.dataNascimento.substring(0, 10) : null,
          sexo: data.sexo || 'masculino',
          conjuge: data.conjuge || null,
          cpf: data.cpf || null,
          rg: data.rg || null,
          cargo: data.cargo || null,
          cep: data.cep || null,
          logradouro: data.logradouro || null,
          bairro: data.bairro || null,
          cidade: data.cidade || null,
          estado: data.estado || null,
          pais: data.pais || null,
          obs: data.obs || null,
          dataEntrada: data.dataEntrada ? data.dataEntrada.substring(0, 10) : null,
          dataUltimaVisita: data.dataUltimaVisita ? data.dataUltimaVisita.substring(0, 10) : null,
          filiado: data.filiado,
          condicao: data.condicao || 0,
          indicacao: data.indicacao,
          atendente: data.atendente,
          idUsuarioAtendente: isAttendant ? attendantNumber : 0,
          idSituacaoCadastral: isAttendant ? data.idSituacaoCadastral : 0,
          idTipoMembro: data.idTipoMembro || 0
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
      <form onSubmit={handleSubmit}>
      {
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
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={6} container alignItems="center">
                <FormControl component="fieldset" margin="normal" style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', padding: '10px' }}>
                  <FormLabel component="legend">{t("geral.filiado")}?</FormLabel>
                  <RadioGroup row name="filiado" value={formValues.filiado} onChange={handleInputChange}>
                    <FormControlLabel disabled={!isAttendant} value={true} control={<Radio />} label={t("geral.true")} />
                    <FormControlLabel disabled={!isAttendant} value={false} control={<Radio />} label={t("geral.false")} />
                  </RadioGroup>
                </FormControl>
                <FormControl component="fieldset" margin="normal" style={{ marginLeft: '20px', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', padding: '10px' }}>
                  <FormLabel component="legend">{t("geral.sexo")}</FormLabel>
                  <RadioGroup row name="sexo" value={formValues.sexo} onChange={handleInputChange}>
                    <FormControlLabel disabled={!bloqueiaEdicao} value="masculino" control={<Radio />} label={t("geral.masculino")} />
                    <FormControlLabel disabled={!bloqueiaEdicao} value="feminino" control={<Radio />} label={t("geral.feminino")} />
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
                      disabled={!bloqueiaEdicao}
                      required
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
                      required
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
                      disabled={!bloqueiaEdicao}
                      required={!bloqueiaEdicao ? false : true}
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
                      disabled={!bloqueiaEdicao}
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
                      disabled={!bloqueiaEdicao}
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
                      disabled={!bloqueiaEdicao}
                      required={!bloqueiaEdicao ? false : true}
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
                      disabled={!bloqueiaEdicao}
                      required={!bloqueiaEdicao ? false : true}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth margin="normal">
                      <FormLabel>{t("geral.cargo")}</FormLabel>
                      <Select
                        name="cargo"
                        value={formValues.cargo}
                        onChange={handleInputChange}
                        disabled={!bloqueiaEdicao}
                        required={!bloqueiaEdicao ? false : true}
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
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth margin="normal">
                      <FormLabel>{t("geral.tipoMembro")}</FormLabel>
                      <Select
                        name="idTipoMembro"
                        value={formValues.idTipoMembro}
                        onChange={handleInputChange}
                        disabled={!bloqueiaEdicao}
                        required={!bloqueiaEdicao ? false : true}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 224,
                              width: 250,
                            },
                          },
                        }}
                      >
                        <MenuItem value="1">
                            <em>{t("geral.membro")}</em>
                        </MenuItem>
                        <MenuItem value="2">
                            <em>{t("geral.vice")}</em>
                        </MenuItem>
                        <MenuItem value="3">
                            <em>{t("geral.presidente")}</em>
                        </MenuItem>

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
                      required
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
                      required
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
                      required
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
                      required
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
                      required
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
                      required
                    />
                  </Grid>
                </Grid>
              </FormControl>
              {isAttendant && (
                <Grid item xs={12}>
                  <TextField
                    name="obs"
                    label={t("textosFichaFiliado.obs")}
                    value={formValues.obs}
                    onChange={handleInputChange}
                    disabled={!isAttendant}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                  />
                </Grid>)
              }
              {isAttendant
                &&
                (<Grid item xs={12} md={6}>
                  <TextField
                    name="indicacao"
                    label={t("textosFichaFiliado.indicacao")}
                    value={formValues.indicacao}
                    onChange={handleInputChange}
                    disabled={!isAttendant}
                    fullWidth
                    margin="normal"
                  />
                </Grid>)
              }
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
                  disabled={!bloqueiaEdicao}
                  required={!bloqueiaEdicao ? false : true}
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
                  disabled={!isAttendant}
                  required={!isAttendant ? false : true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>{t("geral.condicao")}</InputLabel>
                  <Select
                    name="condicao"
                    value={formValues.condicao}
                    onChange={handleInputChange}
                    disabled={!isAttendant}
                    required={!isAttendant ? false : true}
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
              <Grid item xs={12} md={6}>
                  <TextField
                    name="atendente"
                    label={t("textosFichaFiliado.atendente")}
                    value={formValues.atendente}
                    onChange={handleInputChange}
                    disabled={true}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
            </Grid>
          </CardContent>
          <Grid container justifyContent="flex-end" style={{ padding: '10px' }}>
            <Button variant="contained" color="primary" style={{ marginRight: '10px', backgroundColor: 'green', color: 'white' }} type="submit">
              {t("textosMenu.salvar")}
            </Button>
            {!primeiroCadastro && (
              <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
                  {t("textosControleFiliados.verPedidos")}
                </Button>
              )
            }
            {!primeiroCadastro && 
                (
                  <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
                    {t("textosControleFiliados.verPessoaJuridica")}
                  </Button>
                )
            }
            <Button variant="contained" onClick={handleVoltar}>
              {t("geral.voltar")}
            </Button>
          </Grid>
        </Card>
      }
      </form>
    );
  }  
}

const mapStateToProps = state => ({
  token: state.user.token,
  isAttendant: state.user.atendente,
  attendantNumber: state.user.numero
});

const mapDispatchToProps = dispatch => ({
  fetchFiliadoDataById: (token, numeroRol) => dispatch(fetchFiliadoDataById(token, numeroRol))
});

export default connect(mapStateToProps, mapDispatchToProps)(FichaFiliado);