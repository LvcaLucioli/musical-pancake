<?php
require_once '../bootstrap.php';
$user = $dbh->getSearchUser($_POST["username"])[0];
$user["propic"] = UPLOAD_DIR.$user["propic"];

if($_SESSION["username"] == $_POST["username"]) {
    $user["btn"] = "settings";
}else{
    $user["btn"] = $dbh->checkFollow($_SESSION["username"], $_POST["username"])
                    ? "follow" : "following";
}
header('Content-Type: application/json');
echo json_encode($user);
?>