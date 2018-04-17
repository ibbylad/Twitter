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
var url = "http://rainerleit.eu/jsonib/tweets.json";

var textColour = "#fff", // White colour for the text
    likesRtColor = "#002f7b"; // Colour for the likes and retweets number text

var img = new Image, // Creating a new image variable for likes icon
    img2 = new Image, // Creating a new image variable for RTs icon
    prof = new Image; // Creating a new image variable for user's profile icon

var previous = null;
var current = null;

setInterval(function () {
    $.getJSON("http://rainerleit.eu/jsonib/tweets.json", function (json) {
        current = JSON.stringify(json);
        if (previous && current && previous !== current) {
            console.log('refresh');
            location.reload();
        }
        previous = current;
    });
}, 5000);

//var mess =
//
//    function success() {
//        if (obj.user.statuses_count < 50000) {
//            message = "Awesome"
//        } else {
//            message = "Good";
//        }
//        document.getElementById("zCanvas").innerHTML = message;
//    }

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

success();

// Canvas function
function init() {

    Z(ctx, ctx.canvas.width / 2, ctx.canvas.height / 2);

    // Function for the data show begins
    function Z(ctx, x, y) {
        ctx.beginPath();
        ctx.fillStyle = textColour;
        ctx.textAlign = "center";
        ctx.textBaseline = 'middle';
        ctx.closePath();

        // Sourcing the user's profile picture.
        prof.src = obj["0"].user.profile_image_url;
        ctx.closePath();

        // Displaying the user's profile picture
        ctx.beginPath();
        prof.onload = function () {
            ctx.beginPath();
            ctx.arc(x - 122, y + 125, 24, 0, 2 * Math.PI);
            ctx.strokeStyle = "#002f7b";
            ctx.lineWidth = 4;
            ctx.stroke();

            ctx.clip();
            ctx.drawImage(prof, x - 146, y + 100);

            ctx.closePath();
        };

        // Display the tweet
        ctx.beginPath();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "14px Verdana";
        ctx.fillText(obj["0"].text, x + 2, y + 200);
        ctx.closePath();

        // Display the tweet success message
        //        ctx.beginPath();
        //        ctx.textAlign = "center";
        //        ctx.textBaseline = "middle";
        //        ctx.font = "14px Verdana";
        //        ctx.fillText(success, x + 2, y + 100);
        //        ctx.closePath();

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
            ctx.drawImage(img, x - 620, y - 180);
        };

        img.src = "http://media.uclan.ac.uk/~iadam3/Code%20Design/Like.png";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "30px Verdana";
        ctx.fillStyle = likesRtColor;
        ctx.fillText(obj["0"].user.favourites_count, x - 30, y - 180);
        ctx.closePath();

        // The total retweet's on the tweet
        ctx.beginPath();
        img2.onload = function () {
            ctx.drawImage(img2, x - 650, y - 350);
        };
        img2.src = "http://media.uclan.ac.uk/~iadam3/Code%20Design/Retweet.png"; // Source for the favourite's icon.
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "30px Verdana";
        ctx.fillStyle = likesRtColor;
        ctx.fillText(obj["0"].user.statuses_count, x - 100, y - 350);
        ctx.closePath();


    } // Data show function ends
} // Init function end

//References
//-----
//https://codepen.io/jboeijenga/pen/pveQBz?depth=everything&order=popularity&page=3&q=canvas+particle&show_forks=false
