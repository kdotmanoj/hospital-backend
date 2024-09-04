const express = require("express");
const app = express();

const users = [{
    name : "John",
    kidneys : [{
        healthy : true
    },{
        healthy : false
    }]
}]
app.use(express.json());

app.get("/",function(req,res){
    const johnKidneys = users[0].kidneys;
    const numOfKidneys = johnKidneys.length;
    const healthyKidneys = johnKidneys.filter(healthy).length;
    const unhealthyKidneys = numOfKidneys - healthyKidneys;

    res.json({
        numOfKidneys,
        healthyKidneys,
        unhealthyKidneys
    })
})

function healthy(item){
    return item.healthy;
}
app.post("/",function(req,res){
    const isHealthy = req.body.isHealthy;
    const johnKidneys = users[0].kidneys;
    johnKidneys.push({
        healthy : isHealthy
    })

    res.json({
        msg : "done!"
    })
})
function damagedKidneys(req,res,next){
    const johnKidneys = users[0].kidneys;
    johnKidneys.forEach((kidney) => {
        if(!kidney.healthy){
            next();
            return;
        }
    })

    res.status(403).json({
        msg : "You have no unhealthy kidneys!"
    })
}
app.use(damagedKidneys);
app.put("/",function(req,res){
    const johnKidneys = users[0].kidneys;
    for(let i = 0;i < johnKidneys.length; i++){
        johnKidneys[i].healthy = true;
    }

    res.json("done!")
})

app.delete("/",function(req,res){
    let johnKidneys = users[0].kidneys;
    users[0].kidneys = johnKidneys.filter(deleteUnhealthyKidneys);
    res.json("done!")
})

function deleteUnhealthyKidneys(obj){
    return obj.healthy;
}
app.listen(3000)