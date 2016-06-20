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

    //initMap();
    $scope.map = {
        center: {latitude: 46.989984, longitude: 3.155308},
        zoom: 6,
        events: {
            click: function (map, eventName, originalEventArgs) {
                var eventName = originalEventArgs[0];
                var lat = eventName.latLng.lat();
                var lng = eventName.latLng.lng();
                var marker = {
                    id: Date.now(),
                    coords: {latitude: lat, longitude: lng}
                };

                $scope.locationAnswer = {lat: lat, lng: lng};
                //$scope.map.markers.pop();
                //$scope.map.markers.push(marker);
                $scope.$apply();
            }
        }
    };

     // Cache l'ensemble des labels inutiles
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

     // Bloque la map
     $scope.map.options = {
        scrollwheel: false,
        disableDefaultUI: true,
        disableDoubleClickZoom: true,
        draggable: false,
        styles: styles
    };

    function placeMarkerAndPanTo(latLng, map) {
        var marker = new google.maps.Marker({
            position: latLng,
            map: map
        });
        map.panTo(latLng);
    }

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


