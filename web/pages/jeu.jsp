<%--
  Created by IntelliJ IDEA.
  User: Morgane
  Date: 29/04/2016
  Time: 08:47
  To change this template use File | Settings | File Templates.
--%>

<div id="question-type" class="box full-box">
    <h2 class="produit">{{jeuCtrl.questions[jeuCtrl.indexQuestion].name}}</h2>
    <h3>ça se boit ou ça se mange ?</h3>

    <section class="section-question">
        <div><input id="question-type-liquide" class="type" ng-model="jeuCtrl.reponse.seBoit" ng-click="jeuCtrl.displayMap()" type="radio" name="question-type" value="1"><label for="question-type-liquide">Se boit</label></div>
        <div><input id="question-type-solide" class="type" ng-model="jeuCtrl.reponse.seBoit" ng-click="jeuCtrl.displayMap()" type="radio" name="question-type" value="0"><label for="question-type-solide">Se mange</label></div>
    </section>
</div>

<div id="question-position" class="box full-box">
    <h2 class="produit">{{jeuCtrl.questions[jeuCtrl.indexQuestion].name}}</h2>
    <h3>d'où ça vient ?</h3>

    <section id="carte" class="section-carte">
        <ui-gmap-google-map center='map.center' ng-click="jeuCtrl.verifResponse()" events="map.events" zoom='map.zoom'></ui-gmap-google-map>
        <%--<img src="images/france.PNG" ng-click="jeuCtrl.verifResponse()" >--%>
    </section>
</div>

<div id="fin-partie" class="box full-box">
    <h2>Fin de la partie !</h2>
    <p>Votre score : <span>{{jeuCtrl.getScore()}}</span></p>

    <input type="button" ng-click="jeuCtrl.newGame()" value="Nouvelle partie !">
</div>

<ul class="box box-score">
    <li ng-repeat="n in jeuCtrl.range(1,10)" ng-class="jeuCtrl.afficherReponse({{n}})">{{n}}</li>
</ul>
