<?php
require_once '../bootstrap.php';
$post = $dbh->getPostById($_POST["id"])[0];
$post["propic"] = UPLOAD_DIR.$post["propic"];
$post["img_name"] = UPLOAD_DIR.$post["img_name"];

$likes = $dbh->getLikes($_POST["id"]);
$post["n_likes"] = count($likes);
$post["is_liked"] = is_numeric(array_search($_SESSION["username"], array_column($likes, 'user')));

$post["n_comments"] = $dbh->getNComments($_POST["id"])[0]["COUNT(*)"];

header('Content-Type: application/json');
echo json_encode($post);
?>
