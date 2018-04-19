// BY IBRAHIM ADAM AND DANIEL ENGLAND

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

function Get(url) {
    var Httpreq = new XMLHttpRequest(); // Create a new request for the canvas
    Httpreq.open("GET", url, false);
    Httpreq.send(null);
    return Httpreq.responseText;
}

// JSON parse. 
var obj = JSON.parse(Get(url));

var mess = obj["0"].user.statuses_count;

var messages = "#Average"; // This if statement allows us to display a message based on the number retweets the currently displayed tweet has 

if(mess > 40000) {
    messages = "#Awesome";
} else if(mess < 10000) {
    messages = "#Poor";
}


// Debugging the JSON object
console.log(obj);

init();
success(mess);

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
        // Drawing the arc to sit around the user's profile picture
        ctx.beginPath();
        prof.onload = function () {
            ctx.beginPath();
            ctx.arc(x - 122, y + 125, 24, 0, 2 * Math.PI);
            ctx.strokeStyle = "#002f7b";
            ctx.lineWidth = 4;
            ctx.stroke();

            ctx.clip();
            ctx.drawImage(prof, x - 146, y + 100); // User's profile picture position 

            ctx.closePath();
        };

        // Display the user's name
        ctx.beginPath();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "20px Verdana";
        ctx.fillText(obj["0"].user.screen_name, x + 2, y + 125);
        ctx.closePath();

        // Display the tweet
        ctx.beginPath();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "18px Verdana";
        ctx.fillText(obj["0"].text, x + 2, y + 200);
        ctx.closePath();

        // Display the tweet success message
        ctx.beginPath();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "60px Verdana";
        ctx.fillText(messages, x + 280, y + -240);
        ctx.closePath();

        // The total retweets on the tweet
        // Drawing the retweets icon on the canvas
        ctx.beginPath();
        img2.onload = function () {
            ctx.drawImage(img2, x - 650, y - 350);
        };
        img2.src = "http://media.uclan.ac.uk/~iadam3/Code%20Design/Assignment%202/Retweet.png"; // Source for the retweets icon.
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "50px Courier New";
        ctx.fillStyle = likesRtColor;
        ctx.fillText(obj["0"].user.statuses_count, x - 250, y - 310); // Retweets number and position
        ctx.closePath();

        // The total likes on the tweet
        // Drawing the likes icon on the canvas
        ctx.beginPath();
        img.onload = function () {
            ctx.drawImage(img, x - 620, y - 180);
        };
        img.src = "http://media.uclan.ac.uk/~iadam3/Code%20Design/Assignment%202/Like.png"; // Source for the likes icon.
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "50px Courier New";
        ctx.fillStyle = likesRtColor;
        ctx.fillText(obj["0"].user.favourites_count, x - 250, y - 135); // Likes number and position
        ctx.closePath();

    } // Data show function ends
} // Init function ends

//References
//-----
//https://codepen.io/jboeijenga/pen/pveQBz?depth=everything&order=popularity&page=3&q=canvas+particle&show_forks=false
