<?php
require_once '../bootstrap.php';
$dbh->like_unlike($_SESSION["username"], $_POST["action"], $_POST["id"]);

header('Content-Type: application/json');
?>
