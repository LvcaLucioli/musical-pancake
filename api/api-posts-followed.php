<?php
require_once '../bootstrap.php';
$posts = $dbh->getFollowedPosts($_SESSION["username"], $_POST["last_id"], $_POST["n"]);

for($i = 0; $i < count($posts)-1; $i++){
    $posts[$i]["propic"] = UPLOAD_DIR.$posts[$i]["propic"];
    $posts[$i]["img_name"] = UPLOAD_DIR.$posts[$i]["img_name"];

    $likes = $dbh->getLikes($posts[$i]["id"]);
    $posts[$i]["n_likes"] = count($likes);
    $posts[$i]["is_liked"] = is_numeric(array_search($_SESSION["username"], array_column($likes, 'user')));
    
    $posts[$i]["n_comments"] = $dbh->getNComments($posts[$i]["id"])[0]["COUNT(*)"];
}

header('Content-Type: application/json');
echo json_encode($posts);
?>