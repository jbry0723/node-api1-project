const express=require('express')
const server=express()
const Users=require('./users-model')

server.use(express.json())



server.get('/api/users', (req,res)=>
Users.findAll()
.then(users=>{
    res.status(200).json(users)
})
.catch (error=>{
    res.status(500).json({message:"The users information could not be retrieved."})
})
)

server.post ('/api/users', (req,res)=>{
    const user=req.body
    
        if (!user.name || !user.bio){
            res.status(400).json({ message: "Please provide name and bio for the user."})
        }
        else {
            Users.create(user)
            .then(user=>{
            res.status(201).json(user)
        })
        .catch(error=>{
            res.status(500).json({ message: "There was an error while saving the user to the database" })
        })  
        }
            
            
    
    })

server.get ('/api/users/:id', (req,res)=>{
    const {id}=req.params
    Users.findById(id)
        .then(user=>{
            if (!user){
                res.status(404).json({ message: `user with id ${id} not found` })
            }
            else{
                res.status(200).json(user)
            }    
        
        })
        .catch(error => {
            res.status(500).json({ message: "The user information could not be retrieved."})
        })

})

server.delete('/api/users/:id', (req,res)=>{
    const {id}=req.params
    Users.delete(id)
    .then(deleted=>{
        if (!deleted){
            res.status(404).json({message:"The user with the specified ID does not exist."})
        } else {
          res.status(200).json(deleted)  
        }
    })
    .catch(error => {
        res.status(500).json({ message: "The user could not be removed" })
      })
})

server.put('/api/users/:id', (req,res)=>{
    const id=req.params.id
    const changes=req.body
    if (!changes.name || !changes.bio){
        res.status(400).json({ message: "Please provide name and bio for the user." })
    } else{
        Users.update(id,changes)
        .then(user=>{
            if(!user){
                res.status(404).json({ message: `User with id ${id} not found` })
            } else {
                res.status(200).json(user)
            }

        })
        .catch (error=> {
            res.status(500).json({ message: "The user information could not be modified." })
    })
    }

})





module.exports=server