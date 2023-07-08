<?php
require_once '..\bootstrap.php';

$result["exists"] = false;

if (isset($_POST["credentialType"]) && (isset($_POST["credential"]))) {
    $result["exists"] = $dbh->checkExists($_POST["credentialType"], $_POST["credential"]);
    header('Content-Type: application/json');
    echo json_encode($result);
}
