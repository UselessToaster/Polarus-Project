-- MySQL dump 10.13  Distrib 5.7.24, for osx11.1 (x86_64)
--
-- Host: localhost    Database: texas_bills
-- ------------------------------------------------------
-- Server version	9.4.0-commercial

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bill`
--

DROP TABLE IF EXISTS `bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bill` (
  `id` int NOT NULL AUTO_INCREMENT,
  `caption` text NOT NULL,
  `bill_name` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill`
--

LOCK TABLES `bill` WRITE;
/*!40000 ALTER TABLE `bill` DISABLE KEYS */;
INSERT INTO `bill` VALUES (1,'Relating to education funding and teacher pay',NULL),(2,'Relating to education funding and teacher pay',NULL),(3,'Relating to education funding and teacher pay',NULL),(4,'Relating to education funding and teacher pay',NULL),(7,'Relating to election procedures regarding accepting a voter with a residence address that is not current and the immediate effect of a voter\'s registration after the registrar\'s receipt of certain change of address notices.',NULL),(8,'Relating to election procedures regarding accepting a voter with a residence address that is not current and the immediate effect of a voter\'s registration after the registrar\'s receipt of certain change of address notices.',NULL),(9,'Relating to youth camp emergency plans and preparedness; authorizing penalties.',NULL),(10,'Relating to the composition of the districts for the election of members of the United States House of Representatives from the State of Texas.',NULL),(11,'Relating to prohibitions on the manufacture and provision of abortion-inducing drugs, including the jurisdiction of and effect of certain judgments by courts within and outside this state with respect to the manufacture and provision of those drugs, and to protections from certain counteractions under the laws of other states and jurisdictions; authorizing qui tam actions.',NULL),(12,'Relating to public school accountability and transparency, including the implementation of an instructionally supportive assessment program and the adoption and administration of assessment instruments in public schools, indicators of achievement, public school performance ratings, and interventions and sanctions under the public school accountability system, a grant program for school district local accountability plans, and actions challenging Texas Education Agency decisions related to public school accountability.',NULL),(13,'Relating to the operation and administration of and practices and procedures related to proceedings in the judicial branch of state government, including court security, court documents and arrest warrants, document delivery, juvenile boards, constitutional amendment election challenges, record retention, youth diversion, court-ordered mental health services, the powers of the Texas Supreme Court, jurors, and the special prosecution unit; increasing a criminal penalty; authorizing fees.',NULL),(14,'Relating to a restriction on the acceptance of political contributions and the making of certain political expenditures by a member of the legislature and certain political committees during certain periods in which a member is absent from a legislative session; authorizing a civil penalty.',NULL),(15,'Relating to measures to prevent and reduce fraudulent charitable solicitations and theft during declared disasters, including establishing a designation program for disaster relief nonprofit organizations and financial institutions; creating a criminal offense; increasing a criminal penalty.',NULL),(16,'Relating to the exemption from ad valorem taxation of property owned by certain nonprofit corporations, located in a populous county, and used to promote agriculture, support youth, and provide educational support in the community.',NULL),(17,'Relating to a pharmacist\'s authority to dispense ivermectin without a prescription.',NULL),(18,'Relating to contracting with law enforcement agencies in certain counties.',NULL),(19,'Relating to the funding of law enforcement agencies in certain counties.',NULL),(20,'Relating to campground and youth camp safety.',NULL),(21,'Relating to outdoor warning sirens in flash flood-prone areas.',NULL),(22,'Relating to making supplemental appropriations for disaster relief and preparedness and giving direction and adjustment authority regarding those appropriations.',NULL),(23,'Relating to the designation and use of certain spaces and facilities according to sex; authorizing a civil penalty and a private civil right of action.',NULL),(24,'Relating to an affirmative defense to prosecution for certain victims of trafficking of persons or compelling prostitution.',NULL),(25,'Relating to the duty of the attorney general to prosecute criminal offenses prescribed by the election laws of this state.',NULL),(26,'Relating to the provision by a political subdivision of credits against impact fees to builders and developers for certain water conservation and reuse projects.',NULL),(27,'Relating to real property theft and real property fraud; establishing recording requirements for certain documents concerning real property; creating the criminal offenses of real property theft and real property fraud and establishing a statute of limitations, restitution, and certain procedures with respect to those offenses.',NULL),(28,'Relating to an exemption from the requirement to obtain a permit from the Texas Commission on Environmental Quality for certain dams or reservoirs operated and maintained for the purposes of erosion, floodwater, and sediment control.',NULL),(29,'Relating to election procedures regarding accepting a voter with a residence address that is not current and the immediate effect of a voter\'s registration after the registrar\'s receipt of certain change of address notices.',NULL),(30,'Relating to education funding and teacher pay',NULL),(31,'Relating to election procedures regarding accepting a voter with a residence address that is not current and the immediate effect of a voter\'s registration after the registrar\'s receipt of certain change of address notices.','SB 54');
/*!40000 ALTER TABLE `bill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill_legislator_role`
--

DROP TABLE IF EXISTS `bill_legislator_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bill_legislator_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bill_id` int DEFAULT NULL,
  `legislator_id` int DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `bill_id` (`bill_id`),
  KEY `legislator_id` (`legislator_id`),
  CONSTRAINT `bill_legislator_role_ibfk_1` FOREIGN KEY (`bill_id`) REFERENCES `bill` (`id`),
  CONSTRAINT `bill_legislator_role_ibfk_2` FOREIGN KEY (`legislator_id`) REFERENCES `legislator` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=327 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill_legislator_role`
--

LOCK TABLES `bill_legislator_role` WRITE;
/*!40000 ALTER TABLE `bill_legislator_role` DISABLE KEYS */;
INSERT INTO `bill_legislator_role` VALUES (1,1,1,'Author'),(2,1,2,'Author'),(3,1,3,'Sponsor'),(4,2,1,'Author'),(5,2,2,'Author'),(6,2,3,'Sponsor'),(7,3,1,'Author'),(8,3,2,'Author'),(9,3,3,'Sponsor'),(10,4,1,'Author'),(11,4,2,'Author'),(12,4,3,'Sponsor'),(25,7,15,'Author'),(26,7,16,'Sponsor'),(27,8,15,'Author'),(28,8,16,'Sponsor'),(29,9,17,'Author'),(30,9,18,'Author'),(31,9,19,'Author'),(32,9,20,'Author'),(33,9,21,'Author'),(34,9,22,'Sponsor'),(35,10,23,'Author'),(36,10,24,'Author'),(37,10,25,'Author'),(38,10,26,'Author'),(39,10,27,'Author'),(40,10,18,'Sponsor'),(41,11,28,'Author'),(42,11,29,'Author'),(43,11,30,'Author'),(44,11,25,'Author'),(45,11,31,'Author'),(46,11,15,'Sponsor'),(47,12,32,'Author'),(48,12,33,'Author'),(49,12,34,'Author'),(50,12,31,'Author'),(51,12,35,'Author'),(52,12,36,'Author'),(53,12,37,'Sponsor'),(54,13,28,'Author'),(55,13,36,'Author'),(56,13,38,'Author'),(57,13,39,'Author'),(58,13,40,'Author'),(59,13,41,'Author'),(60,13,15,'Sponsor'),(61,14,16,'Author'),(62,14,42,'Author'),(63,14,43,'Author'),(64,14,44,'Sponsor'),(65,14,45,'Sponsor'),(66,15,17,'Author'),(67,15,46,'Author'),(68,15,47,'Author'),(69,15,48,'Author'),(70,15,21,'Author'),(71,15,22,'Sponsor'),(72,16,49,'Author'),(73,16,50,'Author'),(74,16,43,'Author'),(75,16,51,'Author'),(76,16,52,'Author'),(77,16,37,'Sponsor'),(78,17,53,'Author'),(79,17,54,'Author'),(80,17,36,'Author'),(81,17,25,'Author'),(82,17,55,'Author'),(83,17,56,'Sponsor'),(84,18,50,'Author'),(85,18,57,'Author'),(86,18,20,'Author'),(87,18,49,'Author'),(88,18,51,'Author'),(89,18,37,'Sponsor'),(90,19,50,'Author'),(91,19,58,'Author'),(92,19,59,'Author'),(93,19,51,'Author'),(94,19,60,'Author'),(95,19,37,'Sponsor'),(96,20,22,'Author'),(97,20,37,'Author'),(98,20,61,'Author'),(99,20,62,'Author'),(100,20,63,'Author'),(101,20,44,'Author'),(102,20,45,'Author'),(103,20,44,'Author'),(104,20,64,'Author'),(105,20,65,'Author'),(106,20,18,'Author'),(107,20,66,'Author'),(108,20,67,'Author'),(109,20,68,'Author'),(110,20,69,'Author'),(111,20,70,'Author'),(112,20,17,'Sponsor'),(113,20,19,'Sponsor'),(114,20,18,'Sponsor'),(115,20,20,'Sponsor'),(116,20,21,'Sponsor'),(117,21,37,'Author'),(118,21,71,'Author'),(119,21,72,'Author'),(120,21,61,'Author'),(121,21,73,'Author'),(122,21,74,'Author'),(123,21,62,'Author'),(124,21,75,'Author'),(125,21,63,'Author'),(126,21,56,'Author'),(127,21,44,'Author'),(128,21,45,'Author'),(129,21,44,'Author'),(130,21,64,'Author'),(131,21,65,'Author'),(132,21,15,'Author'),(133,21,18,'Author'),(134,21,66,'Author'),(135,21,76,'Author'),(136,21,67,'Author'),(137,21,77,'Author'),(138,21,68,'Author'),(139,21,78,'Author'),(140,21,69,'Author'),(141,21,22,'Author'),(142,21,70,'Author'),(143,21,79,'Author'),(144,21,80,'Author'),(145,21,81,'Author'),(146,21,36,'Sponsor'),(147,21,17,'Sponsor'),(148,21,82,'Sponsor'),(149,21,55,'Sponsor'),(150,21,83,'Sponsor'),(151,22,65,'Author'),(152,22,37,'Author'),(153,22,61,'Author'),(154,22,73,'Author'),(155,22,74,'Author'),(156,22,62,'Author'),(157,22,56,'Author'),(158,22,44,'Author'),(159,22,64,'Author'),(160,22,15,'Author'),(161,22,18,'Author'),(162,22,66,'Author'),(163,22,76,'Author'),(164,22,67,'Author'),(165,22,78,'Author'),(166,22,69,'Author'),(167,22,22,'Author'),(168,22,70,'Author'),(169,22,80,'Author'),(170,22,81,'Author'),(171,22,84,'Sponsor'),(172,23,67,'Author'),(173,23,37,'Author'),(174,23,72,'Author'),(175,23,73,'Author'),(176,23,74,'Author'),(177,23,62,'Author'),(178,23,63,'Author'),(179,23,56,'Author'),(180,23,44,'Author'),(181,23,45,'Author'),(182,23,65,'Author'),(183,23,15,'Author'),(184,23,18,'Author'),(185,23,66,'Author'),(186,23,69,'Author'),(187,23,79,'Author'),(188,23,85,'Sponsor'),(189,23,31,'Sponsor'),(190,23,84,'Sponsor'),(191,23,28,'Sponsor'),(192,23,54,'Sponsor'),(193,24,78,'Author'),(194,24,71,'Author'),(195,24,37,'Author'),(196,24,61,'Author'),(197,24,73,'Author'),(198,24,74,'Author'),(199,24,62,'Author'),(200,24,63,'Author'),(201,24,56,'Author'),(202,24,44,'Author'),(203,24,45,'Author'),(204,24,44,'Author'),(205,24,64,'Author'),(206,24,65,'Author'),(207,24,15,'Author'),(208,24,18,'Author'),(209,24,66,'Author'),(210,24,76,'Author'),(211,24,67,'Author'),(212,24,69,'Author'),(213,24,22,'Author'),(214,24,70,'Author'),(215,24,79,'Author'),(216,24,80,'Author'),(217,24,81,'Author'),(218,24,86,'Sponsor'),(219,25,15,'Author'),(220,25,37,'Author'),(221,25,73,'Author'),(222,25,74,'Author'),(223,25,63,'Author'),(224,25,56,'Author'),(225,25,44,'Author'),(226,25,45,'Author'),(227,25,65,'Author'),(228,25,18,'Author'),(229,25,67,'Author'),(230,25,78,'Author'),(231,25,69,'Author'),(232,25,22,'Author'),(233,25,70,'Author'),(234,25,79,'Author'),(235,25,16,'Sponsor'),(236,26,22,'Author'),(237,26,71,'Author'),(238,26,37,'Author'),(239,26,72,'Author'),(240,26,61,'Author'),(241,26,73,'Author'),(242,26,74,'Author'),(243,26,87,'Author'),(244,26,62,'Author'),(245,26,75,'Author'),(246,26,63,'Author'),(247,26,56,'Author'),(248,26,44,'Author'),(249,26,45,'Author'),(250,26,44,'Author'),(251,26,64,'Author'),(252,26,65,'Author'),(253,26,15,'Author'),(254,26,18,'Author'),(255,26,66,'Author'),(256,26,76,'Author'),(257,26,67,'Author'),(258,26,77,'Author'),(259,26,68,'Author'),(260,26,78,'Author'),(261,26,69,'Author'),(262,26,70,'Author'),(263,26,79,'Author'),(264,26,80,'Author'),(265,26,81,'Author'),(266,26,33,'Sponsor'),(267,26,88,'Sponsor'),(268,27,80,'Author'),(269,27,71,'Author'),(270,27,37,'Author'),(271,27,61,'Author'),(272,27,73,'Author'),(273,27,74,'Author'),(274,27,87,'Author'),(275,27,62,'Author'),(276,27,75,'Author'),(277,27,63,'Author'),(278,27,56,'Author'),(279,27,44,'Author'),(280,27,45,'Author'),(281,27,44,'Author'),(282,27,64,'Author'),(283,27,65,'Author'),(284,27,15,'Author'),(285,27,89,'Author'),(286,27,18,'Author'),(287,27,76,'Author'),(288,27,67,'Author'),(289,27,77,'Author'),(290,27,68,'Author'),(291,27,78,'Author'),(292,27,69,'Author'),(293,27,22,'Author'),(294,27,70,'Author'),(295,27,79,'Author'),(296,27,40,'Sponsor'),(297,27,90,'Sponsor'),(298,27,52,'Sponsor'),(299,27,58,'Sponsor'),(300,27,20,'Sponsor'),(301,28,81,'Author'),(302,28,71,'Author'),(303,28,37,'Author'),(304,28,72,'Author'),(305,28,61,'Author'),(306,28,73,'Author'),(307,28,87,'Author'),(308,28,62,'Author'),(309,28,44,'Author'),(310,28,45,'Author'),(311,28,44,'Author'),(312,28,64,'Author'),(313,28,18,'Author'),(314,28,76,'Author'),(315,28,69,'Author'),(316,28,22,'Author'),(317,28,42,'Sponsor'),(318,28,91,'Sponsor'),(319,28,82,'Sponsor'),(320,29,15,'Author'),(321,29,16,'Sponsor'),(322,30,1,'Author'),(323,30,2,'Author'),(324,30,3,'Sponsor'),(325,31,15,'Author'),(326,31,16,'Sponsor');
/*!40000 ALTER TABLE `bill_legislator_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill_subject`
--

DROP TABLE IF EXISTS `bill_subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bill_subject` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bill_id` int DEFAULT NULL,
  `subject_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `bill_id` (`bill_id`),
  KEY `subject_id` (`subject_id`),
  CONSTRAINT `bill_subject_ibfk_1` FOREIGN KEY (`bill_id`) REFERENCES `bill` (`id`),
  CONSTRAINT `bill_subject_ibfk_2` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=349 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill_subject`
--

LOCK TABLES `bill_subject` WRITE;
/*!40000 ALTER TABLE `bill_subject` DISABLE KEYS */;
INSERT INTO `bill_subject` VALUES (1,1,1),(2,1,2),(3,1,3),(4,2,1),(5,2,2),(6,2,3),(7,3,1),(8,3,2),(9,3,3),(10,4,1),(11,4,2),(12,4,3),(44,7,35),(45,7,36),(46,7,37),(47,7,38),(48,7,39),(49,8,35),(50,8,36),(51,8,37),(52,8,38),(53,8,39),(54,9,40),(55,9,41),(56,9,42),(57,9,43),(58,9,44),(59,9,45),(60,9,46),(61,9,47),(62,9,48),(63,9,49),(64,9,50),(65,9,51),(66,9,52),(67,9,53),(68,9,54),(69,9,55),(70,9,56),(71,9,57),(72,9,58),(73,9,59),(74,9,60),(75,9,61),(76,9,62),(77,9,63),(78,9,64),(79,9,65),(80,9,66),(81,10,67),(82,10,68),(83,10,69),(84,10,70),(85,11,71),(86,11,72),(87,11,73),(88,11,74),(89,11,75),(90,11,76),(91,11,77),(92,11,78),(93,11,79),(94,12,80),(95,12,81),(96,12,82),(97,12,83),(98,12,84),(99,12,44),(100,12,85),(101,12,86),(102,12,87),(103,12,1),(104,12,88),(105,12,89),(106,12,90),(107,12,91),(108,12,92),(109,13,93),(110,13,94),(111,13,95),(112,13,96),(113,13,97),(114,13,98),(115,13,99),(116,13,100),(117,13,101),(118,13,102),(119,13,103),(120,13,104),(121,13,105),(122,13,106),(123,13,107),(124,13,108),(125,13,109),(126,13,110),(127,13,111),(128,13,112),(129,13,113),(130,13,114),(131,13,115),(132,13,116),(133,13,117),(134,13,118),(135,13,119),(136,13,120),(137,13,121),(138,13,122),(139,13,123),(140,13,124),(141,13,125),(142,13,126),(143,13,127),(144,13,128),(145,13,129),(146,13,130),(147,13,131),(148,13,132),(149,13,133),(150,13,134),(151,13,135),(152,13,136),(153,13,137),(154,13,138),(155,13,84),(156,13,139),(157,13,140),(158,13,141),(159,13,142),(160,13,143),(161,13,144),(162,13,145),(163,13,146),(164,13,147),(165,13,148),(166,13,149),(167,13,79),(168,13,150),(169,13,151),(170,13,61),(171,13,62),(172,13,152),(173,14,153),(174,14,67),(175,14,142),(176,14,154),(177,14,79),(178,15,155),(179,15,72),(180,15,156),(181,15,157),(182,15,40),(183,15,38),(184,15,158),(185,15,159),(186,15,160),(187,15,161),(188,15,55),(189,15,56),(190,15,162),(191,16,109),(192,16,163),(193,16,164),(194,16,155),(195,16,165),(196,16,166),(197,16,167),(198,17,74),(199,17,168),(200,17,169),(201,17,76),(202,17,170),(203,17,57),(204,17,171),(205,17,172),(206,17,63),(207,17,64),(208,18,109),(209,18,173),(210,18,174),(211,18,175),(212,18,176),(213,18,177),(214,18,36),(215,18,178),(216,18,179),(217,18,180),(218,18,142),(219,18,181),(220,18,182),(221,18,147),(222,19,109),(223,19,173),(224,19,174),(225,19,175),(226,19,176),(227,19,177),(228,19,36),(229,19,178),(230,19,179),(231,19,180),(232,19,142),(233,19,181),(234,19,182),(235,19,147),(236,20,40),(237,20,38),(238,20,183),(239,20,42),(240,20,39),(241,20,43),(242,20,184),(243,20,52),(244,20,85),(245,20,185),(246,20,53),(247,20,55),(248,20,56),(249,20,186),(250,20,57),(251,20,63),(252,20,64),(253,21,40),(254,21,41),(255,21,43),(256,21,44),(257,21,45),(258,21,187),(259,21,51),(260,21,52),(261,21,65),(262,21,66),(263,22,40),(264,22,41),(265,22,43),(266,22,188),(267,22,189),(268,22,190),(269,22,45),(270,22,187),(271,22,52),(272,22,191),(273,22,192),(274,23,72),(275,23,193),(276,23,73),(277,23,194),(278,23,195),(279,23,39),(280,23,188),(281,23,189),(282,23,196),(283,23,197),(284,23,198),(285,23,199),(286,23,200),(287,23,201),(288,23,161),(289,23,202),(290,23,203),(291,23,202),(292,23,204),(293,24,205),(294,24,137),(295,24,206),(296,24,207),(297,24,208),(298,24,209),(299,24,210),(300,24,211),(301,25,131),(302,25,136),(303,25,137),(304,25,208),(305,25,36),(306,25,153),(307,25,179),(308,25,161),(309,26,212),(310,26,177),(311,26,213),(312,26,138),(313,26,39),(314,26,214),(315,27,177),(316,27,73),(317,27,136),(318,27,215),(319,27,216),(320,27,217),(321,27,218),(322,27,159),(323,27,219),(324,27,220),(325,27,221),(326,27,161),(327,27,162),(328,28,222),(329,28,45),(330,28,187),(331,28,223),(332,28,52),(333,28,224),(334,28,225),(335,28,226),(336,29,35),(337,29,36),(338,29,37),(339,29,38),(340,29,39),(341,30,1),(342,30,2),(343,30,3),(344,31,35),(345,31,36),(346,31,37),(347,31,38),(348,31,39);
/*!40000 ALTER TABLE `bill_subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `legislator`
--

DROP TABLE IF EXISTS `legislator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `legislator` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `legislator`
--

LOCK TABLES `legislator` WRITE;
/*!40000 ALTER TABLE `legislator` DISABLE KEYS */;
INSERT INTO `legislator` VALUES (1,'Rep. Alice Johnson'),(2,'Rep. Bob Smith'),(3,'Sen. Maria Lopez'),(15,'Hughes'),(16,'Shaheen'),(17,'Darby'),(18,'King'),(19,'Meyer'),(20,'DeAyala'),(21,'McQueeney'),(22,'Perry'),(23,'Hunter'),(24,'Vasut'),(25,'Pierson'),(26,'Spiller'),(27,'Guillen'),(28,'Leach'),(29,'Hickland'),(30,'Troxclair'),(31,'Metcalf'),(32,'Buckley'),(33,'Bell'),(34,'Keith'),(35,'Landgraf'),(36,'Wilson'),(37,'Bettencourt'),(38,'Morales'),(39,'Eddie'),(40,'Dyson'),(41,'LaHood'),(42,'Gerdes'),(43,'Swanson'),(44,'Hinojosa'),(45,'Adam'),(46,'Louderback'),(47,'Martinez'),(48,'Barry'),(49,'Harless'),(50,'Oliverson'),(51,'Hull'),(52,'Ashby'),(53,'Shofner'),(54,'Harris'),(55,'Virdell'),(56,'Hall'),(57,'Schofield'),(58,'Cain'),(59,'Toth'),(60,'Cunningham'),(61,'Blanco'),(62,'Flores'),(63,'Hagenbuch'),(64,'Juan \"Chuy\"'),(65,'Huffman'),(66,'Kolkhorst'),(67,'Middleton'),(68,'Nichols'),(69,'Paxton'),(70,'Schwertner'),(71,'Alvarado'),(72,'Birdwell'),(73,'Campbell'),(74,'Creighton'),(75,'Gutierrez'),(76,'Menéndez'),(77,'Miles'),(78,'Parker'),(79,'Sparks'),(80,'West'),(81,'Zaffirini'),(82,'Leo Wilson'),(83,'Wharton'),(84,'Bonnen'),(85,'Orr'),(86,'Cook'),(87,'Eckhardt'),(88,'Cecil'),(89,'Johnson'),(90,'Anchía'),(91,'Bumgarner');
/*!40000 ALTER TABLE `legislator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subject` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=227 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` VALUES (1,'education'),(2,'funding'),(3,'teachers'),(35,'Elections--Administration (I0277'),(36,'Elections--General (I0310'),(37,'Elections--Registration & Suffrage (I0265'),(38,'Electronic Information Systems (I0311'),(39,'Political Subdivisions (I0588'),(40,'Disaster Preparedness & Relief (I0211'),(41,'Governor (I0375'),(42,'Minors--Health & Safety (I0533'),(43,'Safety (I0740'),(44,'State Finances--Management & Control (I0748'),(45,'Water--Development (I0875'),(46,'YOUTH CAMP ALERT'),(47,'MITIGATION'),(48,'PREPAREDNESS'),(49,'AND EMERGENCY RESPONSE (YOUTH CAMPER'),(50,'ACT (PL0GX'),(51,'ALERT SYSTEM (S0523'),(52,'FLOODS (S0327'),(53,'YOUTH CAMPS (S2463'),(54,'TEXAS A&M FOREST SERVICE (U0213'),(55,'EMERGENCY MANAGEMENT'),(56,'TEXAS DIVISION OF (VP6FW'),(57,'HEALTH & HUMAN SERVICES COMMISSION (V0177'),(58,'INSURANCE'),(59,'TEXAS DEPARTMENT OF (V0006'),(60,'PARKS & WILDLIFE DEPARTMENT (V0045'),(61,'PUBLIC SAFETY'),(62,'DEPARTMENT OF (V0251'),(63,'STATE HEALTH SERVICES'),(64,'DEPARTMENT OF (V0463'),(65,'WATER DEVELOPMENT BOARD'),(66,'TEXAS (V2481'),(67,'Legislature (I0520'),(68,'Redistricting (I0645'),(69,'HOUSE OF REPRESENTATIVES'),(70,'US (V0774'),(71,'Abortion (I0005'),(72,'Civil Remedies & Liabilities (I0065'),(73,'Courts--General (I0160'),(74,'Health Care Providers (I0387'),(75,'WOMAN & CHILD PROTECTION ACT (P26OY'),(76,'MEDICINE & PRESCRIPTION DRUGS (S7338'),(77,'PHYSICIANS (S1282'),(78,'PREGNANCY & CHILDBIRTH (S0294'),(79,'FIFTEENTH COURT OF APPEALS (VM34V'),(80,'Education--Primary & Secondary--Accountability (I0007'),(81,'Education--Primary & Secondary--Charter Schools (I0245'),(82,'Education--Primary & Secondary--Testing (I0229'),(83,'Education--School Districts (I0220'),(84,'Interim Studies (I0448'),(85,'INTERNET (S0130'),(86,'EDUCATION AGENCY'),(87,'TEXAS (V9941'),(88,'COMMISSIONER OF (V9954'),(89,'HIGHER EDUCATION COORDINATING BOARD'),(90,'TEXAS (V4280'),(91,'WORKFORCE COMMISSION'),(92,'TEXAS (V0470'),(93,'ATASCOSA COUNTY (G0358'),(94,'BOWIE COUNTY (GZ9IZ'),(95,'BRAZORIA COUNTY (G0077'),(96,'CALLAHAN COUNTY (GG0DH'),(97,'CANYON'),(98,'CITY OF (GP5V0'),(99,'COKE COUNTY (GM738'),(100,'COLORADO COUNTY (GK8DS'),(101,'COMAL COUNTY (G4794'),(102,'CONCHO COUNTY (GI9ZA'),(103,'DIMMIT COUNTY (G1812'),(104,'ELLIS COUNTY (G1202'),(105,'FAYETTE COUNTY (G0331'),(106,'FORT BEND COUNTY (G0062'),(107,'GONZALES COUNTY (GR4I6'),(108,'GUADALUPE COUNTY (G1715'),(109,'HARRIS COUNTY (G0330'),(110,'HENDERSON COUNTY (G20OE'),(111,'HIDALGO COUNTY (G0071'),(112,'IRION COUNTY (GL0HA'),(113,'LAVACA COUNTY (GF4JR'),(114,'MAVERICK COUNTY (G0338'),(115,'MONTGOMERY COUNTY (G1122'),(116,'POTTER COUNTY (G0131'),(117,'ROCKWALL COUNTY (G0105'),(118,'RUNNELS COUNTY (GT98C'),(119,'SABINE COUNTY (GA4RY'),(120,'SCHLEICHER COUNTY (G0217'),(121,'STERLING COUNTY (GZ6NV'),(122,'TARRANT COUNTY (G0215'),(123,'TOM GREEN COUNTY (GB0Y3'),(124,'WICHITA COUNTY (GL0NF'),(125,'WILLIAMSON COUNTY (G1525'),(126,'ZAVALA COUNTY (G0317'),(127,'Courts--Administration (I0130'),(128,'Courts--Appellate (I0125'),(129,'Courts--Civil Procedure (I0135'),(130,'Courts--County & Statutory (I0115'),(131,'Courts--District (I0120'),(132,'Courts--Judges (I0140'),(133,'Courts--Juries (I0145'),(134,'Courts--Justice (I0110'),(135,'Courts--Personnel (I0155'),(136,'Courts--Prosecuting Attorneys (I0165'),(137,'Crimes--Against Persons--General (I0170'),(138,'Fees & Other Nontax Revenue--Local (I0361'),(139,'Juvenile Boards & Officers (I0450'),(140,'Minors--Juvenile Justice (I0534'),(141,'Protection of Personal Information (I0003'),(142,'Salaries & Expenses (I0745'),(143,'BORDER (S0045'),(144,'ELDER ABUSE (S0247'),(145,'EXPUNCTION OF RECORDS (S0189'),(146,'STAFF DEVELOPMENT & TRAINING (S0317'),(147,'COMPTROLLER OF PUBLIC ACCOUNTS (V2608'),(148,'COURT ADMINISTRATION'),(149,'OFFICE OF (V8690'),(150,'JUDICIAL CONDUCT'),(151,'STATE COMMISSION ON (V0014'),(152,'SUPREME COURT (V0311'),(153,'Ethics (I0345'),(154,'POLITICAL CONTRIBUTIONS (S0114'),(155,'Charitable & Nonprofit Organizations (I0055'),(156,'Consumer Protection (I0080'),(157,'Crimes--Miscellaneous (I0200'),(158,'DISASTER SCAM RESPONSE ACT (P28M5'),(159,'FRAUD (S0166'),(160,'GIFTS & DONATIONS (S0122'),(161,'ATTORNEY GENERAL (V2811'),(162,'SECRETARY OF STATE (V0042'),(163,'Agriculture (I0020'),(164,'Business & Commerce--General (I0050'),(165,'Education--General (I0255'),(166,'Taxation--Property-Appraisals & Appraisal Districts (I0792'),(167,'Taxation--Property-Exemptions (I0793'),(168,'Health--General (I0385'),(169,'Occupational Regulation--Health Occupations (I0540'),(170,'PHARMACIES & PHARMACISTS (S1192'),(171,'PHARMACY'),(172,'TEXAS STATE BOARD OF (V0022'),(173,'City Government--Employees/Officers (I0061'),(174,'City Government--Finance (I0062'),(175,'County Government--Employees/Officers (I0095'),(176,'County Government--Finance (I0097'),(177,'County Government--General (I0096'),(178,'Fire Fighters & Police--General (I0370'),(179,'Law Enforcement (I0510'),(180,'Property Interests--Property Owners Association (I0618'),(181,'CONSTABLES (S2357'),(182,'SHERIFFS (S1013'),(183,'Health--Emergency Services & Personnel (I0384'),(184,'HEAVEN\'S 27 CAMP SAFETY ACT (PR2SY'),(185,'RECREATIONAL & CULTURAL FACILITIES (S0286'),(186,'FEDERAL EMERGENCY MANAGEMENT AGENCY (V1040'),(187,'Water--General (I0885'),(188,'State Agencies'),(189,'Boards & Commissions (I0749'),(190,'State Finances--Appropriations (I0746'),(191,'RADIO (S0252'),(192,'TEXAS INTEROPERABILITY COUNCIL (VC9C1'),(193,'Corrections--Jails & Prisons (I0092'),(194,'Education--Higher--General (I0231'),(195,'Family--Family Violence (I0353'),(196,'Women (I0925'),(197,'TEXAS WOMEN\'S PRIVACY ACT (PH8L1'),(198,'ATTORNEY\'S FEES (S0202'),(199,'BIRTH & DEATH CERTIFICATES (S6418'),(200,'GENDER IDENTITY & EXPRESSION (S0767'),(201,'WOMEN\'S SHELTERS (S0049'),(202,'CRIMINAL JUSTICE'),(203,'TEXAS BOARD OF (V0740'),(204,'TEXAS DEPARTMENT OF (V8788'),(205,'Crimes--Against Morals (I0180'),(206,'Crimes--Against Persons--Sexual (I0171'),(207,'Criminal Procedure--Defense Counsel (I0207'),(208,'Criminal Procedure--General (I0208'),(209,'CRIME VICTIMS (S0046'),(210,'HUMAN TRAFFICKING (S0696'),(211,'PROSTITUTION (S0016'),(212,'City Government--General (I0060'),(213,'Environment--Water (I0320'),(214,'Water--Conservation (I097L'),(215,'Crimes--Against Property (I0175'),(216,'Criminal Procedure--Sentencing & Punishment (I0205'),(217,'Property Interests--Mortgages & Liens (I0605'),(218,'Property Interests--Real Property (I0595'),(219,'IDENTIFICATION CARDS (S0074'),(220,'RECORDS MANAGEMENT (S0205'),(221,'STATUTES OF LIMITATIONS (S0065'),(222,'Special Districts & Authorities--Water & Utility (I0755'),(223,'Water--Rights (I0870'),(224,'PERMITS (S0011'),(225,'ENVIRONMENTAL QUALITY'),(226,'TEXAS COMMISSION ON (V0334');
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-19  9:18:05
