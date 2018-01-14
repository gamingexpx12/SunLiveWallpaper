var sunAPI = "https://api.sunrise-sunset.org/json?lat=58.943598&lng=5.714572&date=today&formatted=0"
var locale = "en-GB"
var sunResults = ""
var sunrise = 21600
var sunset = 64800
var dawn = 20600
var dusk = 65800
var starangle = 0
const tau = 2 * Math.PI

let debugmode = false

var debugTime = new Time(new Date(2017, 10, 31, 7, 20, 1, 0));

const svg = d3.select("div").append("svg")
    .attr("id", "mainsvg")
    .attr("version", "1.1")
    .attr("viewbox", "0 0 1920 1080")
    .attr("width", "100%")
    .attr("height", "1080px")

d3.select("html").style("overflow", "hidden")
//Make Digital clock
var clock = d3.select("svg").append("text")
    .text("13:33:37")
    .attr("x", "50%").attr("y", "70%")
    .attr("fill", "white").attr("text-anchor", "middle")
    .style("font", "bold 100px Verdana, Helvetica, Arial, sans-serif")

//Add background(sky)
const back = svg.insert("rect",":first-child")
    .attr("id", "sky")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("fill", "deepskyblue")

//Add foreground(grass)
const fore = svg.insert("rect", ":last-child")
    .attr("id", "grass")
    .attr("x", "0px")
    .attr("y", "70%")
    .attr("height", "30%")
    .attr("width", "100%")
    .attr("fill", "seagreen")

//Add stars
const stars = svg.insert("g", "#grass")
    .attr("id", "stargroup")
AddStars(stars, 500)
//Add sun
const sun = new Sun(svg, window.outerWidth * 0.5, window.outerHeight * 0.7 + 100, 600).sunradius(100)
svg.insert(() => sun.svg.node(), "#grass")
var time = new Time(new Date())

function update() {

    if (debugmode) {
        time = debugTime
    } else {
        time = new Time(new Date())
    }

    sun.setDaytimeFraction(time.fraction)

    clock.text(time.date.toLocaleTimeString(locale)) //Digital clock
    //Move sun along path
    if (time.fraction < 1 && time.fraction > 0) {
        //More color hacking
        d3.select("#grass").attr("fill", "seagreen")
        d3.select("#sky").attr("fill", "hsl(208, 44%, 70%)")
        stars.attr("fill", "none")
        //Color hacking
        if (time.fraction > 0.95 || time.fraction < 0.05) {
            d3.select("#sky").attr("fill", "orange")
            d3.select("#grass").attr("fill", "#20a420")
        }
    } else {
        d3.select("#grass").attr("fill", "darkgreen")
        d3.select("#sky").attr("fill", "black")
        stars.attr("fill", "white")
        stars.attr("transform", "rotate(" + starangle +", 960, 1920)")
        starangle = starangle + 0.1
    }
}

getSunriseSunsetTimes()

update()
setInterval(update, 100)
