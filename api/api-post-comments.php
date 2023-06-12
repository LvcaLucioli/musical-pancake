<?php
require_once '../bootstrap.php';
$comments = $dbh->getComments($_POST["post_id"], $_POST["last_id"], $_POST["n"]);

for($i = 0; $i < count($comments)-1; $i++){
    $comments[$i]["propic"] = UPLOAD_DIR.$comments[$i]["propic"];
}

header('Content-Type: application/json');
echo json_encode($comments);
?>