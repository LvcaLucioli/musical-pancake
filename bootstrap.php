<?php
session_start();
define("UPLOAD_DIR", "./uploads/");
require_once("utils/functions.php");
require_once("db/database.php");
$dbh = new DatabaseHelper("localhost", "root", "", "bevero", 3306);
?>
