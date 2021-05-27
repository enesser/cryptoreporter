/**
 * Tree Map Generator: generates a D3 tree map from hierarchal data.
 */

'use strict';

const D3Node = require('d3-node');
const d3 = D3Node().d3;

// data range max value to use for linear scale
const data_max_range = 10;

// tree map margins
const margin = { top: 0, right: 0, bottom: 0, left: 0 };

// tree map width
const width = 1000 - margin.left - margin.right;

// tree map height
const height = 1000 - margin.top - margin.bottom;

// color to use for positive price change (green)
const positive_value_color = '#4f8b57';

// color to use for negative price change (red)
const negative_value_color = '#d34843';

// font family to use
const font_family = 'Verdana';

// font color to use for labels
const font_color = '#fff';

// base size to use for crypto name labels
const font_size_names = 20;

// base size to use for crypto value change labels
const font_size_values = 18;

/**
 * Adjust data values on linear scale for proportional size boxes.
 *
 * @param   {Array}  data  [data description] 
 */
const adjustDataOnLinearScale = (data) => {
    let highest_difference = 0;
    let lowest_difference = 0;

    data.forEach((d) => {        

        if (d.difference > highest_difference) {
            highest_difference = d.difference;
        }

        if (d.difference < lowest_difference) {
            lowest_difference = d.difference;
        }
    });

    const linearScale = d3.scaleLinear();
    linearScale.domain([lowest_difference, highest_difference])
        .range([0, data_max_range]);

    (data).forEach((d) => {
        d.value = Math.ceil(linearScale(d.value));
    });
};

/**
 * Generates a D3 tree map with supplied hierarchal data.
 *
 * @param   {Array}  data  [tree map data]
 * @return  {String}       [SVG string]
 */
const get = (data) => {    
    
    adjustDataOnLinearScale(data.children);

    const d3n = new D3Node();

    // svg attributes and margins
    const svg = d3n.createSVG(width, height)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // root svg node using value for leaf sizes
    const root = d3.hierarchy(data).sum((d) => d.value);

    // create a D3 tree map and set initial sizes
    d3.treemap()
        .size([width, height])
        .paddingOuter(0)
        .padding(10)
        (root);

    // draw value boxes
    svg
        .selectAll('rect')
        .data(root.leaves())
        .enter()
        .append('rect')
        .attr('x', (d) => d.x0)
        .attr('y', (d) => d.y0)
        .attr('width', (d) => d.x1 - d.x0)
        .attr('height', (d) => d.y1 - d.y0)
        .style('stroke', 'black')
        .style('fill', (d) => d.data.value_display > 0.0 ?
            positive_value_color : negative_value_color);

    // draw crypto name labels
    svg
        .selectAll('text')
        .data(root.leaves())
        .enter()
        .append('text')
        .attr('font-family', font_family)
        .attr('x', (d) => d.x0 + 5)     // + to adjust position (more right)
        .attr('y', (d) => d.y0 + 40)    // + to adjust position (lower)
        .text((d) => d.data.name)
        .attr('font-size', (d) => (d.value + font_size_names).toString() + 'px')
        .attr('fill', font_color);

    // crypto percent change labels
    svg
        .selectAll('vals')
        .data(root.leaves())
        .enter()
        .append('text')
        .attr('font-family', font_family)
        .attr('x', (d) => d.x0 + 5)    // + to adjust position (more right)
        .attr('y', (d) => d.y0 + 80)   // + to adjust position (lower)
        .text((d) => `${d.data.value_display}%`)
        .attr('font-size', (d) => (d.value + font_size_values).toString() + 'px')
        .attr('fill', font_color);

    return d3n.svgString();
};

module.exports = { get };