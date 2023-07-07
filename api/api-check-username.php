<?php
require_once '..\bootstrap.php';

$result["exists"] = false;

if(isset($_POST["username"])){
    $result["exists"] = $dbh->checkUsernameExists($_POST["username"]);
    header('Content-Type: application/json');
    echo json_encode($result);
}
