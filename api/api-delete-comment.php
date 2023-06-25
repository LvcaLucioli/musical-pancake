<?php
require_once '../bootstrap.php';
$dbh->deleteComment($_POST["comment_id"], $_POST["post_id"]);
$nComments = $dbh->getNComments($_POST["post_id"])[0]["COUNT(*)"];

header('Content-Type: application/json');
echo json_encode($nComments);
?>