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

        var $signInForm = $('#sign-in-form');
        $signInForm.on('submit', function(){
            var destination = $(this).attr('action');
            $.mobile.navigate(destination);
            return false;
        });

        var $peopleForm = $('#people-form');
        $peopleForm.on('submit', function(){
            var destination = $(this).attr('action');
            $.mobile.navigate(destination);
            return false;
        });
    };

    $(document).ready(function () {
        onboarding.init();
    });

}(jQuery, window));
