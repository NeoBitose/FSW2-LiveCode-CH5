const jwt = require("jsonwebtoken");

const { Users } = require("../models")

module.exports = async (req, res, next) => {

    const bearerToken = req.headers.authorization;

    try {
        if (!bearerToken) {
            return res.status(401).json({
                status: "Failed",
                message: "Token is missing",
                isSuccess: false,
                data: null
            });
        }

        const token = bearerToken.split("Bearer ")[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Users.findByPk(payload.userId);

        // if (bearerToken && req.headers.authorization !== "") {
        //     return res.status(401).json({
        //         status: "Failed",
        //         message: "You are not unauthorized",
        //         isSuccess: false,
        //         data: null
        //     });
        // }

        req.user = user;
        next();
    }
    catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message,
            isSuccess: true,
            data: null,
        });
    }
}