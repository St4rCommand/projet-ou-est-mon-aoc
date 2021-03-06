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

app.controller('JeuController', ['$scope', 'UserService', function($scope, user, uiGmapGoogleMapApi){
    this.questions = questions;
    this.indexQuestion = 0;
    this.scorePartie = 0;
    this.reponses = [];
    this.reponse = {};
    this.etat = 0;
    this.long = 0;
    this.lati = 0;

    $scope.map = {
        center: { latitude: 46.5, longitude: 2.646806 },
        zoom: 6,
        events: {
            click: function(map, e, args) {
                placeMarkerAndPanTo(args[0].latLng, map);
            }
        }
    };

    function placeMarkerAndPanTo(latLng, map) {
        var marker = new google.maps.Marker({
            position: latLng,
            map: map
        });
        $scope.long = latLng.lng();
        $scope.lat = latLng.lat();
        map.panTo(latLng);
    }

    this.newGame = function() {
        this.questions = questions;
        this.indexQuestion = 0;
        this.scorePartie = 0;
        this.reponses = [];
        this.reponse = {};
        this.etat = 0;
    };

    this.displayMap = function() {
        this.etat = 1;
    };

    this.score = function() {
        return this.indexQuestion+1;
    };

    this.verifResponse = function(){
        var boitMange = false;
        var carte = false;

        if(this.questions[this.indexQuestion].seBoit === parseInt(this.reponse.seBoit)){
            boitMange = true;
        }

        var geo = this.questions[this.indexQuestion].geo.split(",");
        if(((geo[0]-0.1) < $scope.lat && $scope.lat < (geo[0]+0.1)) && ((geo[1]-0.1) < $scope.long && $scope.long < (geo[1]+0.1))){
            carte = true;
        }

        if(boitMange == true && carte == true){
            this.reponses[this.indexQuestion] = 3;
        }else{
            if((boitMange == false && carte == true) || (boitMange == true && carte == false)){
                this.reponses[this.indexQuestion] = 1;
            }else{
                this.reponses[this.indexQuestion] = 0;
            }
        }

        if (this.indexQuestion < 9) {
            this.nextQuestion();
        } else {
            this.endGame();
        }
    };

    this.nextQuestion = function() {
        this.etat = 0;
        this.indexQuestion ++;
        this.reponse = {};
    };

    this.endGame = function() {
        scores.push({name: user.userName, email:user.userMail, score: this.getScore()});
        /*var rootApi = 'https://ou-est-mon-aoc.appspot.com/_ah/api';
        gapi.client.load('scoreentityendpoint', 'v1', function() {
            gapi.client.scoreentityendpoint.insertScoreEntity({"name": user.userName, "email": user.userMail, "score" : getScore()}).execute(
                function(resp) {
                    $scope.highScores=resp.items;
                    $scope.$apply();
                    console.log(resp.items);
                });
        }, rootApi);*/

        this.etat = 2;
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

app.controller('ScoreController', ['$scope', '$window', function($scope, $window){

    /*this.getHighScores = function(){
        var rootApi = 'http://localhost:8080/_ah/api/explorer/';
        gapi.client.load('scoreentityendpoint', 'v1', function() {
            gapi.client.scoreentityendpoint.listScoreEntity("", 10).execute(
                function(resp) {
                    $scope.highScores=resp.items;
                    $scope.$apply();
                });
        }, rootApi);
    };

    $window.init = this.getHighScores();*/
    this.highScores = scores;
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
    this.userMail = "";

    this.setUser = function (user) {
        this.userName = user.getGivenName();
        this.userMail = user.getEmail();
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
        this.userMail = "";
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
    { name: 'François', email: 'françois@gmail.com', score : '5'},
    { name: 'Romain', email: 'romain@gmail.com', score : '10'},
    { name: 'Quentin', email: 'quentin@gmail.com', score : '20'},
    { name: 'Morgane', email: 'morgane@gmail.com', score : '15'},
];
