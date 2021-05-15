///Body Werte definieren
var margin = {top: 50, right: 20, bottom: 80, left: 50} //Rand
, width = window.innerWidth - margin.left - margin.right //Breite
, height = window.innerHeight - margin.top - margin.bottom; //Höhe



d3.json("data/data2.json").then((data) => {

// sucht sich den Max Wert aus der JSON 
var max  = d3.max(data, function (d){return d.value}); 

//Y Achse definieren
var yScale = d3.scaleLinear()

.range([height - margin.bottom - margin.top, 0])
.domain([0, max +max*0.1 ]) // Nimmt die max Höhe und addiert noch 10% der max Höhe dazu!
.nice();   // Rundet die Zahlen auf!



//X Achse definieren
var xScale = d3.scaleLinear()
.range([0, width - margin.right])
.domain([0, data.length])

//SVG erzeugen
var svg = d3.select("body").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // sorgt für den Abstand zwischen y-Achse und Browserrand


// generiert die x- Achse! 

svg.append("g")
.attr("transform", "translate(0," + (height - margin.top - margin.bottom) + ")")//Achse an das untere Ende des Charts verschieben
.call(d3.axisBottom(xScale));//Achse erzeugen

//Y Achse erzeugen
svg.append("g")// Gruppe aus SVG rufen (g)
.call(d3.axisLeft(yScale));//Achse erzeugen
// call Methode 
//Linie generieren
var line = d3.line()
.x((d,i) => { return xScale(i); }) //X Werte
.y((d) => { return yScale(d.value); }) //Y Werte

//Linie erzeugen und dem Graphen hinzufügen
svg.append("path")
.datum(data) //Daten aufrufen
.classed("line", true) //CSS Style class für den Graph
.attr("d", line) // Linie generieren

// Punkte am Graphen erstellen !
svg.selectAll(".dot")
  .data(data.filter(function(d) { return d; }))
  .enter().append("circle")
    .attr("class", "dot")
    .attr("cx", line.x())
    .attr("cy", line.y())
    .attr("r", 3.5);



})