import React, { Component } from "react";
import { connect } from 'react-redux';
import { BrowserRouter  as Router, Switch, Route } from "react-router-dom";
import { Redirect } from 'react-router'
import routes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/main.scss";
import { withLocalize } from "react-localize-redux";

import {
  Alert,
  Container,
} from "shards-react";

import globalTranslations from "./translations/global.json";

import * as roleMatcher from './utils/roleMatcher';
import {Loader} from "./components/loader";

import Login from "./views/Login";
import { Empty } from "./layouts";
import Error from "./views/Error";

import * as app from "./actions/app";

var MyDappWalletManager = require('./modules/mydappwallet');

class App extends Component {
	constructor(props) {
	super(props);
	this.error = undefined;
	this.forceRender = this.forceRender.bind(this);
	  var defaultLanguage = "en";
  	  const onMissingTranslation = ({ translationId, languageCode }) => {
      		return translationId;
	  };
		
	this.props.initialize({

      languages: [
        { name: "English", code: "en" },
        { name: "Polish", code: "pl" }
       ],
      translation: globalTranslations,
      options: {
        renderToStaticMarkup: false,
        renderInnerHtml: true,
        defaultLanguage: defaultLanguage,
        showMissingTranslationMsg: false,
        onMissingTranslation 
      }
    });
	  this.props.addTranslation(require("./translations/currencies.json"));
	  this.props.addTranslation(require("./translations/errors.json"));
	  this.props.addTranslation(require("./translations/infos.json"));
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	
 	  window.app = this;

   	


	}
	componentDidMount(){
		  window.mydappwallet = new MyDappWalletManager('https://api.mydappwallet.com', "Rczx3k42DgnBcN4A92EA", {withCredentials: false, apiKey:"Rczx3k42DgnBcN4A92EA", redirect:  (to) => { window.open(to)}}, function(error, result ) {
			if(result){
			
				this.props.init();	
				
			}else {
				
				this.props.loadingStop();
			}
	  }.bind(this));
	}
	

	
	forceRender(){
	
		this.forceUpdate();
	}
	     
	 render() {
		if(this.props.appStore.loading)return (<Empty><Loader/></Empty>);	

		
			console.log('render')
		
		
	
	//	if(this.props.appStore.error)return (<Error code={this.props.appStore.error.code}/>);
		const {mydappwallet} = window;
		let userRoles = [];
		const user = mydappwallet.user;
		if(user) {
			userRoles = user.roles;
			
		}

			
		
		return (<React.Fragment>

			<Router basename={process.env.REACT_APP_BASENAME || ""}>
		       <Switch>
      {routes.map((route, index) => {
  
          return route.component ? (
            <Route
	            key={index}
	            path={route.path}
	            exact={route.exact}
	            render={props => (
					route.authorize  && roleMatcher.rolesMatched(route.authorize, userRoles) === false?!user?<Empty error={this.props.appStore.error} info={mydappwallet.info}><Login/></Empty>:<Error code={301}/>:	<route.layout error={this.props.appStore.error} info={mydappwallet.info}><route.component {...props} /></route.layout>
					
	                )}
	                 
            	
          	/>):(null)
			})

      }
      <Route path="*" name="Home" render={() => <Redirect push={true} to="/error/404"/>} /> 
	
	  </Switch>
  		</Router>
		</React.Fragment>
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

 init: () => dispatch(app.init()),
 loadingStop: () => dispatch(app.loadingStop()),

   
  
  };
};
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(App));

