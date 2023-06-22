<?php
require_once '../bootstrap.php';

$dbh->deleteNotification($_SESSION["username"], $_POST["userPropic"], $_POST["content"], $_POST["date"]);
