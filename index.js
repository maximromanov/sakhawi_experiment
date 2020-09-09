d3.tsv("data/prosopData.tsv").then(function(data_csv) {
    var search = d3.select("#search_btn")
    var checker = (arr, target) => target.every(v => arr.includes(v));
    function zFill(num, size) {
        var s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
    }
    search
        .on("click", function (d) {
            let search_term = d3.select("#search_input").property("value");
            var new_id_label = d3.select("#new_id");
            new_id_label.text("");
            var current_date = new Date();
            let new_id = current_date.getFullYear().toString().substr(-2) +
                zFill(current_date.getMonth(), 2) +
                zFill(current_date.getDate(),2) +
                zFill(current_date.getHours(), 2) +
                zFill(current_date.getMinutes(), 2) +
                zFill(current_date.getSeconds(), 2)

            new_id_label.
            text(function() {
                return "new ID: " + new_id;
            })
            if (search_term !== "") {
                var filtered_data = filter_data(search_term);
                var res_container = d3.select("#search_results_div");
                res_container.selectAll("*").remove();
                var new_ul = res_container
                    .append('ul')
                    .selectAll("li")
                    .data(filtered_data)
                    .enter()
                var new_li = new_ul.append("li")
                    .append("p")
                new_li.append("p")
                    .text(function (d) {
                        return d.ID;
                    })
                    .attr("class", "ID")
                new_li.append("p")
                    .text(function (d) {
                        return " - " + d.NAME;
                    })
                    .style("display", "inline")
                    .append("a")
                    .attr('href',function (d) {
                        return "data/0902Sakhawi.DawLamic/" + d.ID + ".html";
                    })
                    .attr("target","_blank")
                    .text( function() {
                        return " —> اعرض المزيد";
                    });
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