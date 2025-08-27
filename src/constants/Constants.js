import { useTranslation } from 'react-i18next';

export const URLAPI = "https://localhost:32773/";

export const useCargos = () => {
  const { t } = useTranslation();
  return [
    { id: 0, nome: t('cargos.0') },
    { id: 1, nome: t('cargos.1') },
    { id: 2, nome: t('cargos.2') },
    { id: 3, nome: t('cargos.3') },
    { id: 4, nome: t('cargos.4') },
    { id: 5, nome: t('cargos.5') },
    { id: 6, nome: t('cargos.6') },
    { id: 7, nome: t('cargos.7') }
  ];
};

export const useCondicao = () => {
  const { t } = useTranslation();
  return [
    { id: 0, nome: t('condicoes.0') },
    { id: 1, nome: t('condicoes.1') },
    { id: 2, nome: t('condicoes.2') },
    { id: 3, nome: t('condicoes.3') },
    { id: 4, nome: t('condicoes.4') },
    { id: 5, nome: t('condicoes.5') },
    { id: 6, nome: t('condicoes.6') }
  ];
};
