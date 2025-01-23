"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandles = void 0;
const httpStatusCode_1 = require("../utils/httpStatusCode");
const errorHandles = (err, req, res, next) => {
    let errorMessage = (err === null || err === void 0 ? void 0 : err.message) || 'An unexpected error';
    console.log(err, errorMessage, "msg from erre handling page");
    res.status(httpStatusCode_1.HttpStatus.NOT_FOUND).send({ errorMessage, success: false });
};
exports.errorHandles = errorHandles;
