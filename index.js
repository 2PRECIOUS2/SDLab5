const express = require('express');

const app = express ();
app.use(express.json());
const student = {
    studentNumber : "2612383"
}
const PORT = process.env.PORT || 3000;


  
let books = [{
    id: 1,
    title: 'To Kill a Mockingbird',
    details: [
      {
        id: 1,
        author: 'Harper Lee',
        genre: "Fiction",
        publicationYear: 1960
      }
    ]
  }];

app.get('/whoami', (req, res) => {
    res.json(student);
})
app.get('/books', (req, res) => {
    res.status(200).json({books})
});

app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(!book){
        return res.status(404).json({error: 'book not found' });
    }
    return res.status(200).json({book});
});

app.post('/books', (req, res) => {
  const {id, title, details} = req.body;
  try{
    if(!id || !title || !Array.isArray(details)){
      return res.status(400).json({error: 'Missing required book details'})
    }
    books.push(req.body)
  }
  catch (error){
    res.send("server error")
  }
  res.json(req.body)
});


app.post('/books/:id/details', (req, res) => {

});

app.put('/books/:id', (req, res) => {
    const  book = books.find(b => b.id === parseInt(req.params/id));
    if(!book)
        return res.status(404).json({error: 'book not found'})
})


  app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if(!bookIndex === -1){
      return res.status(404).json({error: 'book not found'});
    }
    const deletedBook = books.splice(bookIndex, 1)
    res.status(200).json({deletedBook})
  })

  app.delete( '/books/:id/details/:detailId', (req, res) => {

  })

  app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });
