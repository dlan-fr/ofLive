-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Mar 08 Septembre 2015 à 18:08
-- Version du serveur: 5.5.24-log
-- Version de PHP: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `oflive`
--

-- --------------------------------------------------------

--
-- Structure de la table `shared_scripts`
--

CREATE TABLE IF NOT EXISTS `shared_scripts` (
  `uniqid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date_shared` datetime NOT NULL,
  `last_access_date` datetime DEFAULT NULL,
  `num_access` int(11) NOT NULL DEFAULT '0',
  `content` text NOT NULL,
  PRIMARY KEY (`uniqid`),
  UNIQUE KEY `uniqid` (`uniqid`),
  KEY `uniqid_2` (`uniqid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `shared_scripts`
--

INSERT INTO `shared_scripts` (`uniqid`, `name`, `date_shared`, `last_access_date`, `num_access`, `content`) VALUES
('55ef0f6dae3e2', 'hello_list.lua', '2015-09-08 16:40:13', NULL, 0, 'local inspect = require("inspect")\n\n----------------------------------------------------\n--Base ofLive template------------------------------\n----------------------------------------------------\nfunction setup()\n	of.setWindowTitle("Welcome to ofLive!")\n	of.background(0, 0, 0)\nend\n\n----------------------------------------------------\nfunction update()\nend\n\n----------------------------------------------------\nfunction draw()\n\n	of.setHexColor(0xFFFFFF)\n	of.drawBitmapString("Hello list!",of.getWidth() / 2,of.getHeight() / 2)\n\n	\nend\n\n----------------------------------------------------\nfunction exit()\n	\nend\n\n-- input callbacks\n\n----------------------------------------------------\nfunction keyPressed(key)\n\nend\n\nfunction mouseDragged(x,y,button)\n\nend\n\nfunction mouseMoved(x,y)\n\nend\n\nfunction mousePressed(x,y,button)\n\nend\n\nfunction mouseReleased(x,y,button)\n\nend\n');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
