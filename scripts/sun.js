function Sun(parent, cx, cy, pathradius) {
    const secondsinday = 86400
    this.svg = parent.append("svg")
        .attr("width", "100%").attr("height", "1080")
        .attr("viewbox", "0 0 100% 100%").attr("version", "1.1")

    this.g = this.svg.append("g")

    this.sun = this.g.append("circle").attrs({
        "r": "100",
        "cx": cx,
        "cy": cy + pathradius,
        "fill": "orange",
    })

    this.setAngle = function (angle) {
        let x = cx
        let y = cy
        //rotate around the center, offset so midnight is on the bottom
        this.g.attr("transform", "rotate(" + (angle) + " " + cx + " " + cy + ")")
    }
    this.setFraction = function (fraction) {
        let angle = fraction * 360
        this.setAngle(angle)
        return angle
    }
    this.setSeconds = function (secs) {
        let angle = secs / secondsinday * 360
        this.setAngle(angle)
        return angle
    }
    this.setDaytimeFraction = function (fraction) {
        let angle = fraction * 0.5 * 360 + 90
        this.setAngle(angle)
        return angle
    }

}
