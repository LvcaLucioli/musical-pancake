<?php
require_once '../bootstrap.php';
$notifications = $dbh->getNotifications();

header('Content-Type: application/json');
echo json_encode($notifications);?>
