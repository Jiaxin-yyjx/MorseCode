$(document).ready(function() {
    let $table = $('<table/>').addClass('table table-striped');
    let $thead = $('<thead/>');
    let $tbody = $('<tbody/>');

    $thead.append('<tr><th>Word</th><th>Time Spent (seconds)</th></tr>');
    $table.append($thead);

    $.each(recordTime, function(index, time) {
        let word = learningWords[index];
        let $row = $('<tr/>');
        $row.append($('<td/>').text(word));
        $row.append($('<td/>').text(time));
        $tbody.append($row);
    });

    let $totalRow = $('<tr/>').addClass('table-primary');
    $totalRow.append($('<td/>').text('Total Time'));
    $totalRow.append($('<td/>').text(totalTime));
    $tbody.append($totalRow);
    $table.append($tbody);
    $('#timespend').append($table);
});
