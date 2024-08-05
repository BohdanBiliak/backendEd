import  express, { Express} from 'express';
import {  HTTP_STATUSES } from "./courses";
import { CourseType } from '../db/db';


  export const addTestsRoutes = ( db: { courses: CourseType[]; }) =>{
    const router= express.Router();
    router.delete('/data', (req, res) => {
        db.courses = [];
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
      });
      return router
    
  }