import jwt from 'jsonwebtoken';
const SECRET="secret123"
export function createAccessToken(payload){
    return new Promise((resolve, reject) =>{
        jwt.sign(
            {
                payload,
            },
            SECRET,
            {
                expiresIn: "2d",
            },
            (err, token) => {
                if(err) reject(err);
                resolve(token);
            }
        )
    
    })
}