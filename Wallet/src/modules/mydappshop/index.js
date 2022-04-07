
var Web3 = require('web3');
var utils = require('web3-utils');
var Method = require('web3-core-method');
var formatter = require('./lib/formatters');



var MyDappShop = function MyDappShop() {
	Web3.call(this, arguments[0]); // wywołanie konstruktora klasy bazowej
    this._requestManager._jsonrpcResultCallback = this._provider._jsonrpcResultCallback.bind(this._provider);

	this.user = undefined;

      var methods = [
            new Method({
                  name: 'book_add',
                  call: 'book_add',
                  params: 1,
                  inputFormatter: [formatter.hexParamsFormatter],
            }),
            new Method({
                  name: 'book_edit',
                  call: 'book_edit',
                  params: 1,
                  inputFormatter: [formatter.hexParamsFormatter],
            }),

            new Method({
                  name: 'book_delete',
                  call: 'book_delete',
                  params: 1,
                  inputFormatter: [formatter.hexParamsFormatter],
            }),
            new Method({
                  name: 'book_list',
                  call: 'book_list',
                  params: 0,
            }),
            new Method({
                  name: 'token_add',
                  call: 'token_add',
                  params: 1,
                  inputFormatter: [formatter.hexParamsFormatter],
            }),

            new Method({
                  name: 'token_delete',
                  call: 'token_delete',
                  params: 1,
                  inputFormatter: [formatter.hexParamsFormatter],
            }),
            new Method({
                  name: 'token_list',
                  call: 'token_list',
                  params: 0,
            }),
            new Method({
                  name: '_wallet_add',
                  call: 'wallet_add',
                  params: 1,
                  inputFormatter: [formatter.inputParamsFormatter],
            }),
            new Method({
                  name: '_wallet_edit',
                  call: 'wallet_edit',
                  params: 1,
                  inputFormatter: [formatter.inputParamsFormatter],

            }),
            new Method({
                  name: '_wallet_delete',
                  call: 'wallet_delete',
                  params: 1,
                  inputFormatter: [formatter.inputParamsFormatter],
            }),
            new Method({
                  name: '_wallet_delete',
                  call: 'wallet_delete',
                  params: 1,
                  inputFormatter: [formatter.inputParamsFormatter],
            }),
            new Method({
                  name: 'app',
                  call: 'app',
                  params: 1,
                  inputFormatter: [formatter.hexParamsFormatter],
            }),

            new Method({
                  name: 'app_add',
                  call: 'app_add',
                  params: 1,
                  inputFormatter: [formatter.hexParamsFormatter],
            }),
             new Method({
                  name: 'app_list',
                  call: 'app_list',
                  params: 0,
            }),
            new Method({
                  name: 'contract',
                  call: 'contract',
                  params: 1,
                  inputFormatter: [formatter.hexParamsFormatter],
            }),

            new Method({
                  name: 'contract_add',
                  call: 'contract_add',
                  params: 1,
                  inputFormatter: [formatter.hexParamsFormatter],
            }),
             new Method({
                  name: 'contract_edit',
                  call: 'contract_edit',
                  params: 1,
                  inputFormatter: [formatter.hexParamsFormatter],
            }),
            new Method({
                  name: 'contract_delete',
                  call: 'contract_delete',
                  params: 1,
                  inputFormatter: [formatter.hexParamsFormatter],
            }),
            new Method({
                  name: 'connect',
                  call: 'connect',
                  params: 1,
                  inputFormatter: [formatter.hexParamsFormatter],
            }),
            new Method({
                  name: 'pay',
                  call: 'pay',
                  params: 1,
                  inputFormatter: [formatter.hexParamsFormatter],
            }),
            new Method({
                  name: 'payment',
                  call: 'payment',
                  params: 1,
                  inputFormatter: [formatter.hexParamsFormatter],
            }),




             new Method({
                  name: 'transaction',
                  call: 'transaction',
                  params: 1,
                  inputFormatter: [formatter.hexParamsFormatter],

            }),
            new Method({
                  name: 'transaction_list',
                  call: 'transaction_list',
                  params: 0,
                 

            }),
             new Method({
                  name: 'profile',
                  call: 'profile',
                  params: 0,

            }),
            new Method({
                  name: 'profile_edit',
                  call: 'profile_edit',
                  params: 1,
                  inputFormatter: [formatter.hexParamsFormatter],

            }),



            new Method({
                  name: 'network_list',
                  call: 'network_list',
                  params: 0,

            }),
          
            new Method({
                  name: 'confirm',
                  call: 'confirm',
                  params: 1,
                  inputFormatter: [formatter.hexParamsFormatter],

            }),
            new Method({
                  name: 'reject',
                  call: 'reject',
                  params: 1,
                  inputFormatter: [formatter.hexParamsFormatter],

            }),

            new Method({
                  name: '_update',
                  call: 'gateway_update',
                  params: 1,
                  inputFormatter: [formatter.inputParamsFormatter],

            }),




           

      ];
	methods.forEach(function(method) {
		method.attachToObject(this);
		method.setRequestManager(this._requestManager, this.accounts); // second param is the eth.accounts module (necessary for signing transactions locally)
		method.defaultBlock = this.eth.defaultBlock;
		method.defaultAccount = this.eth.defaultAccount;
		method.transactionBlockTimeout = this.eth.transactionBlockTimeout;
		method.transactionConfirmationBlocks = this.eth.transactionConfirmationBlocks;
		method.transactionPollingTimeout = this.eth.transactionPollingTimeout;
		method.handleRevert = this.eth.handleRevert;
	}.bind(this));

	return true;
}

MyDappShop.prototype = Object.create(Web3.prototype);


MyDappShop.prototype.addAccount = function (account){
	
	let wallet = this.eth.accounts.wallet;
	account.address = utils.toChecksumAddress(account.address);
	 if (!wallet[account.address]) {
		 this.eth.accounts._addAccountFunctions(account);
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


MyDappShop.prototype.init = function (callback){

	this._provider.init( function (error, result){
		if(!error){
				result.accounts.forEach(function(account) {
					var account = this.addAccount(account);
				}.bind(this));
				this.user = result.user;	
		}
		callback(error, result);	
	}.bind(this));
	
	return true;
}


MyDappShop.prototype.login = function (params, callback){

	this._provider.login(formatter.hexParamsFormatter(params), function (error, result){
		 if(!error){
			 this.user = result.user;
			result.wallet.forEach(function(account) {
					this.addAccount(account);
                  }.bind(this));
                  this.user = result.user;              
		 }
  		 if(callback)callback(error, result);	
	}.bind(this));
	
	return true;
}

MyDappShop.prototype.logout = function (callback){

	this._provider.logout( function (error, result){
	      this.user = undefined;
		this.eth.accounts.wallet.clear();
		if(callback)callback(error, result);	
	}.bind(this));
	
	return true;
}




MyDappShop.prototype.register = function (params, callback){

	this._provider.register(formatter.hexParamsFormatter(params), function (error, result){
		if(!error){
			this.user = result.user;
			result.wallet.forEach(function(account) {
					this.addAccount(account);
                  }.bind(this))
                  this.user = result.user;              
	      }
		if(callback)callback(error, result);	
	}.bind(this));
	
	return true;
}

MyDappShop.prototype.wallet_add = function (params, callback){

	this._wallet_add(params,
		function (error, result){
		 	if(result) {
				this.addAccount(result);
			}	
			if(callback)callback(error, result);	
	}.bind(this));
	
	return true;
}

MyDappShop.prototype.wallet_edit = function (params, callback){

      this._wallet_add(params,
		function (error, result){
		 	if(callback)callback(error, result);	
		}.bind(this));
	
	return true;
}

MyDappShop.prototype.wallet_delete = function (params, callback){

      this._wallet_delete(params,
		function (error, result){
		      if(result) {
			            var account = this.eth.accounts.wallet[params.wallet];
			            this.eth.accounts.wallet.remove(account.index);
		      }	

		
			if(callback)callback(error, result);	
		
          
	      }.bind(this));
	
	return true;
}

MyDappShop.prototype.network_change = function (params, callback){
	let _this = this;


	this._provider.network_change(params,
 		function(error, result){
			callback(error, result);	
	 });
	return true;
}


MyDappShop.prototype.info = function (){
	
    return this._provider.info;
 	
}

MyDappShop.prototype.readInfo = function (){
	
    this._provider.readInfo();
 	return true;
}

	


module.exports = MyDappShop;