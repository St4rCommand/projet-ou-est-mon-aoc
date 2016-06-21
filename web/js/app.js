/**
 * Created by Morgane on 24/04/2016.
 */

var app = angular.module('appli', ['uiGmapgoogle-maps']);

app.controller('MenuController', ['$scope', function($scope){
    this.tab = 1;

    this.selectTab = function (setTab) {
        this.tab = setTab;
    };

    this.isSelected = function(checkTab){
        return this.tab === checkTab;
    };
}]);

app.controller('JeuController', ['$scope', 'UserService', function($scope, user){
    this.questions = questions;
    this.indexQuestion = 0;
    this.scorePartie = 0;
    this.reponses = [];
    this.reponse = {};

    $scope.map = {
        center: { latitude: 45, longitude: -73 },
        zoom: 8,
        events: {
            click: function(map, e, args) {
                placeMarkerAndPanTo(args.latLng, map);
            }
        }
    };

    function placeMarkerAndPanTo(latLng, map) {
        var marker = new google.maps.Marker({
            position: latLng,
            map: map
        });
        map.panTo(latLng);
    }


    this.newGame = function() {
        this.questions = questions;
        this.indexQuestion = 0;
        this.scorePartie = 0;
        this.reponses = [];
        this.reponse = {};
        $('#question-type').show();
        $('#question-position').hide();
        $('#fin-partie').hide();
    };
    
    this.displayMap = function() {
        $('#question-type').hide();
        $('#question-position').show();
    };

    this.score = function() {
        return this.indexQuestion+1;
    };

    this.verifResponse = function(){

        if(this.questions[this.indexQuestion].seBoit === parseInt(this.reponse.seBoit)){
            this.reponses[this.indexQuestion] = 3;
        } else {
            this.reponses[this.indexQuestion] = 0;
        }

        if (this.indexQuestion < 9) {
            this.nextQuestion();
        } else {
            this.endGame();
        }
    };

    this.nextQuestion = function() {
        $('#question-position').hide();
        $('#question-type').show();
        this.indexQuestion ++;
        this.reponse = {};
    };

    this.endGame = function() {
        scores.push({name: user.userName, score: this.getScore()});
        $('#question-position').hide();
        $('#fin-partie').show();
    };

    this.getScore = function() {
        var totalScore = 0;
        this.reponses.forEach(function(reponse) {
            totalScore += reponse;
        });
        return totalScore;
    };

    this.range = function(min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };

    this.afficherReponse = function (indexQuestion) {

        if (this.reponses[indexQuestion-1] === 3)
            return "good";
        else if (this.reponses[indexQuestion-1] === 1)
            return "medium";
        else if (this.reponses[indexQuestion-1] === 0)
            return "false";
        else
            return "";
    }
}]);

app.controller('ScoreController', ['$scope', function($scope){
    this.highScores = scores;

    this.getHighScores = function(){
        var rootApi = 'https://1-dot-ou-est-mon-aoc.appspot.com/_ah/api/';
        gapi.client.load('scoreentityendpoint', 'v1', function() {
            gapi.client.scoreentityendpoint.listScoreEntity("", 10).execute(
                function(resp) {
                    this.highScores=resp.items;
                    $scope.$apply();
                });
        }, rootApi);
    };
    this.getHighScores();


}]);

app.controller('UserController', ['$scope', 'UserService', function($scope, user){
    this.isLogged = false;

    this.signOut = function () {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut();
        user.initUser();
        this.isLogged = false;
    };

    this.signIn = function() {
        var auth2 = gapi.auth2.getAuthInstance();
        user.setUser(auth2.currentUser.get().getBasicProfile());
        this.isLogged = true;
    };

    this.getUser = function () {
        return user;
    }
}]);

app.service('UserService', function() {
    this.user = {};
    this.userName = "Anonyme";
    this.userImg = "";

    this.setUser = function (user) {
        this.userName = user.getGivenName();
        if(this.userName == null){
            this.userName = user.getEmail();
        }
        this.userImg = user.getImageUrl();
        if(this.userImg == null){
            this.userImg = '/images/avatar.png';
        }
    };

    this.initUser = function() {
        this.user = {};
        this.userName = "Anonyme";
        this.userImg = "";
    }
})

var questions = [
    { name: "Le Camembert", seBoit: 0,  geo: "42.5,27.2" },
    { name: "Le Compté", seBoit: 0,  geo: "42.5,27.2" },
    { name: "Le Beaujolais", seBoit: 1,  geo: "42.5,27.2" },
    { name: "Le Champagne", seBoit: 1,  geo: "42.5,27.2" },
    { name: "L'Agneaux", seBoit: 0,  geo: "42.5,27.2" },
    { name: "Le Saint Nectaire", seBoit: 0,  geo: "42.5,27.2" },
    { name: "Le Chèvre", seBoit: 0,  geo: "42.5,27.2" },
    { name: "Le Bordeaux", seBoit: 1,  geo: "42.5,27.2" },
    { name: "Le Chateau la tour", seBoit: 1,  geo: "42.5,27.2" },
    { name: "Le Coulaines", seBoit: 1,  geo: "42.5,27.2" },
];

var scores = [
    { name: 'Tagada', score : '8'},
    { name: 'Dragibus', score : '10'},
    { name: 'Schtroumpf', score : '5'},
];


