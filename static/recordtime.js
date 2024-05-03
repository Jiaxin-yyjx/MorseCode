$(document).ready(function() {
    var dataContainer = document.getElementById('js-data');
    console.log(dataContainer);

    if (dataContainer) {
        var pageIndex = parseInt(dataContainer.getAttribute('data-index'), 10);
        sessionStorage.setItem('startTime', Date.now());
        console.log(pageIndex);

        $(window).on('beforeunload', function() {
            var startTime = sessionStorage.getItem('startTime');
            console.log(startTime);
            if (startTime) {
                var endTime = Date.now();
                var timeSpent = (endTime - startTime) / 1000;
                console.log('Time spent on page index ' + pageIndex + ': ' + timeSpent + ' seconds');

                $.ajax({
                    url: '/record_time',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({ timeSpent: timeSpent, index: pageIndex }),
                    success: function(response) {
                        console.log('Time recorded successfully');
                    },
                    error: function(xhr, status, error) {
                        console.log('Error recording time: ' + error);
                    }
                });
            }
        });
    } else {
        console.log('Error: js-data element not found on this page');
    }
});
