CREATE TABLE `teams` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30),
  PRIMARY KEY (`id`)
);

INSERT INTO `teams` (`name`) VALUES
('FC Barcelona'),
('Manchester United'),
('Liverpool'),
('Chelsea'),
('Arsenal'),
('Tottenham Hotspur'),
('Bayern Munich'),
('Paris Saint-Germain'),
('Angry Weasels');

CREATE TABLE `team_logos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(255) NOT NULL,
  `team_id` INT,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`) ON DELETE CASCADE
);

INSERT INTO `team_logos` (`url`, `team_id`) VALUES
('http://assets.stickpng.com/thumbs/584a9b3bb080d7616d298777.png', 1),
('http://pluspng.com/img-png/manchester-united-logo-png-manchester-united-football-club-badge-sports-add-a-free-stampette-logo-to-your-profile-image-300.png', 2),
('https://d3j2s6hdd6a7rg.cloudfront.net/v2/uploads/media/crest/0001/43/13cc5843ff63c6cdd751142960a9517c8917ff6d.png', 3),
('https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/200px-Chelsea_FC.svg.png', 4),
('https://i.pinimg.com/originals/78/2b/e1/782be1982550334ea1bc045f9d9ba3a3.png', 5),
('https://upload.wikimedia.org/wikipedia/hif/6/6d/Tottenham_Hotspur.png', 6),
('https://seeklogo.com/images/F/fc-bayern-munchen-90-s-logo-4ECFC1E59C-seeklogo.com.png', 7),
('http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c4d8.png', 8);
