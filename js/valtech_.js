// JavaScript Document
(function ($, window) {
    "use strict";

    var onboarding = {};

    onboarding.fun = {
        switchBios: function(){
            var $bio = $('.bio'),
                rdnNumber = Math.floor((Math.random() * $bio.length) + 1);
            $bio.removeClass('remove');
            $bio.not($bio.eq(rdnNumber-1)).addClass('remove');
        }
    };

    onboarding.init = function(){

        var $logoutButtons = $('.logout-button');
        $logoutButtons.on('click', function(evt){
            evt.preventDefault();
            // do some ajax to log user out
            //
            var destination = $(this).attr('href');
            $.mobile.navigate(destination);
        });

        var $signInForm = $('#sign-in-form');
        $signInForm.on('submit', function(){
            // do some ajax to log user in
            //
            var destination = $(this).attr('action');
            $.mobile.navigate(destination);
            return false;
        });

        var $nameLinks = $('#aListOfNames a');
        $nameLinks.on('click', function(evt){

            evt.preventDefault();
            $('.personName').text($(this).text());

            // just some fun
            onboarding.fun.switchBios();

            var destination = $(this).attr('href');
            $.mobile.navigate(destination);
        });

        var $peopleForm = $('#people-form');
        $peopleForm.on('submit', function(){

            var destination = $(this).attr('action'),
            skills = $('#people-capabilities',$(this)).val(),
            client = $('#people-client',$(this)).val(),
            location = $('#people-location',$(this)).val(),
            cop = $('#people-cop',$(this)).val(),
            terms = [],
            termsInWords = '';
            
            if($.trim($('#search').val()).length > 0){
                var term = '<strong>\'' + $.trim($('#search').val()).replace(' ', '&nbsp;') + '\'</strong>';
                terms.push(term);
            }

            if(skills != null){
                skills.forEach(function(skill){
                    var term = '<strong>' + skill.replace(' ', '&nbsp;') + '</strong>';
                    terms.push(term);
                });
            }

            if(client != 'Client account'){
                terms.push('<strong>' + client.replace(' ', '&nbsp;') + '</strong>');
            }

            if(location != 'Location'){
                terms.push('<strong>' + location.replace(' ', '&nbsp;') + '</strong>');
            }

            if(cop != 'Community of Practice'){
                terms.push('<strong>' + cop.replace(' ', '&nbsp;') + '</strong>');
            }

            if(terms.length > 1){
                var lastWord = terms.pop();
                termsInWords = terms.join(', ');
                termsInWords = termsInWords + ' and ' + lastWord;
            } else if(terms.length == 1) {
                termsInWords = terms[0];
            }

            // create list of search strings, to display on next screen
            if(termsInWords != ''){
                $('#resultsFromPeople').empty().append(termsInWords);
                $('#listOfNames').parent().find('a').trigger('click'); // empties the filter
            }

            $.mobile.navigate(destination);
            return false;
        });

        onboarding.fun.switchBios();
    };

    $(document).ready(function () {
        onboarding.init();
    });

}(jQuery, window));
