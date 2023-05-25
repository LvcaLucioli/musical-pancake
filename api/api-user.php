<?php
require_once '../bootstrap.php';
$user = $dbh->getUser($_POST["username"]);
$user["propic"] = UPLOAD_DIR.$user["propic"];
header('Content-Type: application/json');
echo json_encode($user);
?>