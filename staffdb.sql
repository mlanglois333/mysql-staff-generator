-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.21 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for staffgen
CREATE DATABASE IF NOT EXISTS `staffgen` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `staffgen`;

-- Dumping structure for table staffgen.department
CREATE TABLE IF NOT EXISTS `department` (
  `id` int NOT NULL DEFAULT '0',
  `name` varchar(30) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table staffgen.department: ~0 rows (approximately)
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` (`id`, `name`) VALUES
	(123, 'HR'),
	(234, 'Development'),
	(345, 'Facilities');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;

-- Dumping structure for table staffgen.employee
CREATE TABLE IF NOT EXISTS `employee` (
  `id` int NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `manager_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `role_fk` (`role_id`),
  CONSTRAINT `role_fk` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table staffgen.employee: ~0 rows (approximately)
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` (`id`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES
	(1, 'Peter', 'Janakowski', 6, 2),
	(2, 'Rob', 'Halford', 7, NULL),
	(3, 'Steve', 'Soto', 1, 444),
	(4, 'Ronnie  James', 'Dio', 2, 444),
	(5, 'Carl', 'Branananalowski', 1, 333),
	(6, 'Neil', 'Young', 2, 333),
	(7, 'Rick', 'Agnew', 4, 555),
	(8, 'Ian', 'Mackeye', 5, 555),
	(333, 'Scott', 'Hull', 3, NULL),
	(444, 'Kerry', 'King', 3, NULL),
	(555, 'Jello', 'Biafra', 8, NULL);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;

-- Dumping structure for table staffgen.role
CREATE TABLE IF NOT EXISTS `role` (
  `id` int NOT NULL,
  `title` varchar(30) NOT NULL DEFAULT '',
  `salary` decimal(10,0) NOT NULL DEFAULT '0',
  `department_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `department_key` (`department_id`),
  CONSTRAINT `department_key` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table staffgen.role: ~0 rows (approximately)
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` (`id`, `title`, `salary`, `department_id`) VALUES
	(1, 'Engineer', 50000, 234),
	(2, 'Senior Engineer', 100000, 234),
	(3, 'Manager', 100001, 234),
	(4, 'Entry HR', 60000, 123),
	(5, 'Senior HR', 90000, 123),
	(6, 'Custodian', 50000, 345),
	(7, 'Facilities Manager', 91000, 345),
	(8, 'Manager HR', 100000, 123);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
