d3.tsv("data/prosopData.tsv").then(function(data_csv) {
    var search = d3.select("#search_btn")
    var checker = (arr, target) => target.every(v => arr.includes(v));

    search
        .on("click", function (d) {
            let search_term = d3.select("#search_input").property("value");
            var filtered_data = filter_data(search_term);
            var new_ul = d3.select("#search_results_div")
                .append('ul')
                .selectAll("li")
                .data(filtered_data)
                .enter()
                .append("li")
                .append("a")
                .attr('href',function (d) {
                    return "data/0902Sakhawi.DawLamic/"+d.ID+".html";
                })
                .attr("target","_blank")
                .text(function (d) {
                    return d.NAME;
                });

            // filtered_data.forEach(function (f_d) {
            //     console.log(f_d)
            //     console.log(new_ul.__data__)
            //     new_ul.append("li");
            // })
        });

    function filter_data(term) {
        let term_toks = term.split(" ");
        return data_csv.filter(
            function(row) {
                return checker(row['NAME'], term_toks);
            });

    }
});