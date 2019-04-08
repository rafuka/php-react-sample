<?php

class Teams {
  private $db;

  public function __construct($db_connection) {
    $this->db = $db_connection;
  }

  public function getAll() {
    $query = "SELECT * FROM teams";
    $query_results = $this->db->query($query);

    $this->checkForQueryErrors($query, $query_results);

    $teams = array();

    while ($row = $query_results->fetch_assoc()) {
      array_push($teams, array("id" => $row["id"], "name" => $row["name"]));
    }

    return $teams;
  }

  public function getAllWithImages() {
    $query = "SELECT teams.id, teams.name, team_logos.url  FROM teams LEFT JOIN team_logos ON teams.id=team_logos.team_id";
    $query_results = $this->db->query($query);

    $this->checkForQueryErrors($query, $query_results);
    
    $teams_with_images = array();


    while ($row = $query_results->fetch_assoc()) {
      $id = $row["id"];
      $name = $row["name"];
      $url = $row["url"];

      $i = $id - 1;
      if (!$teams_with_images[$i]) {
        $teams_with_images[$i] = array(
          "id" => $id,
          "name" => $name,
          "images" => array()
        );

        if ($url != NULL) array_push($teams_with_images[$i]["images"], $url);
      }
      else {
        array_push($teams_with_images[$i]["images"], $url);
      }
    }
    
    return $teams_with_images;
  }

  public function getNames() {
    $query = "SELECT teams.name FROM teams";
    $query_results = $this->db->query($query);

    $this->checkForQueryErrors($query, $query_results);

    $team_names = array();

    while ($row = $query_results->fetch_assoc()) {
      array_push($team_names, $row["name"]);
    }

    return $team_names;
  }

  public function create($name, $image_url) {
    $query = "INSERT INTO `teams` (`name`) VALUES('" . $name . "')";
    $query_results = $this->db->query($query);

    $this->checkForQueryErrors($query, $query_results);

    $query = "SELECT teams.id FROM teams WHERE teams.name='".$name."'";
    $query_results = $this->db->query($query);

    $this->checkForQueryErrors($query, $query_results);
    $row = $query_results->fetch_assoc();
    $id = $row["id"];

    $query = "INSERT INTO `team_logos` (`url`, `team_id`) VALUES ('" . $image_url . "', '".$id."')";
    $query_results = $this->db->query($query);

    $this->checkForQueryErrors($query, $query_results);

    return $query_results;
  }

  private function checkForQueryErrors($query, $query_results) {
    if (!$query_results) {
      throw new Exception("Error executing query: " . $query . "\nErrno: " . $this->db->errno . "\nError: " . $this->db->error . "\n");
    }
  }
}

?>