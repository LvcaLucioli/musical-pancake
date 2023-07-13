<?php
require_once '..\bootstrap.php';

$result["exists"] = false;

if (isset($_POST["credentialType"]) && (isset($_POST["credential"]))) {
    if(!(isset($_SESSION["username"]))){
        $username = "";
    } else {
        $username = $_SESSION["username"];
    }
    $result["exists"] = $dbh->checkExists($username, $_POST["credentialType"], $_POST["credential"]);
    header('Content-Type: application/json');
    echo json_encode($result);
}
