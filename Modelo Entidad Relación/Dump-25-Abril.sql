-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: partsco
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `articulos`
--

DROP TABLE IF EXISTS `articulos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articulos` (
  `idarticulo` int NOT NULL AUTO_INCREMENT,
  `categoria` varchar(50) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `stock` int NOT NULL,
  `estado` varchar(15) NOT NULL,
  `valor` int NOT NULL,
  PRIMARY KEY (`idarticulo`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articulos`
--

LOCK TABLES `articulos` WRITE;
/*!40000 ALTER TABLE `articulos` DISABLE KEYS */;
INSERT INTO `articulos` VALUES (1,'Motor','Audi V8','V8 Turbo 5.0',10,'no disponible',2000),(2,'Frenos','Dakota Rin 28','Azul Importados Japon',5,'disponible',3000),(3,'Audio','Pioneer','AVH-6005X',11,'disponible',125000),(4,'Polarizado','Makita Black','Hidrogenizado con grado 1',30,'disponible',250000),(5,'Motor','Bomba de aceite','Motor GM 1.8 Litros',2,'disponible',120000),(6,'Eléctrico','Control de vidrios eléctricos','Marca: NISSAN (5AROA U5 1946)',4,'disponible',80000),(7,'Eléctrico','Caja fusibles ','Modulo Ipdm Np300',2,'disponible',250000),(8,'Válvulas','Cuerpo válvulas caja Automática','Para NISSAN modelos de 2012 al 2019',1,'disponible',550000),(9,'Válvulas','Caja de solenoides Dodge ','A604 Cirrus Neon Stratus Voyaguer',3,'disponible',150000),(10,'Mecánico','Caja de Cambios','6T45, Chevrolet Captiva Sport',2,'disponible',6000000),(11,'General','Pera o pomo','para Ford fiesta 2011 en adelante',5,'disponible',60000),(12,'General','Bumper','Mazda allegro mod 98',3,'disponible',300000),(13,'General','Rines','Rin 17\" cx5 - Renault, Kia, Mazda',20,'disponible',250000),(14,'Sensores','Sensor de presión de llanta','Ford fiesta',5,'disponible',70000),(15,'General','Espejo retrovisor','Espejo cableado y cubierta de Twingo Dynamique',4,'disponible',70000),(16,'General','Volante','Para Renault 18 R18',4,'disponible',80000),(17,'Eléctrico','Bobina alternador','Para Toyota sahara de 2007',2,'disponible',800000),(18,'General','Bomba Hidraulica','Bomba 5vz Para Toyota Landcruiser prado',1,'disponible',850000),(19,'General','Eje delantero','Referencia GDJ150 Toyota TX',2,'disponible',650000),(20,'General','Carburador','Para Toyota Hilux modelos 1998 en adelante',2,'disponible',1000000),(21,'Aire','Radiador/condensador','Para Twingo modelos 2005 a 2015',2,'disponible',850000),(22,'Aire','Filtro','Filtro Cx5 Mazda 3 modelos 2012 a 2016',4,'disponible',75000),(23,'General','Rin Repuesto','Rin 13 Spark GT',3,'disponible',100000),(24,'General','Radio','Para Pioneer MVHS215BT con USB y Bluetooth',4,'disponible',170000),(25,'Audio','Bocina coaxial','De 300 W 4 Ohm - Perta de auto',3,'disponible',75000),(26,'General','Juego tapetes x4','Para Sandero, Logan, Duster 4x2 y 2x2',5,'disponible',150000),(27,'General','Alarma','Alarma para Chevrolet referencia 035940A',2,'disponible',80000),(28,'General','Farolas Sencillas x2','Para Kia Revolution modelos hasta 2016',5,'disponible',300000),(29,'Frenos','Pastillas','Pastillas pasta para Spark y Beat referencia ACD0032',10,'disponible',85000),(30,'Frenos','Rodamiento trasero','Frenos de banda para Ford fiesta 2011 a 2019',4,'disponible',300000),(31,'Válvulas','Válvula de control de succión','Bomba Cr Nissan Frontier',5,'disponible',250000),(32,'General','Tapa de radiador','para Dodge Journey 2.4 de 18 libras',3,'disponible',80000),(33,'Aire','Manguera Termostato','Para Cruze , Sonic , Tracker',7,'disponible',70000),(34,'Bombas','Bomba Gasolina','Bomba alta presión para Captiva 2.4 ',6,'disponible',750000),(35,'Bombas','Bomba de agua','Para VW 2.0t a 1.8t',3,'disponible',250000),(36,'Inyectores','Inyectores','Para Nissan Pathfinder cilindraje 3.3',4,'disponible',120000),(37,'General','Control eleva vidrios','Para Dodge Journey 12 pines ',4,'disponible',200000),(38,'Sensores','Sensor Ciguenal','Para Dodge Journey, Compass 2.4',3,'disponible',250000),(39,'Motor','Balanceador Bomba aceite','Para Dodge Journey, Compass 2.4',5,'disponible',2000000),(40,'Aire','Caja termostato','Para Dodge Journey, Compass 2.4',6,'disponible',350000),(41,'General','Bocin delantero','Para Dodge Journey, Compass 2.4',3,'disponible',150000),(42,'General','Tuvo refrigerador delantero','Para Dodge Journey, Compass 2.4L',6,'disponible',80000),(43,'General','Manguera Superior radiador','Para Audi A4 1.8 L',7,'disponible',165000),(44,'General','Juego amortiguadores','Capot Chevrolet Captiva',6,'disponible',119000),(45,'General','Rejilla de Aire acondicionado','Para Renault Logan , Duster',7,'disponible',55000),(46,'General','Switch elevavidrio','Para Renault Logan , Duster',20,'disponible',20000),(47,'General','Cinta Airbag','Para Nissan Sentra',8,'disponible',140000),(48,'General','Lampara interna','Para techo automovil 10 cm x 9cm',20,'disponible',20000),(49,'General','Plumilla delantera ','Para Renault Logan , Duster 26 pulgadas',23,'disponible',30000),(50,'General','Tercer Stop Led ','Para bumper',15,'disponible',25000),(51,'a','xD','XD',1,'disponible',1),(52,'evfsergerg','2efefef','wervww',232,'disponible',22442),(53,'evfsergerg','2efefef','wervww',232,'disponible',22442),(54,'evfsergerg','2efefef','wervww',232,'disponible',22442),(55,'evfsergerg','2efefef','wervww',232,'disponible',22442),(56,'wdwdw','wdwdwd','wdwdwd',213,'disponible',13221),(57,'efgergtrnbhtrb','wdwwddwbvrtbr','evevev',123223,'disponible',2342442);
/*!40000 ALTER TABLE `articulos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `descuentos`
--

DROP TABLE IF EXISTS `descuentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `descuentos` (
  `iddescuentos` int NOT NULL AUTO_INCREMENT,
  `estado` tinyint NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  `titulo` varchar(45) NOT NULL,
  PRIMARY KEY (`iddescuentos`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `descuentos`
--

LOCK TABLES `descuentos` WRITE;
/*!40000 ALTER TABLE `descuentos` DISABLE KEYS */;
INSERT INTO `descuentos` VALUES (5,1,'Descripción del descuento...','Nombre del descuento');
/*!40000 ALTER TABLE `descuentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hprecios`
--

DROP TABLE IF EXISTS `hprecios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hprecios` (
  `idHPrecios` int NOT NULL AUTO_INCREMENT,
  `precio` varchar(45) DEFAULT NULL,
  `idHarticulo` int DEFAULT NULL,
  PRIMARY KEY (`idHPrecios`),
  KEY `idHarticulo` (`idHarticulo`),
  CONSTRAINT `hprecios_ibfk_1` FOREIGN KEY (`idHarticulo`) REFERENCES `articulos` (`idarticulo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hprecios`
--

LOCK TABLES `hprecios` WRITE;
/*!40000 ALTER TABLE `hprecios` DISABLE KEYS */;
INSERT INTO `hprecios` VALUES (1,'40000',2),(2,'3000',2);
/*!40000 ALTER TABLE `hprecios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sesiones`
--

DROP TABLE IF EXISTS `sesiones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sesiones` (
  `idsesion` int NOT NULL AUTO_INCREMENT,
  `fecha_sesion` datetime DEFAULT NULL,
  `usuarios_idusuario` int NOT NULL,
  PRIMARY KEY (`idsesion`),
  KEY `fk_sesiones_usuarios1_idx` (`usuarios_idusuario`),
  CONSTRAINT `fk_sesiones_usuarios1` FOREIGN KEY (`usuarios_idusuario`) REFERENCES `usuarios` (`idusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=314 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sesiones`
--

LOCK TABLES `sesiones` WRITE;
/*!40000 ALTER TABLE `sesiones` DISABLE KEYS */;
INSERT INTO `sesiones` VALUES (1,'2022-03-19 00:00:00',1),(2,'2022-03-19 00:00:00',1),(3,'2022-03-19 21:04:42',2),(4,'2022-03-19 23:13:31',1),(5,'2022-03-19 23:13:36',2),(6,'2022-03-19 23:13:36',2),(7,'2022-03-20 12:24:09',2),(8,'2022-03-20 12:44:47',2),(9,'2022-03-20 12:45:16',2),(10,'2022-03-20 12:48:08',2),(11,'2022-03-20 12:55:58',2),(12,'2022-03-20 12:59:39',2),(13,'2022-03-20 13:10:20',2),(14,'2022-03-20 13:12:31',2),(15,'2022-03-20 13:29:26',2),(16,'2022-03-20 13:30:16',2),(17,'2022-03-20 13:30:38',2),(18,'2022-03-20 13:35:09',2),(19,'2022-03-20 13:35:27',2),(20,'2022-03-20 14:02:56',2),(21,'2022-03-20 14:03:53',2),(22,'2022-03-20 14:07:13',2),(23,'2022-03-20 14:08:37',2),(24,'2022-03-20 14:09:36',2),(25,'2022-03-20 14:11:52',2),(26,'2022-03-20 14:13:00',2),(27,'2022-03-20 14:17:29',2),(28,'2022-03-20 14:27:39',2),(29,'2022-03-20 14:32:18',3),(30,'2022-03-20 14:32:39',2),(31,'2022-03-20 15:51:50',2),(32,'2022-03-20 15:59:59',2),(33,'2022-03-20 16:10:16',2),(34,'2022-03-20 17:52:26',3),(35,'2022-03-20 17:53:17',1),(36,'2022-03-20 18:23:17',1),(37,'2022-03-20 18:43:09',2),(38,'2022-03-20 18:43:21',1),(39,'2022-03-20 21:00:28',2),(40,'2022-03-20 21:04:56',2),(41,'2022-03-20 21:09:53',2),(42,'2022-03-20 22:08:14',2),(43,'2022-03-20 22:16:05',2),(44,'2022-03-20 22:18:30',2),(45,'2022-03-20 22:19:17',2),(46,'2022-03-20 22:20:17',2),(47,'2022-03-21 11:15:06',1),(48,'2022-03-21 11:23:45',2),(49,'2022-03-21 11:23:54',1),(50,'2022-03-21 11:31:20',2),(51,'2022-03-21 11:31:38',1),(52,'2022-03-21 11:56:26',2),(53,'2022-03-21 11:57:06',1),(54,'2022-03-21 12:01:37',2),(55,'2022-03-21 12:02:05',1),(56,'2022-03-21 17:35:33',1),(57,'2022-03-22 12:33:38',1),(58,'2022-03-22 14:05:02',2),(59,'2022-03-22 14:05:57',1),(60,'2022-03-22 15:11:51',2),(61,'2022-03-22 15:51:16',1),(62,'2022-03-22 19:12:34',1),(63,'2022-03-22 19:19:21',1),(64,'2022-03-22 19:28:40',1),(65,'2022-03-22 20:02:33',2),(66,'2022-03-22 20:02:44',1),(67,'2022-03-23 11:01:48',1),(68,'2022-03-23 11:02:40',1),(69,'2022-03-23 11:08:01',1),(70,'2022-03-23 14:20:01',1),(71,'2022-03-23 14:21:35',1),(72,'2022-03-23 14:21:40',1),(73,'2022-03-23 14:23:12',4),(74,'2022-03-23 14:23:31',1),(75,'2022-03-23 14:28:25',1),(76,'2022-03-23 14:30:02',5),(77,'2022-03-23 14:35:16',5),(78,'2022-03-23 14:47:59',1),(79,'2022-03-23 14:56:49',5),(80,'2022-03-23 15:02:02',1),(81,'2022-03-23 15:03:36',5),(82,'2022-03-23 15:05:42',5),(83,'2022-03-23 15:06:17',1),(84,'2022-03-23 15:07:38',4),(85,'2022-03-23 15:07:41',1),(86,'2022-03-23 15:08:00',1),(87,'2022-03-23 15:24:42',1),(88,'2022-03-23 15:39:12',1),(89,'2022-03-23 15:39:56',1),(90,'2022-03-24 08:33:40',1),(91,'2022-03-24 08:34:15',1),(92,'2022-03-24 08:34:49',1),(93,'2022-03-24 08:40:08',1),(94,'2022-03-24 08:40:27',5),(95,'2022-03-24 08:52:42',1),(96,'2022-03-24 08:53:37',1),(97,'2022-03-24 09:17:31',1),(98,'2022-03-24 09:18:04',1),(99,'2022-03-24 09:41:00',1),(100,'2022-03-24 09:44:08',1),(101,'2022-03-24 09:44:26',1),(102,'2022-03-24 11:25:36',1),(103,'2022-03-24 20:25:48',1),(104,'2022-03-24 21:29:25',1),(105,'2022-03-24 21:30:36',1),(106,'2022-03-24 21:33:03',5),(107,'2022-03-24 23:15:54',1),(108,'2022-03-25 06:52:49',1),(109,'2022-03-25 07:05:36',1),(110,'2022-03-25 07:10:05',5),(111,'2022-03-25 07:10:22',1),(112,'2022-03-25 07:15:44',1),(113,'2022-03-25 07:20:03',5),(114,'2022-03-25 07:21:39',5),(115,'2022-03-25 08:21:30',1),(116,'2022-03-25 08:31:47',5),(117,'2022-03-25 08:51:53',1),(118,'2022-03-25 08:59:23',5),(119,'2022-03-25 09:02:54',5),(120,'2022-03-25 09:03:41',1),(121,'2022-03-25 09:09:10',1),(122,'2022-03-25 09:09:39',5),(123,'2022-03-25 09:11:56',1),(124,'2022-03-25 09:17:08',1),(125,'2022-03-25 09:18:58',1),(126,'2022-03-25 09:19:27',6),(127,'2022-03-25 10:29:40',1),(128,'2022-03-25 10:31:03',5),(129,'2022-03-25 10:31:36',1),(130,'2022-03-25 10:32:30',1),(131,'2022-03-25 10:34:32',5),(132,'2022-03-25 10:35:26',1),(133,'2022-03-27 20:12:12',1),(134,'2022-03-27 20:13:51',2),(135,'2022-03-27 20:14:42',1),(136,'2022-03-27 20:18:36',2),(137,'2022-03-27 20:19:06',1),(138,'2022-03-27 20:20:18',2),(139,'2022-03-27 20:22:02',1),(140,'2022-03-27 20:22:44',1),(141,'2022-03-27 20:30:02',1),(142,'2022-03-27 20:36:29',1),(143,'2022-03-30 19:52:23',1),(144,'2022-04-02 19:10:27',2),(145,'2022-04-02 19:12:52',1),(146,'2022-04-02 19:32:01',2),(147,'2022-04-02 19:35:26',1),(148,'2022-04-06 12:41:56',2),(149,'2022-04-06 12:42:36',2),(150,'2022-04-06 12:43:06',2),(151,'2022-04-06 12:46:46',2),(152,'2022-04-06 12:47:30',1),(153,'2022-04-06 12:47:37',1),(154,'2022-04-06 12:49:53',1),(155,'2022-04-08 21:26:50',2),(156,'2022-04-08 21:27:02',1),(157,'2022-04-08 21:30:03',1),(158,'2022-04-08 21:33:35',1),(159,'2022-04-08 21:35:10',1),(160,'2022-04-08 21:35:24',2),(161,'2022-04-08 21:36:45',2),(162,'2022-04-10 13:10:44',1),(163,'2022-04-10 13:10:50',1),(164,'2022-04-10 13:11:04',2),(165,'2022-04-10 14:36:45',2),(166,'2022-04-10 15:03:07',2),(167,'2022-04-10 15:28:04',2),(168,'2022-04-14 11:08:00',2),(169,'2022-04-14 11:11:42',1),(170,'2022-04-14 11:13:30',2),(171,'2022-04-14 19:06:47',2),(172,'2022-04-14 19:07:15',1),(173,'2022-04-14 19:21:53',2),(174,'2022-04-14 19:24:10',2),(175,'2022-04-14 19:26:09',2),(176,'2022-04-14 20:32:12',2),(177,'2022-04-14 20:50:48',1),(178,'2022-04-14 20:56:47',2),(179,'2022-04-14 20:57:29',1),(180,'2022-04-14 20:59:07',2),(181,'2022-04-14 20:59:35',2),(182,'2022-04-14 21:03:31',2),(183,'2022-04-14 21:05:41',2),(184,'2022-04-14 21:06:17',2),(185,'2022-04-14 21:08:29',2),(186,'2022-04-14 21:08:43',2),(187,'2022-04-15 10:50:13',2),(188,'2022-04-15 10:52:45',2),(189,'2022-04-15 10:59:32',2),(190,'2022-04-15 10:59:49',2),(191,'2022-04-15 11:00:55',2),(192,'2022-04-15 11:04:40',1),(193,'2022-04-15 11:08:11',2),(194,'2022-04-15 11:18:31',1),(195,'2022-04-15 11:18:40',2),(196,'2022-04-15 11:21:20',1),(197,'2022-04-15 11:29:01',2),(198,'2022-04-15 11:30:53',1),(199,'2022-04-15 11:33:03',2),(200,'2022-04-15 11:42:37',2),(201,'2022-04-15 12:22:17',2),(202,'2022-04-15 12:27:10',1),(203,'2022-04-15 12:30:12',2),(204,'2022-04-15 15:05:05',1),(205,'2022-04-15 15:17:21',2),(206,'2022-04-15 18:19:51',2),(207,'2022-04-15 18:21:18',1),(208,'2022-04-15 18:23:28',1),(209,'2022-04-15 18:59:56',1),(210,'2022-04-15 19:09:40',2),(211,'2022-04-15 19:14:04',2),(212,'2022-04-15 19:16:16',2),(213,'2022-04-15 19:16:39',1),(214,'2022-04-15 19:18:02',2),(215,'2022-04-17 14:19:39',2),(216,'2022-04-17 14:19:52',1),(217,'2022-04-17 14:20:21',2),(218,'2022-04-17 14:20:41',1),(219,'2022-04-17 14:20:55',2),(220,'2022-04-17 14:26:39',2),(221,'2022-04-19 14:57:59',1),(222,'2022-04-19 15:04:13',1),(223,'2022-04-19 17:41:19',2),(224,'2022-04-19 19:05:52',1),(225,'2022-04-19 19:06:17',1),(226,'2022-04-19 19:06:40',2),(227,'2022-04-19 19:06:50',2),(228,'2022-04-19 19:06:59',1),(229,'2022-04-19 19:07:09',2),(230,'2022-04-19 19:07:41',1),(231,'2022-04-19 19:07:53',2),(232,'2022-04-19 19:10:35',1),(233,'2022-04-19 19:11:07',1),(234,'2022-04-19 19:11:11',2),(235,'2022-04-20 17:38:55',1),(236,'2022-04-20 17:39:00',1),(237,'2022-04-20 17:41:00',1),(238,'2022-04-20 17:41:25',2),(239,'2022-04-20 17:41:30',1),(240,'2022-04-20 17:41:46',1),(241,'2022-04-20 17:43:08',2),(242,'2022-04-20 17:43:53',2),(243,'2022-04-20 17:44:22',2),(244,'2022-04-20 17:45:38',2),(245,'2022-04-20 17:46:10',2),(246,'2022-04-20 17:46:34',2),(247,'2022-04-20 17:47:16',2),(248,'2022-04-20 17:47:20',2),(249,'2022-04-20 17:53:57',1),(250,'2022-04-20 17:54:03',1),(251,'2022-04-20 17:54:50',2),(252,'2022-04-20 19:03:07',1),(253,'2022-04-20 19:42:23',1),(254,'2022-04-20 20:22:59',1),(255,'2022-04-20 08:23:09',1),(256,'2022-04-20 20:24:51',2),(257,'2022-04-20 20:25:00',1),(258,'2022-04-20 20:38:51',1),(259,'2022-04-21 16:28:26',1),(260,'2022-04-21 16:32:40',2),(261,'2022-04-21 16:35:45',1),(262,'2022-04-21 16:35:53',2),(263,'2022-04-21 16:57:52',2),(264,'2022-04-21 16:57:54',1),(265,'2022-04-21 18:09:37',1),(266,'2022-04-21 18:09:52',2),(267,'2022-04-23 11:17:34',2),(268,'2022-04-23 11:17:42',1),(269,'2022-04-23 11:19:09',1),(270,'2022-04-23 11:19:29',1),(271,'2022-04-23 11:33:42',9),(272,'2022-04-23 11:34:31',9),(273,'2022-04-23 11:35:22',9),(274,'2022-04-23 11:35:48',9),(275,'2022-04-23 11:36:35',9),(276,'2022-04-23 11:45:44',9),(277,'2022-04-23 11:54:38',9),(278,'2022-04-23 12:21:31',2),(279,'2022-04-23 12:26:50',1),(280,'2022-04-23 12:37:56',1),(281,'2022-04-23 15:08:36',1),(282,'2022-04-23 16:13:38',1),(283,'2022-04-23 16:14:20',2),(284,'2022-04-23 16:17:49',1),(285,'2022-04-23 18:47:26',2),(286,'2022-04-23 20:15:26',2),(287,'2022-04-23 20:15:51',2),(288,'2022-04-23 20:16:02',2),(289,'2022-04-23 20:16:16',1),(290,'2022-04-23 20:16:25',2),(291,'2022-04-23 20:33:50',1),(292,'2022-04-24 13:18:02',2),(293,'2022-04-24 13:18:24',1),(294,'2022-04-24 13:18:32',2),(295,'2022-04-24 13:19:06',2),(296,'2022-04-24 13:19:29',1),(297,'2022-04-24 13:36:17',1),(298,'2022-04-24 13:36:30',2),(299,'2022-04-24 13:36:43',2),(300,'2022-04-24 13:36:51',1),(301,'2022-04-24 13:37:25',9),(302,'2022-04-24 13:37:52',1),(303,'2022-04-24 13:38:43',1),(304,'2022-04-24 13:56:01',2),(305,'2022-04-24 13:56:11',1),(306,'2022-04-24 13:57:22',1),(307,'2022-04-24 13:57:29',2),(308,'2022-04-24 13:58:03',1),(309,'2022-04-24 13:58:11',9),(310,'2022-04-24 15:06:35',1),(311,'2022-04-24 15:12:24',1),(312,'2022-04-24 15:14:36',2),(313,'2022-04-25 20:56:20',1);
/*!40000 ALTER TABLE `sesiones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solicitudes`
--

DROP TABLE IF EXISTS `solicitudes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solicitudes` (
  `idsolicitud` int NOT NULL AUTO_INCREMENT,
  `fecha_hora` datetime DEFAULT NULL,
  `valor_total` int NOT NULL,
  `estado_solicitud` varchar(30) DEFAULT 'No Terminada',
  `impuestos` decimal(4,2) NOT NULL DEFAULT '0.19',
  `usuarios_idusuario` int NOT NULL,
  `articulos_idarticulo` int NOT NULL,
  PRIMARY KEY (`idsolicitud`),
  KEY `fk_solicitudes_usuarios1_idx` (`usuarios_idusuario`),
  KEY `fk_solicitudes_articulos1_idx` (`articulos_idarticulo`),
  CONSTRAINT `fk_solicitudes_articulos1` FOREIGN KEY (`articulos_idarticulo`) REFERENCES `articulos` (`idarticulo`),
  CONSTRAINT `fk_solicitudes_usuarios1` FOREIGN KEY (`usuarios_idusuario`) REFERENCES `usuarios` (`idusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitudes`
--

LOCK TABLES `solicitudes` WRITE;
/*!40000 ALTER TABLE `solicitudes` DISABLE KEYS */;
INSERT INTO `solicitudes` VALUES (9,'2022-03-20 16:53:48',38,'Terminada',0.19,1,1),(10,'2022-03-20 16:55:31',1053,'No Terminada',0.19,1,1),(12,'2022-03-20 16:58:00',23800,'No Terminada',0.19,1,1),(13,'2022-03-20 16:58:40',11900,'No Terminada',0.19,2,1),(17,'2022-03-21 12:02:00',11900,'Terminada',0.19,2,1),(19,'2022-03-22 20:02:40',132,'Terminada',0.19,2,3),(21,'2022-03-23 15:03:56',23800,'No Terminada',0.19,5,2),(22,'2022-03-23 15:04:02',23800,'No Terminada',0.19,5,2),(23,'2022-03-25 07:10:14',249900,'Terminada',0.19,5,7),(26,'2022-03-25 09:10:44',297500,'No Terminada',0.19,5,7),(27,'2022-03-25 09:10:57',65450,'No Terminada',0.19,5,45),(28,'2022-03-25 10:31:14',148750,'No Terminada',0.19,5,3),(29,'2022-03-25 10:31:18',95200,'Terminada',0.19,5,6),(30,'2022-04-06 12:46:49',148750,'No Terminada',0.19,2,3),(31,'2022-04-19 19:12:39',59500,'No Terminada',0.19,2,2),(32,'2022-04-20 08:24:55',178500,'No Terminada',0.19,2,9);
/*!40000 ALTER TABLE `solicitudes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idusuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` varchar(45) NOT NULL,
  `documento` varchar(100) NOT NULL,
  `estado` varchar(25) NOT NULL DEFAULT 'Activo',
  PRIMARY KEY (`idusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'admin Pro','admin','Carrera 11 05-20','3154255879','admin@partsco.com','$2a$08$zsYfs3.WGoGd1pa.42mXLuhI/wEiI.UVST.ZQ3Vdremmw1FFBFNKC','admin','cedula cedula 1098825194','Inactivo'),(2,'Santiago','Gaona','Carrera 11 05-20','315428879','sgaonacarvajal@outlook.com','$2a$08$xWuYyJvgtiClng8jMXM5P.wmWLs1UpxmX6YMGdLXZ18HU4b7obC1W','usuario','cedula cedula 3211231233312','Activo'),(3,'Camilao Andresa','Gaonaa','Carrera 11 05-200','3154255879','camailo@hotmail.com','$2a$08$lqZa1HEciPqItVG0f6GSgOhHFsHXcRE7KttA8xkpfvOqWfWhJ0dW6','usuario','cedula cedula cedula cedula 1098749707','Inactivo'),(4,'Jossyr','Pinto Caddevila','Calle 24#5-64','3016659291','jossyrpin@gmail.com','$2a$08$HyiASQh/eebhnYoczpVgNeEPez8ceuoZi.jFlIxrHxRg1mC2/nAqO','usuario','cedula cedula 1006576410','Inactivo'),(5,'Estefany','Rueda','Calle 28 #30-81','3144009631','estefany@partsco.com','$2a$08$oZrw98hMGNbkVOUIR8pJQe6ytXCpOxUggoBwhA.bPGF2KIranuPRy','usuario','cedula cedula cedula cedula 1007665801','Activo'),(6,'Juan','Paez','Cerca del Cementerio','3154668732','paezempleado@partsco.com','$2a$08$zicQVgYKyOUyvJEfH1prd.vfkGAvBsojItEIOkId80K9zEA0zR10q','empleado','cedula 1765487225','Inactivo'),(7,'Javier','Pino','cakmowd 18942','38091931','correoxd@hotmail.com','$2a$08$k13xiSY9gHSCr9/S6FFAP.0EJ3d301EHMZHoAX0KJH1vSAQBlCu0e','usuario','cedula 189318913','Inactivo'),(8,'Santiago','Carvajal','Carrera 11 05-20','2323322332','sgaonacarvjal@outlook.com','$2a$08$t/adsTF2cVQ.sCm4Z7NsKOs.owuSdZTJlN6Tjv6nvDJTPtaQFGI8S','usuario','cedula cedula 3322332','Activo'),(9,'Santiago','consorcio','1414124114','3098489','consorcio@consorcio.com','$2a$08$0jIyfdOmNGwDaY8RZbpNcuyNVqB0IfMKSXPPnZ9Lgt1MzC4ckhDqC','consorcio','cedula 19818941','Activo');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-25 22:37:01
