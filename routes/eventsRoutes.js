const router = require("express").Router();
const eventsModel = require("../models/eventsModel");
const multer = require ('multer');
// const upload = multer ({dest: 'upload/'});
const multipartMiddleware = multipart();
const cloudinary = require ('cloudinary');
cloudinary.config({
    cloud_name: 'sayil',
    api_key: '443611676341187',
    api_secret: 'wAPlHaXu39fxiKuBr9ZN4Gp6IxA'
});



router.post("/allEvents", (req, res) => {
    console.log(req.file+ "this should work ");
var uploadlink;
    cloudinary.v2.uploader.upload(
        req.files.image.path,
        { width: 700, overlay: `text:Times_90_bold:${encodeURIComponent(req.body.watermark)}`, gravity: "south", y: 80, color: "#FFFF0080" },
        function(error, result) {
            if(error){console.log("erroor here")}
          res.json({data: result});
          console.log({data: result.url})
      })


    let newEvents = new eventsModel(
        // {
        // title: req.body.title,
        // description: req.body.description,
        // image: req.body.image,
        // category: req.body.category,
        // location: req.body.location,
        // "start.date": req.body.date,
        // "start.time": req.body.time,
        // "stop.date": req.body.date,
        // "stop.time": req.body.time
        
    // }
    req.body
    );console.log(req.body);

    newEvents.save((err, data) => {
        console.log(data);
        if (err) {
            console.log("save pls");
            res.send(err + "error occered poooo");
        } else {
            res.send("Data Saved!");
        }
    })
})


router.get("/all", (req, res) => {
    // console.log("Get working!");
    eventsModel.find({location: "Abuja"},{location:true},(err, result) => {
            if(err) {
                res.send("An Error Occured!");
                console.log("not seen");
            } else {
                res.send(result);
            }
    })
})

router.get("/findone/:id", ( req, res)=>{
    eventsModel.findById (req.params.id,(err, result)=>{
            if(err) {
                res.send("An Error Occured!");
                console.log("error:");
            } else {
                res.send(result);
                console.log("sent ");
            }
    })
})


router.get("/findel/:id", ( req, res)=>{
    eventsModel.findByIdAndDelete (req.params.id,(err, result)=>{
            if(err) res.send("An Error Occured!");
                
             const message = {
                 message:"deleted",
                 id: result._id
             };
                res.send(result + "this document has been deleted");
                console.log("sent ");
            
    })
})

// Todo.findByIdAndRemove(req.params.todoId, (err, todo) => {
//     // As always, handle any potential errors:
//     if (err) return res.status(500).send(err);
//     // We'll create a simple object to send back with a message and the id of the document that was removed
//     // You can really do this however you want, though.
//     const response = {
//         message: "Todo successfully deleted",
//         id: todo._id
//     };
//     return res.status(200).send(response);
// });






router.get("/s", (req, res) => {

    res.send("Welcome to Batch B");

});
module.exports = router;
// router.get("/welcome/:name/: nickname", (req, res) => {
//     console.log(req.params);
//     res.send("Welcome to Projaro " + req.params.name + ".Your Nick Name is " + req.params.nickname);
// })