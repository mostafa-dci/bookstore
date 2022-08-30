let array = [1,2,3,4,5,6,7,8,9,10,11,12];
array.forEach((item, index)=>{
    
    if(index % 3 == 0){
        console.log('\x1b[32m'+ "________" + "\x1b[0m")
    }
    console.log('\x1b[33m'+ "Index: "+ index + "\t Item: "+ item + "\x1b[0m")
})