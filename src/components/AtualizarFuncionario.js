import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/funcionariosActions';
import { bindActionCreators } from 'redux';

class FuncionariosForm extends Component {

  state = {
    ...this.returnStateObject()
  }

  returnStateObject() {
    if (this.props.currentIndex === -1)
      return {
        nomeFunc: '',
        cpfFunc: '',
        salarioFunc: '',
        descPrevidencia: '',
        numDependentes: ''
      }
    else
      return this.props.list[this.props.currentIndex]
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentIndex !== this.props.currentIndex || prevProps.list.length !== this.props.list.length) {
      this.setState({ ...this.returnStateObject() })
    }
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    var state = this.state;

    state.cpfFunc = state.cpfFunc.replace(/\D/g, "");
    console.log(state.cpfFunc);

    if (state.cpfFunc.length === 11) {
      state.cpfFunc = state.cpfFunc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      this.props.updateFuncionarios(this.state)
    } else {
      return alert('O CPF precisa ter 11 números')
    }

    state.salarioFunc = state.salarioFunc.toString().replace(".", "");
    console.log(state.salarioFunc);

    state.descPrevidencia = state.descPrevidencia.toString().replace(",", ".");

    //   function formataCPF(cpf){
    //   const pureCpf = cpf.replace(/\D/g, "");
    // return pureCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    //}

  }

  render() {
    return (
      <div>
        <h3> Atualizando funcionário: {this.state.nomeFunc} </h3>
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <input name="nomeFunc" placeholder="Nome"
            onChange={this.handleInputChange} value={this.state.nomeFunc} /> <br />
          <input name="cpfFunc" placeholder="CPF"
            onChange={this.handleInputChange} value={this.state.cpfFunc} /> <br />
          <input name="salarioFunc" placeholder="Salário"
            onChange={this.handleInputChange} value={this.state.salarioFunc} /> <br />
          <input name="descPrevidencia" placeholder="Desconto previdência"
            onChange={this.handleInputChange} value={this.state.descPrevidencia} /> <br />
          <input name="numDependentes" placeholder="Número de dependentes"
            onChange={this.handleInputChange} value={this.state.numDependentes} /> <br />
          <button type="submit"> Atualizar </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    list: state.list,
    currentIndex: state.currentIndex
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    insertFuncionarios: actions.insert,
    updateFuncionarios: actions.update
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FuncionariosForm)