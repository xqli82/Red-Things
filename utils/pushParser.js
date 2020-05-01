module.exports = function(method,url){
    const methods = ['get','post','delete','put']
    if(method ==='all'){
        methods.forEach(item=>{
            this.stack.push({
                method:item,
                url
            })
        })
    }else{
        if(methods.includes(method)){
            this.stack.push({
                method,
                url
            })
        }else{
            console.log('---------------------> stack method is wrong')
        }
    }
}