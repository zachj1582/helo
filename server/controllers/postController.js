module.exports = {
    allPosts: async (req,res) => {
        const {userposts, search} = req.query
        const {id} = req.params
        console.log(req.query)
        console.log(req.params)
        if(userposts && search){
            const posts = await req.app.get('db').get_search_posts(search)
            console.log('1', posts)
            return res.status(200).send(posts)
        }
        if(!userposts && !search){
            const posts = await req.app.get('db').get_others_posts(id)
            console.log('2', posts)
            return res.status(200).send(posts)
        }
        if(!userposts && search){
            const posts = await req.app.get('db').get_others_searched(id, search)
            console.log('3', posts)
            return res.status(200).send(posts)
        }
        if(userposts && !search){
            const posts = await req.app.get('db').get_posts()
            console.log('4', posts)
            return res.status(200).send(posts)
        }
    },
    addPost: async (req,res) => {
        const {title, img, content, id} = req.body
        const post = await req.app.get('db').add_post(title, img, content, id)
        return res.sendStatus(200)
    }
}