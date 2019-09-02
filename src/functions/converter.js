

const convertToDollars = (amount)=>{
    
    return amount/20
  }

const getAmountWithFee = (amount)=>{
  console.log(amount)
    console.log(parseInt(amount) + (parseInt(amount)* 0.001))
    return (parseInt(amount) + (parseInt(amount)* 0.001))
}

const getFee = (amount)=>{
  console.log(amount)
  return (parseInt(amount)* 0.001)
}

const getMax = (balance)=>{
    console.log("here: ",balance)
    balance = parseFloat(balance);
    var x = balance * ((100 - 0.1) / 100);
    console.log("x:",x)
    var y = balance - (x * (1 + 0.001));
    console.log("dito", x * (1 + 0.001))
    console.log("y:",y)
    var z = (y - 0.1)/ (1 + 0.001);
    console.log("z:",z)
    var amount = (x + z) * 1.001;
    console.log("this: ", amount)

    return amount.toString( );
}


  export {convertToDollars, getAmountWithFee, getFee, getMax}

