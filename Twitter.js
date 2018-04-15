/*refresh page 
window.setInterval('refresh()', 5000); // CALL A FUNCTION EVERY 10000 MILLISECONDS OR 10 SECONDS.

// REFRESH OR RELOAD PAGE.
function refresh() {
    window.location.reload();
}

/*Banik, A. (2018). How to Auto Refresh Page Every 10 Seconds using JavaScript setInterval() Method. [online] Encodedna.com. Available at: http://www.encodedna.com/javascript/auto-refresh-page-every-10-second-using-javascript-setInterval-method.htm [Accessed 3 Apr. 2018].    */

// Canvas set up
var c = document.getElementById("zCanvas");
var ctx = c.getContext("2d");

// Window width and height
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

// Where to source tweets from
var url = "http://media.uclan.ac.uk/~iadam3/Code%20Design/Assignment%202/tweets.json";

var textColour = "#fff", // White colour for the text
    likesColour = "#e81c4f", // Red for the likes number text
    rtColour = "#34E034"; // Green for the retweets number text

var img = new Image, // Creating a new image variable for likes icon
    img2 = new Image, // Creating a new image variable for RTs icon
    prof = new Image; // Creating a new image variable for user's profile icon
var previous = null;
var current = null;

setInterval(function () {
    $.getJSON("http://media.uclan.ac.uk/~iadam3/Code%20Design/Assignment%202/tweets.json", function (json) {
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
    var Httpreq = new XMLHttpRequest(); // Create a new request for the canvas
    Httpreq.open("GET", url, false);
    Httpreq.send(null);
    return Httpreq.responseText;
}

// Function to create the JSON parse. 
var obj = JSON.parse(Get(url));

console.log(obj);

init();

// Canvas function
function init() {

    Z(ctx, ctx.canvas.width / 2, ctx.canvas.height / 2);

    //zFunctionBegin
    function Z(ctx, x, y) {
        ctx.beginPath();
        ctx.fillStyle = textColour;
        ctx.textAlign = "center";
        ctx.textBaseline = 'middle';
        ctx.closePath();

        // Displaying the user's profile picture
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

        // Sourcing the user's profile picture.
        prof.src = obj["0"].user.profile_image_url;
        ctx.closePath();

        // Display the tweet
        ctx.beginPath();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "20px Verdana";
        ctx.fillText(obj["0"].text, x + 2, y + 200);
        ctx.closePath();

        // Display the user's name
        ctx.beginPath();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "18px Verdana";
        ctx.fillText(obj["0"].user.screen_name, x + 2, y + 125);
        ctx.closePath();

        // The total favourite's on the tweet
        ctx.beginPath();
        img.onload = function () {
            ctx.drawImage(img, x - 47, y + 230);
        };

        img.src = "http://media.uclan.ac.uk/~iadam3/Code%20Design/heart.png";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "18px Verdana";
        ctx.fillStyle = likesColour;
        ctx.fillText(obj["0"].user.favourites_count, x - 30, y + 275);
        ctx.closePath();

        // The total retweet's on the tweet
        ctx.beginPath();
        img2.onload = function () {
            ctx.drawImage(img2, x - 122, y + 230);
        };
        img2.src = "http://media.uclan.ac.uk/~iadam3/Code%20Design/retweet.png"; // Source for the favourite's icon.
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "18px Verdana";
        ctx.fillStyle = rtColour;
        ctx.fillText(obj["0"].user.statuses_count, x - 100, y + 275);
        ctx.closePath();
    }
} //Canvas function end

//References
//-----
//https://codepen.io/jboeijenga/pen/pveQBz?depth=everything&order=popularity&page=3&q=canvas+particle&show_forks=false
