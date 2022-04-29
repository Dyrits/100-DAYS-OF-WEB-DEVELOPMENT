module.exports = {
    posts: {
        list: (request, response) => { response.render('posts-list'); }
    },
    post: {
        create: (request, response) => { response.render('create-post'); },
    },
    $to: {
        posts: (request, response) => { response.redirect('/posts'); }
    }
}