import express, {Request, Response} from 'express';
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery } from './types';
export const app = express();
const port = 3000;
const jsonBodyMiddleware = express.json();
export const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,
  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404,
};

app.use(jsonBodyMiddleware);
type CourseType = {
  id: number
  title: string
}
const db:{courses: CourseType[]} = {
  courses: [
    { id: 1, title: 'front-end' },
    { id: 2, title: 'back-end' },
    { id: 3, title: 'automation qa' },
    { id: 4, title: 'devops' },
    { id: 5, title: 'devops' },
  ],
};
app.get('/', (req, res) => {
  res.send('Work');
});
app.get('/courses', (req:   RequestWithQuery<{title: string}>,
                     res: Response<CourseType[]>) => {
  let foundCoursesQuery = db.courses;
  if (req.query.title) {
    foundCoursesQuery = foundCoursesQuery.filter(c => c.title.includes(req.query.title as string));
  }

  res.json(foundCoursesQuery);
});
app.get('/courses/:id',  (req: RequestWithParams<{id: string}>,
  res) => {
  const foundCourse = db.courses.find(c => c.id === +req.params.id);

  if (!foundCourse) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }
  res.json(foundCourse);
});
app.post('/courses', (req:RequestWithBody<{title: string}>, res:Response<CourseType>) => {
  if(!req.body.title){
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
    return;
  }
  const newCourse = {
    id: +(new Date()),
    title: req.body.title,
  };
  db.courses.push(newCourse);
  res.sendStatus(HTTP_STATUSES.CREATED_201).json(newCourse);
});
app.delete('/courses/:id', (req: RequestWithParams<{id:string}>, res) => {
  db.courses = db.courses.filter(c => c.id !== +req.params.id);
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});
app.put('/courses/:id', (req:RequestWithParamsAndBody<{id:string}, {title: string}>,
                         res:Response) => {
  if (!req.body.title) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }
  const foundCourse = db.courses.find(c => c.id === +req.params.id);
  if (!foundCourse) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }
  foundCourse.title = req.body.title;
  res.json(foundCourse);
});



app.delete('/__test__/data', (req, res) => {
  db.courses = [];
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
