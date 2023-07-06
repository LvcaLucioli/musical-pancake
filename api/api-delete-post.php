<?php
require_once '../bootstrap.php';
$img = $dbh->deletePost($_POST["id"]);
unlink('.' . UPLOAD_DIR . $img[0]["img_name"]);
?>