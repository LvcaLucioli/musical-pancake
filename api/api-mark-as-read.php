<?php
require_once '../bootstrap.php';

$dbh->deleteNotification($_SESSION["username"], $_POST["user"], $_POST["content"], $_POST["date"]);
