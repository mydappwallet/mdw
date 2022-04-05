/*
    This file is part of web3.js.

    web3.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    web3.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/** @file httpprovider.js
 * @authors:
 *   Marek Kotewicz <marek@parity.io>
 *   Marian Oancea
 *   Fabian Vogelsteller <fabian@ethereum.org>
 * @date 2015
 */




var errors = require('web3-core-helpers').errors;
var XHR2 = require('xhr2-cookies').XMLHttpRequest; // jshint ignore: line
var http = require('http');
var https = require('https');
var utils = require('web3-utils');
var Jsonrpc = require('../lib/jsonrpc.js');
/**
 * HttpProvider should be used to send rpc calls over http
 */


const confirmStyle = {
   position: 'fixed',
  top: '50%',
  left: '50%',
  /* bring your own prefixes */
  transform: 'translate(-50%, -50%)'
};


var MyDappWalletWeb3Provider = function HttpProvider(host, mydappwallet) {
    this.host = host || 'http://localhost:8545';
    this.mydappwallet = mydappwallet;	
	
	
	
    



};


MyDappWalletWeb3Provider.prototype.login = function (params, callback){
	let _this = this;
	
	this.send({"jsonrpc":"2.0","method":"login","params":[params]},
 		_this._jsonrpcResultCallback(function (error, result){
			if(error){

			}else {
				_this.sessionId = result.sessionId;
                _this.setNetwork(result.network);
				window.localStorage.setItem("SessionId", result.sessionId);
			}
			if(callback)callback(error, result);	
		
          })
	);
	return true;
}

MyDappWalletWeb3Provider.prototype.network_change = function (params, callback){
	
	this.send({"jsonrpc":"2.0","method":"network_change","params":[params]},
 		this._jsonrpcResultCallback(function (error, result){
             if(result){
       
                 this.network = result;
	             this.host = result.host;
             }
			if(callback)callback(error, result);	
		
          }.bind(this))
	);
	return true;
}

MyDappWalletWeb3Provider.prototype.logout = function (callback){
	let _this = this;
	
	this.send({"jsonrpc":"2.0","method":"logout"},
 		_this._jsonrpcResultCallback(function (error, result){
			    _this.sessionId = result.sessionId;
                window.localStorage.setItem("SessionId", undefined);
                if(callback)callback(error, result);	
			})
	);
	return true;
}

MyDappWalletWeb3Provider.prototype.register = function (username, password, email, callback){
	let _this = this;
	username = utils.utf8ToHex(username);
    password = utils.utf8ToHex(password);
    email = utils.utf8ToHex(email);
    
   

	this.send({"jsonrpc":"2.0","method":"gateway_register","params":[{'username': username, password: password, email: email}]},
 		_this._jsonrpcResultCallback(function (error, result){
			if(error){
				_this.accounts = []; 
			}else {
				_this.sessionId = result.sessionId;
				_this.setNetwork(result.network);
                window.localStorage.setItem("SessionId", result.sessionId);
         
			}
			if(callback)callback(error, result);	
		
          })
	);
	return true;
}


//{"jsonrpc":"2.0","id":2,"method":"gateway_login","params":[{"username":"0x4b6f6e726164","password":"0x3132333435363738","remember":false}]}

MyDappWalletWeb3Provider.prototype._bindEvent =  function(element, eventName, eventHandler) {
	 if (element.addEventListener){
                element.addEventListener(eventName, eventHandler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + eventName, eventHandler);
            }
}
MyDappWalletWeb3Provider.prototype._prepareRequest = function () {
    var request;
    // the current runtime is a browser
    if (typeof XMLHttpRequest !== 'undefined') {
        request = new XMLHttpRequest();
    }
    else {
        request = new XHR2();
        var agents = { httpsAgent: this.httpsAgent, httpAgent: this.httpAgent, baseUrl: this.baseUrl };
        if (this.mydappwallet.agent) {
            agents.httpsAgent = this.mydappwallet.agent.https;
            agents.httpAgent = this.mydappwallet.agent.http;
            agents.baseUrl = this.mydappwallet.agent.baseUrl;
        }
        request.nodejsSet(agents);
    }
	
    request.open('POST', this.host, true);
    request.setRequestHeader("ApiKey", this.mydappwallet.apiKey);
	if(this.mydappwallet.sessionId)
		request.setRequestHeader("SessionId", this.mydappwallet.sessionId);
    request.setRequestHeader('Content-Type', 'application/json');
//
    request.timeout = this.mydappwallet.timeout;
    request.withCredentials = this.mydappwallet.withCredentials;
    if (this.mydappwallet.headers) {
        this.mydappwallet.headers.forEach(function (header) {
            request.setRequestHeader(header.name, header.value);
        });
    }
    return request;
};
/**
 * Should be used to make async request
 *
 * @method send
 * @param {Object} payload
 * @param {Function} callback triggered on end with (err, result)
 */
MyDappWalletWeb3Provider.prototype.event = function (event, err, result) {
 
    
        if(result && result.info){
            event.info = result.info;
        }
        if (err) {
             event.error = err;
        }else if (result && result.error) {
            event.error = result.error;
        }else if (!Jsonrpc.isValidResponse(result)) {
            return  event.error = errors.InvalidResponse(result);
        } else {
            event.result = result.result;
        }


     switch(event.target){
        
           case 'mydappshop-inpage':
            	if(window.opener){
                    window.opener.postMessage(event, "*");
                }

        
           break;
        
    }
}

MyDappWalletWeb3Provider.prototype.send = function (payload, callback) {
    var _this = this;
    var request = this._prepareRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.timeout !== 1) {
            var result = request.responseText;
            var error = null;
            try {
                result = JSON.parse(result);
					
            }
            catch (e) {
                error = _this.InvalidResponse(request.responseText);
            }
            _this.connected = true;
            if(result.event){
                    _this.event(result.event, error, result);	
            }
            callback(error, result);
        }
    };
    request.ontimeout = function () {
        _this.connected = false;
        callback(errors.ConnectionTimeout(this.timeout));
    };
    try {
        request.send(JSON.stringify(payload));
    }
    catch (error) {
        this.connected = false;
        callback(errors.InvalidConnection(this.host));
    }
};





MyDappWalletWeb3Provider.prototype.disconnect = function () {
    //NO OP
};
/**
 * Returns the desired boolean.
 *
 * @method supportsSubscriptions
 * @returns {boolean}
 */
MyDappWalletWeb3Provider.prototype.supportsSubscriptions = function () {
    return false;
};

 MyDappWalletWeb3Provider.prototype.InvalidResponse =  function (result) {
        var message = !!result && !!result.error && !!result.error.message ? result.error.message : 'Invalid JSON RPC response: ' + JSON.stringify(result);
        var err = new Error(message);
        var code = (!!result.error && !!result.error.code) ? result.error.code : 500;
		err.code = code;
        return err;
    };

MyDappWalletWeb3Provider.prototype.ErrorResponse =  function (result) {
        var message = !!result && !!result.error && !!result.error.message ? result.error.message : JSON.stringify(result);
        var data = (!!result.error && !!result.error.data) ? result.error.data : null;
        var err = new Error(message);
        err.data = data;
 		var code = (!!result.error && !!result.error.code) ? result.error.code : null;
		err.code = code;
        return err;
};


MyDappWalletWeb3Provider.prototype._jsonrpcResultCallback = function (callback, payload) {
      let _this = this; 
  	  return function (err, result) {
        if (result && result.id && payload.id !== result.id) {
            return callback(new Error(`Wrong response id ${result.id} (expected: ${payload.id}) in ${JSON.stringify(payload)}`));
        }
        if (err) {
            return callback(err);
        }
        if(result && result.info){
            _this.info = result.info;
        }
        if (result && result.error) {
            return callback(_this.ErrorResponse(result));
        }
        if (!Jsonrpc.isValidResponse(result)) {
            return callback(errors.InvalidResponse(result));
        }
        callback(null, result.result);
    }};

MyDappWalletWeb3Provider.prototype.setNetwork = function (network) {
	this.network = network;
	this.host = network.host;
} 	


MyDappWalletWeb3Provider.prototype.readInfo = function () {
	this.info = undefined;
	
} 	



MyDappWalletWeb3Provider.prototype.disconnect = function () {
    //NO OP
};
	


module.exports = MyDappWalletWeb3Provider;