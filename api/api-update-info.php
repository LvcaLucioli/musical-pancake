<?php
require_once '..\bootstrap.php';

$result["update"] = false;
$result["username"] = $_POST["username"];

if (isset($_SESSION["username"]) && isset($_POST["email"])) {
    $login_result = $dbh->updateUserInfo($_SESSION["username"], $_POST["username"], $_POST["email"],$_POST["password"], $_POST["new-password"], $_POST["bio"], "propic_" . $_POST["username"] . ".jpg");
    if (!$login_result) {
        $result["error"] = "the old password is incorrect";
    } else {
        $result["update"] = true;
    }
    header('Content-Type: application/json');
    echo json_encode($result);
}
