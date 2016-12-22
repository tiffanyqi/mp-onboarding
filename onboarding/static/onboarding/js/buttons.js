$('#previous-week').click(function(e) {
    weekToggle(0, -1, -7);
    trackButton(e, currentDay);
});
$('#next-week').click(function(e) {
    weekToggle(weekLimit/7, 1, 7);
    trackButton(e, currentDay);
});
$('#previous-day').click(function(e) {
    dayToggle(0, -1);
    trackButton(e, currentDay);
});
$('#next-day').click(function(e) {
    dayToggle(weekLimit, 1);
    trackButton(e, currentDay);
});
$('#start-day').click(function(e) {
    determineDay(0);
    trackButton(e, currentDay);
});
$('#today').click(function(e) {
    determineDay(today);
    trackButton(e, currentDay);
});
$('.mstone-checkbox').change(function(e) {
    var id = e.currentTarget.id;
    if (localStorage.getItem(id) && !this.checked) {
        localStorage.removeItem(id);
        $('#' + id).removeClass('strikethrough');
    } else {
        localStorage.setItem(id, 'true');
        $('#' + id).addClass('strikethrough');
        trackMilestone(e, id);
    }
});
$('.training-link').click(function(e) {
    $('.popup').addClass('visible');
    $('#training-content').load(e.target.id);
    trackTraining('Trainings', e);
});
$('#schedule').click(function(e) {
    if (e.target.id) {
        $('.popup').addClass('visible');
        $('#training-content').load(e.target.id);
        trackTraining('Index', e);
    }
});
$('.close').click(function(e) {
    $('.popup').removeClass('visible');
});
$('.popup').click(function(e) {
    $('.popup').removeClass('visible');
});
$(".started-nav").click(function() {
    var topHeight = $(".nav").height();
    $("html, body").animate({
        scrollTop: $(this.hash).offset().top - topHeight
    });
});
