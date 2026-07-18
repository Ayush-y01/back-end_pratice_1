import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {

    const header = req.headers.authorization;
    

    if (!header) {
        return res.status(401).json({
            message: "Token Missing",
        });
    }
    

    const token = header.split(" ")[1];

    
    try {

        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );
        

        req.user = decoded;
        

        next();

    } catch {

        return res.status(401).json({
            message: "Invalid Token",
        });

    }

};