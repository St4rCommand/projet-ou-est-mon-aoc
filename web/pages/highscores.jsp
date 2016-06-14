<%--
  Created by IntelliJ IDEA.
  User: Morgane
  Date: 29/04/2016
  Time: 08:48
  To change this template use File | Settings | File Templates.
--%>
<div class="box">
    <div class="section-2-3" ng-controller="ScoreController as scoreCtrl">
        <h2>High Score</h2>
        <ul>
            <div ng-repeat='scores in scoreCtrl.highScores'>
                <li>{{scores.name}} : {{scores.score}}</li>
            </div>
        </ul>
    </div>
</div>