import express from 'express';
const app = express();
const users = [
    {id:1, name:"user1"},
    {id:2, name:"user2"},
    {id:3, name:"user3"},
    {id:4, name:"user4"},
    {id:5, name:"user5"},
    {id:6, name:"user6"},
    {id:7, name:"user7"},
    {id:8, name:"user8"},
    {id:9, name:"user9"},
    {id:11, name:"user11"},
    {id:12, name:"user12"},
    {id:13, name:"user13"},
    ];
    const posts = [
    {id:1, name:"post1"},
    {id:2, name:"post1"},
    {id:3, name:"post1"},
    {id:4, name:"post1"},
    {id:5, name:"post1"},
    {id:6, name:"post1"},
    {id:7, name:"post1"},
    {id:8, name:"post1"},
    {id:9, name:"post1"},
    {id:11, name:"post1"},
    {id:12, name:"post1"},
    {id:13, name:"post1"},
    ];
    function paginatedResults(models){
        return(req,res,next)=>{
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            const startIndex = (page-1)* limit;
            const endIndex = page*limit;

            results={};
            if(endIndex < models.length){
                results.next={
                page:page+1,
                limit:limit            
                }
            }
            if(startIndex>0){
                results.previous={
                page:page-1,
                limit:limit
                }
            }

            results.result = models.slice(startIndex,endIndex);
            res.paginatedResults = results;
            next();
        }
    }
app.get('/users',paginatedResults(users),(req,res)=>{
    res.send(res.paginatedResults);
})
app.get('/posts',paginatedResults(posts),(req,res)=>{
    res.send(res.paginatedResults);
})
app.listen(8901);