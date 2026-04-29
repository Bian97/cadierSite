import { connect } from 'react-redux';
import {
  Card, CardContent, Grid, Typography, Button, Divider
} from '@mui/material';

const CompletarFiliacao = ({ token, user, services }) => {

  const filiacaoService = services.find(s => s.codigo === 'FILIACAO');

  const handleSubmit = () => {
    // aqui você chama o pagamento da API
    alert('Iniciando pagamento...');
  };

  return (
    <Grid container justifyContent="center" sx={{ mt: 4 }}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>

            <Typography variant="h5" gutterBottom>
              Confirmar Filiação
            </Typography>

            <Typography variant="body1" sx={{ mb: 3 }}>
              Revise seus dados antes de concluir o pagamento.
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Typography variant="subtitle1"><strong>Nome:</strong> {user.nome}</Typography>
            <Typography variant="subtitle1"><strong>CPF:</strong> {user.cpf}</Typography>
            <Typography variant="subtitle1"><strong>Nº Registro:</strong> {user.registro}</Typography>
            <Typography variant="subtitle1"><strong>Situação Cadastral:</strong> Não Filiado</Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6">
              Valor da Filiação:
            </Typography>
            <Typography variant="h5" color="primary" sx={{ mb: 3 }}>
              R$ {filiacaoService?.valor}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
            >
              Concluir Pagamento
            </Button>

          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  token: state.user.token,
  user: state.user,         // você deve guardar isso no Redux ao logar
  services: state.app.services    // carregue todos os serviços após login
});

export default connect(mapStateToProps)(CompletarFiliacao);