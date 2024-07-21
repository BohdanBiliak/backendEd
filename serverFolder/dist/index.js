"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/samurai', (req, res) => {
    res.send('Hello Samurais!!!!!!!!!!');
});
app.post('/samurai', (req, res) => {
    res.send('We create samurai!!!!');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
