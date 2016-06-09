<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="fr" ng-app="appli">
    <head>
        <title>Où est mon AOC ?</title>
        <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/stylesheets/main.css"/>
        <script type="text/javascript" src="${pageContext.request.contextPath}/js/angular.min.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/js/app.js"></script>
    </head>

    <body ng-controller="MenuController as panel">
        <header role="banner">
            <h1>Où est mon AOC ? {{Tto}}</h1>

            <div class="topbar">
                <nav class="menu">
                    <ul>
                        <li>
                            <a href ng-click="panel.selectTab(1)">Accueil</a>
                        </li>
                        <li>
                            <a href ng-click="panel.selectTab(2)">Jouer</a>
                        </li>
                        <li>
                            <a href ng-click="panel.selectTab(3)">Scores</a>
                        </li>
                        <li>
                            <a href ng-click="panel.selectTab(4)">Projet</a>
                        </li>
                    </ul>
                </nav>

                <div class="user">
                    <p>Utilisateur connecté</p>
                    <img src="#" title="logo">
                </div>
            </div>
        </header>

        <div role="main">
            <div id="page-accueil" ng-show="panel.isSelected(1)">
                <div ng-include="'${pageContext.request.contextPath}/pages/accueil.jsp'"></div>
            </div>
            <div id="page-jeu" ng-show="panel.isSelected(2)">
                <div ng-include="'${pageContext.request.contextPath}/pages/jeu.jsp'"></div>
            </div>
            <div id="page-score" ng-show="panel.isSelected(3)">
                <div ng-include="'${pageContext.request.contextPath}/pages/highscores.jsp'"></div>
            </div>
            <div id="page-projet" ng-show="panel.isSelected(4)">
                <div ng-include="'${pageContext.request.contextPath}/pages/project.jsp'"></div>
            </div>
        </div>

        <footer>
            <ul>
                <li>François BRICHART</li>
                <li>Morgane CHAPUIS</li>
                <li>Romain HUNAULT</li>
                <li>Quentin ROUSSIER</li>
            </ul>
            <a href="https://github.com/St4rCommand/projet-ou-est-mon-aoc">GitHub</a>
        </footer>
    </body>
</html>
