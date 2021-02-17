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
    if (this.props.currentIndex === -1)
      this.props.insertFuncionarios(this.state)
    else
      this.props.updateFuncionarios(this.state)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} autoComplete="off">
        <input name="nomeFunc" placeholder="Nome"
          onChange={this.handleInputChange} value={this.state.nomeFunc} /> <br />
        <input name="cpfFunc" placeholder="CPF"
          onChange={this.handleInputChange} value={this.state.cpfFunc} /> <br />
        <input name="salarioFunc" placeholder="Salario"
          onChange={this.handleInputChange} value={this.state.salarioFunc} /> <br />
        <input name="descPrevidencia" placeholder="Desconto previdencia"
          onChange={this.handleInputChange} value={this.state.descPrevidencia} /> <br />
        <input name="numDependentes" placeholder="Numero de dependentes"
          onChange={this.handleInputChange} value={this.state.numDependentes} /> <br />
        <button type="submit">Cadastrar funcionário</button>
      </form>
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