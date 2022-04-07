import React from "react";
import PropTypes from "prop-types";
import { NavLink as RouteNavLink } from "react-router-dom";
import {
  NavItem,
  NavLink,
  Collapse
} from "shards-react";

import { connect } from 'react-redux';
import * as constants from '../../../constants';
import getSymbolFromCurrency from 'currency-symbol-map'

class SidebarNavCryptoItem extends React.Component {
  constructor(props) {
    super(props);

  }

  

  render() {
    const { item, name } = this.props;

       return (
      <NavItem style={{ position: "relative" }}>
        <NavLink
          tag={RouteNavLink}
          to={'/crypto/' + name}
         
        >
          <div className="item-currency-block">
          {item.icon && (
            <div
              className="d-inline-block item-icon-wrapper"
              dangerouslySetInnerHTML={{ __html: item.icon }}
            />
          )}
          <div className="item-currency-wrapper">
          {item.title && (
            <div className="item-currency-info">
            <div className="item-currency-title">{item.title}
             <span className="item-currency-ticket">{item.symbol}</span>
            </div>
            </div>
          )}
          </div>
          <div class="item-balance-block"><div class="item-balance" title="0 ADA"><span class="item-balance-crypto">{item.balanceFormatted}</span></div>
          <div class="item-balance-fiat">{getSymbolFromCurrency(this.props.appStore.settings["default.currency"])}{item.balanceInFiat[this.props.appStore.settings["default.currency"]]?item.balanceInFiat[this.props.appStore.settings["default.currency"]]:"0.00"} </div>
          </div> 
          {item.htmlAfter && (
            <div
              className="d-inline-block item-icon-wrapper"
              dangerouslySetInnerHTML={{ __html: item.htmlAfter }}
            />
          )}
          </div>
        </NavLink>
        
      </NavItem>
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
 

  };
};

SidebarNavCryptoItem.propTypes = {
  /**
   * The item object.
   */
  name: PropTypes.string,
  item: PropTypes.object

};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarNavCryptoItem);
