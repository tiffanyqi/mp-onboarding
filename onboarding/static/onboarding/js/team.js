$(document).ready(function() {
    var firstName = localStorage.getItem('firstName');
    if (firstName) {
        $('#self').append(', ' + firstName);
    }

    var base = textToMapMultiple(readTextFile('/static/onboarding/csv/team.csv'));
    var bLink = 'https://de4351aab041a02c6de0-112976816b322f12075b14a30acd70f9.ssl.cf1.rackcdn.com/photos/';
    // group by team
    var teams = {};
    for (var m in base) {
        var mate = base[m];
        if (!(mate[0] in teams)) {
            teams[mate[0]] = [];
        }
        teams[mate[0]].push([m, mate[1], mate[2]]);
    }

    if (base[firstName]) {
        // your team
        var yourTeam = base[firstName][0];
        localStorage.setItem('team', yourTeam);
        if (teams[yourTeam].length > 1) {
            $('#your-team').append('Your Team: the ' + yourTeam);
            for (var i = 0; i < teams[yourTeam].length; i++) {
                var mate = teams[yourTeam][i];
                var link = bLink + mate[1];
                $('#your-team-pics').append('<div class="pic-wrapper"><img class="team-pic" src=' + link + '><div class="pic-text">' + mate[0] + '<br>' + mate[2] + '</div></div>');
            }
        }
    }

    // everyone else
    for (var m in base) {
        var mate = base[m];
        if (mate[0] != localStorage.getItem('team')) {
            var memlink = bLink + mate[1];
            $('#support-pics').append('<div class="pic-wrapper"><img class="team-pic" src=' + memlink + '><div class="pic-text">' + m + '<br>' + mate[2] + '</div></div>');
        }
    }

});
