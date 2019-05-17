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
      array_push($teams, array("id" => $row["id"], "name" => $row["name"], "logo" => $row["logo"]));
    }

    return $teams;
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

  public function create($name, $logo) {
    $query = "INSERT INTO `teams` (`name`, `logo`) VALUES('" . $name . "', '" . $logo ."')";
    $query_results = $this->db->query($query);

    $this->checkForQueryErrors($query, $query_results);
    
    return $query_results;
  }

  public function edit($id, $name, $logo) {
    $query = "UPDATE `teams` SET `name`='" . $name . "', `logo`='" . $logo . "' WHERE `id`=" . $id;
    $query_results = $this->db->query($query);

    $this->checkForQueryErrors($query, $query_results);
    return $query_results;
  }

  public function delete($id) {
    $query = "DELETE FROM `teams` WHERE `id`=" . $id;
    $query_results = $this->db->query($query);

    $this->checkForQueryErrors($query, $query_results);

    if ($this->db->affected_rows == 1){
      return True;
    }
    else {
      return False;
    }
  }

  private function checkForQueryErrors($query, $query_results) {
    if (!$query_results) {
      throw new Exception("Error executing query: " . $query . "\nErrno: " . $this->db->errno . "\nError: " . $this->db->error . "\n");
    }
  }
}

?>