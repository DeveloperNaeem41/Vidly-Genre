const Joi = require('joi');
const express = require("express");
const router = express.Router();

const genres = [
    { id: 1, type: 'Action' },
    { id: 2, type: 'Adventure' },
    { id: 3, type: 'Comedy' },
    { id: 4, type: 'Drama' }  ];


router.get("/", (req, res) => {
  res.send(genres);
});

router.get("/:id", (req, res) => {
    const genre = genres.find((c) => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("Genre with this ID does not exist");
    res.send(genre);
  });

router.post('/',(req,res)=>{
    const result= genreValidation(req.body);
    const {error}=result;

   if(error) return res.status(400).send(error.details[0].message);
    
    const genre={
        id:genres.length+1,
        name:req.body.type
    }
    genres.push(genre);
    res.send(genre)
})

router.put('/:id',(req,res)=>{
    const genre = genres.find((c) => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("Genre with this ID does not exist");

   const result= genreValidation(req.body);
   const {error}=result;

   if(error) return res.status(400).send(error.details[0].message);
   
   genre.type=req.body.type;
    res.send(genre)
})

router.delete('/:id',(req,res)=>{
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre with this ID does not exist");

  const index=genres.indexOf(genre);
  genres.splice(index,1);
  res.send(genre)
})

const genreValidation=(genre)=>{
    const schema = Joi.object({
        type: Joi.string()
            .min(3)
            .required()
    })
   return  schema.validate(genre);
}

module.exports=router;