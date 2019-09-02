const sha256 = require('sha256');
var Buffer = require('buffer/').Buffer

const xorConvert = (text,key)=>{
    var kL = key.length;

    return Array.prototype
        .slice.call(text)
        .map(function (c, index) {
            return String.fromCharCode(c.charCodeAt(0) ^ key[index % kL].charCodeAt(0));
        }).join('');
}

const getRandomInt = (max)=>{
    return Math.floor(Math.random() * Math.floor(max));
  }


const decryptWallet = (credentials)=>{
    // console.log(credentials)
    var wallet = credentials["wallet"]; 
    var buff = Buffer.from(wallet, 'base64');
    var str = buff.toString('binary');
    var key = credentials['privateKey'] + credentials['username'] + credentials['password'];
    var hashedKey = sha256(key);

    var decryptedWallet = xorConvert(str, hashedKey);
    console.log(decryptedWallet)

    if (decryptedWallet.includes("avx")){
        // AsyncStorage.setItem('password', this.state.password);
        return 1;

    }

    return 0;
 
  
  
  }

const randomBits = ()=>{
    var rBits = ""
    for (var a = 0; a < 160; a++){
        var bit = getRandomInt(2);
        rBits = rBits + bit.toString();
    }

    return rBits;
}

const createWallet = (username,password)=>{
    var bitString = randomBits();
    var privateKey = sha256(username + password + bitString);
    var publicKey = "avx" + (sha256(username + password + privateKey).slice(3, 65));
    console.log(bitString, username, password)
    console.log(privateKey)
    console.log(publicKey)

    var data ={
        'privateKey' : privateKey,
        'publicKey' : publicKey,
        'username' : username,
        'password' : password
    }
    return data
}


  export {decryptWallet, createWallet}