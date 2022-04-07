import React from "react";
import Jazzicon from 'react-jazzicon'


class IconFactory {
	
	
	generateSmalldenticon(address){
		let seed = jsNumberForAddress(address);
		return (<Jazzicon diameter={46} seed={seed} paperStyles={{width:20, height:20}}/>)
	}
	
	generateMediumIdenticon(address){
		let seed = jsNumberForAddress(address);
		return (<Jazzicon diameter={46} seed={seed} paperStyles={{width:35, height:35}}/>)
	}
	
	
} 



function jsNumberForAddress(address) {
  const addr = address.slice(2, 10)
  const seed = parseInt(addr, 16)
  return seed
}

export default new IconFactory;