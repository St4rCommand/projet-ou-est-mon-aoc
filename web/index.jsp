
<!DOCTYPE html>
<html lang="fr" ng-app="appli">
    <head>
        <title>Où est mon AOC ?</title>
        <link rel="icon" type="image/jpg" href="images/favicon.jpg" />
        <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/stylesheets/main.css"/>
        <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/stylesheets/connexion.css"/>

        <script type="text/javascript" src='${pageContext.request.contextPath}/js/lodash.js'></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/js/angular.min.js"></script>
        <script type="text/javascript" src='${pageContext.request.contextPath}/js/angular-simple-logger.js'></script>
        <script type="text/javascript" src='${pageContext.request.contextPath}/js/angular-google-maps.js'></script>
        <script src="https://apis.google.com/js/platform.js" async defer></script>
        <script type="text/javascript" src='http://maps.googleapis.com/maps/api/js?sensor=false&key=AIzaSyD02mO5LOSBSTcdse9bepTCis2dd0J6IRw'></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/js/app.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-3.0.0.js"></script>

        <meta charset="UTF-8">
        <script src="https://apis.google.com/js/platform.js"></script>
        <meta name="google-signin-client_id" content="300070851823-kfbftgpbipvqkik31m9o4rrdht6rurfj.apps.googleusercontent.com">
    </head>

    <body ng-controller="MenuController as panel">
        <header role="banner">
            <h1><a href="index.jsp">Où est mon AOC ? {{Tto}}</a></h1>

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

                <div class="user" ng-controller="UserController as user">
                    <div ng-show="!user.isLogged" class="g-signin2" data-onsuccess="onSignIn" ng-click="user.signIn()"></div>
                    <div ng-show="user.isLogged">
                        <img src="#" ng-src="{{user.getUser().userImg}}"/>
                        <p>{{user.getUser().userName}}</p>
                        <div id="customBtn" ng-click="user.signOut()">
                            <span class="icon"><img src="/images/g-logo.png"></span>
                            <span class="buttonText">Sign Out</span>
                        </div>
                    </div>

                </div>
            </div>
        </header>

        <div role="main">
            <div id="page-accueil" ng-show="panel.isSelected(1)">
                <div ng-include="'${pageContext.request.contextPath}/pages/accueil.jsp'"></div>
            </div>
            <div id="page-jeu" ng-show="panel.isSelected(2)" ng-hide="!panel.isSelected(2)" ng-controller="JeuController as jeuCtrl">
                <div ng-include="'${pageContext.request.contextPath}/pages/jeu.jsp'" ></div>
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
