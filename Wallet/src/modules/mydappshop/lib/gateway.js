

var core = require('web3-core');
var helpers = require('web3-core-helpers');
//var formatter = helpers.formatters;

var formatter = require('./formatters');
var _ = require('underscore');
var Method = require('web3-core-method');
var utils = require('web3-utils');
var Account = require('eth-lib/lib/account');
var Hash = require('eth-lib/lib/hash');
var errors = require('web3-core-helpers').errors;
var Jsonrpc = require('./jsonrpc.js');
var inputParamsFormatter = function (params) {
	
    return params;
};

var hexParamsFormatter = function (params) {
    var hexParams = {};
    for (const key in params) {
        const value = params[key];
        if ((typeof value === 'string' || value instanceof String) && !utils.isHexStrict(value)){
         
             hexParams[key] = utils.utf8ToHex(value);
        }else if(Array.isArray(value)){
           var array = [];
           for (var i = 0; i < value.length; i++){
                if ((typeof value[i] === 'string' || value[i] instanceof String) && !utils.isHexStrict(value[i])){
                      array[i] = utils.utf8ToHex(value[i]);
                }else {
                   array[i] = value[i]
                }
           }
           hexParams[key] = array;
        }else {
              hexParams[key] = value;
        }
        

         
    }
    return hexParams;
};





var Gateway = function gateway() {
   var _this = this;
	this.web3 = arguments[0];
    core.packageInit(this, arguments);
	
 // overwrite package setRequestManager
    var setRequestManager = this.setRequestManager;
    this.setRequestManager = function (manager) {
        setRequestManager(manager);

        _this.net.setRequestManager(manager);
        _this.personal.setRequestManager(manager);
        _this.accounts.setRequestManager(manager);
        _this.Contract._requestManager = _this._requestManager;
        _this.Contract.currentProvider = _this._provider;

        return true;
    };

    this._requestManager._jsonrpcResultCallback = _this.web3._provider._jsonrpcResultCallback.bind(_this.web3._provider);
    /*
	this._requestManager._jsonrpcResultCallback = function (callback, payload) {
  	  return function (err, result) {
        if (result && result.id && payload.id !== result.id) {
            return callback(new Error(`Wrong response id ${result.id} (expected: ${payload.id}) in ${JSON.stringify(payload)}`));
        }
        if (err) {
            return callback(err);
        }
        if (result && result.error) {
            return callback(_this.ErrorResponse(result));
        }
        if (!Jsonrpc.isValidResponse(result)) {
            return callback(errors.InvalidResponse(result));
        }
        callback(null, result.result);
    }};
    */
	
    // overwrite setProvider
    var setProvider = this.setProvider;
    this.setProvider = function () {
        setProvider.apply(_this, arguments);

        _this.setRequestManager(_this._requestManager);

        // Set detectedAddress/lastSyncCheck back to null because the provider could be connected to a different chain now
        _this.ens._detectedAddress = null;
        _this.ens._lastSyncCheck = null;
    };
 	var handleRevert = false;
    var defaultAccount = null;
    var defaultBlock = 'latest';
    var transactionBlockTimeout = 50;
    var transactionConfirmationBlocks = 24;
    var transactionPollingTimeout = 750;
    var maxListenersWarningThreshold = 100;
    var defaultChain, defaultHardfork, defaultCommon;

 Object.defineProperty(this, 'handleRevert', {
        get: function () {
            return handleRevert;
        },
        set: function (val) {
            handleRevert = val;

            // also set on the Contract object
            _this.Contract.handleRevert = handleRevert;

            // update handleRevert
            methods.forEach(function(method) {
                method.handleRevert = handleRevert;
            });
        },
        enumerable: true
    });
    Object.defineProperty(this, 'defaultCommon', {
        get: function () {
            return defaultCommon;
        },
        set: function (val) {
            defaultCommon = val;

            // also set on the Contract object
            _this.Contract.defaultCommon = defaultCommon;

            // update defaultBlock
            methods.forEach(function(method) {
                method.defaultCommon = defaultCommon;
            });
        },
        enumerable: true
    });
    Object.defineProperty(this, 'defaultHardfork', {
        get: function () {
            return defaultHardfork;
        },
        set: function (val) {
            defaultHardfork = val;

            // also set on the Contract object
            _this.Contract.defaultHardfork = defaultHardfork;

            // update defaultBlock
            methods.forEach(function(method) {
                method.defaultHardfork = defaultHardfork;
            });
        },
        enumerable: true
    });
    Object.defineProperty(this, 'defaultChain', {
        get: function () {
            return defaultChain;
        },
        set: function (val) {
            defaultChain = val;

            // also set on the Contract object
            _this.Contract.defaultChain = defaultChain;

            // update defaultBlock
            methods.forEach(function(method) {
                method.defaultChain = defaultChain;
            });
        },
        enumerable: true
    });
    Object.defineProperty(this, 'transactionPollingTimeout', {
        get: function () {
            return transactionPollingTimeout;
        },
        set: function (val) {
            transactionPollingTimeout = val;

            // also set on the Contract object
            _this.Contract.transactionPollingTimeout = transactionPollingTimeout;

            // update defaultBlock
            methods.forEach(function(method) {
                method.transactionPollingTimeout = transactionPollingTimeout;
            });
        },
        enumerable: true
    });
    Object.defineProperty(this, 'transactionConfirmationBlocks', {
        get: function () {
            return transactionConfirmationBlocks;
        },
        set: function (val) {
            transactionConfirmationBlocks = val;

            // also set on the Contract object
            _this.Contract.transactionConfirmationBlocks = transactionConfirmationBlocks;

            // update defaultBlock
            methods.forEach(function(method) {
                method.transactionConfirmationBlocks = transactionConfirmationBlocks;
            });
        },
        enumerable: true
    });
    Object.defineProperty(this, 'transactionBlockTimeout', {
        get: function () {
            return transactionBlockTimeout;
        },
        set: function (val) {
            transactionBlockTimeout = val;

            // also set on the Contract object
            _this.Contract.transactionBlockTimeout = transactionBlockTimeout;

            // update defaultBlock
            methods.forEach(function(method) {
                method.transactionBlockTimeout = transactionBlockTimeout;
            });
        },
        enumerable: true
    });
    Object.defineProperty(this, 'defaultAccount', {
        get: function () {
            return defaultAccount;
        },
        set: function (val) {
            if(val) {
                defaultAccount = utils.toChecksumAddress(formatter.inputAddressFormatter(val));
            }

            // also set on the Contract object
            _this.Contract.defaultAccount = defaultAccount;
            _this.personal.defaultAccount = defaultAccount;

            // update defaultBlock
            methods.forEach(function(method) {
                method.defaultAccount = defaultAccount;
            });

            return val;
        },
        enumerable: true
    });
    Object.defineProperty(this, 'defaultBlock', {
        get: function () {
            return defaultBlock;
        },
        set: function (val) {
            defaultBlock = val;
            // also set on the Contract object
            _this.Contract.defaultBlock = defaultBlock;
            _this.personal.defaultBlock = defaultBlock;

            // update defaultBlock
            methods.forEach(function(method) {
                method.defaultBlock = defaultBlock;
            });

            return val;
        },
        enumerable: true
    });
    Object.defineProperty(this, 'maxListenersWarningThreshold', {
        get: function () {
            return maxListenersWarningThreshold;
        },
        set: function (val) {
            if (_this.currentProvider && _this.currentProvider.setMaxListeners){
                maxListenersWarningThreshold = val;
                _this.currentProvider.setMaxListeners(val);
            }
        },
        enumerable: true
    });

 		var methods = [
       	new Method({
            name: '_network_list',
            call: 'gateway_network_list',
            params: 0,
            
        }),
		new Method({
            name: '_network_change',
            call: 'gateway_network_change',
            params: 1,
            inputFormatter: [inputParamsFormatter],
          
       	 }),
		new Method({
            name: '_login',
            call: 'gateway_login',
            params: 1,
            inputFormatter: [inputParamsFormatter],
          
       	 }),
		new Method({
            name: '_logout',
            call: 'gateway_logout',
            params: 0,
                     
       	 }),
		new Method({
            name: '_register',
            call: 'gateway_register',
            params: 1,
            inputFormatter: [inputParamsFormatter],
          
            }),
        new Method({
            name: '_profile',
            call: 'gateway_profile',
            params: 0,
                     
            }),    
          new Method({
            name: 'profile_edit',
            call: 'gateway_profile_edit',
            params: 1,
            inputFormatter: [hexParamsFormatter],
                     
       	 }),        
		new Method({
            name: 'confirm',
            call: 'gateway_confirm',
            params: 1,
            inputFormatter: [hexParamsFormatter],
          
       	 }),
		new Method({
            name: '_reject',
            call: 'gateway_reject',
            params: 1,
            inputFormatter: [inputParamsFormatter],
          
       	 }),
				
		new Method({
            name: '_update',
            call: 'gateway_update',
            params: 1,
            inputFormatter: [inputParamsFormatter],
          
       	 }),

		new Method({
            name: 'token_add',
            call: 'gateway_token_add',
            params: 1,
            inputFormatter: [hexParamsFormatter],
          
       	 }),

		 new Method({
            name: 'token_delete',
            call: 'gateway_token_delete',
            params: 1,
            inputFormatter: [hexParamsFormatter],
          
       	 }),
		 new Method({
            name: 'token_list',
            call: 'gateway_token_list',
            params: 0,
          
       	 }),

		new Method({
            name: '_wallet_add',
            call: 'gateway_wallet_add',
            params: 1,
            inputFormatter: [inputParamsFormatter],
          
       	 }),
		new Method({
            name: '_wallet_edit',
            call: 'gateway_wallet_edit',
            params: 1,
            inputFormatter: [inputParamsFormatter],
          
       	 }),
		new Method({
            name: '_wallet_delete',
            call: 'gateway_wallet_delete',
            params: 1,
            inputFormatter: [inputParamsFormatter],
          
       	 }),
		new Method({
            name: 'book_add',
            call: 'gateway_book_add',
            params: 1,
            inputFormatter: [hexParamsFormatter],
          
       	 }),
         new Method({
            name: 'book_edit',
            call: 'gateway_book_edit',
            params: 1,
            inputFormatter: [hexParamsFormatter],
          
       	 }),

		 new Method({
            name: 'book_delete',
            call: 'gateway_book_delete',
            params: 1,
            inputFormatter: [hexParamsFormatter],
          
       	 }),
		 new Method({
            name: 'book_list',
            call: 'gateway_book_list',
            params: 0,
          
       	 }),
		new Method({
            name: '_transaction',
            call: 'gateway_transaction',
            params: 1,
            inputFormatter: [inputParamsFormatter],
          
       	 }),
		 new Method({
            name: '_transaction_history',
            call: 'gateway_transaction_history',
            params: 1,
            inputFormatter: [ formatter.inputTransactionHistoryFormatter ],
          
       	 }),
		
		];
		methods.forEach(function(method) {
        method.attachToObject(_this);
        method.setRequestManager(_this._requestManager, _this.accounts); // second param is the eth.accounts module (necessary for signing transactions locally)
        method.defaultBlock = _this.defaultBlock;
        method.defaultAccount = _this.defaultAccount;
        method.transactionBlockTimeout = _this.transactionBlockTimeout;
        method.transactionConfirmationBlocks = _this.transactionConfirmationBlocks;
        method.transactionPollingTimeout = _this.transactionPollingTimeout;
        method.handleRevert = _this.handleRevert;
    });
	return true;

}



Gateway.prototype.addAccount = function (account){
	
	let wallet = this.web3.eth.accounts.wallet;
	account.address = this.web3.utils.toChecksumAddress(account.address);
	 if (!wallet[account.address]) {
		 this.web3.eth.accounts._addAccountFunctions(account);
		account.index = wallet._findSafeIndex();
        wallet[account.index] = account;
        wallet[account.address] = account;
        wallet[account.address.toLowerCase()] = account;
        wallet.length++;
		 return account;
	 }else {
		 return wallet[account.address];
	}
	

 
}

Gateway.prototype.sign = function(message, privateKey) {
	let hash =  Hash.keccak256s(message);
	 var signature = Account.sign(hash, privateKey);
     var vrs = Account.decodeSignature(signature);
    return {
        message: message,
        messageHash: hash,
        v: vrs[0],
        r: vrs[1],
        s: vrs[2],
        signature: signature
    };
	
 
}





Gateway.prototype.getNetworks = function (callback){
	let _this = this;
	this._network_list(
 		function(error, result){
			if(error){
				_this.user = undefined;
				if(callback)callback(error, undefined);
			}else {
				if(callback)callback(undefined, result);
			
				
			}
	
          });
}

Gateway.prototype.changeNetwork = function (chainId, callback){
	let _this = this;
if(_this.user===undefined){
		callback({code: 300, message:'Please log in before transaction!'}, undefined);
		return false;
	}

	this._network_change({chainId},
 		function(error, result){
			if(result){
				_this.web3._provider.setNetwork(result);
			}
			callback(error, result);	
			
		
          });
	return true;
}

Gateway.prototype.init = function (callback){
	let _this = this;
	_this.web3._provider.init( function (error, result){
		if(error){
				_this.user = undefined;

		}else {
				result.accounts.forEach(function(account) {
					var account = _this.addAccount(account);
				});
				_this.user = result.user;	
		}
		callback(error, result);	
	});
	
	return true;
}

Gateway.prototype.login = function (username, password, remember = false, callback){
	let _this = this;
	_this.web3._provider.login(username, password, remember = false, function (error, result){
		if(error){
				_this.user = undefined;

		}else {
				result.accounts.forEach(function(account) {
					var account = _this.addAccount(account);
				});
				_this.user = result.user;	
		}
		callback(error, result);	
	});
	
	return true;
}

Gateway.prototype.logout = function (callback){
	let _this = this;
	
	this._logout(
 		function(error, result){
			_this.user = undefined;
			_this.web3.eth.accounts.wallet.clear();
			callback(error, result);	
			
		
          });
	return true;
}

Gateway.prototype.register = function (username, password, email, callback){
	let _this = this;
		_this.web3._provider.register(username, password, email,function(error, result){
		if(error){
				_this.user = undefined;
		} else {
				
				result.accounts.forEach(function(account) {
					var account = _this.addAccount(account);
				});
				_this.user = result.user;	
				
				
		
		}	
		callback(error, result);	
			
	});
 	return true;
}

Gateway.prototype.profile = function (callback){
	
	this._profile(function(error, result){
		if(callback)callback(error, result);
	});
 	return true;
}



              

Gateway.prototype.reject = function (uid, callback){
	let _this = this;
	

	this._reject({uid},function(error, result){
        if(callback)callback(error, result);
		
	});
 	return true;
}

Gateway.prototype.update = function (password, email, mobilePhone, callback){
	let _this = this;
	if(_this.user===undefined){
		if(callback)callback({code: 300, message:'Please log in before transaction!'}, undefined);
		return false;
	}
	//let msg = "0x";
	let msg = "";
	if(password){
		password = password.trim();
		msg = msg.concat(password);
		password = utils.utf8ToHex(password);

		
	}
	if(email){
		email = email.trim();
		msg = msg.concat(email);
		email = utils.utf8ToHex(email);

	}
	if(mobilePhone){
		mobilePhone = mobilePhone.trim();
		msg = msg.concat(mobilePhone);
		mobilePhone = utils.utf8ToHex(mobilePhone);
	}

	const hash = Hash.keccak256s(msg);
	const from = _this.user.account.address;
	 var signature = Account.sign(hash, _this.user.account.privateKey);
  	this._update({from, password, email, mobilePhone, signature},function(error, result){
		if(callback)callback(error, result);
	});
 	return true;
}






Gateway.prototype.wallet_add = function (name, privateKey, callback){
	let _this = this;
	if(_this.user===undefined){
		callback({code: 300, message:'Please log in before transaction!'}, undefined);
		return false;
	}
	let nameHex = utils.isHexStrict(name) ? name : utils.utf8ToHex(name);
	
	
  	this._wallet_add({ name:nameHex, privateKey },function(error, result){
		if(result) {
		
			_this.addAccount(result);

		}	
		callback(error, result);	
	});
 	return true;
}

Gateway.prototype.wallet_edit = function (wallet, name, callback){
	let _this = this;
	if(_this.user===undefined){
		callback({code: 300, message:'Please log in before transaction!'}, undefined);
		return false;
	}
	let nameHex = utils.isHexStrict(name) ? name : utils.utf8ToHex(name);
	wallet = wallet.toUpperCase();
	const from = _this.web3.eth.accounts.wallet[0].address;

  	this._wallet_edit({wallet, name:nameHex}, 	callback);
}

Gateway.prototype.wallet_delete = function (wallet, callback){
	let _this = this;
	if(_this.user===undefined){
		callback({code: 300, message:'Please log in before transaction!'}, undefined);
		return false;
	}
	this._wallet_delete({ wallet},function(error, result){
		if(result) {
			var account = _this.web3.eth.accounts.wallet[wallet];
			_this.web3.eth.accounts.wallet.remove(account.index);
			
		}	
		callback(error, result);		
	});
 	return true;
}




Gateway.prototype.transaction = function (uid, callback){
	let _this = this;
	
  	this._transaction({uid},function(error, result){
		if(error){
				if(callback)callback(error, undefined);
		} else {
				if(callback)callback(undefined, result);
		}		
	});
 	return true;
}

Gateway.prototype.transaction_history = function (callback){
	
  	this._transaction_history(callback);
 	return true;
}

Gateway.prototype.info = function (){
	
    return this.web3._provider.info;
 	
}

Gateway.prototype.readInfo = function (){
	
    this.web3._provider.readInfo();
 	return true;
}


Gateway.prototype.ErrorResponse =  function (result) {
        var message = !!result && !!result.error && !!result.error.message ? result.error.message : JSON.stringify(result);
        var data = (!!result.error && !!result.error.data) ? result.error.data : null;
        var err = new Error(message);
        err.data = data;
 		var code = (!!result.error && !!result.error.code) ? result.error.code : null;
		err.code = code;
        return err;
};




module.exports = Gateway;