<?php
require_once '../bootstrap.php';
$posts = '';

if ($_POST['n_posts'] == "target"){
    $posts = $dbh->getUserNPosts(
        $_POST["username"],
        $_POST["date"]
    );
    $posts = $posts[0]["COUNT(*)"];
}else{
    $posts = $dbh->getUserPosts(
        $_POST["username"],
        $_POST["i"],
        $_POST["n_posts"],
        $_POST["date"]
    );

    for($i = 0; $i < count($posts); $i++){
        $posts[$i]["propic"] = UPLOAD_DIR.$posts[$i]["propic"];
        $posts[$i]["img_name"] = UPLOAD_DIR.$posts[$i]["img_name"];

        $likes = $dbh->getLikeList($posts[$i]["id"]);
        $posts[$i]["n_likes"] = count($likes);
        $posts[$i]["is_liked"] = is_numeric(array_search($_SESSION["username"], array_column($likes, 'user')));
    }
}

header('Content-Type: application/json');
echo json_encode($posts);
?>