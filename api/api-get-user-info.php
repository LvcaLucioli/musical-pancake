<?php
require_once '..\bootstrap.php';

if (isset($_SESSION["username"])) {
    $result = $dbh->getUserInfo($_SESSION["username"]);
    $result[0]["propic"] = UPLOAD_DIR.$result[0]["propic"];
    header('Content-Type: application/json');
    echo json_encode($result);
}
