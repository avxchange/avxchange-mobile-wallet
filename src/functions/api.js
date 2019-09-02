
import {AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';

const getBalance = (addresss)=>{
    return fetch('http://192.168.254.106:3000/data/fetch/avx/' + addresss)
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log("HEREEEEEEEEEE",responseJson.data.balance);
        // AsyncStorage.setItem('avxBalance', responseJson.data.balance);
        return responseJson.data;
      })
      .catch((error) => {
        console.error(error);
      });
  }

const sendAVX = (from,to,amount,fee)=>{
  console.log(from, to, amount,fee)
  amount = amount * 1000000000000000000;
  fee = fee * 1000000000000000000;
  return fetch('http://192.168.254.106:3000/data/post/avx/'+ from +'/' + to + '/'+ amount +'/'+ fee)
    .then((response) => response.json())
    .then((responseJson) => {
      // Actions.dashboard({publicKey: from})
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
}

const getHistory = (address)=>{
  return fetch('http://192.168.254.106:3000/data/fetch/history/'+ address)
    .then((response) => response.json())
    .then((values) => {
      history = []
      var id = 0;

      if(values["data"] != null)
        {
          //to be coded when successfully connected to main cpp
            // for (x in values["data"]["0"]["out"])
            // {
            //   console.log(values["data"]["0"]["out"][x])
            //   console.log('--------')
            //   var item ={
            //     "id" : id,
            //     date: values["data"]["0"]["out"][x][4],
            //     type: 'pending',
            //     co: values["data"]["0"]["out"][x][1],
            //     amount: values["data"]["0"]["out"][x][2]

            //   }
            //   id++;
            //   history.push(item);
            // }

            for (x in values["data"]["1"]["out"])
            {
              console.log(values["data"]["1"]["out"][x])
              var item ={
                "id" : id,
                date: values["data"]["1"]["out"][x][4],
                type: 'sent',
                co: values["data"]["1"]["out"][x][1],
                amount: values["data"]["1"]["out"][x][2],
                fee: values["data"]["1"]["out"][x][3],
                total: ((parseFloat(values["data"]["1"]["out"][x][2]) + parseFloat(values["data"]["1"]["out"][x][3])).toString())


              }
              id++;
              history.push(item);
            }

            for (x in values["data"]["1"]["in"])
            {
              console.log(values["data"]["1"]["in"][x])
              var item ={
                "id" : id,
                date: values["data"]["1"]["in"][x][4],
                type: 'receive',
                co: values["data"]["1"]["in"][x][0],
                amount: values["data"]["1"]["in"][x][2],
                fee: values["data"]["1"]["in"][x][3],
                total: ((parseFloat(values["data"]["1"]["in"][x][2]) + parseFloat(values["data"]["1"]["in"][x][3])).toString())

              }
              id++;
              history.push(item);
            }
          }

      console.log('-----------------')
      console.log(history)
      // console.log(responseJson)
      return history;
    })
    .catch((error) => {
      console.error(error);
    });
}

  export {getBalance, sendAVX, getHistory}