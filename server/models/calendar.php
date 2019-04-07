<?php

class Calendar {
  private $fixed_team;
  private $rotative_teams;
  private $calendar;

  public function __construct($teams) {
    $this->fixed_team = $teams[0]; // Fixed team to rotate others against.
    $this->rotative_teams = array();
    $this->calendar = array();
    
    $teams_to_rotate = array();
    
    // Eliminate the fixed team from the list without modifying the original array ($teams)
    $num_teams = sizeof($teams);
    for ($i = 1; $i < $num_teams; $i++) { 
      array_push($teams_to_rotate, $teams[$i]);
    }

    // Create an array ($rotative_teams) with the necessary order to rotate teams from the $teams_to_rotate array
    $num_teams_to_rotate = sizeof($teams_to_rotate); 
    for ($i = 0; $i < $num_teams_to_rotate; $i++) {
      if ($i == 0 || $i % 2 != 0) {
        array_push($this->rotative_teams, $teams_to_rotate[$i]);
      }
    }

    for ($i = $num_teams_to_rotate - 1; $i >= 0; $i--) {
      if ($i != 0 && $i % 2 == 0)  {
        array_push($this->rotative_teams, $teams_to_rotate[$i]);
      }
    }
    
    // Add the teams to the Calendar in the adequate order
    for ($i = 0; $i < $num_teams_to_rotate * 2; $i++) {
      $day = array();
      if ($i % 2 == 0) {
        $match = array(
          $this->fixed_team,
          $this->rotative_teams[$i % $num_teams_to_rotate]
        );
        array_push($day, $match);
      }
      else {
        $match = array(
          $this->rotative_teams[$i % $num_teams_to_rotate],
          $this->fixed_team
        );
        array_push($day, $match);
      }
  
      for ($j = 1; $j < $num_teams_to_rotate / 2; $j++) {
        if ($i % 2 == 0) {
          $match = array(
            $this->rotative_teams[($num_teams_to_rotate + $i - $j) % $num_teams_to_rotate],
            $this->rotative_teams[($i + $j) % $num_teams_to_rotate]
          );
          array_push($day, $match);
        }
        else {
          $match = array(
            $this->rotative_teams[($i + $j) % $num_teams_to_rotate],
            $this->rotative_teams[($num_teams_to_rotate + $i - $j) % $num_teams_to_rotate]
          );
          array_push($day, $match);
        }
      }

      // Calculate the resting team (if odd number of total teams, i.e. even number of rotating teams)
      if ($num_teams_to_rotate % 2 == 0) {  
        $match = array(
          "Resting",
          $this->rotative_teams[(($num_teams_to_rotate / 2) + $i) % $num_teams_to_rotate]
        );
        array_push($day, $match);
      }
      array_push($this->calendar, $day);
    }
  }

  public function getCalendar() {
    return $this->calendar;
  }
}

?>