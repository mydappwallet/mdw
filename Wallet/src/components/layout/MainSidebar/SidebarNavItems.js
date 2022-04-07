import React from "react";
import { Nav } from "shards-react";

import SidebarNavCryptoItem from "./SidebarNavCryptoItem";
import SidebarNavItem from "./SidebarNavItem";
import * as roleMatcher from '../../../utils/roleMatcher';

import {
 Dropdown,
  DropdownToggle,
  DropdownMenu, 
  DropdownItem,
  NavLink
} from "shards-react";
import { CircleFlag } from 'react-circle-flags'
import { connect } from 'react-redux';
import { withLocalize, Translate } from "react-localize-redux";
import * as constants from '../../../constants';
import * as app from "../../../actions/app";

class SidebarNavItems extends React.Component {
  constructor(props) {
    super(props)
 this.state = {
      assetDropDown: false,


    
      
    }
   


  }
  toggleAssetDropDown() {
    const newState = { ...this.state };
    newState["assetDropDown"] = !this.state["assetDropDown"];
    this.setState(newState);
  }

  handleCurrency(currency){
	this.props.setSetting("default.currency", currency);
  }
  

  render() {
    const {mydappwallet} = window;
    	let userRoles = [];
      const user = mydappwallet.user;
      if(user) {
        userRoles = user.roles;
        
      }else return (null);
   const { cryptoItems } = this.props.appStore;   
   const { navItems: items } =  this.props.appStore;

    return (
      <div className="nav-wrapper">
   <Nav className="nav--no-borders flex-column">
	<div className="sidebar-header">
		
		<div className="totalBalance">
		<div className="balance">0.00</div>
	    <div className="currency">
			<Dropdown open={this.state.assetDropDown} toggle={this.toggleAssetDropDown.bind(this)} group>
						
        <DropdownToggle tag={NavLink} style={{"padding": 0, width:"100%"}}>
	<div className="menu">
				<div>{this.props.appStore.settings["default.currency"]}</div>
				
			<div className="caret"><i className="material-icons">keyboard_arrow_down</i></div>
			</div>
		</DropdownToggle>
		
        <DropdownMenu >

	{constants.CURRENCIES.map(function(name, index) {
			   return <DropdownItem  onClick={() => {this.handleCurrency(name)}}>	<div className="currency-item">
			   		<div className="icon"><div className="currency-icon"><CircleFlag countryCode={constants.CURRENCIES_COUNTRIES_CODES[name]} height="35" /></div></div>
					<div className="data">
			  		 	<div className="symbol">{name}</div>
						<div className="name"><Translate id={name}/></div>
					</div>
					</div>
				</DropdownItem>
		}.bind(this))
	}
	
		
        </DropdownMenu>
      </Dropdown>
		</div>
	</div>
	</div>
	</Nav>
       <Nav className="nav--no-borders flex-column">

        {  Object.entries(cryptoItems).map(([key,value],i) =>
           <SidebarNavCryptoItem name={key} item={value} />
  
        )}
              </Nav>
        {items.map((nav, idx) => (

          nav.authorize  && roleMatcher.rolesMatched(nav.authorize, userRoles) === false?(null):
          <div key={idx}>
            <h6 className="main-sidebar__nav-title">{nav.title}</h6>
            {typeof nav.items !== "undefined" && nav.items.length && (
              <Nav className="nav--no-borders flex-column">
                {nav.items.map((item, idx) => (
                  <SidebarNavItem key={idx} item={item} />
                ))}
              </Nav>
            )}
          </div>
                
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    ...state
  }
  
};

const mapDispatchToProps = (dispatch) => {
  return {
   setSetting: (name, value) => dispatch(app.setSetting(name, value)),


   
  
  };
};
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(SidebarNavItems));

