<?php
require_once '../bootstrap.php';
$comments = $dbh->getCommentReplies($_POST["post_id"], $_POST["last_id"], $_POST["n"], $_POST["cmt_id"]);

for($i = 0; $i < count($comments)-1; $i++){
    $comments[$i]["propic"] = UPLOAD_DIR.$comments[$i]["propic"];
    $comments[$i]["owned"] = $comments[$i]["user"] == $_SESSION["username"];
}

header('Content-Type: application/json');
echo json_encode($comments);
?>