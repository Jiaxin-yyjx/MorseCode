$(document).ready(function() {
    let $table = $('<table/>').addClass('table table-striped centered');
    let $thead = $('<thead/>');
    let $tbody = $('<tbody/>');

    $thead.append('<tr><th>Word</th><th>Time Spent (seconds)</th></tr>');
    $table.append($thead);

    $.each(recordTime, function(index, time) {
        let word = learningWords[index];
        let roundedTime = Math.round(time);
        let $row = $('<tr/>');
        $row.append($('<td/>').text(word));
        $row.append($('<td/>').text(roundedTime));
        $tbody.append($row);
    });

    let $totalRow = $('<tr/>').addClass('addtablecolor');
    $totalRow.append($('<td/>').text('Total Time'));
    $totalRow.append($('<td/>').text(Math.round(totalTime)));
    $tbody.append($totalRow);
    $table.append($tbody);
    $('#timespend').append($table);
});
