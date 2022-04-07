import React from "react";
import { withLocalize, Translate } from "react-localize-redux";
import { connect } from 'react-redux';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";

import *  as constants from '../../../constants';
import IconFactory from '../../../utils/IconFactory';
import ErrorDialog from "../../common/ErrorDialog";
import * as wallet from "../../../actions/wallet";
class NavbarWallet extends React.Component {
	constructor(props) {
		super(props);
		 this.state = {
      visible: false,
	  error: undefined,
	  walletDropDown: false,
    };

    this.toggleWalletActions = this.toggleWalletActions.bind(this);
    this.selectWallet = this.selectWallet.bind(this);
 	this.handleErrorClose= this.handleErrorClose.bind(this);
	this.handleWalletSelect = this.handleWalletSelect.bind(this);
	
}

componentDidMount(){
	this.props.reloadBalance();
	 if (!this.interval) {
      this.interval = setInterval( this.props.reloadBalance, 10000);
    }
}



	
toggleWalletActions() {
    this.setState({
      visible: !this.state.visible
    });

  }

toggleWalletDropDown() {
    const newState = { ...this.state };
    newState["walletDropDown"] = !this.state["walletDropDown"];
    this.setState(newState);
  }

  selectWallet(wallet){
	this.props.changeWallet(wallet)

  }

 handleWalletSelect(wallet){
		this.props.changeWallet(wallet);
		this.props.reloadBalance();
	}

handleErrorClose() {
		this.setState({
     		 error: undefined
		});
	 	
  }
	render() {
		const {web3} = window;
		const  account = this.props.walletStore.wallet;
		const wallet = web3.eth.accounts.wallet;
		const balance = this.props.walletStore.balance/constants.ETHER;
   const network = window.web3._provider.network;
		if(!account)return (null);
		return (
             <NavItem tag={Dropdown} caret toggle={this.toggleWalletActions}>
		  <ErrorDialog isOpen={this.state.error} toggle={this.handleErrorClose} centered={true} title={<Translate id="error"/>} error={this.state.error?this.state.error.code:0}/>
           <div className="network-component-wrapper d-down-none">
				<Dropdown open={this.state.walletDropDown} toggle={this.toggleWalletDropDown.bind(this)} group>
				   <DropdownToggle tag={NavLink} style={{"padding": 0}}>
			<div className="wallet">
						<div className="icon"> {IconFactory.generateMediumIdenticon(account.address)}</div>
						<div className="data">
						<div className="name">{account.name}</div>
						<div className="address">{account.address}</div>
							
					</div>
					<div className="caret"><i className="material-icons">keyboard_arrow_down</i></div>
					</div>
				</DropdownToggle>		
	<Collapse tag={DropdownMenu} right small open={this.state.visible}>
   
		
		{Array.from({length: wallet.length}, (_, index) => index).map((item) => {
			   return <DropdownItem key= {wallet[item].address} onClick={() => {this.handleWalletSelect(wallet[item])}}>	<div className="wallet-item">
			   <div className="icon"> {IconFactory.generateMediumIdenticon(wallet[item].address)}</div>
				<div className="data">
				<div className="name">{wallet[item].name}</div>
			   	<div className="address">{wallet[item].address}</div>
		
				</div>
			</div>
</DropdownItem>
		})}

        </Collapse>
      </Dropdown>

	<div className="wallet-balance">{balance.toFixed(10).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1')} {network.symbol}</div>
            </div>
		
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

 changeWallet: (wallet_) => dispatch(wallet.changeWallet(wallet_)),
 reloadBalance: () => dispatch(wallet.reloadBalance()),
 };
};
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(NavbarWallet));