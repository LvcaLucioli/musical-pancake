<?php
require_once '../bootstrap.php';
$username = $_POST["username"] != "" ? $_POST["username"] : $_SESSION["username"];
$user = $dbh->getUser($username);

if (isset($user[0])) {
    $user["propic"] = UPLOAD_DIR.$user["propic"];

    if($_SESSION["username"] == $_POST["username"]) {
        $user["btn"] = "settings";
    }else{
        $user["btn"] = $dbh->checkFollow($_SESSION["username"], $_POST["username"])
                        ? "follow" : "following";
    }
}else{
    $user = ["username" => "unset"];
}

header('Content-Type: application/json');
echo json_encode($user);
?>