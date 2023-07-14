<?php
require_once '..\bootstrap.php';

$result["signup"] = false;
$result["username"] = $_POST["username"];
if (isset($_POST["username"]) && isset($_POST["password"]) && isset($_POST["email"])) {
    $login_result = $dbh->signup($_POST["username"], $_POST["password"], $_POST["email"], $_POST["bio"]);
    if (!$login_result) {
        $result["error"] = "error! check your credentials";
    } else {
        logUserIn($_POST["username"]);
        $result["signup"] = true;
    }
}

header('Content-Type: application/json');
echo json_encode($result);
