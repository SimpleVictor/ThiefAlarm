import { Router, Request, Response, NextFunction } from "express";
// let toBlob = require('data-uri-to-blob');
var client = require('twilio')("AC621078e1d207d81638d8e24c9dd658c9", "c721b3668e0418a0db7e89edb11263be");

const loginRouter: Router = Router();


loginRouter.post("/signup", function (request: Request, response: Response, next: NextFunction) {

});

// console.log(toBlob);

// login method
loginRouter.get("/", function (request: Request, response: Response, next: NextFunction) {

    console.log(request.body);

    client.messages.create({
        body: "THERE'S AN UNWANTED GUEST AT YOUR DOOR",
        to: "+19089308704",
        from: "+19083602048"
    }, function(err, data){
        if(err){
            console.log(err);
            console.log("Could not send the message for some reason");
            response.json("done!")
        }else{
            console.log("Has been contacted");
            response.json("done!")
        };
    });

});

export { loginRouter }
