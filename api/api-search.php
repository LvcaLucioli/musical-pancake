<?php
require_once '../bootstrap.php';
$searchResult = $dbh->getSearchResult($_POST["q"]);

header('Content-Type: application/json');
echo json_encode($searchResult);?>