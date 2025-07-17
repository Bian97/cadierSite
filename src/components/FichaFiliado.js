import { useState, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  Card, CardContent, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel,
  Radio, Select, MenuItem, Grid, Button, InputLabel, Checkbox
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCargos, useCondicao } from '../constants/Constants';
import '../css/FichaFiliado.css';
import { fetchFiliadoDataById, updateUserData, createUserData } from '../actions/ControleFiliadosActions';
import { useNavigate } from 'react-router-dom';
import { showErro, showSucesso, showInfo } from '../services/NotificacaoService';

const FichaFiliado = ({ token, fetchFiliadoDataById, isAttendant, attendantNumber }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { numeroRol } = useParams();
  const cargos = useCargos();
  const condicoes = useCondicao();
  const navigate = useNavigate();
  var bloqueiaEdicao = isAttendant || !numeroRol;
  var primeiroCadastro = !numeroRol;

  const maxLengthPorCampo = {
    cpf: 11,
    telefone1: 15,
    telefone2: 15,
    cep: 10,
    rg: 15,
    nome: 150,
    conjuge: 150,
    filiacao: 300,
    profissao: 50,
    pais: 50,
    bairro: 50,
    cidade: 50,
    estado: 30,
    indicacao: 100,
    email: 100,
    logradouro: 100,
    obs: 500
  };

  const [termosAceitos, setTermosAceitos] = useState({
    termo1: false,
    termo2: false,
    termo3: false
  });

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
    cargo: 0,
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

  const handleTermosChange = (e) => {
    const { name, checked } = e.target;
    setTermosAceitos((prev) => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dadosLimpos = limparCamposVazios(formValues);

    if (dadosLimpos.rol) {
      dispatch(updateUserData(dadosLimpos, token));
    } else {
      if (primeiroCadastro && (!termosAceitos.termo1 || !termosAceitos.termo2 || !termosAceitos.termo3)) {
        showInfo(t("textosFichaFiliado.aceiteTodosOsTermos"));
        return;
      }

      const createdData = await dispatch(createUserData(dadosLimpos, token));
      if (createdData?.rol) {
        setFormValues((prevValues) => ({
          ...prevValues,
          rol: createdData.rol,
        }));
      }
    }
  };

  const limparCamposVazios = (obj) => {
    const novoObj = {};
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'string' && value.trim() === '') {
        novoObj[key] = null;
      } else {
        novoObj[key] = value;
      }
    });
    return novoObj;
  };

  useEffect(() => {
    if (numeroRol) {
      setFormValues(initialState.current);
      fetchFiliadoDataById(token, numeroRol);
    }
    else
    {
      const hoje = new Date().toISOString().split('T')[0];
      setFormValues(prev => ({
        ...prev,
        filiado: false,
        dataUltimaVisita: hoje,
        dataEntrada: hoje,
        condicao: 2,
        sexo: 'masculino',
        cargo: 0,
        idTipoMembro: 1,
      }));
    }
  }, [token, numeroRol, fetchFiliadoDataById]);

  useEffect(() => {
    const fetchData = async () => {
      if (numeroRol) 
      {
        const data = await fetchFiliadoDataById(token, numeroRol);
        if (data) 
        {
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
            cargo: data.cargo || 0,
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
            idUsuarioAtendente: attendantNumber,
            idSituacaoCadastral: data.idSituacaoCadastral,
            idTipoMembro: data.idTipoMembro || 0
          });
        }
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

    let newValue = value;

    if (['telefone1', 'telefone2', 'cpf', 'cep', 'rg'].includes(name)) {
      // Mantém apenas números
      newValue = value.replace(/\D/g, '');
    }

    if (['nome', 'conjuge', 'filiacao', 'profissao', 'pais', 'bairro', 'cidade', 'estado', 'indicacao'].includes(name)) {
      // Remove tudo que não for letra, espaço ou acento
      newValue = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    }

    setFormValues({
      ...formValues,
      [name]: newValue
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
                      inputProps={{ maxLength: maxLengthPorCampo["nome"] }}
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
                      inputProps={{ maxLength: maxLengthPorCampo["profissao"] }}
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
                      required
                      inputProps={{ maxLength: maxLengthPorCampo["email"] }}
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
                      inputProps={{ maxLength: maxLengthPorCampo["telefone1"] }}
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
                      inputProps={{ maxLength: maxLengthPorCampo["telefone2"] }}
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
                      inputProps={{ maxLength: maxLengthPorCampo["conjuge"] }}
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
                      inputProps={{ maxLength: maxLengthPorCampo["filiacao"] }}
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
                      inputProps={{ maxLength: maxLengthPorCampo["cpf"] }}
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
                      inputProps={{ maxLength: maxLengthPorCampo["rg"] }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth margin="normal" required>
                      <FormLabel>{t("geral.cargo")}</FormLabel>
                      <Select
                        name="cargo"
                        value={Number(formValues.cargo)}
                        onChange={handleInputChange}
                        disabled={!bloqueiaEdicao}
                        displayEmpty
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
                      
                      <input
                        tabIndex={-1}
                        autoComplete="off"
                        style={{ opacity: 0, height: 0, position: 'absolute' }}
                        value={formValues.cargo}
                        onChange={() => {}}
                        required={!bloqueiaEdicao ? false : true}
                      />
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
                      inputProps={{ maxLength: maxLengthPorCampo["cep"] }}
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
                      inputProps={{ maxLength: maxLengthPorCampo["logradouro"] }}
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
                      inputProps={{ maxLength: maxLengthPorCampo["bairro"] }}
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
                      inputProps={{ maxLength: maxLengthPorCampo["cidade"] }}
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
                      inputProps={{ maxLength: maxLengthPorCampo["estado"] }}
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
                      inputProps={{ maxLength: maxLengthPorCampo["pais"] }}
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
                    inputProps={{ maxLength: maxLengthPorCampo["obs"] }}
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
                    inputProps={{ maxLength: maxLengthPorCampo["indicacao"] }}
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
            <input type="hidden" name="idUsuarioAtendente" value={formValues.idUsuarioAtendente} />
            <input type="hidden" name="idSituacaoCadastral" value={formValues.idSituacaoCadastral} />

            {(!isAttendant && primeiroCadastro) && (
              <Grid item xs={12} style={{ padding: '10px' }}>
                <FormControl required component="fieldset" style={{ marginTop: 20 }}>
                  <FormLabel component="legend">{t("textosFichaFiliado.termosObrigatorios")}</FormLabel>

                  <FormControlLabel
                    control={
                      <Checkbox
                        name="termo1"
                        checked={termosAceitos.termo1}
                        onChange={handleTermosChange}
                        color="primary"
                      />
                    }
                    label={t("textoTermo.texto1")}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="termo2"
                        checked={termosAceitos.termo2}
                        onChange={handleTermosChange}
                        color="primary"
                      />
                    }
                    label={t("textoTermo.texto2")}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="termo3"
                        checked={termosAceitos.termo3}
                        onChange={handleTermosChange}
                        color="primary"
                      />
                    }
                    label={t("textoTermo.texto3")}
                  />
                </FormControl>
              </Grid>
            )}


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
  attendantNumber: state.user.atendente ? state.user.numero : null
});

const mapDispatchToProps = dispatch => ({
  fetchFiliadoDataById: (token, numeroRol) => dispatch(fetchFiliadoDataById(token, numeroRol))
});

export default connect(mapStateToProps, mapDispatchToProps)(FichaFiliado);