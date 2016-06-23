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

    var styles = [
        {
            featureType: "administrative",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        },{
            featureType: "poi",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        },{
            featureType: "water",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        },{
            featureType: "road",
            stylers: [
                { visibility: "off" }
            ]
        }
    ];

    $scope.map.options = {
        scrollwheel: false,
        disableDefaultUI: true,
        disableDoubleClickZoom: true,
        draggable: false,
        styles: styles
    };

    $scope.clickMap = function (latLng, map) {
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

        if (this.indexQuestion < 2) {
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
        this.etat = 2;
        scores.push({name: user.userName, score: this.getScore()});
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
