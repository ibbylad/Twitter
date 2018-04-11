/*refresh page 
window.setInterval('refresh()', 5000); // CALL A FUNCTION EVERY 10000 MILLISECONDS OR 10 SECONDS.

// REFRESH OR RELOAD PAGE.
function refresh() {
    window.location.reload();
}



/*Banik, A. (2018). How to Auto Refresh Page Every 10 Seconds using JavaScript setInterval() Method. [online] Encodedna.com. Available at: http://www.encodedna.com/javascript/auto-refresh-page-every-10-second-using-javascript-setInterval-method.htm [Accessed 3 Apr. 2018].    */

// locates the html element by id
var c = document.getElementById("zCanvas");

//defines context as 2d
var ctx = c.getContext("2d");

//Window width and height
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;


//tweet information
var url = "http://media.uclan.ac.uk/~iadam3/Code%20Design/Assignment%202/Twitter/tweets.json";

//Current Blue: BLUE slows the heart rate, suppresses hunger and reduces blood pressure.
//http://www.colourtheory.net/articles/colour_psychology.htm
var textc = "#2F74A8",
    rheartc = "#e81c4f";
// var bgc = "#5DB4F4";
var img = new Image,
    prof = new Image;

var previous = null;
var current = null;

setInterval(function () {
    $.getJSON("http://media.uclan.ac.uk/~iadam3/Code%20Design/Assignment%202/Twitter/tweets.json", function (json) {
        current = JSON.stringify(json);
        if (previous && current && previous !== current) {
            console.log('refresh');
            location.reload();
        }
        previous = current;
    });
}, 5000);




/*downloads one or more urls
Rdocumentation.org. (2018). getURL function | RDocumentation. [online] Available at: https://www.rdocumentation.org/packages/RCurl/versions/1.95-4.8/topics/getURL [Accessed 3 Apr. 2018].

*/


function Get(url) {
    var Httpreq = new XMLHttpRequest(); // a new request begins
    //initialize or re-initialize request
    Httpreq.open("GET", url, false);
    Httpreq.send(null);
    return Httpreq.responseText;
}

//parse 
var obj = JSON.parse(Get(url));

console.log(obj);

init();

//Z
function init() {

    Z(ctx, ctx.canvas.width / 2, ctx.canvas.height / 2);



    //zFunctionBegin
    function Z(ctx, x, y) {
        ctx.beginPath();
        ctx.font = "400px Arial";
        ctx.fillStyle = textc;
        ctx.textAlign = "center";
        ctx.textBaseline = 'middle';
        ctx.fillText("Z", x, y);
        ctx.closePath();

        // //time
        // ctx.beginPath();
        // ctx.font = "43px Arial";
        // ctx.fillText("19:55", x + 6, y - 147);
        // ctx.closePath();


        //profile pic
        ctx.beginPath();
        prof.onload = function () {
            ctx.beginPath();
            ctx.arc(x + 24, y + 252, 24, 0, 2 * Math.PI);
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 4;
            ctx.stroke();

            ctx.clip();
            ctx.drawImage(prof, x, y + 227);

            ctx.closePath();
        };
        prof.src = obj["0"].user.profile_image_url;


        ctx.closePath();
        //profile pic

        // //locationBegin - DATE AND TIME
        // ctx.beginPath();
        // ctx.textAlign = "center";
        // ctx.textBaseline = "middle";
        // ctx.font = "15px Arial";
        // ctx.fillText(obj["0"].created_at, x + 4, y - 200);
        // ctx.closePath();
        // //locationEnd

        // tweetBegin
        ctx.beginPath();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = ctx.canvas.width / 75 + "px Arial";
        ctx.fillText(obj["0"].text, x + 2, y + 200);

        ctx.closePath();
        //tweetEnd

        // extra info begin (Favourites on the account)
        ctx.beginPath();
        img.onload = function () {
            ctx.drawImage(img, x - 47, y + 230);
        };
        /* img.src = "img/heart32.png"; // Media.uclan.ac.uk is having trouble loading this fast enough */
        img.src = "http://rainerleit.eu/json/img/heart32.png"; //See if this changes it
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "18px Arial";
        ctx.fillStyle = rheartc;
        ctx.fillText(obj["0"].user.favourites_count, x - 30, y + 275);
        ctx.closePath();



        // extra info end







    }


}






//zFunctionEnd


/*NOTES FOR ME
canvas = width="800" height="500"
------

    <!-- X = to go left - minus
     // X = to go right - add 
     // Y - to go up - minus 
     // Y - to go down - add-- - >

-----
References
-----
https://codepen.io/jboeijenga/pen/pveQBz?depth=everything&order=popularity&page=3&q=canvas+particle&show_forks=false

*/
