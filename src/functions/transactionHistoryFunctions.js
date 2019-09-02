export const getTransactionType = (type)=>{ 

    if (type == 'sent')
        {
            return require('../images/send.png')
        }
    else if (type == 'receive')
        {
            return require('../images/receive.png')
        }
    else {
            return require('../images/pending.png')
    }
    
}

export const getTransactionOperation = (type)=>{ 

    if (type == 'sent')
        {
            return '-'
        }
        else {
            return '+'
        }

    
}