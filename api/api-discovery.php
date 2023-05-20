<?php
require_once '../bootstrap.php';
$posts = $dbh->getDiscPosts($_POST["n_block_disc"]);

for($i = 0; $i < count($posts); $i++){
    $posts[$i]["img_name"] = UPLOAD_DIR.$posts[$i]["img_name"];
}

header('Content-Type: application/json');
echo json_encode($posts);?>