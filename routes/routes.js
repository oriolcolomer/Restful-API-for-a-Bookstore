const express = require('express');
const router = express.Router();
const Book = require('../models/book');

//ADD BOOK
router.post('/add',(req,res)=>{
  

    const book = new Book ({
      
        title: req.body.title,
        author: req.body.author,
        published_year: req.body.published_year,
        pages: req.body.pages,
        genre: req.body.genre
    });
 
   book.save().then(() =>{
    res.redirect('list');
   }).catch((err)=>{
    console.log(err);
   })

    
});
  router.get('/add',(req,res)=>{
    res.render('addBook');
})
//READ BOOK'S INFORMATION     
router.get('/list/:id', async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);

    res.render('bookpage', { book });    //Envias a la vista un objecte amb la informació del llibre amb la ID corresponent
  });
  
//UPDATE BOOK
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);

    res.render('edit', { book });    
  });
router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    await Book.updateOne({ _id: id }, req.body);
    res.redirect('/list');
  });
  
//DELETE BOOK
router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    await Book.deleteOne({ _id: id });
    res.redirect('/list');
  });


//LIST ALL BOOKS
router.get('/list', async (req, res, next) => {
    const newBook = await Book.find();
    res.render('list', { newBook }); // Envias a la vista una array amb tots els llibres de la llista
  });




module.exports = router;