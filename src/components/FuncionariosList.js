import React, { Component } from 'react'
import { connect } from "react-redux";
import * as actions from "../actions/funcionariosActions"
import { bindActionCreators } from 'redux';

import AtualizarFuncionario from './AtualizarFuncionario';
import { Link } from 'react-router-dom';

var novaJanela = '';

class FuncionariosList extends Component {

  handleEdit = (index) => {
    novaJanela = <AtualizarFuncionario />;
    this.props.updateFuncionariosIndex(index);

  }

  handleDelete = (index) => {
    this.props.deleteFuncionarios(index)
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th> Nome </th>
              <th> CPF </th>
              <th> Salário </th>
              <th> Desconto </th>
              <th> Dependentes </th>
              <th> Desconto IRPF </th>
            </tr>
          </thead>
          <tbody>
            {this.props.list.map((item, index) => {

              var parcelaDeduzivel = '';
              var aliquota = '';

              var salarioConvertido = item.salarioFunc.toString().replaceAll(",", ".");

              var salarioBase = salarioConvertido - item.descPrevidencia - (164.54 * item.numDependentes);

              if (salarioBase <= 1903.98) {
                parcelaDeduzivel = 0;
                aliquota = 0;
              } else if (salarioBase > 1903.98 && salarioBase <= 2826.65) {
                parcelaDeduzivel = 142.80;
                aliquota = 0.075;
              } else if (salarioBase > 2826.65 && salarioBase <= 3751.05) {
                parcelaDeduzivel = 354.80;
                aliquota = 0.15;
              } else if (salarioBase > 3751.05 && salarioBase <= 4664.68) {
                parcelaDeduzivel = 636.13;
                aliquota = 0.225;
              } else if (salarioBase > 4664.68) {
                parcelaDeduzivel = 869.36;
                aliquota = 0.275;
              }
              const descontoIRRF = (salarioBase * aliquota) - parcelaDeduzivel;

              salarioConvertido = salarioConvertido.toString().replaceAll(".", ",");

              return <tr key={index}>
                <td> {item.nomeFunc} </td>
                <td> {item.cpfFunc} </td>
                <td> {salarioConvertido} </td>
                <td> {item.descPrevidencia} </td>
                <td> {item.numDependentes} </td>
                <td> {descontoIRRF} </td>
                <td><Link className="btnEdit" onClick={() => this.handleEdit(index)}>  Editar </Link> </td>
                <td><Link className="btnDelete" onClick={() => this.handleDelete(index)}> Deletar </Link></td>
              </tr>
            })}
          </tbody>
        </table>
        {novaJanela}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateFuncionariosIndex: actions.updateIndex,
    deleteFuncionarios: actions.Delete
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FuncionariosList)