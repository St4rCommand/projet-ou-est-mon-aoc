<%--
  Created by IntelliJ IDEA.
  User: Morgane
  Date: 29/04/2016
  Time: 08:47
  To change this template use File | Settings | File Templates.
--%>


<div class="box main-box">
    <h2>Bonjour !</h2>

    <section class="section-2-3">
        <button ng-click='panel.selectTab(2)' class="bouton_jouer">JOUER</button>
        <p>Connaissez vous les spécialités de nos régions ?</p>
        <p>10 questions, 10 spécialités !</p>
        <p>D'abord, déterminez si le produit proposé se mange ou se boit, ensuite placez le sur la carte !</p>
        <p>Pas de bonne réponse : pas de points<br/>
        1 bonne réponse : 1 pts<br/>
        2 bonne réponse : 3 pts</p>
    </section>

    <section class="section-1-3">
    </section>
</div>

<div class="box side-box" ng-controller="ScoreController as scoreCtrl">
    <h3>Tableau des meilleurs scores</h3>
    <table class="tableScore">
        <tr ng-repeat='scores in scoreCtrl.highScores'>
            <td>{{scores.name}}</td>
            <td>{{scores.score}}</td>
        </tr>
    </table>
</div>
