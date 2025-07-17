import Swal from 'sweetalert2';
import i18n from '../../i18n';

export const showSucesso = (mensagem) => {
  Swal.fire({
    icon: 'success',
    title: i18n.t(`geral.sucesso`),
    text: mensagem,
    confirmButtonColor: '#3085d6'
  });
};

export const showErro = (mensagem) => {
  Swal.fire({
    icon: 'error',
    title: i18n.t(`geral.erro`),
    text: mensagem,
    confirmButtonColor: '#d33'
  });
};

export const showInfo = (mensagem) => {
  Swal.fire({
    icon: 'info',
    title: i18n.t(`geral.atencao`),
    text: mensagem,
    confirmButtonColor: '#3085d6'
  });
};