
// Get the Samples data
const samplesUrl = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(samplesUrl).then(function(data) {
  console.log(data);
});

// Initiallize a dashboard
function init() {

    let dropdownMenu = d3.select("#selDataset");

    // Subject ID for dropdown menu
    d3.json(samplesUrl).then((data) => {
      dataSample = data;
        
      let subjects = data.names
        subjects.forEach((id) => {

          dropdownMenu.append("option").text(id).attr("value", id);
          console.log(id);

        });

        // Initialize with the first subject in names
        let subject_0 = subjects[0];
        console.log(subject_0);
        
        // Initialize bar-plot, bubble-plot, metadata for subject_0
        metaData(subject_0, data);
        barPlot(subject_0, data);
        bubblePlot(subject_0, data);
        gaugeDial(subject_0, data);
                
    });

};

// -------------------------------------------------
// Function to display metadata of a subject
function metaData(subjectId, data) {

      // Retrieve all metadata
      let metadata = data.metadata;

      // Filter using subject id
      let subject = metadata.filter(mdata => mdata.id == subjectId);

      // Log the array of metadata objects
      console.log(subject)

      // Get the first index of metadata objects
      let subjectData = subject[0];

      // Clear out metadata
      d3.select("#sample-metadata").html("");

      // Use Object.entries to dispaly key,value pairs
      Object.entries(subjectData).forEach(([key,value]) => {
          
        console.log(key,value);
        d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
      
      });

};


// -------------------------------------------------
// Function for bar plot
function barPlot(subjectId, data) {

      // Retrieve all sample data
      let samples = data.samples;

      // Filter based on the value of the sample
      let subject = samples.filter(sample => sample.id == subjectId);
      console.log(subject)

      // Get the first index from the array
      let subjectData = subject[0];

      // Get the otu_ids, sample values
      let otu_ids = subjectData.otu_ids;
      let sample_values = subjectData.sample_values;
      let otu_labels = subjectData.otu_labels;

      // Log the data to the console
      console.log(otu_ids, sample_values, otu_labels);

      // Set top ten ITUs already listed in descending order
      let yValues = otu_ids.slice(0,10).map(id => `<b>OTU ${id}  </b>`).reverse();
      let xValues = sample_values.slice(0,10).reverse();
      let labels = otu_labels.slice(0,10).reverse();
            
      // Set up the trace for the bar chart
      let traceBar = [{
          x: xValues,
          y: yValues,
          text: labels,
          type: "bar",
          orientation: "h"
      }];

      // Setup the layout
      let layout = {    
          title: {
            text: "<b>Top 10 OTUs On a Subject</b>",
            font: {color: "black", size: 15}
          },
          xaxis: { 
            gridcolor: 'rgba(0,0,0,0.2)',
          },
          width: 550, 
          
      };

      // Call Plotly to plot the bar chart
      Plotly.newPlot("bar", traceBar, layout)
  
};

// -------------------------------------------------
// Function for bubble plot
function bubblePlot(subjectId, data) {

      // Retrieve all sample data
      let samples = data.samples;

      // Filter based on the value of the sample
      let subject = samples.filter(sample => sample.id == subjectId);
      console.log(subject)

      // Get the first index from the array
      let subjectData = subject[0];

      // Get the otu_ids, sample values
      let otu_ids = subjectData.otu_ids;
      let sample_values = subjectData.sample_values;
      let otu_labels = subjectData.otu_labels;

      // Log the data to the console
      console.log(otu_ids, sample_values, otu_labels);

            
      // Set up the trace for the bar chart
      let traceBubble = [{
          x: otu_ids,
          y: sample_values,
          text: otu_labels,

          mode: "markers",
          marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Accent"  
          }
      }];

      // Layout setup
      let layout = {
        title: {
          text: "<b>All OTUs on a Subject</b>",
          font: {color: "black", size: 15}
        },
        hovermode: "closest",
        xaxis: {
          title: "OTU ID",
          showgrid: true,
          gridcolor: 'rgba(0,0,0,0.1)',
        },
        yaxis: {
          title: "OTU Count",
          showgrid: true,
          gridcolor: 'rgba(0,0,0,0.1)',
        },
        width: 1250, 
        height: 550,
        margin: {t: 50, b:70}

      };

      // Call Plotly to plot the bubble chart
      Plotly.newPlot("bubble", traceBubble, layout)
  
};


// -------------------------------------------------
// Function for Gauge Chart
function gaugeDial(subjectId, data) {

      // Retrieve all metadata
      let metadata = data.metadata;

      // Filter using subject id
      let subject = metadata.filter(mdata => mdata.id == subjectId);

      // Log the array of metadata objects
      console.log(subject)

      // Get the first index of metadata objects
      let subjectData = subject[0];

      // Use Object.entries to get washFrequency key/value pairs
      let wfreq = Object.values(subjectData)[6];
      console.log(wfreq);

      // https://plotly.com/javascript/gauge-charts/
      let traceGauge = [{
        value: wfreq,
        domain: {x: [0,1], y: [0,1]},
        title: {
            text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
            font: {color: "black", size: 15}
        },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: {range: [0,9], tickmode: "linear", tick0: 1, dtick: 1},
            
            bar: {color: "green"},
            steps: [
              {range: [0, 1], color: "rgba(235, 225, 200, 0.5)"},
              {range: [1, 2], color: "rgba(210, 205, 145, 0.5)"},
              {range: [2, 3], color: "rgba(200, 210, 100, 0.5)"},
              {range: [3, 4], color: "rgba(180, 205, 70, 0.5)"},
              {range: [4, 5], color: "rgba(170, 200, 45, 0.5)"},
              {range: [5, 6], color: "rgba(140, 180, 35 , 0.5)"},
              {range: [6, 7], color: "rgba(110, 155, 20, 0.5)"},
              {range: [7, 8], color: "rgba(50, 145, 10, 0.5)"},
              {range: [8, 9], color: "rgba(15, 130, 0, 0.5)"},              
          ],
          
        } 
    }];

    // Set Layout
    let layout = {
        width: 550, 
        height: 550,
        margin: {t: 0, b:0}
    };

    // Call Plotly to plot the gauge chart
    Plotly.newPlot("gauge", traceGauge, layout)

};


// -------------------------------------------------
// Function that updates dashboard when sample is changed
function chooseOption(subjectId) { 

  // Log the new value
  console.log(subjectId); 

  // Call all functions 
  barPlot(subjectId, dataSample);
  bubblePlot(subjectId, dataSample);
  metaData(subjectId, dataSample);
  gaugeDial(subjectId, dataSample);
        
};

// Call the 'initialize' function
init();

