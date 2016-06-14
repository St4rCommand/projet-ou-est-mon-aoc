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
    this.afficher = false;
    this.indexQuestion = 0;
    this.score = 0;
    this.reponses = [];//reponses;

    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    
    this.nextI = function(){
        if(this.i != 9){
            this.i ++;
            this.afficher = false;
        }
        else{
            this.etat = 2;
            this.submit();
        }
    };

    this.verifReponse = function(reponse){
        if (this.indexQuestion < 10) {
            if(this.questions[this.indexQuestion].seBoit === reponse){
                this.reponses[this.indexQuestion] = "good";
            } else {
                this.reponses[this.indexQuestion] = "false";
            }
            this.indexQuestion ++;
            this.afficher = true;
        }
        else {
            console.log('terminé !');
        }
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
        return this.reponses[indexQuestion-1];
    }
}]);

app.controller('ScoreController', ['$scope', function($scope){
    this.highScores = scores;
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

/*var reponses = [
    "good",
    "false",
    "good",
    "false",
    "good",
    "false",
    "good",
    "false",
    "good",
    "false"
];*/


