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

app.controller('JeuController', ['$scope', function($scope){
    this.questions = questions;
    this.indexQuestion = 0;
    this.scorePartie = 0;
    this.reponses = [];
    this.reponse = {};

    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    
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
        scores.push({name: "nouveau joueur", score: this.getScore()});
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
}]);

app.controller('UserController', ['$scope', function($scope){
    this.isLogged = false;
    this.userName = "";
    this.userImg = "";

    this.signOut = function () {
        this.isLogged = false;
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut();
    };

    this.signIn = function() {
        this.isLogged = true;
        var auth2 = gapi.auth2.getAuthInstance();
        var profile = auth2.currentUser.get().getBasicProfile();
        this.userName = profile.getGivenName();
        this.userImg = profile.getImageUrl();
        if(this.userImg == null){
            this.userImg = '/images/avatar.png';
        }
    };
}]);

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


