// prettier-ignore
var Jsonrpc = require('./lib/jsonrpc.js');
var errors = require('web3-core-helpers').errors;
var XHR2 = require('xhr2-cookies').XMLHttpRequest; // jshint ignore: line
var http = require('http');
var https = require('https');
var formatter = require('./lib/formatters');
var Web3 = require('web3');



var MyDappWalletManager = function MyDappWalletManager(host, apiKey, options, callback) {
	this.withCredentials = options.withCredentials || false;
		this.timeout = options.timeout || 0;
		this.headers = options.headers;
		this.apiKey = options.apiKey;
		this.sessionId = 0;
		this.user = undefined;
		this.settings = {};
		this.agent = options.agent;
		this.redirect = options.redirect; 
		this.connected = false;
		this.info = undefined;
		// keepAlive is true unless explicitly set to false
		const keepAlive = options.keepAlive !== false;
		this.host = host || 'http://localhost:8545';
		if (!this.agent) {
			if (this.host.substring(0, 5) === "https") {
				this.httpsAgent = new https.Agent({ keepAlive });
			}
			else {
				this.httpAgent = new http.Agent({ keepAlive });
			}
		}
		this.init(callback);
		this.method = this.method.bind(this);
		this.method("profile");
		this.method("profile_edit");
		this.method("book_add");
		this.method("book_delete");
		this.method("book_edit");
		this.method("book_list");
		this.method("token_list");
		this.method("token_add");
		this.method("token_delete");
		this.method("exchange_rates");

}


MyDappWalletManager.prototype.init =  function(callback) {
		let _this = this;
		this.sessionId = window.localStorage.getItem("SessionId");
		if(this.sessionId){
			this.send({"jsonrpc":"2.0","method":"init"}, _this._jsonrpcResultCallback(function (error, result){
				if(result){
					_this.sessionId = result.sessionId;
					_this.wallet = result.wallet;
				    _this.user = result.user;
					_this.settings = result.settings;
				}else {
					_this.sessionId = undefined;
					_this.wallet = undefined;
				    _this.user = undefined;
					_this.settings = {};
					window.localStorage.removeItem("SessionId");

				}
				window.setTimeout(()=>{ callback(error,result)}, 0);
			
		
			})
			)
		} else {
			window.setTimeout(()=>{ callback("session not found")}, 0);
		}	
}

MyDappWalletManager.prototype.login =  function(params, callback) {
	let _this = this;
	params = formatter.hexParamsFormatter(params);
	this.send({"jsonrpc":"2.0","method":"login","params":[params]},
 		_this._jsonrpcResultCallback(function (error, result){
			if(!error) {
				_this.sessionId = result.sessionId;
				_this.wallet = result.wallet;
				_this.user = result.user;
				_this.settings = result.settings;
				window.localStorage.setItem("SessionId", result.sessionId);
			}
			if(callback)callback(error, result);	
		
          })
	);
	return true;
}

MyDappWalletManager.prototype.logout = function (callback){
	let _this = this;
	
	this.send({"jsonrpc":"2.0","method":"logout"},
 		_this._jsonrpcResultCallback(function (error, result){
			    _this.sessionId = undefined;
				_this.user = undefined;
                window.localStorage.setItem("SessionId", undefined);
                if(callback)callback(error, result);	
			})
	);
	return true;
}

MyDappWalletManager.prototype.register =  function(params, callback) {
	let _this = this;
	params = formatter.hexParamsFormatter(params);
	this.send({"jsonrpc":"2.0","method":"register","params":[params]},
 		_this._jsonrpcResultCallback(function (error, result){
				if(callback)callback(error, result);	
		
          })
	);
	return true;
}

MyDappWalletManager.prototype.register2 =  function(params, callback) {
	let _this = this;
	params = formatter.hexParamsFormatter(params);
	this.send({"jsonrpc":"2.0","method":"register2","params":[params]},
 		_this._jsonrpcResultCallback(function (error, result){
			if(!error) {
				_this.sessionId = result.sessionId;
				_this.wallet = result.wallet;
				_this.user = result.user;
				window.localStorage.setItem("SessionId", result.sessionId);
			}
				if(callback)callback(error, result);	
		
          })
	);
	return true;
}

MyDappWalletManager.prototype.forgot_password =  function(params, callback) {
	let _this = this;
	params = formatter.hexParamsFormatter(params);
	this.send({"jsonrpc":"2.0","method":"forgot_password","params":[params]},
 		_this._jsonrpcResultCallback(function (error, result){
				if(callback)callback(error, result);	
		
          })
	);
	return true;
}

MyDappWalletManager.prototype.reset_password =  function(params, callback) {
	let _this = this;
	params = formatter.hexParamsFormatter(params);
	this.send({"jsonrpc":"2.0","method":"reset_password","params":[params]},
 		_this._jsonrpcResultCallback(function (error, result){
				if(callback)callback(error, result);	
		
          })
	);
	return true;
}

MyDappWalletManager.prototype.change_password =  function(params, callback) {
	let _this = this;
	params = formatter.hexParamsFormatter(params);
	this.send({"jsonrpc":"2.0","method":"change_password","params":[params]},
 		_this._jsonrpcResultCallback(function (error, result){
				if(callback)callback(error, result);	
		
          })
	);
	return true;
}

MyDappWalletManager.prototype.change_authenticator =  function(params, callback) {
	let _this = this;
	params = formatter.hexParamsFormatter(params);
	this.send({"jsonrpc":"2.0","method":"change_authenticator","params":[params]},
 		_this._jsonrpcResultCallback(function (error, result){
				if(callback)callback(error, result);	
		
          })
	);
	return true;
}




MyDappWalletManager.prototype.reflink =  function(params, callback) {
	let _this = this;
	params = formatter.hexParamsFormatter(params);
	this.send({"jsonrpc":"2.0","method":"reflink","params":[params]},
 		_this._jsonrpcResultCallback(function (error, result){
				if(callback)callback(error, result);	
		
          })
	);
	return true;
}



MyDappWalletManager.prototype.connect =  function(params, callback) {
	let _this = this;
	params = formatter.hexParamsFormatter(params);
	this.send({"jsonrpc":"2.0","method":"connect","params":[params]},
 		_this._jsonrpcResultCallback(callback)
	);
	return true;
}

MyDappWalletManager.prototype.app =  function(params, callback) {
	let _this = this;
	params = formatter.hexParamsFormatter(params);
	this.send({"jsonrpc":"2.0","method":"app","params":[params]},
 		_this._jsonrpcResultCallback(callback)
	);
	return true;
}


MyDappWalletManager.prototype.transaction =  function(params, callback) {
	let _this = this;
	params = formatter.hexParamsFormatter(params);
	this.send({"jsonrpc":"2.0","method":"transaction","params":[params]},
 		_this._jsonrpcResultCallback(callback)
	);
	return true;
}

MyDappWalletManager.prototype.transaction_list =  function(params, callback) {
	let _this = this;
	params = formatter.hexParamsFormatter(params);
	this.send({"jsonrpc":"2.0","method":"transaction_list","params":[params]},
 		_this._jsonrpcResultCallback(callback)
	);
	return true;
}

MyDappWalletManager.prototype.pay =  function(params, callback) {
	let _this = this;
	params = formatter.hexParamsFormatter(params);
	this.send({"jsonrpc":"2.0","method":"pay","params":[params]},
 		_this._jsonrpcResultCallback(callback)
	);
	return true;
}

MyDappWalletManager.prototype.payment =  function(params, callback) {
	let _this = this;
	params = formatter.hexParamsFormatter(params);
	this.send({"jsonrpc":"2.0","method":"payment","params":[params]},
 		_this._jsonrpcResultCallback(callback)
	);
	return true;
}

MyDappWalletManager.prototype.confirm =  function(params, callback) {
	let _this = this;
	params = formatter.hexParamsFormatter(params);
	this.send({"jsonrpc":"2.0","method":"confirm","params":[params]},
 		_this._jsonrpcResultCallback(callback)
	);
	return true;
}


MyDappWalletManager.prototype.reject =  function(params, callback) {
	let _this = this;
	params = formatter.hexParamsFormatter(params);
	this.send({"jsonrpc":"2.0","method":"reject","params":[params]},
 		_this._jsonrpcResultCallback(callback)
	);
	return true;
}





MyDappWalletManager.prototype.method = function(name)  {
		this[name] = function(params, callback) {
			let _this = this;
			params = formatter.hexParamsFormatter(params);
			this.send({"jsonrpc":"2.0","method":name,"params":[params]},
		 		_this._jsonrpcResultCallback(function (error, result){
						if(callback)callback(error, result);	
				
		          })
			);
			return true;
		}
}

MyDappWalletManager.prototype.event = function (event, err, result) {
 
    
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


MyDappWalletManager.prototype._prepareRequest = function () {
	var request;
		// the current runtime is a browser
		if (typeof XMLHttpRequest !== 'undefined') {
			request = new XMLHttpRequest();
		}
		else {
			request = new XHR2();
			var agents = { httpsAgent: this.httpsAgent, httpAgent: this.httpAgent, baseUrl: this.baseUrl };
			if (this.agent) {
				agents.httpsAgent = this.agent.https;
				agents.httpAgent = this.agent.http;
				agents.baseUrl = this.agent.baseUrl;
			}
			request.nodejsSet(agents);
		}
		
		request.open('POST', this.host, true);
		request.setRequestHeader("ApiKey", this.apiKey);
		if(this.sessionId)
			request.setRequestHeader("SessionId", this.sessionId);
		request.setRequestHeader('Content-Type', 'application/json');
	//
		request.timeout = this.timeout;
		request.withCredentials = this.withCredentials;
		if (this.headers) {
			this.headers.forEach(function (header) {
				request.setRequestHeader(header.name, header.value);
			});
		}
		return request;
}


MyDappWalletManager.prototype.send = function (payload, callback) {
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

}



MyDappWalletManager.prototype._jsonrpcResultCallback = function (callback, payload) {
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
	
 MyDappWalletManager.prototype.InvalidResponse =  function (result) {
        var message = !!result && !!result.error && !!result.error.message ? result.error.message : 'Invalid JSON RPC response: ' + JSON.stringify(result);
        var err = new Error(message);
        var code = (!!result.error && !!result.error.code) ? result.error.code : 500;
		err.code = code;
        return err;
    };

MyDappWalletManager.prototype.ErrorResponse =  function (result) {
        var message = !!result && !!result.error && !!result.error.message ? result.error.message : JSON.stringify(result);
        var data = (!!result.error && !!result.error.data) ? result.error.data : null;
        var err = new Error(message);
        err.data = data;
 		var code = (!!result.error && !!result.error.code) ? result.error.code : null;
		err.code = code;
        return err;
};
MyDappWalletManager.prototype.info = function (){
	
    return this.info;
 	
}	
MyDappWalletManager.prototype.resetInfo = function (){
	
    this.info = undefined;
 	
}	


module.exports = MyDappWalletManager;