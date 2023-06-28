<?php
require_once '../bootstrap.php';
switch($_POST["target"]){
    case "users":
        $searchResult = $dbh->getSearchResult($_POST["q"]);
        break;
    case "followers":
        $searchResult = $dbh->getFollowers($_POST["username"], $_POST["q"]);
        break;
    case "following":
        $searchResult = $dbh->getFollowings($_POST["username"], $_POST["q"]);
        break;
    case "likes":
        $searchResult = $dbh->getLikeList($_POST["postId"], $_POST["q"]);
        break;
}


header('Content-Type: application/json');
echo json_encode($searchResult);?>