<?php
require_once '../bootstrap.php';
$notifications = $dbh->getNotifications($_SESSION["username"], $_POST["n"], $_POST["last_notifications"]);

header('Content-Type: application/json');
echo json_encode($notifications);
?>
