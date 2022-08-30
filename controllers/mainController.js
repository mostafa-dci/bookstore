const mainHandler = (req, res)=>{
    res.render('mainTemplate', {
        title: "Book Store",
        content: "home"
    })
}


module.exports = {mainHandler}