import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink,
Button
} from "shards-react";

import { withLocalize, Translate } from "react-localize-redux";
import { connect } from 'react-redux';
import * as app from "./../../../../actions/app";

class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }
	
  render() {
	const {web3} = window;
	const {user} = web3;
    return (
	  <React.Fragment>
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={require("./../../../../images/avatars/0.jpg")}
            alt="User Avatar"
          />{" "}
          <span className={user && user.status===0?"d-none d-md-inline-block text-danger":"d-none d-md-inline-block"}>{user?user.username:(null)}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to="user-profile">
            <i className="material-icons">&#xE7FD;</i> Profile
          </DropdownItem>
          <DropdownItem tag={Link} to="/edit-user-profile">
            <i className="material-icons">&#xE8B8;</i> Edit Profile
          </DropdownItem>
  		     <DropdownItem tag={Link} to="file-manager-list">
            <i className="material-icons">&#xE2C7;</i> Files
          </DropdownItem>
          <DropdownItem tag={Link} to="transaction-history">
            <i className="material-icons">&#xE896;</i> Transactions
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem tag={Link} to="/" className="text-danger" onClick={() => {this.props.logout()}}>
            <i className="material-icons text-danger">&#xE879;</i> Logout
          </DropdownItem>
        </Collapse>
      </NavItem>

  	</React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    ...state
  }
  
};

const mapDispatchToProps = (dispatch) => {
  return {
  logout: () => dispatch(app.logout())
   
  
  };
};


export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(UserActions));

