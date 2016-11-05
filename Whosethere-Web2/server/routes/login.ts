import { Router, Request, Response, NextFunction } from "express";
// let toBlob = require('data-uri-to-blob');

const loginRouter: Router = Router();


loginRouter.post("/signup", function (request: Request, response: Response, next: NextFunction) {

});

// console.log(toBlob);

// login method
loginRouter.post("/", function (request: Request, response: Response, next: NextFunction) {

    console.log(request.body);
    response.json("bruhhhhhhhhh");

});

export { loginRouter }
