let a =[
    {method:'get',url:'/user'},
    {method:'get',url:'/user1'},
]

let b = {method:'get',url:'/user'}

let c = a.includes(b)

console.log(c)