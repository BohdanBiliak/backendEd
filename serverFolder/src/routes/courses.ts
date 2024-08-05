import express, {  Response } from 'express';
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery } from '../types';
import { CourseCreateInputModel } from '../models/CourseCreateModel';
import { GetCoursesQueryModel } from '../models/GetCourseQueryModel';
import { URIParamsCourseIdModel } from '../models/URIParamsCourseModel';
import { CourseViewModel } from '../models/CourseViewModel';
import { db, CourseType } from '../db/db';

export const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,
};


export const getCoursesRoutes = ( db: { courses: CourseType[]; }) => {
    const routerCourses = express.Router();
    routerCourses.get('/', (req: RequestWithQuery<GetCoursesQueryModel>,
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
        }));
    });
    routerCourses.get('/:id', (req: RequestWithParams<URIParamsCourseIdModel>,
        res: Response<CourseViewModel>) => {
        const foundCourse = db.courses.find(c => c.id === +req.params.id);

        if (!foundCourse) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
            return;
        }
        res.json({
            id: foundCourse.id,
            title: foundCourse.title
        });
    });
    routerCourses.post('/', (req: RequestWithBody<CourseCreateInputModel>, res: Response<CourseViewModel>) => {
        if (!req.body.title) {
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
    routerCourses.delete('/:id', (req: RequestWithParams<URIParamsCourseIdModel>, res: { sendStatus: (arg0: number) => void; }) => {
        db.courses = db.courses.filter(c => c.id !== +req.params.id);
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    });
    routerCourses.put('/:id', (req: RequestWithParamsAndBody<URIParamsCourseIdModel, CourseCreateInputModel>,
        res: Response) => {
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
    return routerCourses
}

export { db };
