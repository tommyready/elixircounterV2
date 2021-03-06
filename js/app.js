$(function() {

    var defaultTimeOut = 2800;  // Milliseconds (2800 = 2.8 seconds)
    var timeOut = defaultTimeOut;
    var event; // Timed Event Holder
    var defaultElixir = 4; // Ghetto amount

    $('a.start').on('click', function(e){
        e.preventDefault();
        resetProgress(defaultTimeOut,defaultElixir); // Reset Progress
        $('span#timer').show();
        event = window.setInterval(function() {
            timedEvent()
        }, timeOut);        
    });
    $('a.stop').on('click', function(e){
        e.preventDefault();
        $('span#timer').hide();
        clearInterval(event); // Stops current timed Event
        resetProgress(defaultTimeOut,defaultElixir); // Reset Progress
    });
    $('a.neg').on('click', function(e){
        e.preventDefault();
        var step = $(this).data('step');
        stepBackProgressSection(step);
    });
    $('a.plus1').on('click', function(e){
        e.preventDefault();
        stepForwardProgressSection(1);
    });
    $('a.speed2800').on('click', function(e) { // Normal Speed Rate // DEFAULT
        e.preventDefault();
        clearInterval(event); // Stops current timed Event
        restTimeout(defaultTimeOut);
        event = window.setInterval(function() {
            timedEvent()
        }, defaultTimeOut); 
        $('.rate').html(defaultTimeOut);       
    });
    $('a.speed1400').on('click', function(e) {
        e.preventDefault();
        var timeRate = 1400
        clearInterval(event); // Stops current timed Event
        restTimeout(timeRate);
        event = window.setInterval(function() {
            timedEvent()
        }, timeRate);
        $('.rate').html(timeRate);        
    });     
});

// Functions
resetProgress = function(intRate,intElixir) {
    var currentActiveCount = $('a.active').length;
    restTimeout(intRate);
    stepBackProgressSection(currentActiveCount);
    stepForwardProgressSection(intElixir); // Always Start with 6 Progress
}
stepBackProgressSection = function(n) {
    if( $('a.active').length < n) return;

    var currentProgressElement = $('div.breadcrumb a.active').last(); // Get Last Active Node
    currentProgressElement.removeClass('active');
    if(n == 1) return;
    n = n - 1; // Ghetto Fix
    var prevProgressElements = currentProgressElement.prevAll();

    prevProgressElements.each( function(index) {
        var pIndex = index + 1;
        $(this).removeClass('active');
        if(pIndex == n) return false;
    });
    return;
}
stepForwardProgressSection = function(n) { // n equals the number of steps to move forward
    if( $('a.active').length == 10) return;
    if( $('a.active').length == 0 && n >= 1) {
        $('div.breadcrumb').find('a').first().addClass('active');
        if(n == 1) return;
    }

    if(n > 10) n = 10; // 10 is Max steps

    var currentProgressElement = $('div.breadcrumb a.active').last(); // Get Last Active Node
    var nextProgressElements = currentProgressElement.nextAll(); // Get All Unactive Nodes

    // Loop Through n number of nodes
    nextProgressElements.each( function(index) {
        var nIndex = index + 1; // make sure the index isnt zero
        $(this).addClass('active'); 
        if(nIndex == n) return false;       
    });
    return;
}
timedEvent = function() {
    stepForwardProgressSection(1);
}
restTimeout = function(speed) {
    timeOut = speed;
    $('img#rate-img').attr('src','../assets/speed'+speed+'.png');
    return;
}