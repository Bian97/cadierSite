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


const FichaFiliado = ({ token }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    

    return
    (
        <Card className="card">
            <CardContent>
                <legend>Ficha de Filiado</legend>

            </CardContent>
        </Card>
    );
}
const mapStateToProps = state => ({
    token: state.user.token
});
  
export default connect(mapStateToProps)(FichaFiliado);