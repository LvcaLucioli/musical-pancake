<?php
require_once '../bootstrap.php';

if($_POST["action"] == "unfollow") {
    $dbh->unfollow($_SESSION["username"], $_POST["username"]);
}else{
    $dbh->follow($_SESSION["username"], $_POST["username"]);
}
?>