var sunAPI = "https://api.sunrise-sunset.org/json?lat=58.943598&lng=5.714572&date=today&formatted=0"
var locale = "en-GB"
var svg = d3.select("svg").style("z-index", "1")
var stargroup = svg.insert("g", "#grass").attr("id", "stargroup")
var sunResults = ""
var sunrise = 21600
var sunset = 64800
var dawn = 20600
var dusk = 65800
var starangle = 0
const tau = 2 * Math.PI

//Debugtime slider
var debugTime = new Time(new Date(2017, 10, 31, 7, 20, 1, 0));
/*d3.select("div").append("input")
        .attr("type", "range")
        .attr("min", "0")
        .attr("max", "86400")
        .on("input", function () {
          debugTime = new Time(SecondsToDate(this.value))
        })
*/
var sun = d3.select("#sun")
d3.select("html").style("overflow", "hidden")
//Make Digital clock
var clock = d3.select("svg").append("text")
    .text("13:33:37")
    .attr("x", "50%").attr("y", "70%")
    .attr("fill", "white").attr("text-anchor", "middle")
    .style("font", "bold 100px Verdana, Helvetica, Arial, sans-serif")




var newtime = new Time(new Date())

function update() {
    newtime = new Time(new Date())
    //newtime = debugTime

    clock.text(newtime.date.toLocaleTimeString(locale)) //Digital clock
    //Move sun along path
    var sunpathElement = d3.select("#sunpath").node()
    var sunpathLength = sunpathElement.getTotalLength()
    if (newtime.fraction < 1 && newtime.fraction > 0) {
        var sunpathPoint = sunpathElement.getPointAtLength(newtime.fraction * sunpathLength)
        sun.attr("cx", sunpathPoint.x).attr("cy", sunpathPoint.y)
        //More color hacking
        sun.attr("fill", "orange")
        d3.select("#grass").attr("fill", "seagreen")
        d3.select("#sky").attr("fill", "hsl(208, 44%, 70%)")
        stargroup.attr("fill", "none")
        //Color hacking
        if (newtime.fraction > 0.95 || newtime.fraction < 0.05) {
            sun.attr("fill", "red")
            d3.select("#sky").attr("fill", "orange")
            d3.select("#grass").attr("fill", "#20a420")
        }
    } else {
        sun.attr("fill", "none")
        d3.select("#grass").attr("fill", "darkgreen")
        d3.select("#sky").attr("fill", "black")
        stargroup.attr("fill", "white")
        stargroup.attr("transform", "rotate(" + starangle +", 960, 1920)")
        starangle = starangle + 0.1
    }
}

getSunriseSunsetTimes()
AddStars(stargroup, 500)
update()
setInterval(update, 100)
