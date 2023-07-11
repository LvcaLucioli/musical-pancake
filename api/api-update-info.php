<?php
require_once '..\bootstrap.php';

if (isset($_SESSION["username"])) {
    $result = $dbh->updateUserInfo($_SESSION["username"], $_POST["username"], $_POST["email"], $_POST["password"], $_POST["bio"], "propic_" . $_POST["username"] . ".jpg");
    header('Content-Type: application/json');
    echo json_encode($result);
}
