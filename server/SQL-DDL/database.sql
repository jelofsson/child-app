-- phpMyAdmin SQL Dump
-- version 4.0.5
-- http://www.phpmyadmin.net
--
-- Värd: localhost
-- Skapad: 13 sep 2013 kl 03:45
-- Serverversion: 5.1.70-cll
-- PHP-version: 5.3.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Databas: `puertosu_kidsapp`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `feedback_questions`
--

CREATE TABLE IF NOT EXISTS `feedback_questions` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `text` varchar(124) NOT NULL,
  `type` smallint(6) NOT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=23 ;

--
-- Dumpning av Data i tabell `feedback_questions`
--

INSERT INTO `feedback_questions` (`id`, `text`, `type`) VALUES
(1, 'It looks like', 0),
(2, 'That is', 0),
(3, 'Amazing, its really', 0),
(4, 'Awesome, that''s', 0),
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
(19, 'Don''t stop painting!', 3),
(20, 'Oh my god! thats', 0),
(21, 'I could not do that in your age.', 3),
(22, 'work you have created!', 2);

-- --------------------------------------------------------

--
-- Tabellstruktur `pictures`
--

CREATE TABLE IF NOT EXISTS `pictures` (
  `usuario` varchar(20) NOT NULL,
  `location` text NOT NULL,
  `feedback` text NOT NULL,
  `datetime_picture` datetime NOT NULL,
  `datetime_feedback` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


-- --------------------------------------------------------

--
-- Tabellstruktur `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `usuario` varchar(20) NOT NULL,
  `pass` varchar(12) NOT NULL,
  `status` varchar(20) NOT NULL,
  PRIMARY KEY (`usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
