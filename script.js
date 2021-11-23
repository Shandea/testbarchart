// This is fetching data from json file
fetch('GDP-data.json')
    .then(response => response.json())
    .then(data => {
        // variable from json
        let dataSet = data.data;
        // Mapping the data 
        const newData = dataSet.map(function (item) {
            return {
                date: Date.parse(item[0]),
                value: item[1],
                values: item[0]
            }
        })
        // This is getting the Min and Max years
        let yearMin = d3.min(newData, d => d.date);
        let yearMax = d3.max(newData, d => d.date);
        // this is getting the title from json
        let title = data.meta;
        // this is max amount
        let popMax = d3.max(newData, d => d.value);
        // connecting title to html
        $('#title').html(title);
        // This is creating width, height and margins on graph
        const w = 1000;
        const h = 500;
        const margin = {
            top: 100,
            right: 60,
            bottom: 40,
            left: 200
        };

        // margins in between bars
        const innerWidth = w - margin.left - margin.right;
        const innerHeight = h - margin.top - margin.bottom;
        // creating svg
        const svg = d3.select("body")
            .append("svg")
            .attr('width', w)
            .attr('height', h)
        // x scale
        const xScale = d3.scaleTime()
            .domain([new Date(yearMin), new Date(yearMax)])
            .range([0, innerWidth]);
        // x axis
        const xAxis = d3.axisBottom(xScale);
        // y scale
        const yScale = d3.scaleLinear()
            .domain([0, popMax])
            .range([innerHeight, margin.bottom]);
        // y axis
        const yAxis = d3.axisLeft(yScale);
        // g variable
        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
        // display y axis
        const yAxisG =
            g.append('g').call(yAxis)
                .attr('id', 'yAxis');
        // display x axis
        const xAxisG =
            g.append('g').call(xAxis)
                .attr('transform', `translate(0, ${innerHeight})`)
                .attr('id', 'xAxis');
        // rectangle bars for chart
        svg.selectAll('rect')
            .data(newData)
            .enter()
            .append('rect')
            .attr('x', d => xScale(d.date) + margin.left)
            .attr('y', d => yScale(d.value) + margin.bottom + 60)
            .attr('width', d => innerWidth / newData.length)
            .attr('height', d => innerHeight - yScale(d.value))
            .attr("fill", "blue")
            .attr("class", "bar")
            .attr('id', 'tooltip')
            .append("title")
            .text((d, i) => d.values)

    });


