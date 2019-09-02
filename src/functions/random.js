import { dictionary } from './dictionary.js'

export const mnemonic = (type)=>{ 
    // const fs = require('fs')
    var strings = dictionary;
    strings = strings.split(',')
    var lines = strings.length - 1
    let sections = 12
    let wordsPerSection = parseInt(lines / sections)
    let excessWords = lines % sections
    let last = sections - 1
    let x = shuffle(12)
    let shuffleArray = []
    for ( let i = 0; i < sections; ++i) {
        let start = x[i] * wordsPerSection
        let end = start + wordsPerSection - 1
        if (x[i] == last) {
            end += excessWords
        }
        let rng = Math.floor(Math.random() * (end - start) + start)
        shuffleArray.push(strings[rng])
    }
    function shuffle(num) {
        var arr = []
        for (let i = 0; i < num; ++i) {
            arr.push(i)
        }
        for (var i = arr.length - 1; i >= 0; --i) {
            let rnum = Math.floor((Math.random() * i))
            let temp = arr[i]
            arr[i] = arr[rnum]
            arr[rnum] = temp
        }
        return arr
    }
    return shuffleArray
}
