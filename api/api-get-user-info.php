<?php
require_once '..\bootstrap.php';

if (isset($_SESSION["username"])) {
    $result = $dbh->getUserInfo($_SESSION["username"]);
    header('Content-Type: application/json');
    echo json_encode($result);
}
