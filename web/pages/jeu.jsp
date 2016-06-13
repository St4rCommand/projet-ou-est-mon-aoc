<%--
  Created by IntelliJ IDEA.
  User: Morgane
  Date: 29/04/2016
  Time: 08:47
  To change this template use File | Settings | File Templates.
--%>

<div id="question-type" class="box semi-box">
    <h2>{{jeuCtrl.questions[jeuCtrl.indexQuestion].name}}</h2>
    <h3>ça se boit ou ça se mange ?</h3>

    <section class="section-question">
        <input id="question-type-liquide" ng-model="reponse" ng-change="switchToMap()" type="radio" name="question-type" value="1"><label for="question-type-liquide">Se boit</label>
        <input id="question-type-solide" ng-model="reponse" ng-change="switchToMap()" type="radio" name="question-type" value="0"><label for="question-type-solide">Se mange</label>
    </section>
</div>

<div id="question-position" class="box semi-box">
    <h2>{{jeuCtrl.questions[jeuCtrl.indexQuestion].name}}</h2>
    <h3>d'où ça vient ?</h3>

    <section class="section-carte">
        <img src="images/france.PNG">
    </section>
</div>

<ul class="box box-score">
    <li ng-repeat="n in jeuCtrl.range(1,10)" ng-class="jeuCtrl.afficherReponse({{n}})">{{n}}</li>
</ul>
