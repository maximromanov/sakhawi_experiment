d3.tsv("data/prosopData.tsv").then(function(data_csv) {
    var search = d3.select("#search_btn")
    var checker = (arr, target) => target.every(v => arr.includes(v));

    search
        .on("click", function (d) {
            let search_term = d3.select("#search_input").property("value");
            if (search_term !== "") {
                var filtered_data = filter_data(search_term);
                var res_container = d3.select("#search_results_div");
                res_container.selectAll("*").remove();
                var new_ul = res_container
                    .append('ul')
                    .selectAll("li")
                    .data(filtered_data)
                    .enter()
                    .append("li")
                    .text(function (d) {
                        return d.ID + " - " + d.NAME;
                    })
                    .append("a")
                    .attr('href',function (d) {
                        return "data/0902Sakhawi.DawLamic/" + d.ID + ".html";
                    })
                    .attr("target","_blank")
                    .text( function() {
                        return "open";
                    });
                    alert(getDate())
            }

        });

    function filter_data(term) {
        let term_toks = term.split(" ");
        return data_csv.filter(
            function(row) {
                return checker(row['NAME'], term_toks);
            });
    }
});