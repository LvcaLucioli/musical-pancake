<?php
require_once '../bootstrap.php';
$user = $dbh->getUser($_POST["username"], $_POST["date"])[0];
$user["propic"] = UPLOAD_DIR.$user["propic"];
header('Content-Type: application/json');
echo json_encode($user);
?>