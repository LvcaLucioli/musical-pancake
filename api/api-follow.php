<?php
require_once '../bootstrap.php';
$posts = $dbh->getPosts($_POST["i"], $_POST["n"]);

for($i = 0; $i < count($posts); $i++){
    $posts[$i]["propic"] = UPLOAD_DIR.$posts[$i]["propic"];
    $posts[$i]["img_name"] = UPLOAD_DIR.$posts[$i]["img_name"];

    $likes = $dbh->getLikeList($posts[$i]["id"]);
    $posts[$i]["n_linkes"] = count($likes);
    $posts[$i]["is_linked"] = array_search($_SESSION["username"], array_column($likes, 'user')) != false;
}

header('Content-Type: application/json');
echo json_encode($posts);
?>