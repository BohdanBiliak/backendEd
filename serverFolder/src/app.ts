import express, {Request, Response} from 'express';
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery } from './types';
import {CourseCreateInputModel} from './models/CourseCreateModel';
import {CourseUpdateInputModel} from './models/CourseUpdateModel';
import {GetCoursesQueryModel} from './models/GetCourseQueryModel';
import {URIParamsCourseIdModel} from './models/URIParamsCourseModel';
import {CourseViewModel} from './models/CourseViewModel';
export const app  = express();

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
  studentsCount: number
}
const db:{courses: CourseType[]} = {
  courses: [
    { id: 1, title: 'front-end', studentsCount: 10 },
    { id: 2, title: 'back-end',studentsCount: 10 },
    { id: 3, title: 'automation qa',studentsCount: 10 },
    { id: 4, title: 'devops',studentsCount: 10 },
    { id: 5, title: 'devops',studentsCount: 10 },
  ],
};
app.get('/', (req, res) => {
  res.send('Work');
});
app.get('/courses', (req:   RequestWithQuery<GetCoursesQueryModel>,
                     res: Response<CourseViewModel[]>) => {
  let foundCoursesQuery = db.courses;
  if (req.query.title) {
    foundCoursesQuery = foundCoursesQuery.filter(c => c.title.includes(req.query.title as string));
  }

  res.json(foundCoursesQuery.map(dbCourse => {
    return {
      id: dbCourse.id,
      title: dbCourse.title
    }
  }) );
});
app.get('/courses/:id',  (req: RequestWithParams<URIParamsCourseIdModel>,
  res: Response<CourseViewModel>) => {
  const foundCourse = db.courses.find(c => c.id === +req.params.id);

  if (!foundCourse) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }
  res.json({
    id: foundCourse.id,
    title: foundCourse.title} );
});
app.post('/courses', (req:RequestWithBody<CourseCreateInputModel>, res:Response<CourseViewModel>) => {
  if(!req.body.title){
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
    return;
  }
  const newCourse: CourseType = {
    id: +(new Date()),
    title: req.body.title,
    studentsCount: 10
  };
  db.courses.push(newCourse);
  res.sendStatus(HTTP_STATUSES.CREATED_201).json(newCourse);
});
app.delete('/courses/:id', (req: RequestWithParams<URIParamsCourseIdModel>, res) => {
  db.courses = db.courses.filter(c => c.id !== +req.params.id);
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});
app.put('/courses/:id', (req:RequestWithParamsAndBody<URIParamsCourseIdModel, CourseCreateInputModel>,
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
