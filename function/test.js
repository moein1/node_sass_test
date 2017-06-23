const jsonData = require('../input/request.json');
const fs = require('fs');

function search(input, search) {
    var what_start = input.indexOf(search);
    if (what_start > 0) {
        var rest_string = input.substring(what_start);
        var result_what_end = rest_string.indexOf('&');
        var what_result = input.substring(what_start + search.length, what_start + result_what_end);
        return unescape(what_result).replace(/\+/g, '-').replace(/\-&-/g, '&').toLowerCase();
    } else
        return null;
}

function test() {
    var result = {};
    for (var i = 0; i < jsonData.length; i++) {
        result_what = null;
        result_where = null;
        if (jsonData[i].request.indexOf('api') > -1) {
            var result_what = search(jsonData[i].request, 'filter%5Bwhat%5D=');
            var result_where = search(jsonData[i].request, 'filter%5Bwhere%5D=');
        }  
      else if (jsonData[i].request.indexOf('find') > -1) {
            var array = jsonData[i].request.split('/');
            if (array.length == 6) {
                result_what = array[2];
                result_where = array[4] + ',' + array[3];
            }           
        }

        if (result_what && result_where) {
            if (!result[result_where]) {
                result[result_where] = {};
                result[result_where][result_what] = 1;
            } else {
                if (!result[result_where][result_what]) {
                    result[result_where][result_what] = 1;
                } else {
                    result[result_where][result_what]++;
                }
            }
        }
    }  
    fs.writeFileSync('output/result.json',JSON.stringify(result));
}

module.exports = test;