import  request  from "supertest";
import {app, HTTP_STATUSES} from '../../src/app';
import { title } from "process";
describe('/serverFolder',  ()=>{
    beforeAll(async ()=>{
        await request(app).delete('/__test__/data')
    })

    it('should return 200----', async ()=>{
        await request(app)
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200, [])
    })

    it('should return 404---- for nor excisting course', async ()=>{
        await request(app)
            .get('/courses/99')
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })
    it('shouldnt create course with incorect input data', async ()=>{
        await request(app)
            .post('/courses')
            .send({title:''})
            .expect(HTTP_STATUSES.BAD_REQUEST_400)
        await request(app)
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200, [])
    })
    
  


})  