<?php
require_once '../bootstrap.php';
$posts = '';

if ($_POST['n_posts'] == "target"){
    $posts = $dbh->getUserNPosts(
        $_POST["username"]
    );
    $posts = $posts[0]["COUNT(*)"];
}else{
    $posts = $dbh->getUserPosts(
        $_POST["username"],
        $_POST["last_id"],
        $_POST["n_posts"]
    );

    for($i = 0; $i < count($posts)-1; $i++){
        $posts[$i]["img_name"] = UPLOAD_DIR.$posts[$i]["img_name"];
    }
}

header('Content-Type: application/json');
echo json_encode($posts);
?>