<%--
  Created by IntelliJ IDEA.
  User: Morgane
  Date: 29/04/2016
  Time: 08:47
  To change this template use File | Settings | File Templates.
--%>

<div class="section-2-3" ng-controller="JeuController as jeuCtrl">
    <h1>{{jeuCtrl.questions[jeuCtrl.i].name}}</h1>

    <div>Votre score : {{jeuCtrl.score}}</div>

    <div id="question">
        <p>ça se boit ou ça se mange ?</p>
        <button ng-click='jeuCtrl.verifReponse(1)'>Se boit</button>
        <button ng-click='jeuCtrl.verifReponse(0)'>Se mange</button>
    </div>

    <div id="carte">
        Carte
    </div>

    <button ng-click='jeuCtrl.nextI()' ng-show='jeuCtrl.afficher'>Valider</button>
</div>
