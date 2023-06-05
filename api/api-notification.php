<?php
require_once '../bootstrap.php';
$notifications = $dbh->getNotifications($_SESSION["username"]);

header('Content-Type: application/json');
echo json_encode($notifications);
?>
