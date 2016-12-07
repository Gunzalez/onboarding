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

        var $nameLinks = $('#aListOfNames').find('a');
        $nameLinks.on('click', function(evt){

            evt.preventDefault();
            $('.personName').text($(this).text());

            // just some fun
            onboarding.fun.switchBios();

            var destination = $(this).attr('href');
            $.mobile.navigate(destination);
        });

        var $closePanelButtons = $('.close-panel');
        $closePanelButtons.on('click', function(evt){
            evt.preventDefault();
            var panelID = '#' + $(this).parents('.panel').attr('id');
            $(panelID).panel("close");
        });

        var $peopleForm = $('#people-form');
        $peopleForm.on('submit', function(){

            var destination = $(this).attr('action'),
                searchFieldValue = $.trim($('#search', $(this)).val()),
                skills = $('#people-capabilities',$(this)).val(),
                client = $('#people-client',$(this)).val(),
                location = $('#people-location',$(this)).val(),
                cop = $('#people-cop',$(this)).val(),
                terms = {},
                searchTermStrings = '';

            if(searchFieldValue.length > 0){
                terms.field = searchFieldValue;
            }

            if(skills != null){
                terms.skills = skills;
            }

            if(client != 'Client account'){
                terms.client = client;
            }

            if(location != 'Location'){
                terms.location = location;
            }

            if(cop != 'Community of Practice'){
                terms.cop = cop;
            }

            if(!$.isEmptyObject(terms)){
                searchTermStrings = JSON.stringify(terms);
                if (typeof(Storage) !== "undefined") {
                    localStorage.setItem("searchTerms", searchTermStrings);
                }
            }

            $.mobile.navigate(destination);
            return false;
        });

        onboarding.fun.switchBios();
    };

    $(document).ready(function () {
        onboarding.init();
    });

    $(document).on("pagebeforecreate", "#people", function(){
        if (typeof(Storage) !== "undefined") {
            var searchTermStrings = localStorage.getItem("searchTerms");
            if(searchTermStrings !== undefined){
                var termsObj = JSON.parse(searchTermStrings),
                    $peopleForm = $('#people-form');

                if(termsObj.hasOwnProperty('field')){
                    $('#search', $peopleForm).val(termsObj.field);
                }

                if(termsObj.hasOwnProperty('client')){
                    $('#people-capabilities', $peopleForm).val(termsObj.skills);
                }

                if(termsObj.hasOwnProperty('client')){
                    $('#people-client', $peopleForm).val(termsObj.client);
                }

                if(termsObj.hasOwnProperty('location')){
                    $('#people-location', $peopleForm).val(termsObj.location);
                }

                if(termsObj.hasOwnProperty('cop')){
                    $('#people-cop', $peopleForm).val(termsObj.cop);
                }

            }
        }
    });

    $(document).on("pagebeforeshow", "#results", function(){

        if (typeof(Storage) !== "undefined") {
            var searchTermStrings = localStorage.getItem("searchTerms");
            if(searchTermStrings !== undefined){
                var termsObj = JSON.parse(searchTermStrings),
                    termsArray = [],
                    termsInWords = '';

                if(termsObj.hasOwnProperty('field')){
                    termsArray.push('\''+termsObj.field+'\'');
                }

                if(termsObj.hasOwnProperty('skills')){
                    for(var x=0; x < termsObj.skills.length; x++){
                        termsArray.push(termsObj.skills[x]);
                    }
                }

                if(termsObj.hasOwnProperty('client')){
                    termsArray.push(termsObj.client);
                }

                if(termsObj.hasOwnProperty('location')){
                    termsArray.push(termsObj.location);
                }

                if(termsObj.hasOwnProperty('cop')){
                    termsArray.push(termsObj.cop);
                }

                if(termsArray.length > 1){
                    var lastWord = termsArray.pop();
                    termsInWords = termsArray.join(', ');
                    termsInWords = termsInWords + ' <span>and</span> ' + lastWord;
                } else if(terms.length == 1) {
                    termsInWords = terms[0];
                }

                termsInWords = '<strong>' + termsInWords + '</strong>';
                $('#search-terms').empty().append(termsInWords);

            }
        }

        $('#listOfNames').parent().find('a').trigger('click'); // causing filter field to empty out
    });

}(jQuery, window));
