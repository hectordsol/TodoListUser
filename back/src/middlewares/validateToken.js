import jwt from 'jsonwebtoken';
const SECRET="secret123"
export const authRequired = (req, res, next)=>{
    const {token} = req.cookies;
    if(!token) return res.status(401).json({message: "No Token, authorization denied.."})
    jwt.verify(token,SECRET, (err, user)=>{
        if (err) return res.status(403).json({message: "Invalid token"});
        console.log(user.payload);
        req.user = user.payload;
        next();
    })
}