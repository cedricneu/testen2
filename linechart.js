///Body Werte definieren
var margin = {top: 50, right: 20, bottom: 80, left: 50} //Rand
, width = window.innerWidth - margin.left - margin.right //Breite
, height = window.innerHeight - margin.top - margin.bottom; //Höhe

//Y Achse definieren
var yScale = d3.scaleLinear()
.domain([0, 15])
.range([height  , 0]);

d3.json("data/data.json").then((data) => {

//X Achse definieren
var xScale = d3.scaleLinear()
.range([0, width - margin.right])
.domain([0, data.length])

//SVG erzeugen
var svg = d3.select("body").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height)
.call(d3.zoom().on("zoom", function () {
    svg.attr("transform", d3.event.transform)
 }))
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // sorgt für den Abstand zwischen y-Achse und Browserrand


// generiert die x- Achse! 

svg.append("g")
.attr("class", "x axis")//CSS Style für X Achse
.attr("transform", "translate(0," + (height  - margin.bottom) + ")")//Achse an das untere Ende des Charts verschieben
.call(d3.axisBottom(xScale));//Achse erzeugen

//Y Achse erzeugen
svg.append("g")// Gruppe aus SVG rufen (g)
.call(d3.axisLeft(yScale));//Achse erzeugen
// call Methode 
//Linie generieren
var line = d3.line()
.x((d,i) => { return xScale(i); }) //X Werte
.y((d) => { return yScale(d.x); }) //Y Werte

//Linie erzeugen und dem Graphen hinzufügen
svg.append("path")
.datum(data) //Daten aufrufen
.classed("line", true) //CSS Style class für den Graph
.attr("d", line) // Linie generieren





})