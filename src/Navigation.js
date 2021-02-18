import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';


let NavigationComponent = (props) => (
  <nav>
    <ul>
      <li><Link
        className="itemList"
        to="/FuncionariosForm"
        onClick={props.navigateTo.bind(this, '/FuncionariosForm')}
      > <p> Registrar funcionário </p> </Link> </li>

      <li><Link
        className="itemList"
        to="/FuncionariosList"
        onClick={props.navigateTo.bind(this, '/FuncionariosList')}
      > <p>Listar funcionários</p> </Link> </li>
    </ul>
  </nav>
)

const state = (state, ownProps = {}) => {
  return {
    location: state.location
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateTo: (location) => {
    dispatch(push(location));
  }
});

export default connect(state, mapDispatchToProps)(NavigationComponent);