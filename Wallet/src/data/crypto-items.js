export default function () {
  return {
    mainnet: {
      title: 'Ethereum',
      symbol: 'ETH',
      icon: '<div class="currency-icon" style="background-color: #151c2f"><span class="icon icon-eth"></span></div>',
      htmlBefore: '',
      htmlAfter: '',
      type: 'web3',
      host: 'https://mainnet.mydappwallet.com',
      scan: 'https://etherscan.io/tx/'
    },
	binance: {
      title: 'Binance Coin',
      symbol: 'BNB',
      icon: '<div class="currency-icon" style="background-color: #f3ba2f"><span class="icon icon-bnb"></span></div>',
      htmlBefore: '',
      htmlAfter: '',
      type: 'web3',
      host: 'https://binance.mydappwallet.com',
      test : true,
      scan: 'https://ropsten.etherscan.io/tx/'
    },
	polygon: {
      title: 'Polkadot',
      symbol: 'DOT',
      icon: '<div class="currency-icon" style="background-color: #e6007a"><span class="icon icon-bnb"></span></div>',
      htmlBefore: '',
      htmlAfter: '',
      type: 'web3',
      host: 'https://polygon.mydappwallet.com',
      test : true,
      scan: 'https://ropsten.etherscan.io/tx/'
    },
    ropsten: {
      title: 'Ropsten',
      symbol: 'ETH',
      icon: '<div class="currency-icon" style="background-color: #e91550"><span class="icon icon-eth"></span></div>',
      htmlBefore: '',
      htmlAfter: '',
      type: 'web3',
      host: 'https://ropsten.mydappwallet.com',
      test : true,
      scan: 'https://ropsten.etherscan.io/tx/'
    },
 	rinkeby: {
      title: 'Rinkeby',
      symbol: 'ETH',
      icon: '<div class="currency-icon" style="background-color: #f6c343"><span class="icon icon-eth"></span></div>',
      htmlBefore: '',
      htmlAfter: '',
      type: 'web3',
      host: 'https://rinkeby.mydappwallet.com',
      test : true,
      scan: 'https://rinkeby.etherscan.io/tx/'
    }
};
 
}
