import express, { Request, Response } from 'express';
import { getCoursesRoutes, db} from './routes/courses';
import { addTestsRoutes } from './routes/tests';
export const app = express();
const jsonBodyMiddleware = express.json();

app.use(jsonBodyMiddleware);

app.use("/courses, ",  getCoursesRoutes(  db))
app.use("/__tests__", addTestsRoutes( db))



