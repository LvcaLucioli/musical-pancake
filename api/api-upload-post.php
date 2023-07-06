<?php
require_once '../bootstrap.php';
$img_name = $dbh->addNewPost($_SESSION['username'], $_POST['desc']);

$image_parts = explode(";base64,", $_POST['image']);
$image_base64 = base64_decode($image_parts[1]);
$file = '.' . UPLOAD_DIR . $img_name;
file_put_contents($file, $image_base64);

$ret["user"] = $_SESSION['username'];
header('Content-Type: application/json');
echo json_encode($ret);
?>