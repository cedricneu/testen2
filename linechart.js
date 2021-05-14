//Body Werte definieren
var margin = {top: 50, right: 20, bottom: 80, left: 50} //Rand
    , width = window.innerWidth - margin.left - margin.right //Breite
    , height = window.innerHeight - margin.top - margin.bottom; //Höhe

//Y Achse definieren
var yScale = d3.scaleLinear()
    .domain([0, 20])
    .range([height - margin.bottom - margin.top, 0]);

d3.json("data/data.json").then((data) => {

//X Achse definieren
var xScale = d3.scaleLinear()
    .range([0, width - margin.right])
    .domain([0, data.length])

//SVG erzeugen
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//X Achse erzeugen -> d3.axisBottom
svg.append("g")//Neue SVG gruppe auswählen
  
    .attr("transform", "translate(0," + (height - margin.top - margin.bottom) + ")")//Achse an das untere Ende des Charts verschieben
    .call(d3.axisBottom(xScale).ticks(data.length ));//Achse erzeugen

//Y Achse erzeugen -> d3.axisLeft
svg.append("g")//Neue SVG gruppe auswählen
  
    .call(d3.axisLeft(yScale));//Achse erzeugen

//Linie generieren
var line = d3.line()
    .x((d,i) => { return xScale(i); }) //X Werte
    .y((d) => { return yScale(d.x); }) //Y Werte

//Linie erzeugen und dem Graphen hinzufügen
svg.append("path")
    .datum(data) //Daten aufrufen
    .style("line", "red")
   .attr("d", line) // Linie generieren

})