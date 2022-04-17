-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: assignment
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(155) NOT NULL,
  `brand` varchar(45) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `screensize` varchar(45) DEFAULT 'NIL',
  `processor` varchar(155) DEFAULT 'NIL',
  `memory` varchar(155) DEFAULT 'NIL',
  `storage` varchar(155) DEFAULT 'NIL',
  `os` varchar(45) DEFAULT 'NIL',
  `category_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `product_pic` varchar(255) DEFAULT 'laptop_image.jpg',
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `product_id_UNIQUE` (`product_id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `category_id_idx` (`price`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (3,'SPIT 1000','SP IT',855.50,'15\"','Intel Core i7-10500H','32 GB DDR4 RAM','1TB','Windows 10',1,'2022-01-26 11:35:57','laptop_image.jpg'),(4,'SPIT 11000','SP IT',890.90,'15\"','Intel Core i9-11500H','32 GB DDR4 RAM','1TB','Windows 10',1,'2022-01-27 11:50:47','laptop_image.jpg'),(5,'SPIT 1111 AMD RYXEN 12','SP IT!',1899.90,'17','Intel Core i9=12500H','32GB','1TB','Windows 10',1,'2022-02-03 15:54:08','laptop_image.jpg'),(9,'SPIT1111','SPIT',899.90,'11','QualComm Snapdragon 888','4GB','256GB','Oxygon 12',7,'2022-02-03 16:28:00','laptop_image.jpg'),(10,'SPITPhone 12','SPIT',1005.50,'13','QualComm Snapdragon 1000','8GB','256GB','spitOS',7,'2022-02-03 16:29:01','laptop_image.jpg'),(11,'Mackies220 AMD RYZEN 12X','mackie',2399.90,'17','Intel Core i7-12490H','32GB','1TB','Win10 64-bit',1,'2022-02-06 15:21:45','laptop_image.jpg'),(12,'RASUS TTT Motherboard ','mackie',2350.99,'','','','','',10,'2022-02-06 15:22:36','laptop_image.jpg'),(13,'Somneasd','mackie',345.60,'','','','','',11,'2022-02-06 16:08:27','laptop_image.jpg');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-06 18:59:27
