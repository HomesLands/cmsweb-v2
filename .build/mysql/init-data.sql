-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: cmsweb_db_dev
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `approval_log_tbl`
--

DROP TABLE IF EXISTS `approval_log_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `approval_log_tbl` (
  `id_column` varchar(36) NOT NULL,
  `slug_column` varchar(255) NOT NULL,
  `created_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at_column` datetime(6) DEFAULT NULL,
  `status_column` varchar(255) NOT NULL,
  `content_column` varchar(255) NOT NULL,
  `user_approval_column` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id_column`),
  UNIQUE KEY `IDX_10d9af1413d9993b46a7b37e55` (`slug_column`),
  KEY `FK_729fcfaea6b22f7469ee8eb67cd` (`user_approval_column`),
  CONSTRAINT `FK_729fcfaea6b22f7469ee8eb67cd` FOREIGN KEY (`user_approval_column`) REFERENCES `user_approval_tbl` (`id_column`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approval_log_tbl`
--

LOCK TABLES `approval_log_tbl` WRITE;
/*!40000 ALTER TABLE `approval_log_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `approval_log_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assigned_user_approval`
--

DROP TABLE IF EXISTS `assigned_user_approval`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assigned_user_approval` (
  `id_column` varchar(36) NOT NULL,
  `slug_column` varchar(255) NOT NULL,
  `created_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at_column` datetime(6) DEFAULT NULL,
  `form_type_column` varchar(255) NOT NULL,
  `role_approval_column` varchar(255) NOT NULL,
  `user_column` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id_column`),
  UNIQUE KEY `IDX_64c0306169a49c3638d94edcda` (`form_type_column`,`role_approval_column`),
  UNIQUE KEY `IDX_4947c65c8f89641d3e16c1b2d1` (`slug_column`),
  KEY `FK_5cd1eccbf2604fd0d39b6d51669` (`user_column`),
  CONSTRAINT `FK_5cd1eccbf2604fd0d39b6d51669` FOREIGN KEY (`user_column`) REFERENCES `user_tbl` (`id_column`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assigned_user_approval`
--

LOCK TABLES `assigned_user_approval` WRITE;
/*!40000 ALTER TABLE `assigned_user_approval` DISABLE KEYS */;
/*!40000 ALTER TABLE `assigned_user_approval` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authority_tbl`
--

DROP TABLE IF EXISTS `authority_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authority_tbl` (
  `id_column` varchar(36) NOT NULL,
  `slug_column` varchar(255) NOT NULL,
  `created_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at_column` datetime(6) DEFAULT NULL,
  `name_normalize_column` varchar(255) NOT NULL,
  `name_display_column` varchar(255) NOT NULL,
  `description_column` varchar(255) NOT NULL,
  PRIMARY KEY (`id_column`),
  UNIQUE KEY `IDX_7b7dc432e8adf6b32c0367bd98` (`slug_column`),
  UNIQUE KEY `IDX_162738c948994ae38000a609a4` (`name_normalize_column`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authority_tbl`
--

LOCK TABLES `authority_tbl` WRITE;
/*!40000 ALTER TABLE `authority_tbl` DISABLE KEYS */;
INSERT INTO `authority_tbl` VALUES ('0fc31d64-27be-4d59-8ead-b967a6e72812','hbBveTvtL5','2024-09-25 19:37:18.000000','2024-09-25 19:37:18.000000',NULL,'READ_USER','','Enable approve product requisition'),('1a88cf90-8ce4-4634-bbec-3ce7ec3a7191','IY_PtP0VrV','2024-09-25 19:38:05.000000','2024-09-25 19:38:05.000000',NULL,'DELETE_AUTHORITY','','Enable approve product requisition'),('2efa2c48-a410-42a9-80fb-94eb7a7ace3b','ksfYTzMVFT','2024-09-25 19:37:29.000000','2024-09-25 19:37:29.000000',NULL,'DELETE_USER','','Enable approve product requisition'),('41aac37e-c31b-4ab7-9291-478d46369de7','agIZeWYMm3','2024-10-01 01:18:41.000000','2024-10-01 01:18:41.000000',NULL,'READ_PERMISSION','','Enable create user'),('43fa9454-457d-4dd7-a479-b5178e7a6475','C-0o2phhvU','2024-09-25 19:34:56.000000','2024-09-25 19:34:56.000000',NULL,'UPDATE_USER','','Enable approve product requisition'),('48b35ed9-77d5-426c-a92f-3c52e469ae0c','PyYE6Oz2wa','2024-09-25 19:37:42.000000','2024-09-25 19:37:42.000000',NULL,'UPDATE_ROLE','','Enable approve product requisition'),('77aa324b-bd7c-4a93-b9c3-27fe4ea21b28','ESb0zd0L3Z','2024-09-25 19:11:57.000000','2024-09-25 19:11:57.000000',NULL,'CREATE_USER','','Enable create user'),('7c94ebe7-ccb3-40f1-ac77-bc256383b5ba','Qht4Wg9b8n','2024-10-01 01:18:25.000000','2024-10-01 01:18:25.000000',NULL,'READ_AUTHORITY','','Enable create user'),('a6f70328-61c8-4551-9bf1-a63bb4415d7a','ta2cvtQqog','2024-09-25 19:14:12.000000','2024-09-25 19:14:12.000000',NULL,'CREATE_PRODUCT_REQUISITION','','Enable create user'),('aff5f457-a7d4-4ae4-9bae-54b68493b5f3','49zaUJ5qLu','2024-09-25 19:37:48.000000','2024-09-25 19:37:48.000000',NULL,'DELETE_ROLE','','Enable approve product requisition'),('bef031e3-ffcd-4884-a6b9-54e97c4590d1','Gvamo1Kmxs','2024-09-25 19:37:37.000000','2024-09-25 19:37:37.000000',NULL,'CREATE_ROLE','','Enable approve product requisition'),('cc4b4b8e-992a-45e4-bfdc-447f200e92db','0TcZm1BMlE','2024-09-26 00:12:16.000000','2024-09-26 00:12:16.000000',NULL,'READ_USER_APPROVAL','','CHO PHÉP LẤY CÁC MẪU YCVT THEO NGƯỜI DUYỆT'),('d8f79665-f13c-41c8-b976-3bb64dd86219','41zZUwr9lS','2024-09-25 19:14:46.000000','2024-09-25 19:14:46.000000',NULL,'UPDATE_PRODUCT_REQUISITION','','Enable update product requisition'),('e844e5f4-1716-4a04-a91c-668dea29ed70','AJGu6e4XPH','2024-09-25 19:37:54.000000','2024-09-25 19:37:54.000000',NULL,'CREATE_AUTHORITY','','Enable approve product requisition'),('ec38abb1-9737-408d-9b3e-ee2e0b3ffeda','Z1Ut_m9RPE','2024-09-25 19:15:10.000000','2024-09-25 19:15:10.000000',NULL,'APPROVE_PRODUCT_REQUISITION','','Enable approve product requisition'),('f2a4e532-3f6f-47af-b0df-2827be693545','d5CvGjUsVn','2024-09-25 19:38:01.000000','2024-09-25 19:38:01.000000',NULL,'UPDATE_AUTHORITY','','Enable approve product requisition'),('f4ab920f-14ad-4eaa-8845-e185bdfa055b','ITePVYZqbY','2024-10-01 01:26:50.000000','2024-10-01 01:26:50.000000',NULL,'READ_ROLE','',''),('fcb61a90-016f-4e16-b1db-e51a6a12ea23','zjiOQ2CAI-','2024-10-01 01:18:55.000000','2024-10-01 01:18:55.000000',NULL,'CREATE_PERMISSION','',''),('fd39c09c-f073-42b8-b3b0-4b55ca83daed','48Hu3slRrq','2024-09-25 00:54:25.000000','2024-09-25 19:11:34.315295',NULL,'READ_PRODUCT_REQUISITION','','Enable read requisition by creator');
/*!40000 ALTER TABLE `authority_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_tbl`
--

DROP TABLE IF EXISTS `company_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_tbl` (
  `id_column` varchar(36) NOT NULL,
  `slug_column` varchar(255) NOT NULL,
  `created_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at_column` datetime(6) DEFAULT NULL,
  `name_column` varchar(255) NOT NULL,
  PRIMARY KEY (`id_column`),
  UNIQUE KEY `IDX_d892a592c9e4f5e09d5e05ea9e` (`slug_column`),
  UNIQUE KEY `IDX_d550b8137d31e196a2354494e7` (`name_column`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_tbl`
--

LOCK TABLES `company_tbl` WRITE;
/*!40000 ALTER TABLE `company_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `company_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department_tbl`
--

DROP TABLE IF EXISTS `department_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department_tbl` (
  `id_column` varchar(36) NOT NULL,
  `slug_column` varchar(255) NOT NULL,
  `created_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at_column` datetime(6) DEFAULT NULL,
  `name_normalize_column` varchar(255) NOT NULL,
  `description_column` varchar(255) NOT NULL,
  `site_column` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id_column`),
  UNIQUE KEY `IDX_e8999bb2b95eb0164d11297da9` (`slug_column`),
  UNIQUE KEY `IDX_ba06aeadf37ef258830b1f999c` (`name_normalize_column`),
  KEY `FK_e88b1b56d073fd87128bf2af50b` (`site_column`),
  CONSTRAINT `FK_e88b1b56d073fd87128bf2af50b` FOREIGN KEY (`site_column`) REFERENCES `site_tbl` (`id_column`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department_tbl`
--

LOCK TABLES `department_tbl` WRITE;
/*!40000 ALTER TABLE `department_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `department_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `export_product_tbl`
--

DROP TABLE IF EXISTS `export_product_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `export_product_tbl` (
  `id_column` varchar(36) NOT NULL,
  `slug_column` varchar(255) NOT NULL,
  `created_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at_column` datetime(6) DEFAULT NULL,
  `available_quantity_column` int NOT NULL,
  `product_id_column` varchar(255) NOT NULL,
  PRIMARY KEY (`id_column`),
  UNIQUE KEY `IDX_a9876833f5e876263a89003869` (`slug_column`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `export_product_tbl`
--

LOCK TABLES `export_product_tbl` WRITE;
/*!40000 ALTER TABLE `export_product_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `export_product_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file_tbl`
--

DROP TABLE IF EXISTS `file_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file_tbl` (
  `id_column` varchar(36) NOT NULL,
  `slug_column` varchar(255) NOT NULL,
  `created_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at_column` datetime(6) DEFAULT NULL,
  `name_column` varchar(255) NOT NULL,
  `type_column` varchar(255) NOT NULL,
  `data_column` mediumblob NOT NULL,
  `size_column` int DEFAULT NULL,
  PRIMARY KEY (`id_column`),
  UNIQUE KEY `IDX_0b38ff05efa08c751e1c8ddbed` (`slug_column`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file_tbl`
--

LOCK TABLES `file_tbl` WRITE;
/*!40000 ALTER TABLE `file_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `file_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invalid_token_tbl`
--

DROP TABLE IF EXISTS `invalid_token_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invalid_token_tbl` (
  `id_column` varchar(36) NOT NULL,
  `slug_column` varchar(255) NOT NULL,
  `created_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at_column` datetime(6) DEFAULT NULL,
  `token_id_column` varchar(255) NOT NULL,
  `expiry_date_column` datetime NOT NULL,
  PRIMARY KEY (`id_column`),
  UNIQUE KEY `IDX_5102bb21cfb52fae9d2e2d84c3` (`slug_column`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invalid_token_tbl`
--

LOCK TABLES `invalid_token_tbl` WRITE;
/*!40000 ALTER TABLE `invalid_token_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `invalid_token_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission_tbl`
--

DROP TABLE IF EXISTS `permission_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission_tbl` (
  `id_column` varchar(36) NOT NULL,
  `slug_column` varchar(255) NOT NULL,
  `created_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at_column` datetime(6) DEFAULT NULL,
  `role_column` varchar(36) DEFAULT NULL,
  `authority_column` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id_column`),
  UNIQUE KEY `IDX_7f6780c50caf9d345e78b5068d` (`slug_column`),
  KEY `FK_84eee2fc3e836ce762f3a4f7c10` (`role_column`),
  KEY `FK_3085490c8c6da3735a675c97f6b` (`authority_column`),
  CONSTRAINT `FK_3085490c8c6da3735a675c97f6b` FOREIGN KEY (`authority_column`) REFERENCES `authority_tbl` (`id_column`),
  CONSTRAINT `FK_84eee2fc3e836ce762f3a4f7c10` FOREIGN KEY (`role_column`) REFERENCES `role_tbl` (`id_column`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission_tbl`
--

LOCK TABLES `permission_tbl` WRITE;
/*!40000 ALTER TABLE `permission_tbl` DISABLE KEYS */;
INSERT INTO `permission_tbl` VALUES ('02b66b3e-dfb0-4db5-9336-33c3066c6f45','6laYu9rlNI','2024-10-01 01:31:19.729231','2024-10-01 01:31:19.729231',NULL,'bed99515-163f-454b-a838-5ce848c52e75','fcb61a90-016f-4e16-b1db-e51a6a12ea23'),('18a09e74-2609-4dc5-8b14-51db1650fafb','OeBfxPKUOn','2024-10-01 01:29:25.281320','2024-10-01 01:29:25.281320',NULL,'bed99515-163f-454b-a838-5ce848c52e75','7c94ebe7-ccb3-40f1-ac77-bc256383b5ba'),('1b3386ab-204d-48b0-a01e-09a2fe5c3af6','u7qykolJ-K','2024-10-01 00:48:13.879402','2024-10-01 00:48:13.879402',NULL,'bed99515-163f-454b-a838-5ce848c52e75','ec38abb1-9737-408d-9b3e-ee2e0b3ffeda'),('22adba71-6da2-4958-8931-095f17d92dfd','bA-0E9OAYV','2024-10-01 01:32:46.949630','2024-10-01 01:32:46.949630',NULL,'bed99515-163f-454b-a838-5ce848c52e75','41aac37e-c31b-4ab7-9291-478d46369de7'),('30ed6f84-599d-4c97-b247-620b363d41e6','EDjZf02M5E','2024-10-02 21:12:24.464070','2024-10-02 21:12:24.464070',NULL,'69ef79f2-3ea1-4dd4-884e-481ae643ce14','d8f79665-f13c-41c8-b976-3bb64dd86219'),('5b8def45-8ef8-4084-8dd6-f12c91130859','nbgMCxvkNf','2024-09-25 14:12:56.225957','2024-10-01 00:29:00.700333',NULL,'ab001ab3-4389-4d79-ad56-bdde831b5d37','cc4b4b8e-992a-45e4-bfdc-447f200e92db'),('694ca7b2-aa40-4b9c-934b-0d61242aef5c','qYSSARRD-0','2024-09-25 17:13:52.924323','2024-10-01 00:29:08.546361',NULL,'ab001ab3-4389-4d79-ad56-bdde831b5d37','ec38abb1-9737-408d-9b3e-ee2e0b3ffeda'),('836b3b55-daa0-46a0-b6a9-b7aa8be961c3','axdcG4i8Nr','2024-09-24 17:58:29.459180','2024-10-01 00:29:16.471211',NULL,'a3dd7d24-a3bf-4836-8462-8200ac6f7d85','cc4b4b8e-992a-45e4-bfdc-447f200e92db'),('8868d920-404e-48bf-96b6-4097b5d4c79d','-zF1TuItQP','2024-10-01 01:29:05.363696','2024-10-01 01:29:05.363696',NULL,'bed99515-163f-454b-a838-5ce848c52e75','f4ab920f-14ad-4eaa-8845-e185bdfa055b'),('8cde0cf8-32db-4079-92a6-28fb2058b102','0YiF_K5WFg','2024-10-01 00:47:47.179278','2024-10-01 00:47:47.179278',NULL,'bed99515-163f-454b-a838-5ce848c52e75','a6f70328-61c8-4551-9bf1-a63bb4415d7a'),('a0017f24-75cc-41b1-81a8-56896b3a29c5','hw58CJBQCn','2024-10-01 00:48:32.713315','2024-10-01 00:48:32.713315',NULL,'bed99515-163f-454b-a838-5ce848c52e75','e844e5f4-1716-4a04-a91c-668dea29ed70'),('b2c9799b-81bf-4292-aa27-2c54aa6977f7','yIFFDORFkR','2024-09-25 17:12:53.633724','2024-10-01 00:29:25.439288',NULL,'a3dd7d24-a3bf-4836-8462-8200ac6f7d85','ec38abb1-9737-408d-9b3e-ee2e0b3ffeda'),('c8049cbe-813f-45c1-b9c2-8dc4bf82f616','bIrshMDKS-','2024-09-25 17:00:17.297564','2024-10-01 00:29:34.012378',NULL,'69ef79f2-3ea1-4dd4-884e-481ae643ce14','a6f70328-61c8-4551-9bf1-a63bb4415d7a'),('c9b68c27-03b6-41ea-8331-adb99b0ac55b','vdSu6l7GOv','2024-10-01 00:49:52.351167','2024-10-01 00:49:52.351167',NULL,'bed99515-163f-454b-a838-5ce848c52e75','fd39c09c-f073-42b8-b3b0-4b55ca83daed'),('cac20c20-d25c-4ca9-9109-3f70103df159','2pjZk-UVfA','2024-09-25 17:14:15.456428','2024-10-01 00:29:42.194931',NULL,'69ef79f2-3ea1-4dd4-884e-481ae643ce14','fd39c09c-f073-42b8-b3b0-4b55ca83daed'),('f1124f42-7964-4077-b5e4-6ab0b078a7c4','Ux1QG-Jv9d','2024-10-01 01:28:02.462876','2024-10-01 01:28:02.462876',NULL,'bed99515-163f-454b-a838-5ce848c52e75','bef031e3-ffcd-4884-a6b9-54e97c4590d1'),('f3cfbc4e-5e7f-4909-98cf-2d3dad9a2235','L5hfcfUl7a','2024-09-25 16:55:05.147326','2024-10-01 00:29:49.627437',NULL,'53d1affb-aabf-4b7b-9f8d-93aa7b15b41f','cc4b4b8e-992a-45e4-bfdc-447f200e92db'),('f9465bcf-a787-4759-9091-433c8ece4fcd','p2Yqk4ROBb','2024-09-25 16:53:37.782981','2024-10-01 00:29:59.860905',NULL,'53d1affb-aabf-4b7b-9f8d-93aa7b15b41f','ec38abb1-9737-408d-9b3e-ee2e0b3ffeda');
/*!40000 ALTER TABLE `permission_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_export_form_tbl`
--

DROP TABLE IF EXISTS `product_export_form_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_export_form_tbl` (
  `id_column` varchar(36) NOT NULL,
  `slug_column` varchar(255) NOT NULL,
  `created_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at_column` datetime(6) DEFAULT NULL,
  `to_column` varchar(255) NOT NULL,
  `description_column` varchar(255) NOT NULL,
  `recipient_column` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id_column`),
  UNIQUE KEY `IDX_82e6e4cfdc04ee8abd7a1d8d6f` (`slug_column`),
  UNIQUE KEY `REL_f8a8714e8b8d3615db718b4d46` (`recipient_column`),
  CONSTRAINT `FK_f8a8714e8b8d3615db718b4d46b` FOREIGN KEY (`recipient_column`) REFERENCES `user_tbl` (`id_column`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_export_form_tbl`
--

LOCK TABLES `product_export_form_tbl` WRITE;
/*!40000 ALTER TABLE `product_export_form_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_export_form_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_import_form_tbl`
--

DROP TABLE IF EXISTS `product_import_form_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_import_form_tbl` (
  `id_column` varchar(36) NOT NULL,
  `slug_column` varchar(255) NOT NULL,
  `created_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at_column` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id_column`),
  UNIQUE KEY `IDX_ccfc5128146cec826934b4a69c` (`slug_column`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_import_form_tbl`
--

LOCK TABLES `product_import_form_tbl` WRITE;
/*!40000 ALTER TABLE `product_import_form_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_import_form_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_requisition_form_tbl`
--

DROP TABLE IF EXISTS `product_requisition_form_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_requisition_form_tbl` (
  `id_column` varchar(36) NOT NULL,
  `slug_column` varchar(255) NOT NULL,
  `created_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at_column` datetime(6) DEFAULT NULL,
  `code_column` varchar(255) NOT NULL,
  `status_column` varchar(255) NOT NULL,
  `is_recalled_column` tinyint NOT NULL DEFAULT '0',
  `type_column` varchar(255) NOT NULL,
  `deadline_date_column` datetime NOT NULL,
  `description_column` varchar(255) DEFAULT NULL,
  `creator_column` varchar(36) DEFAULT NULL,
  `project_column` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id_column`),
  UNIQUE KEY `IDX_45051f8fe0c3eb801f5ecf1610` (`slug_column`),
  UNIQUE KEY `IDX_c8048470d465c1175d6e7afa88` (`code_column`),
  KEY `FK_015c0637239784036d4c8f871a0` (`creator_column`),
  KEY `FK_9f08ad4bd306debf8bb94fb5bab` (`project_column`),
  CONSTRAINT `FK_015c0637239784036d4c8f871a0` FOREIGN KEY (`creator_column`) REFERENCES `user_tbl` (`id_column`),
  CONSTRAINT `FK_9f08ad4bd306debf8bb94fb5bab` FOREIGN KEY (`project_column`) REFERENCES `project_tbl` (`id_column`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_requisition_form_tbl`
--

LOCK TABLES `product_requisition_form_tbl` WRITE;
/*!40000 ALTER TABLE `product_requisition_form_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_requisition_form_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_tbl`
--

DROP TABLE IF EXISTS `product_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_tbl` (
  `id_column` varchar(36) NOT NULL,
  `slug_column` varchar(255) NOT NULL,
  `created_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at_column` datetime(6) DEFAULT NULL,
  `name_column` varchar(255) NOT NULL,
  `quantity_column` int NOT NULL DEFAULT '0',
  `code_column` varchar(255) DEFAULT NULL,
  `provider_column` varchar(255) NOT NULL,
  `description_column` text,
  `unit_column` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id_column`),
  UNIQUE KEY `IDX_0a9a0a7fabecf3158db11a16fe` (`slug_column`),
  UNIQUE KEY `IDX_9a715945a04ad03acf6966b57a` (`name_column`),
  KEY `FK_7b0297c69e9f36518f45248ace9` (`unit_column`),
  CONSTRAINT `FK_7b0297c69e9f36518f45248ace9` FOREIGN KEY (`unit_column`) REFERENCES `unit_tbl` (`id_column`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_tbl`
--

LOCK TABLES `product_tbl` WRITE;
/*!40000 ALTER TABLE `product_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_warehouse_tbl`
--

DROP TABLE IF EXISTS `product_warehouse_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_warehouse_tbl` (
  `id_column` varchar(36) NOT NULL,
  `slug_column` varchar(255) NOT NULL,
  `created_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at_column` datetime(6) DEFAULT NULL,
  `quantity_column` int NOT NULL DEFAULT '0',
  `warehouse_column` varchar(36) DEFAULT NULL,
  `product_column` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id_column`),
  UNIQUE KEY `IDX_fc435420aacc833b7af4af7688` (`slug_column`),
  UNIQUE KEY `IDX_051181cdfbefc2699fc15c66c8` (`product_column`,`warehouse_column`),
  KEY `FK_10009c338ff042be94991849cf0` (`warehouse_column`),
  CONSTRAINT `FK_10009c338ff042be94991849cf0` FOREIGN KEY (`warehouse_column`) REFERENCES `warehouse_tbl` (`id_column`),
  CONSTRAINT `FK_ffae1a93a98518e33ac753b1802` FOREIGN KEY (`product_column`) REFERENCES `product_tbl` (`id_column`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_warehouse_tbl`
--

LOCK TABLES `product_warehouse_tbl` WRITE;
/*!40000 ALTER TABLE `product_warehouse_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_warehouse_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_tbl`
--

DROP TABLE IF EXISTS `project_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_tbl` (
  `id_column` varchar(36) NOT NULL,
  `slug_column` varchar(255) NOT NULL,
  `created_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at_column` datetime(6) DEFAULT NULL,
  `name_column` varchar(255) NOT NULL,
  `start_date_column` timestamp NOT NULL,
  `description_column` varchar(255) NOT NULL,
  `file_description_column` varchar(255) DEFAULT NULL,
  `site_column` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id_column`),
  UNIQUE KEY `IDX_ce2aca02ed239f78a50dcb56d2` (`slug_column`),
  KEY `FK_3d114c69408802e27583bbf532e` (`site_column`),
  CONSTRAINT `FK_3d114c69408802e27583bbf532e` FOREIGN KEY (`site_column`) REFERENCES `site_tbl` (`id_column`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_tbl`
--

LOCK TABLES `project_tbl` WRITE;
/*!40000 ALTER TABLE `project_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_requisition_form_tbl`
--

DROP TABLE IF EXISTS `purchase_requisition_form_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_requisition_form_tbl` (
  `id_column` varchar(36) NOT NULL,
  `slug_column` varchar(255) NOT NULL,
  `created_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at_column` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id_column`),
  UNIQUE KEY `IDX_d0e6fd21aa1556b956a7e5e35f` (`slug_column`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_requisition_form_tbl`
--

LOCK TABLES `purchase_requisition_form_tbl` WRITE;
/*!40000 ALTER TABLE `purchase_requisition_form_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchase_requisition_form_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request_product_tbl`
--

DROP TABLE IF EXISTS `request_product_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request_product_tbl` (
  `id_column` varchar(36) NOT NULL,
  `slug_column` varchar(255) NOT NULL,
  `created_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at_column` datetime(6) DEFAULT NULL,
  `request_quantity_column` int NOT NULL,
  `description_column` varchar(255) DEFAULT NULL,
  `is_exist_product` tinyint NOT NULL DEFAULT '1',
  `product_requisition_form_column` varchar(36) DEFAULT NULL,
  `product_column` varchar(36) DEFAULT NULL,
  `temporary_product_column` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id_column`),
  UNIQUE KEY `IDX_d4720d6085600b0cfcd12003b2` (`slug_column`),
  KEY `FK_eafa84ffb83aba9ab705b5c0c4f` (`product_requisition_form_column`),
  KEY `FK_b48b2714973cc3f6c08e1c4742e` (`product_column`),
  KEY `FK_5818b81c75e20c7b7a3427c13da` (`temporary_product_column`),
  CONSTRAINT `FK_5818b81c75e20c7b7a3427c13da` FOREIGN KEY (`temporary_product_column`) REFERENCES `temporary_product_tbl` (`id_column`),
  CONSTRAINT `FK_b48b2714973cc3f6c08e1c4742e` FOREIGN KEY (`product_column`) REFERENCES `product_tbl` (`id_column`),
  CONSTRAINT `FK_eafa84ffb83aba9ab705b5c0c4f` FOREIGN KEY (`product_requisition_form_column`) REFERENCES `product_requisition_form_tbl` (`id_column`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request_product_tbl`
--

LOCK TABLES `request_product_tbl` WRITE;
/*!40000 ALTER TABLE `request_product_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `request_product_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rfid_tbl`
--

DROP TABLE IF EXISTS `rfid_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rfid_tbl` (
  `id_column` varchar(36) NOT NULL,
  `slug_column` varchar(255) NOT NULL,
  `created_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at_column` datetime(6) DEFAULT NULL,
  `code_column` varchar(255) NOT NULL,
  `product_warehouse_column` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id_column`),
  UNIQUE KEY `IDX_efbef6c46ea7153668bbdad352` (`slug_column`),
  KEY `FK_0c9febd984e7a48116cfa5fbe93` (`product_warehouse_column`),
  CONSTRAINT `FK_0c9febd984e7a48116cfa5fbe93` FOREIGN KEY (`product_warehouse_column`) REFERENCES `product_warehouse_tbl` (`id_column`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rfid_tbl`
--

LOCK TABLES `rfid_tbl` WRITE;
/*!40000 ALTER TABLE `rfid_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `rfid_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_tbl`
--

DROP TABLE IF EXISTS `role_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_tbl` (
  `id_column` varchar(36) NOT NULL,
  `slug_column` varchar(255) NOT NULL,
  `created_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at_column` datetime(6) DEFAULT NULL,
  `name_normalize_column` varchar(255) NOT NULL,
  `name_display_column` varchar(255) NOT NULL,
  `description_column` varchar(255) NOT NULL,
  PRIMARY KEY (`id_column`),
  UNIQUE KEY `IDX_6bd2be4fe4d2853ae1af05a063` (`slug_column`),
  UNIQUE KEY `IDX_582809a46dd0bb8588374e491f` (`name_normalize_column`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_tbl`
--

LOCK TABLES `role_tbl` WRITE;
/*!40000 ALTER TABLE `role_tbl` DISABLE KEYS */;
INSERT INTO `role_tbl` VALUES ('18a4a377-7066-41c6-b180-d155a997cc03','WOEsb1M31m','2024-09-25 20:09:29.000000','2024-09-25 20:09:29.000000',NULL,'ROLE_DEPUTY_DIRECTOR','','PHÓ GIÁM ĐỐC'),('23792dca-72d2-470a-a47e-dcd78d5b0c8c','I41pbijpS_','2024-09-25 20:12:31.000000','2024-09-25 20:12:31.000000',NULL,'ROLE_HR_HEAD','','TRƯỞNG PHÒNG NHÂN SỰ'),('35f03c67-2f5e-4962-ab0a-27aab86ae233','mLAMUVizPJ','2024-09-25 20:40:46.000000','2024-09-25 20:40:46.000000',NULL,'ROLE_IT_HEAD','','TRƯỞNG PHÒNG IT'),('38dcf82c-9684-4ae3-bbc3-5478e554010e','GS-Tf_4esD','2024-09-25 20:44:29.000000','2024-09-25 20:44:29.000000',NULL,'ROLE_WAREHOUSE_KEEPER','','THỦ KHO'),('4b8a350d-78e4-4435-aae8-8a754354fca5','ybxESvVWuL','2024-09-25 00:55:38.000000','2024-09-25 20:20:59.183369',NULL,'ROLE_OFFICE_STAFF','','Nhân viên'),('53d1affb-aabf-4b7b-9f8d-93aa7b15b41f','CBFB25aV0V','2024-09-25 19:40:20.000000','2024-09-25 19:40:20.000000',NULL,'ROLE_DIRECTOR','','Giám đốc'),('57ec8db5-98eb-4e36-a94a-9ce01938779b','Hc_G9DxUEj','2024-09-25 20:39:32.000000','2024-09-25 20:39:32.000000',NULL,'ROLE_ACCOUNTING_HEAD','','TRƯỞNG PHÒNG KẾ TOÁN'),('69ef79f2-3ea1-4dd4-884e-481ae643ce14','kNBtRTm9Tu','2024-09-25 20:04:12.000000','2024-09-25 20:26:17.236855',NULL,'ROLE_CONTRUCTION_STAFF','','Nhân viên công trình'),('7b18db6a-c2bf-4064-8a83-c9023b18029a','KMmNuglgW8','2024-09-25 20:15:02.000000','2024-09-25 20:15:02.000000',NULL,'ROLE_INVENTORY_ACCOUNTING','','KẾ TOÁN KHO'),('8ca832a9-a0db-46eb-b537-c99a02df4ef2','pDQfnWpSwY','2024-09-25 20:57:46.000000','2024-09-25 20:57:46.000000',NULL,'ROLE_IT_STAFF','','NHÂN VIÊN IT'),('a077bb98-1b7a-4352-90da-adb36107bcaa','wuZUC6TNeu','2024-09-25 20:57:28.000000','2024-09-25 20:57:28.000000',NULL,'ROLE_ACCOUNTING','','NHÂN VIÊN KẾ TOÁN'),('a3dd7d24-a3bf-4836-8462-8200ac6f7d85','P_cSkvJGqh','2024-09-25 20:04:58.000000','2024-09-25 20:26:49.622740',NULL,'ROLE_PROJECT_HEAD','','Trường phòng dự án'),('a7cd14f4-ac55-4cc0-be61-c703e5053146','4j2gwEARU1','2024-09-25 20:54:57.000000','2024-09-25 20:54:57.000000',NULL,'ROLE_HR_STAFF','','NHÂN VIÊN NHÂN SỰ'),('ab001ab3-4389-4d79-ad56-bdde831b5d37','LoCBqRUbyF','2024-09-25 23:59:37.000000','2024-09-25 23:59:37.000000',NULL,'ROLE_CONTRUCTION_SUPERVISOR','','CHỈ HUY TRƯỞNG'),('bed99515-163f-454b-a838-5ce848c52e75','kuATay82Ur','2024-09-25 20:48:36.000000','2024-09-25 20:48:36.000000',NULL,'ROLE_ADMIN','','QUẢN TRỊ VIÊN'),('d314ab97-3e0f-4cee-a151-1c14cafe24fd','DhxeKSWKdD','2024-09-25 20:15:40.000000','2024-09-25 20:15:40.000000',NULL,'ROLE_SALES_HEAD','','TRƯỞNG PHÒNG KINH DOANH'),('d6e118ae-0acc-4c19-b656-6f9ca3eb677b','Uujn4e57z1','2024-09-25 20:57:01.000000','2024-09-25 20:57:01.000000',NULL,'ROLE_SECRETARY','','THƯ KÝ'),('ddeb0087-f6e5-4a45-84dd-43802b4ac5d6','Xyh5W3gV-W','2024-09-25 20:42:10.000000','2024-09-25 20:49:47.333522',NULL,'ROLE_SALES_STAFF','','NHÂN VIÊN BÁN HÀNG');
/*!40000 ALTER TABLE `role_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `site_tbl`
--

DROP TABLE IF EXISTS `site_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `site_tbl` (
  `id_column` varchar(36) NOT NULL,
  `slug_column` varchar(255) NOT NULL,
  `created_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at_column` datetime(6) DEFAULT NULL,
  `name_column` varchar(255) NOT NULL,
  `company_column` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id_column`),
  UNIQUE KEY `IDX_3d13539a08828140377867a10d` (`slug_column`),
  UNIQUE KEY `IDX_cd1c8eb93c6fb45ae172cf97ae` (`name_column`),
  KEY `FK_cc98baff4544b1e3bfb743f139d` (`company_column`),
  CONSTRAINT `FK_cc98baff4544b1e3bfb743f139d` FOREIGN KEY (`company_column`) REFERENCES `company_tbl` (`id_column`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site_tbl`
--

LOCK TABLES `site_tbl` WRITE;
/*!40000 ALTER TABLE `site_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `site_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temporary_product_tbl`
--

DROP TABLE IF EXISTS `temporary_product_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temporary_product_tbl` (
  `id_column` varchar(36) NOT NULL,
  `slug_column` varchar(255) NOT NULL,
  `created_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at_column` datetime(6) DEFAULT NULL,
  `name_column` varchar(255) NOT NULL,
  `provider_column` varchar(255) NOT NULL,
  `unit_column` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id_column`),
  UNIQUE KEY `IDX_ffc7ad5b50c947194bbe1e6740` (`slug_column`),
  UNIQUE KEY `IDX_83020800041c8828e6dcfe66b9` (`name_column`),
  KEY `FK_ba2208ec0f8d13ef75099051684` (`unit_column`),
  CONSTRAINT `FK_ba2208ec0f8d13ef75099051684` FOREIGN KEY (`unit_column`) REFERENCES `unit_tbl` (`id_column`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temporary_product_tbl`
--

LOCK TABLES `temporary_product_tbl` WRITE;
/*!40000 ALTER TABLE `temporary_product_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `temporary_product_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unit_tbl`
--

DROP TABLE IF EXISTS `unit_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unit_tbl` (
  `id_column` varchar(36) NOT NULL,
  `slug_column` varchar(255) NOT NULL,
  `created_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at_column` datetime(6) DEFAULT NULL,
  `name_column` varchar(255) NOT NULL,
  PRIMARY KEY (`id_column`),
  UNIQUE KEY `IDX_be319ed0a04c61b1a5b47dcc42` (`slug_column`),
  UNIQUE KEY `IDX_1c102140ab103cdb5a6c0f65ce` (`name_column`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unit_tbl`
--

LOCK TABLES `unit_tbl` WRITE;
/*!40000 ALTER TABLE `unit_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `unit_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_approval_tbl`
--

DROP TABLE IF EXISTS `user_approval_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_approval_tbl` (
  `id_column` varchar(36) NOT NULL,
  `slug_column` varchar(255) NOT NULL,
  `created_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at_column` datetime(6) DEFAULT NULL,
  `assigned_user_approval_column` varchar(36) DEFAULT NULL,
  `productRequisitionFormId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id_column`),
  UNIQUE KEY `IDX_2ad021795fabd4a60f5b2cce25` (`slug_column`),
  KEY `FK_782945415d2ecf32cc0d5dbabe3` (`assigned_user_approval_column`),
  KEY `FK_b725e7603ad3107a24c094e3a98` (`productRequisitionFormId`),
  CONSTRAINT `FK_782945415d2ecf32cc0d5dbabe3` FOREIGN KEY (`assigned_user_approval_column`) REFERENCES `assigned_user_approval` (`id_column`),
  CONSTRAINT `FK_b725e7603ad3107a24c094e3a98` FOREIGN KEY (`productRequisitionFormId`) REFERENCES `product_requisition_form_tbl` (`id_column`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_approval_tbl`
--

LOCK TABLES `user_approval_tbl` WRITE;
/*!40000 ALTER TABLE `user_approval_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_approval_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_department_tbl`
--

DROP TABLE IF EXISTS `user_department_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_department_tbl` (
  `id_column` varchar(36) NOT NULL,
  `slug_column` varchar(255) NOT NULL,
  `created_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at_column` datetime(6) DEFAULT NULL,
  `department_column` varchar(36) DEFAULT NULL,
  `user_column` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id_column`),
  UNIQUE KEY `IDX_236696ddbc92aabef0d9aeee8c` (`slug_column`),
  KEY `FK_3eb420262d67b04801ea5e75842` (`department_column`),
  KEY `FK_224931eae6d49e80824a5a71659` (`user_column`),
  CONSTRAINT `FK_224931eae6d49e80824a5a71659` FOREIGN KEY (`user_column`) REFERENCES `user_tbl` (`id_column`),
  CONSTRAINT `FK_3eb420262d67b04801ea5e75842` FOREIGN KEY (`department_column`) REFERENCES `department_tbl` (`id_column`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_department_tbl`
--

LOCK TABLES `user_department_tbl` WRITE;
/*!40000 ALTER TABLE `user_department_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_department_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role_tbl`
--

DROP TABLE IF EXISTS `user_role_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role_tbl` (
  `id_column` varchar(36) NOT NULL,
  `slug_column` varchar(255) NOT NULL,
  `created_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at_column` datetime(6) DEFAULT NULL,
  `role_column` varchar(36) DEFAULT NULL,
  `user_column` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id_column`),
  UNIQUE KEY `IDX_9cc949f76c52ebff50862a42c6` (`slug_column`),
  KEY `FK_dc6b0053b42c46f14bb60031a28` (`role_column`),
  KEY `FK_780bbcec921629636f7deffd720` (`user_column`),
  CONSTRAINT `FK_780bbcec921629636f7deffd720` FOREIGN KEY (`user_column`) REFERENCES `user_tbl` (`id_column`),
  CONSTRAINT `FK_dc6b0053b42c46f14bb60031a28` FOREIGN KEY (`role_column`) REFERENCES `role_tbl` (`id_column`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role_tbl`
--

LOCK TABLES `user_role_tbl` WRITE;
/*!40000 ALTER TABLE `user_role_tbl` DISABLE KEYS */;
INSERT INTO `user_role_tbl` VALUES ('ff48c476-8274-4218-a699-23eaacef78a0','miN6vCbep0','2024-10-03 18:17:46.576613','2024-10-03 18:17:46.576613',NULL,'bed99515-163f-454b-a838-5ce848c52e75','71e1a676-797b-473f-a31f-3925835ab3a6');
/*!40000 ALTER TABLE `user_role_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_tbl`
--

DROP TABLE IF EXISTS `user_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_tbl` (
  `id_column` varchar(36) NOT NULL,
  `slug_column` varchar(255) NOT NULL,
  `created_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at_column` datetime(6) DEFAULT NULL,
  `full_name_column` varchar(255) NOT NULL,
  `username_column` varchar(255) NOT NULL,
  `password_column` varchar(255) NOT NULL,
  `dob_column` varchar(255) DEFAULT NULL,
  `gender_column` varchar(255) DEFAULT NULL,
  `address_column` varchar(255) DEFAULT NULL,
  `phone_number_column` varchar(255) DEFAULT NULL,
  `avatar_column` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id_column`),
  UNIQUE KEY `IDX_3842ddd99ca5836e20c666401a` (`slug_column`),
  UNIQUE KEY `REL_46b766925e61df96aeddd44dff` (`avatar_column`),
  CONSTRAINT `FK_46b766925e61df96aeddd44dff7` FOREIGN KEY (`avatar_column`) REFERENCES `file_tbl` (`id_column`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_tbl`
--

LOCK TABLES `user_tbl` WRITE;
/*!40000 ALTER TABLE `user_tbl` DISABLE KEYS */;
INSERT INTO `user_tbl` VALUES ('71e1a676-797b-473f-a31f-3925835ab3a6','dhjWArz9d','2024-10-03 18:17:02.680970','2024-10-03 18:17:02.680970',NULL,'Quản trị viên','admin','$2a$10$8UWSZY.XVY0wwB/s6P3l.up0dNU6SdRAGKcgPC5UKOzsulmeZAzQa',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `user_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warehouse_tbl`
--

DROP TABLE IF EXISTS `warehouse_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warehouse_tbl` (
  `id_column` varchar(36) NOT NULL,
  `slug_column` varchar(255) NOT NULL,
  `created_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at_column` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at_column` datetime(6) DEFAULT NULL,
  `name_column` varchar(255) NOT NULL,
  `address_column` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_column`),
  UNIQUE KEY `IDX_676588d953ddd8512a2017becc` (`slug_column`),
  UNIQUE KEY `IDX_e2fdba797817fc01914fbde4dc` (`name_column`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse_tbl`
--

LOCK TABLES `warehouse_tbl` WRITE;
/*!40000 ALTER TABLE `warehouse_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `warehouse_tbl` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-04  1:23:21
