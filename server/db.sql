CREATE DATABASE IF NOT EXISTS `football`;

USE `football`;

CREATE TABLE `teams` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100),
  `logo` VARCHAR(255),
  PRIMARY KEY (`id`)
);

INSERT INTO `teams` (`name`, `logo`) VALUES
('FC Barcelona', 'http://assets.stickpng.com/thumbs/584a9b3bb080d7616d298777.png'),
('Manchester United', 'http://pluspng.com/img-png/manchester-united-logo-png-manchester-united-football-club-badge-sports-add-a-free-stampette-logo-to-your-profile-image-300.png'),
('Liverpool', 'https://d3j2s6hdd6a7rg.cloudfront.net/v2/uploads/media/crest/0001/43/13cc5843ff63c6cdd751142960a9517c8917ff6d.png'),
('Chelsea', 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/200px-Chelsea_FC.svg.png'),
('Arsenal', 'https://i.pinimg.com/originals/78/2b/e1/782be1982550334ea1bc045f9d9ba3a3.png'),
('Tottenham Hotspur', 'https://upload.wikimedia.org/wikipedia/hif/6/6d/Tottenham_Hotspur.png'),
('Bayern Munich', 'https://seeklogo.com/images/F/fc-bayern-munchen-90-s-logo-4ECFC1E59C-seeklogo.com.png'),
('Paris Saint-Germain', 'http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c4d8.png'),
('Angry Weasels', '');
