$(document).ready(function() {
var values = [5, 4, 5, -2, 0, 3];
// Draw a sparkline for the #sparkline element
 $('#sparkline').sparkline(values, {
     type: "bar",
         tooltipSuffix: " widgets"
         });
});

