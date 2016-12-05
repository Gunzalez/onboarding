// JavaScript Document
(function ($, window) {
    "use strict";

    var onboarding = {};

    onboarding.init = function(){

        var $logoutButtons = $('.logout-button');
        $logoutButtons.on('click', function(evt){
            evt.preventDefault();
            var destination = $(this).attr('href');
            $.mobile.navigate(destination);
        });

        var $nameLinks = $('#aListOfNames a');
        $nameLinks.on('click', function(evt){
            evt.preventDefault();
            $('.personName').text($(this).text());
            var destination = $(this).attr('href');
            $.mobile.navigate(destination);
        });


        var $signInForm = $('#sign-in-form');
        $signInForm.on('submit', function(){
            var destination = $(this).attr('action');
            $.mobile.navigate(destination);
            return false;
        });

        var $peopleForm = $('#people-form');
        $peopleForm.on('submit', function(){
            var destination = $(this).attr('action'),
            skills = $('#people-capabilities',$(this)).val(),
            client = $('#people-client',$(this)).val(),
            location = $('#people-location',$(this)).val(),
            cop = $('#people-cop',$(this)).val(),
            terms = [];

            if(skills != null){
                skills.forEach(function(skill){
                    var term = '<strong>' + skill.replace(' ', '&nbsp;') + '</strong>';
                    terms.push(term);
                })
            }

            if(client != 'Client account'){
                terms.push('<strong>' + client.replace(' ', '&nbsp;') + '</strong>');
            }

            if(location != 'Location'){
                terms.push('<strong>' + location.replace(' ', '&nbsp;') + '</strong>');
            }

            if(cop != 'Community Of Practice'){
                terms.push('<strong>' + cop.replace(' ', '&nbsp;') + '</strong>');
            }

            var termsInWords = '';
            if(terms.length > 1){
                var lastWord = terms.pop();
                termsInWords = terms.join(', ');
                termsInWords = termsInWords + ' and ' + lastWord + '.';
            } else if(terms.length == 1) {
                termsInWords = terms[0] + '.';
            }

            if(termsInWords != ''){
                $('#resultsFromPeople').empty().append(termsInWords);
                $('#listOfNames').parent().find('a').trigger('click'); // empties the filter
            }

            $.mobile.navigate(destination);
            return false;
        });
    };

    $(document).ready(function () {
        onboarding.init();
    });

}(jQuery, window));
