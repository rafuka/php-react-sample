<?php

class DBConnection {

  private $mysqli;

  public function __construct($db_config) {

    $this->mysqli = new mysqli(
      $db_config["host"],
      $db_config["user"],
      $db_config["password"],
      $db_config["name"]
    );

    if ($this->mysqli->connect_errno) {
      echo "Error connecting to the database" . $db_name . "\n";
      echo "Errno: " . $this->mysqli->connect_errno . "\n";
      echo "Error: " . $this->mysqli->connect_error . "\n";
      exit;
    }

    $this->mysqli->set_charset('utf8');
  }

  public function getConnection() {
    return $this->mysqli;
  }
}

?>