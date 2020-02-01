module.exports = {
    allPosts: (req,res) => {
        const {userPosts, search} = req.query
        const {id} = req.params
        if(userPosts && search){
            const posts = req.app.get('db').get_search_posts(search)
            return res.status(200).send(posts)
        }
        if(!userPosts && !search){
            const posts = req.app.get('db').get_others_posts(id)
            return res.status(200).send(posts)
        }
        if(!userPosts && search){
            const posts = req.app.get('db').get_others_searched(id, search)
            return res.status(200).send(posts)
        }
        if(userPosts && !search){
            const posts = req.app.get('db').get_posts()
            return res.status(200).send(posts)
        }
    },
    addPost: (req,res) => {
        const {title, img, content} = req.body
        const post = req.app.get('db').add_post(title, img, content)
        return res.sendStatus(200)
    }
}