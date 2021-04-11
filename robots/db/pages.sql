CREATE TABLE `pages` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `url` text NOT NULL,
  `html` longtext DEFAULT NULL,
  `text` longtext NOT NULL,
  `safe` int(11) NOT NULL,
  `revised` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;