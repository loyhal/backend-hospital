const jwt = require('jsonwebtoken');

const generarJWT = ( uid, email ) =>{

    return new Promise((resolve, reject)=>{

   
const payload = {
    uid,
    email
}

jwt.sign( payload, process.env.JWT_SECRET,{
    expiresIn: '12h'
}, (err, token)=>{
    if(err){
        reject('Nose pudo generar el jwt');
    }else{
        resolve( token )
    }
});
})
}
module.exports = {
    generarJWT
}