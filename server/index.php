<?php
include_once("config.php");
include_once("dbconnection.php");
include_once("./models/teams.php");
include_once("./models/calendar.php");

header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

$db = (new DBConnection($db_config))->getConnection();
$path = array();
preg_match_all('/\/([a-z]|[0-9]|[A-Z])+/', $_SERVER["REQUEST_URI"], $path);

if (sizeof($path) < 1) {
  $err = array(
    "error" => array(
      "status" => "404",
      "message" => "Bad fetch URL"
    )
  );

  echo json_encode($err);
  exit();
}

$teams = new Teams($db);

$method = $_SERVER["REQUEST_METHOD"];
$uri = $path[0];
$resource = $uri[0];


if ($method == "GET") {
  if ($resource == "/teams") {
    $teams_with_images = $teams->getAllWithImages();
    echo json_encode($teams_with_images);
  
  }
  else if ($resource == "/calendar") {
    $team_names = $teams->getNames();
    $calendar = (new Calendar($team_names))->getCalendar();
    echo json_encode($calendar);
  }
  else {
    $err = array(
      "error" => array(
        "status" => "404",
        "message" => "Bad fetch URL. Resource not found."
      )
    );
  
    echo json_encode($err);
    exit();
  }
}
else if ($method == "POST") {
  $action = $uri[1];
  if ($action != NULL) {
    if ($action == "/create") {
      // Takes data from the request
      $json = file_get_contents('php://input');
      $team_data = json_decode($json, true);
      
      try {
        $team_names = $teams->getNames();
        if (in_array($team_data["name"], $team_names)) {
          $err = array(
            "error" => array(
              "status" => "500",
              "message" => "A team already exists with that name."
            )
          );
        
          echo json_encode($err);
          exit();
        }
        else {
          $qr = $teams->create($team_data["name"], $team_data["imgUrl"]);
          
        }
        
      }
      catch(Exception $e) {
        $err = array(
          "error" => array(
            "status" => "500",
            "message" => "There was a problem reading the database."
          )
        );
      
        echo json_encode($err);
        exit();
      }

      if ($qr) {
        echo '{"success":"Team ' . $team_data["name"] . ' created successfully!"}';
      }
    }
  }
  else {
    $err = array(
      "error" => array(
        "status" => "404",
        "message" => "Bad URL. No action provided."
      )
    );
  
    echo json_encode($err);
    exit();
  }
}
?>

