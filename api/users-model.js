const shortid=require('shortid')

let users=[
    {id:shortid.generate(), name:"John", bio:"He did stuff."}
]

module.exports={
    create({name, bio}){
        const newUser= {id:shortid.generate(), name, bio}
        users.push(newUser)
        return Promise.resolve(newUser)
    },

    findAll(){
        return Promise.resolve(users)
    },

    findById(id){
        const user=users.find(u=>u.id===id)
        return Promise.resolve(user)
    },

    delete(id){
        const user= users.find(u=>u.id===id)
        if (!user) return Promise.resolve(null)

        users=users.filter(u=>u.id !== id)
        return Promise.resolve(user)
    },
    
    update(id,changes){
        const user=users.find(user=>user.id===id)
        if(!user) return Promise.resolve(null)

        const updatedUser= {...changes, id}
        users=users.map(u=>(u.id===id)? updatedUser : u)
        return Promise.resolve(updatedUser)
    }
}