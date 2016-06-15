<%--
  Created by IntelliJ IDEA.
  User: Morgane
  Date: 29/04/2016
  Time: 08:47
  To change this template use File | Settings | File Templates.
--%>

<div class="box semi-box">
    <h2>ça se boit ou ça se mange ?</h2>

    <section class="section-question">
        <h3>{{jeuCtrl.questions[jeuCtrl.indexQuestion].name}}</h3>
        <button ng-click='jeuCtrl.verifReponse(1)'>Se boit</button>
        <button ng-click='jeuCtrl.verifReponse(0)'>Se mange</button>
    </section>
</div>

<div class="box semi-box">
    <h2>d'où ça vient ?</h2>

    <section id="carte" class="section-carte">
        <ui-gmap-google-map center='map.center' zoom='map.zoom'></ui-gmap-google-map>
    </section>
</div>

<ul class="box box-score">
    <li ng-repeat="n in jeuCtrl.range(1,10)" ng-class="jeuCtrl.afficherReponse({{n}})">{{n}}</li>
</ul>
