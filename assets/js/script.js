function updateTimeBlock() {
    // Add class to change block color for Past/Present/Future
    $(".hour").each(function() {
        var hours = moment($(this).text().trim(),'LT');
        var duration = Math.ceil(moment.duration(hours.diff(moment())).asHours());
        if(parseInt(duration)< 0) {
            $(this).next().addClass("past");
        }
        else if(parseInt(duration) === 0)
        {
            $(this).next().addClass("present");
        }
        else {
            $(this).next().addClass("future");
        }
    })
}

function updatePlanner(e) {
    var description = $(e.target).siblings('.description').val();
    var timeId = $(e.target).parent('.time-block').attr('id');
    console.log(timeId, " ", description);
    localStorage.setItem(timeId, description);
}

function main() {
    $("#currentDay").text(moment().format('dddd, LL'));
    updateTimeBlock();
    $('.saveBtn').on('click', updatePlanner);
};

main();