// implement your posts router here

const { json } = require('express')
const express = require('express')

const Posts =  require('./posts-model')
const router = express.Router()



router.get('/', (req, res) =>{
    Posts.find(req.query)
        .then(posts =>{
            res.status(200).json(posts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(
                {message: "The posts information could not be retrieved"}
            )
        })
})




router.get('/:id', (req, res)=>{
    Posts.findById(req.params.id)
        .then( posts =>{
            if(posts){
                res.status(200).json(posts)
            }else{
                res.status(404).json(
                    { message: "The post with the specified ID does not exist" }
                )
            }
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json(
                { message: "The post information could not be retrieved" }
            )
        })
})





router.post('/', (req, res)=>{
    const newPost = req.body
    if(!newPost.title || !newPost.contents){
        res.status(400).json(
            { message: "Please provide title and contents for the post" }
        )
    }else{
        Posts.insert(newPost)
    .then(posts =>{
        res.status(201).json(posts)
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json(
            { message: "There was an error while saving the post to the database" }
        )
    })
    }
    
})

router.put('/:id', (req, res) => {
    const changes = req.body;
    Posts.update(req.params.id, changes)
        .then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'The post could not be found' });
        }
        })
        .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error updating the post',
        });
        });
    })




router.delete('/:id', (req, res) =>{
    Posts.remove(req.params.id)
        .then(post =>{
            if(post){
                res.status(200).json(post)
            }else{
                res.status(404).json(
                    { message: "The post with the specified ID does not exist" }
                )
            }
            
        })
        .catch( err=>{
            console.log(err)
            res.status(500).json(
                { message: "The post could not be removed" }
            )
        }

        )
})




    router.get('/:id/comments', async (req, res) =>{
        try{
            const {id} = req.params
            const comments = await Posts.findPostComments(id)

            if(comments.length){
                res.status(200).json(comments)
            }else{
                res.status(404).json(
                    { message: "The post with the specified ID does not exist" }
                )
            }
        }
        catch(err){
            res.status(500).json(
                { message: "The comments information could not be retrieved" }
            )
        }
        
    })

  module.exports = router