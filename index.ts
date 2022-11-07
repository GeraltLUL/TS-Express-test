import express, { Request, Response, NextFunction } from 'express';
import { userRouter } from './users/users.js';

const port = 8000;
const app = express();

app.use((req, res, next) => {
	console.log('Request time: ', Date.now());
	next();
});

app.use('/users', userRouter);

app.get('/hello', (req, res) => {
	res.send("Hello from the root application URL");
});

app.get('/error', (req, res) => {
	throw new Error('Error!');
});

//Error handling

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.log(err.message);
	res.status(500).send(err.message);
});

app.listen(port, () => console.log('Application is running'));