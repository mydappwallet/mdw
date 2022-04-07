const abi = require('erc-20-abi');

var ERC20 = function erc20(address) {
		const {web3} = window;
		this.erc20 =  new web3.eth.Contract(abi, address);
		return true;
}

 ERC20.prototype.symbol =  async function (){
		var _this = this;
		var ret = {error: undefined, result: undefined}

			_this.erc20.methods.symbol.call(  function (error, result){
			ret.error = error;
			ret.result= result;
		});
		while(!ret.result && !ret.error){
			await new Promise(r => setTimeout(r, 1000));
		}
		

		
		

		
		alert('end');
}



module.exports = ERC20;