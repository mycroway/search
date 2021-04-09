CREATE TABLE `terms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(200) NOT NULL,
  `keyWords` varchar(200) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `indexed` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;