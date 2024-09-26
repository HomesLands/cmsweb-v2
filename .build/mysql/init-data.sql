-- MySQL dump 10.13  Distrib 8.2.0, for Linux (x86_64)
--
-- Host: localhost    Database: cmsweb_db
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

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
  `name_normalize_column` varchar(255) NOT NULL,
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
INSERT INTO `role_tbl` VALUES ('18a4a377-7066-41c6-b180-d155a997cc03','WOEsb1M31m','2024-09-26 03:09:29.000000','2024-09-26 03:09:29.000000','ROLE_DEPUTY_DIRECTOR','PHÓ GIÁM ĐỐC'),('23792dca-72d2-470a-a47e-dcd78d5b0c8c','I41pbijpS_','2024-09-26 03:12:31.000000','2024-09-26 03:12:31.000000','ROLE_HR_HEAD','TRƯỞNG PHÒNG NHÂN SỰ'),('35f03c67-2f5e-4962-ab0a-27aab86ae233','mLAMUVizPJ','2024-09-26 03:40:46.000000','2024-09-26 03:40:46.000000','ROLE_IT_HEAD','TRƯỞNG PHÒNG IT'),('38dcf82c-9684-4ae3-bbc3-5478e554010e','GS-Tf_4esD','2024-09-26 03:44:29.000000','2024-09-26 03:44:29.000000','ROLE_WAREHOUSE_KEEPER','THỦ KHO'),('4b8a350d-78e4-4435-aae8-8a754354fca5','ybxESvVWuL','2024-09-25 07:55:38.000000','2024-09-26 03:20:59.183369','ROLE_OFFICE_STAFF','Nhân viên'),('53d1affb-aabf-4b7b-9f8d-93aa7b15b41f','CBFB25aV0V','2024-09-26 02:40:20.000000','2024-09-26 02:40:20.000000','ROLE_DIRECTOR','Giám đốc'),('57ec8db5-98eb-4e36-a94a-9ce01938779b','Hc_G9DxUEj','2024-09-26 03:39:32.000000','2024-09-26 03:39:32.000000','ROLE_ACCOUNTING_HEAD','TRƯỞNG PHÒNG KẾ TOÁN'),('69ef79f2-3ea1-4dd4-884e-481ae643ce14','kNBtRTm9Tu','2024-09-26 03:04:12.000000','2024-09-26 03:26:17.236855','ROLE_CONTRUCTION_STAFF','Nhân viên công trình'),('7b18db6a-c2bf-4064-8a83-c9023b18029a','KMmNuglgW8','2024-09-26 03:15:02.000000','2024-09-26 03:15:02.000000','ROLE_INVENTORY_ACCOUNTING','KẾ TOÁN KHO'),('8ca832a9-a0db-46eb-b537-c99a02df4ef2','pDQfnWpSwY','2024-09-26 03:57:46.000000','2024-09-26 03:57:46.000000','ROLE_IT_STAFF','NHÂN VIÊN IT'),('a077bb98-1b7a-4352-90da-adb36107bcaa','wuZUC6TNeu','2024-09-26 03:57:28.000000','2024-09-26 03:57:28.000000','ROLE_ACCOUNTING','NHÂN VIÊN KẾ TOÁN'),('a3dd7d24-a3bf-4836-8462-8200ac6f7d85','P_cSkvJGqh','2024-09-26 03:04:58.000000','2024-09-26 03:26:49.622740','ROLE_PROJECT_HEAD','Trường phòng dự án'),('a7cd14f4-ac55-4cc0-be61-c703e5053146','4j2gwEARU1','2024-09-26 03:54:57.000000','2024-09-26 03:54:57.000000','ROLE_HR_STAFF','NHÂN VIÊN NHÂN SỰ'),('ab001ab3-4389-4d79-ad56-bdde831b5d37','LoCBqRUbyF','2024-09-26 06:59:37.000000','2024-09-26 06:59:37.000000','ROLE_CONTRUCTION_SUPERVISOR','CHỈ HUY TRƯỞNG'),('bed99515-163f-454b-a838-5ce848c52e75','kuATay82Ur','2024-09-26 03:48:36.000000','2024-09-26 03:48:36.000000','ROLE_ADMIN','QUẢN TRỊ VIÊN'),('d314ab97-3e0f-4cee-a151-1c14cafe24fd','DhxeKSWKdD','2024-09-26 03:15:40.000000','2024-09-26 03:15:40.000000','ROLE_SALES_HEAD','TRƯỞNG PHÒNG KINH DOANH'),('d6e118ae-0acc-4c19-b656-6f9ca3eb677b','Uujn4e57z1','2024-09-26 03:57:01.000000','2024-09-26 03:57:01.000000','ROLE_SECRETARY','THƯ KÝ'),('ddeb0087-f6e5-4a45-84dd-43802b4ac5d6','Xyh5W3gV-W','2024-09-26 03:42:10.000000','2024-09-26 03:49:47.333522','ROLE_SALES_STAFF','NHÂN VIÊN BÁN HÀNG');
/*!40000 ALTER TABLE `role_tbl` ENABLE KEYS */;
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
  `name_normalize_column` varchar(255) NOT NULL,
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
INSERT INTO `authority_tbl` VALUES ('0fc31d64-27be-4d59-8ead-b967a6e72812','hbBveTvtL5','2024-09-26 02:37:18.000000','2024-09-26 02:37:18.000000','READ_USER','Enable approve product requisition'),('1a88cf90-8ce4-4634-bbec-3ce7ec3a7191','IY_PtP0VrV','2024-09-26 02:38:05.000000','2024-09-26 02:38:05.000000','DELETE_AUTHORITY','Enable approve product requisition'),('2efa2c48-a410-42a9-80fb-94eb7a7ace3b','ksfYTzMVFT','2024-09-26 02:37:29.000000','2024-09-26 02:37:29.000000','DELETE_USER','Enable approve product requisition'),('43fa9454-457d-4dd7-a479-b5178e7a6475','C-0o2phhvU','2024-09-26 02:34:56.000000','2024-09-26 02:34:56.000000','UPDATE_USER','Enable approve product requisition'),('48b35ed9-77d5-426c-a92f-3c52e469ae0c','PyYE6Oz2wa','2024-09-26 02:37:42.000000','2024-09-26 02:37:42.000000','UPDATE_ROLE','Enable approve product requisition'),('77aa324b-bd7c-4a93-b9c3-27fe4ea21b28','ESb0zd0L3Z','2024-09-26 02:11:57.000000','2024-09-26 02:11:57.000000','CREATE_USER','Enable create user'),('a6f70328-61c8-4551-9bf1-a63bb4415d7a','ta2cvtQqog','2024-09-26 02:14:12.000000','2024-09-26 02:14:12.000000','CREATE_PRODUCT_REQUISITION','Enable create user'),('aff5f457-a7d4-4ae4-9bae-54b68493b5f3','49zaUJ5qLu','2024-09-26 02:37:48.000000','2024-09-26 02:37:48.000000','DELETE_ROLE','Enable approve product requisition'),('bef031e3-ffcd-4884-a6b9-54e97c4590d1','Gvamo1Kmxs','2024-09-26 02:37:37.000000','2024-09-26 02:37:37.000000','CREATE_ROLE','Enable approve product requisition'),('cc4b4b8e-992a-45e4-bfdc-447f200e92db','0TcZm1BMlE','2024-09-26 07:12:16.000000','2024-09-26 07:12:16.000000','READ_USER_APPROVAL','CHO PHÉP LẤY CÁC MẪU YCVT THEO NGƯỜI DUYỆT'),('d8f79665-f13c-41c8-b976-3bb64dd86219','41zZUwr9lS','2024-09-26 02:14:46.000000','2024-09-26 02:14:46.000000','UPDATE_PRODUCT_REQUISITION','Enable update product requisition'),('e844e5f4-1716-4a04-a91c-668dea29ed70','AJGu6e4XPH','2024-09-26 02:37:54.000000','2024-09-26 02:37:54.000000','CREATE_AUTHORITY','Enable approve product requisition'),('ec38abb1-9737-408d-9b3e-ee2e0b3ffeda','Z1Ut_m9RPE','2024-09-26 02:15:10.000000','2024-09-26 02:15:10.000000','APPROVE_PRODUCT_REQUISITION','Enable approve product requisition'),('f2a4e532-3f6f-47af-b0df-2827be693545','d5CvGjUsVn','2024-09-26 02:38:01.000000','2024-09-26 02:38:01.000000','UPDATE_AUTHORITY','Enable approve product requisition'),('fd39c09c-f073-42b8-b3b0-4b55ca83daed','48Hu3slRrq','2024-09-25 07:54:25.000000','2024-09-26 02:11:34.315295','READ_PRODUCT_REQUISITION','Enable read requisition by creator');
/*!40000 ALTER TABLE `authority_tbl` ENABLE KEYS */;
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
  `role_id_column` varchar(36) DEFAULT NULL,
  `authority_id_column` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id_column`),
  UNIQUE KEY `IDX_7f6780c50caf9d345e78b5068d` (`slug_column`),
  KEY `FK_c537d3223c1907511bc8935a751` (`role_id_column`),
  KEY `FK_ac97012cfa7def4512b08d2c45f` (`authority_id_column`),
  CONSTRAINT `FK_ac97012cfa7def4512b08d2c45f` FOREIGN KEY (`authority_id_column`) REFERENCES `authority_tbl` (`id_column`),
  CONSTRAINT `FK_c537d3223c1907511bc8935a751` FOREIGN KEY (`role_id_column`) REFERENCES `role_tbl` (`id_column`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission_tbl`
--

LOCK TABLES `permission_tbl` WRITE;
/*!40000 ALTER TABLE `permission_tbl` DISABLE KEYS */;
INSERT INTO `permission_tbl` VALUES ('5b8def45-8ef8-4084-8dd6-f12c91130859','nbgMCxvkNf','2024-09-26 04:12:56.225957','2024-09-26 04:12:56.225957','69ef79f2-3ea1-4dd4-884e-481ae643ce14','a6f70328-61c8-4551-9bf1-a63bb4415d7a'),('694ca7b2-aa40-4b9c-934b-0d61242aef5c','qYSSARRD-0','2024-09-26 07:13:52.924323','2024-09-26 07:13:52.924323','a3dd7d24-a3bf-4836-8462-8200ac6f7d85','cc4b4b8e-992a-45e4-bfdc-447f200e92db'),('836b3b55-daa0-46a0-b6a9-b7aa8be961c3','axdcG4i8Nr','2024-09-25 07:58:29.459180','2024-09-26 04:03:04.926053','69ef79f2-3ea1-4dd4-884e-481ae643ce14','fd39c09c-f073-42b8-b3b0-4b55ca83daed'),('b2c9799b-81bf-4292-aa27-2c54aa6977f7','yIFFDORFkR','2024-09-26 07:12:53.633724','2024-09-26 07:12:53.633724','ab001ab3-4389-4d79-ad56-bdde831b5d37','cc4b4b8e-992a-45e4-bfdc-447f200e92db'),('c8049cbe-813f-45c1-b9c2-8dc4bf82f616','bIrshMDKS-','2024-09-26 07:00:17.297564','2024-09-26 07:00:17.297564','ab001ab3-4389-4d79-ad56-bdde831b5d37','ec38abb1-9737-408d-9b3e-ee2e0b3ffeda'),('cac20c20-d25c-4ca9-9109-3f70103df159','2pjZk-UVfA','2024-09-26 07:14:15.456428','2024-09-26 07:14:15.456428','53d1affb-aabf-4b7b-9f8d-93aa7b15b41f','cc4b4b8e-992a-45e4-bfdc-447f200e92db'),('f3cfbc4e-5e7f-4909-98cf-2d3dad9a2235','L5hfcfUl7a','2024-09-26 06:55:05.147326','2024-09-26 06:55:05.147326','a3dd7d24-a3bf-4836-8462-8200ac6f7d85','ec38abb1-9737-408d-9b3e-ee2e0b3ffeda'),('f9465bcf-a787-4759-9091-433c8ece4fcd','p2Yqk4ROBb','2024-09-26 06:53:37.782981','2024-09-26 06:53:37.782981','53d1affb-aabf-4b7b-9f8d-93aa7b15b41f','ec38abb1-9737-408d-9b3e-ee2e0b3ffeda');
/*!40000 ALTER TABLE `permission_tbl` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-26 14:49:16
