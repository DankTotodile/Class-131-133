objects = [];
stat = "";
function preload()
{
    img = loadImage("dog_cat.jpg");
}
function setup()
{
    canvas = createCanvas(640, 400);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting";
}
function modelLoaded()
{
    console.log('Model has been loaded succesfully');
    stat = "true";
    objectDetector.detect(img, gotResults);
}
function gotResults(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        objects = results;

    }
}
function draw()
{   
    image(img, 0, 0, 640, 400);
    if(stat != "")
    {
    for(var i=0; i<objects.length; i++)
    {
    document.getElementById("status").innerHTML = "Status: "+objects.length+" objects detected";
    fill("red");
    stroke("red");
    noFill();
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    per = floor(objects[i].confidence*100);
    obj = objects[i].label+" "+per+"%";
    text(obj, objects[i].x, objects[i].y);
    }
    }
}