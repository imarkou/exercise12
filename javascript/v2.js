"use strict";

d3.text("Data/v2/wordcloud_cuisines", function (text) {
    drawWordCloud(text);

    function drawWordCloud(text_string) {
        var common = "poop,i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,it,its,itself,they,them,their,theirs,themselves,what,which,who,whom,whose,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,will,would,should,can,could,ought,i'm,you're,he's,she's,it's,we're,they're,i've,you've,we've,they've,i'd,you'd,he'd,she'd,we'd,they'd,i'll,you'll,he'll,she'll,we'll,they'll,isn't,aren't,wasn't,weren't,hasn't,haven't,hadn't,doesn't,don't,didn't,won't,wouldn't,shan't,shouldn't,can't,cannot,couldn't,mustn't,let's,that's,who's,what's,here's,there's,when's,where's,why's,how's,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,upon,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,say,says,said,shall";
        var word_count = {};
        var words = text_string.split(/[ '\-\(\)\*":;\[\]|{},.!?]+/);
        if (words.length == 1) {
            word_count[words[0]] = 1;
        } else {
            words.forEach(function (word) {
                word = word.toLowerCase();
                if (word != "" && common.indexOf(word) == -1 && word.length > 1) {
                    if (word_count[word]) {
                        word_count[word]++;
                    } else {
                        word_count[word] = 1;
                    }
                }
            })
        }
        var svg_location = "div#vis2";
        var width = 860;
        var height = 600;
        var fill = d3.scale.category20();
        var word_entries = d3.entries(word_count);
        var xScale = d3.scale.linear()
            .domain([0, d3.max(word_entries, function (d) {
                return d.value;
            })])
            .range([10, 100]);
        d3.layout.cloud().size([width, height])
            .timeInterval(20)
            .words(word_entries)
            .fontSize(function (d) {
                return xScale(+d.value);
            })
            .text(function (d) {
                return d.key;
            })
            .rotate(function () {
                return ~~(Math.random() * 2) * 90;
            })
            .font("Impact")
            .on("end", draw)
            .start();

        function draw(words) {
            d3.select(svg_location).append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + [width >> 1, height >> 1] + ")")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function (d) {
                    return xScale(d.value) + "px";
                })
                .style("font-family", "Impact")
                .style("fill", function (d, i) {
                    return fill(i);
                })
                .attr("text-anchor", "middle")
                .attr("transform", function (d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function (d) {
                    return d.key;
                });
            // $(svg_location + ' svg g text').tipsy({
            //     gravity: 'w',
            //     html: true,
            //     title: function () {
            //         var d = this.__data__;
            //         return d.key;
            //     }
            // });
        }

        d3.layout.cloud().stop();
    }

    d3.selectAll("#opts_v2")
        .on('change', function () {
            var ID = d3.select(this).property('value');
            if (ID == "wordcloudCuisines") {
                update_wordcloud("Data/v2/wordcloud_cuisines");
            } else if (ID == "wordcloudViolations") {
                update_wordcloud("Data/v2/wordcloud_violations")
            }
        });

    function update_wordcloud(filename) {
        d3.text(filename, function (text) {
            drawWordCloud2(text);


            function drawWordCloud2(text_string) {
                var common = "and/or,food,properly,improperly,poop,i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,it,its,itself,they,them,their,theirs,themselves,what,which,who,whom,whose,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,will,would,should,can,could,ought,i'm,you're,he's,she's,it's,we're,they're,i've,you've,we've,they've,i'd,you'd,he'd,she'd,we'd,they'd,i'll,you'll,he'll,she'll,we'll,they'll,isn't,aren't,wasn't,weren't,hasn't,haven't,hadn't,doesn't,don't,didn't,won't,wouldn't,shan't,shouldn't,can't,cannot,couldn't,mustn't,let's,that's,who's,what's,here's,there's,when's,where's,why's,how's,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,upon,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,say,says,said,shall";
                var updatedWordCount = {};
                var updatedWords = text_string.split(/[ '\-\(\)\*":;\[\]|{},.!?]+/);

                if (updatedWords.length == 1) {
                    updatedWordCount[words[0]] = 1;
                } else {
                    updatedWords.forEach(function (word) {
                        word = word.toLowerCase();
                        if (word != "" && common.indexOf(word) == -1 && word.length > 1) {
                            if (updatedWordCount[word]) {
                                updatedWordCount[word]++;
                            } else {
                                updatedWordCount[word] = 1;
                            }
                        }
                    })
                }

                var svg_location = "div#vis2";
                var width = 860;
                var height = 600;

                var fill = d3.scale.category20();

                var updatedEntries = d3.entries(updatedWordCount);

                var xScale = d3.scale.linear()
                    .domain([0, d3.max(updatedEntries, function (d) {
                        return d.value;
                    })])
                    .range([10, 100]);

                d3.layout.cloud().size([width, height])
                    .timeInterval(20)
                    .words(updatedEntries)
                    .fontSize(function (d) {
                        return xScale(+d.value);
                    })
                    .text(function (d) {
                        return d.key;
                    })
                    .rotate(function () {
                        return ~~(Math.random() * 2) * 90;
                    })
                    .font("Impact")
                    .on("end", draw)
                    .start();

                function draw(words) {
                    d3.select(svg_location)
                        .attr("width", width)
                        .attr("height", height)
                        .attr("transform", "translate(" + [width >> 1, height >> 1] + ")")
                        .selectAll("text")
                        .data(words)
                        .transition().duration(500).ease("elastic")
                        .style("font-size", function (d) {
                            return xScale(d.value) + "px";
                        })
                        .style("font-family", "Impact")
                        .style("fill", function (d, i) {
                            return fill(i);
                        })
                        .attr("text-anchor", "middle")
                        .attr("transform", function (d) {
                            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                        })
                        .text(function (d) {
                            return d.key;
                        });
                    // $(svg_location + ' svg g text').tipsy({
                    //     gravity: 'w',
                    //     html: true,
                    //     title: function () {
                    //         var d = this.__data__;
                    //         return d.key;
                    //     }
                    // });
                }

                d3.layout.cloud().stop();
            }
        });
    }
});
