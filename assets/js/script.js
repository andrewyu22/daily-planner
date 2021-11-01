function updateTimeBlock() {
    // Add class to change block color for Past/Present/Future
    $(".hour").each(function() {
        // get the hours of the HTML (9AM-5PM)
        var hours = moment($(this).text().trim(),'LT');
        // Calculate the difference between hours and the time now and make the value as hours
        var duration = Math.ceil(moment.duration(hours.diff(moment())).asHours());
        // if duration value is negative it means it past
        if(parseInt(duration)< 0) {
            $(this).next().addClass("past");
        }
        // if duration value is 0, it means it is current
        else if(parseInt(duration) === 0)
        {
            $(this).next().addClass("present");
        }
        // else duration value is great than 0 and it is the future
        else {
            $(this).next().addClass("future");
        }
    });
    // Get LocalStorage value
    $(".description").each(function() {
        // Get div timeblock "id"
        var timeId = $(this).parent('.time-block').attr('id');
        // Get value from location storages
        var description = localStorage.getItem(timeId);
        // store it back into the text of HTML of the class .description
        $(this).text(description);
    });
}
// updatePlanner used to save to local storage
function updatePlanner(e) {
    debugger;
    console.time("start");
    // get the value of the class .description
    var description = $(e.target).siblings('.description').val();
    // get the div time-block id
    var timeId = $(e.target).parent('.time-block').attr('id');
    console.log(timeId, " ", description);
    // store it into the local storage as key-value pair
    localStorage.setItem(timeId, description);
}

function main() {
    // Listen for save click button and call on updatePlanner
    $('.saveBtn').on('click', updatePlanner);
    // update current date at the top
    $("#currentDay").text(moment().format('dddd, LL'));
    // call the updateTimeBlock function
    updateTimeBlock();
};

$(document).ready(main);