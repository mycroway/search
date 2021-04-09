CREATE TABLE `pages` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `url` text NOT NULL,
  `html` longtext NOT NULL,
  `text` longtext NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `safe` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;