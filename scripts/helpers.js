function dateToSeconds(date) {
  return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds()
}
function SecondsToDate(secs) {
  return new Date(2017, 10, 31, secs / 3600, (secs % 3600) / 60, secs % 60, 0)
}
function AddStars(selection, amount) {
  for (var i = 0; i < amount; i++) {
    selection.append("circle")
    .attr("r", 1)
    .attr("cx", function () {return Math.random() * 1445})
    .attr("cy", function () {return Math.random() * 1445})
  }
}

function getSunriseSunsetTimes() {
    getIPAdress(function (ip) {
        getLatLonFromIP(ip, function (lat, lon) {
            getSunriseSunsetFromLatLon(lat, lon, function (resp) {
                console.log(resp);
                sunResults = resp.results
                sunrise = dateToSeconds(new Date(resp.results.sunrise))
                sunset = dateToSeconds(new Date(resp.results.sunset))
                dawn = dateToSeconds(new Date(resp.results.civil_twillight_begin))
                dusk = dateToSeconds(new Date(resp.results.civil_twillight_end))
            })
        })
    })
}

function getIPAdress(callback) {
    d3.text("https://api.ipify.org", function (error, ip) {
        if (error) throw error;
        callback(ip)
    })
}

function getLatLonFromIP(ip, callback) {
    d3.json("http://ip-api.com/json/" + ip +"?fields=lat,lon,status,message", function (error, latLonStatus) {
        if (error) throw error;
        if (latLonStatus.status == "success") {
            console.log("Lat Lon request successfull")
            callback(latLonStatus.lat, latLonStatus.lon)
        } else {
            console.error("Lat Lon request failed")
        }
    })
}

function getSunriseSunsetFromLatLon(lat, lon, callback) {
    var apipre = "https://api.sunrise-sunset.org/json?lat="
    var apimid = "&lng="
    var apisuf = "&date=today&formatted=0"
    var sunrequest = apipre + lat + apimid + lon + apisuf

    d3.json(sunrequest, function (error, resp) {
        if (error) throw error;
        callback(resp)
    })
}

function timeOfDay(sunriseBegin, sunriseEnd, sunsetBegin, sunsetEnd) {
    return "day"
}

function Time(date) {
  this.date = date
  this.h = date.getHours()
  this.m = date.getMinutes()
  this.s = date.getSeconds()
  this.totalSeconds = dateToSeconds(date)
  this.sunrise = sunrise
  this.sunset = sunset
  this.fraction = d3.scaleLinear().domain([this.sunrise, this.sunset])(this.totalSeconds)
  this.timeOfDay = timeOfDay(0, this.sunrise, this.sunset, 0)
}

function addLineAngle(parent, cx, cy, pathradius, angle) {
    parent.append("line").attrs({
        "x1": cx,
        "y1": cy,
        "x2": cx,
        "y2": cy + pathradius,
        "stroke": "pink",
        "stroke-width": "5px",
        "transform": "rotate(" + angle + " " + cx + " " + cy + ")",
    })
}

function LineAngle(parent,cx, cy, pathradius, angle) {
    this.x = cx
    this.y = cy
    this.line = parent.append("line").attrs({
        "x1": cx,
        "y1": cy,
        "x2": cx,
        "y2": cy + pathradius,
        "stroke": "pink",
        "stroke-width": "5px",
        "transform": "rotate(" + angle + " " + cx + " " + cy + ")",
    })

    this.updateAngle = function(angle) {
        this.line.attr("transform", "rotate(" + angle + " " + this.x + " " + this.y + ")")
    }

    this.updateSeconds = function (secs) {
        this.updateAngle(secs / 86400 * 360)
    }
}
