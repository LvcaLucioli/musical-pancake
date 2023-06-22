<?php
require_once '../bootstrap.php';
$comment = $dbh->leaveComment(
    $_POST["date"],
    $_POST["text"],
    $_SESSION["username"],
    $_POST["post-id"], 
    $_POST["replied-id"]
);

$comment[0]["propic"] = UPLOAD_DIR.$comment[0]["propic"];


header('Content-Type: application/json');
echo json_encode($comment);
?>