-- --------------------------------------------------------
-- Host: 127.0.0.1
-- Server version: 5.5.32-0ubuntu0.12.04.1 - (Ubuntu)
-- Server OS: debian-linux-gnu
-- HeidiSQL Version: 8.0.0.4396
-- --------------------------------------------------------
 
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
 
-- Dumping structure for table test.feedback_questions
DROP TABLE IF EXISTS `feedback_questions`;
CREATE TABLE IF NOT EXISTS `feedback_questions` (
`id` int(10) NOT NULL AUTO_INCREMENT,
`text` varchar(124) NOT NULL,
`type` smallint(6) NOT NULL,
KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
 
-- Dumping data for table test.feedback_questions: ~22 rows (approximately)
/*!40000 ALTER TABLE `feedback_questions` DISABLE KEYS */;
INSERT INTO `feedback_questions` (`id`, `text`, `type`) VALUES
(1, 'It looks like', 0),
(2, 'That is', 0),
(3, 'Amazing, its really', 0),
(4, 'Awesome, that\'s', 0),
(5, 'a great', 1),
(6, 'a beautiful', 1),
(7, 'a faboulus', 1),
(8, 'a amazing', 1),
(9, 'a cute', 1),
(10, 'picture you have painted!', 2),
(11, 'drawing you have made!', 2),
(12, 'painting you have created!', 2),
(13, 'creation you have done!', 2),
(14, 'drawing you have finished!', 2),
(15, 'Keep it up!', 3),
(16, 'You are amazing!', 3),
(17, 'You are very creative!', 3),
(18, 'Never let go of your creativity!', 3),
(19, 'Don\'t stop painting!', 3),
(20, 'Oh my god! thats', 0),
(21, 'I could not do that in your age.', 3),
(22, 'work you have created!', 2);
/*!40000 ALTER TABLE `feedback_questions` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
