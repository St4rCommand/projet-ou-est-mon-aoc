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
    this.i = 0;
    this.score = 0;

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
        if(this.questions[this.i].reponse == reponse){
            this.score ++;
        }
        this.afficher = true;
    };
}]);

app.controller('ScoreController', ['$scope', function($scope){
    this.highScores = scores;
}]);

var questions = [
    { name: "Camenbert", reponse: 0,  geo: "42.5,27.2" },
    { name: "Compté", reponse: 0,  geo: "42.5,27.2" },
    { name: "Beaujolais", reponse: 1,  geo: "42.5,27.2" },
    { name: "Champagne", reponse: 1,  geo: "42.5,27.2" },
    { name: "Agneaux", reponse: 0,  geo: "42.5,27.2" },
    { name: "Saint Nectaire", reponse: 0,  geo: "42.5,27.2" },
    { name: "Chèvre", reponse: 0,  geo: "42.5,27.2" },
    { name: "Bordeaux", reponse: 1,  geo: "42.5,27.2" },
    { name: "Chateau la tour", reponse: 1,  geo: "42.5,27.2" },
    { name: "Coulaines", reponse: 1,  geo: "42.5,27.2" },
]

var scores = [
    { name: 'Tagada', score : '8'},
    { name: 'Dragibus', score : '10'},
    { name: 'Schtroumpf', score : '5'},
]


