function contrl(allvalue,limitValuesData){
    var lastlist=[]
    for(value of allvalue){
        if(value<=limitValuesData[0].value){
            lastlist.push({
                key:limitValuesData[0].key,
                value:value
            })
        }
        if(value<=limitValuesData[1].value&&value>=limitValuesData[0].value){
            lastlist.push({
                key:limitValuesData[1].key,
                value:value
            })
        }
        if(value<=limitValuesData[2].value&&value>=limitValuesData[1].value){
            lastlist.push({
                key:limitValuesData[2].key,
                value:value
            })
        }
        if(value<=limitValuesData[3].value&&value>=limitValuesData[2].value){
            lastlist.push({
                key:limitValuesData[3].key,
                value:value
            })
        }
        if(value<=limitValuesData[4].value&&value>=limitValuesData[3].value){
            lastlist.push({
                key:limitValuesData[4].key,
                value:value
            })
        }
    }

    return lastlist
}