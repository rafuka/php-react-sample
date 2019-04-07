<?php
include_once("config.php");
include_once("dbconnection.php");
include_once("./models/teams.php");
include_once("./models/calendar.php");

$db = (new DBConnection($db_config))->getConnection();
$path = explode("/", $_SERVER["REQUEST_URI"]);

header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
      

if (sizeof($path) != 2) {
  $err = array(
    "status" => "404",
    "message" => "bad url"
  );

  echo json_encode($err);
  exit();
}

$teams = new Teams($db);

$resource = $path[1];

if ($resource == "teams") {
  $team_names = $teams->getNames();
  $teams_with_images = $teams->getAllWithImages();
  $teams_without_images = $teams->getAllWithoutImages();

  $teams_data = array(
    "names" => $team_names,
    "with_images" => $teams_with_images,
    "no_images" => $teams_without_images
  );

  echo json_encode($teams_data);
}
else if ($resource == "calendar") {
  $team_names = $teams->getNames();
  $calendar = (new Calendar($team_names))->getCalendar();

  echo json_encode($calendar);
}

?>

