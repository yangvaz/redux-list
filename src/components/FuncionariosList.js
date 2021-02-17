import React, { Component } from 'react'
import FuncionariosForm from './FuncionariosForm'
import { connect } from "react-redux";
import * as actions from "../actions/funcionariosActions"
import { bindActionCreators } from 'redux';

class FuncionariosList extends Component {

  handleEdit = (index) => {
    this.props.updateFuncionariosIndex(index)
  }

  handleDelete = (index) => {
    this.props.deleteFuncionarios(index)
  }

  render() {
    return (
      <div>
        <FuncionariosForm />
        <hr />
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

              var parcelaDeduzivel = 869.36;
              var aliquota = 0.275;

              if (item.salarioFunc <= 1903.98) {
                parcelaDeduzivel = 0;
                aliquota = 0;
              } else if (item.salarioFunc > 1903.98 || item.salarioFunc <= 2826.65) {
                parcelaDeduzivel = 142.80;
                aliquota = 0.075;
              } else if (item.salarioFunc > 2826.65 || item.salarioFunc <= 3751.05) {
                parcelaDeduzivel = 354.80;
                aliquota = 0.15;
              } else if (item.salarioFunc > 3751.05 || item.salarioFunc <= 4664.68) {
                parcelaDeduzivel = 636.13;
                aliquota = 0.225;
              } else if (item.salarioFunc > 4664.68) {
                parcelaDeduzivel = 869.36;
                aliquota = 27.5;
              }

              const salarioBase = item.salarioFunc - item.descPrevidencia - (164.54 * item.numDependentes);
              const descontoIRRF = (salarioBase * aliquota) - parcelaDeduzivel;

              return <tr key={index}>
                <td>{item.nomeFunc}</td>
                <td>{item.cpfFunc}</td>
                <td>{item.salarioFunc}</td>
                <td>{item.descPrevidencia}</td>
                <td>{item.numDependentes}</td>
                <td> {descontoIRRF} </td>
                <td><button onClick={() => this.handleEdit(index)}>Editar</button></td>
                <td><button onClick={() => this.handleDelete(index)}>Deletar</button></td>
              </tr>
            })}
          </tbody>
        </table>
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