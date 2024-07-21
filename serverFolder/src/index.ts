import express from 'express';
const app = express()
const port = 3000
const jsonBodyMiddleware = express.json()
const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201:201,
  NO_CONTENT_204: 204,
  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404
}

app.use(jsonBodyMiddleware)


const db = {
  courses:[
    {id: 1, title: 'front-end'},
    {id: 2, title: 'back-end'},
    {id: 3, title: 'automation qa'},
    {id: 4, title: 'devops'},
    {id: 5, title: 'devops'}
  ]
}



app.get('/', (req, res) => {
  res.send('Work')
})

app.get('/courses', (req, res) => {
  let foundCoursesQuery = db.courses;
  if(req.query.title){
   foundCoursesQuery = foundCoursesQuery.filter(c => c.title.indexOf(req.query.title as string) > -1)

  }

  if(!foundCoursesQuery.length){
    res.status(HTTP_STATUSES.NOT_FOUND_404)
    return;

  }
     
      res.json(foundCoursesQuery)
})

app.get('/courses/:id', (req, res) => {
  const foundCourse = db.courses.find(c => c.id === +req.params.id)

  if(!foundCourse){
    res.send(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }
  res.json(foundCourse)
  
})
app.post('/courses', (req,res) =>{
  const newCourse = {
    id: +(new Date()),
    title:req.body.title
  }
  db.courses.push(newCourse
  )
  console.log(newCourse)
  res
  .status(HTTP_STATUSES.CREATED_201)
  .json(newCourse)

})

app.delete('/courses/:id', (req, res) => {
  db.courses = db.courses.filter(c => c.id !== +req.params.id)
  res.sendStatus( HTTP_STATUSES.CREATED_201)
  
})


app.put('/courses/:id', (req, res) => {
  if(!req.body.title){
    res.send(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }
  const foundCourse = db.courses.find(c => c.id === +req.params.id)

  if(!foundCourse){
    res.send(HTTP_STATUSES. NOT_FOUND_404);
    return;
  }

  foundCourse.title = req.body.title;
  res.json(foundCourse)
  
})







app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})  