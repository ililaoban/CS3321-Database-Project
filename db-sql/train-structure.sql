/*
 Navicat Premium Data Transfer

 Source Server         : 47.120.3.221
 Source Server Type    : MySQL
 Source Server Version : 80032 (8.0.32)
 Source Host           : 47.120.3.221:3306
 Source Schema         : hi

 Target Server Type    : MySQL
 Target Server Version : 80032 (8.0.32)
 File Encoding         : 65001

 Date: 02/06/2024 23:25:11
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for Passenger
-- ----------------------------
DROP TABLE IF EXISTS `Passenger`;
CREATE TABLE `Passenger`  (
  `sfzNo` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `discountQualification` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`sfzNo`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for Price
-- ----------------------------
DROP TABLE IF EXISTS `Price`;
CREATE TABLE `Price`  (
  `trainNoOnly` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `startStation` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `endStation` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `seatType` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ticketPrice` decimal(10, 2) NULL DEFAULT NULL,
  `testbit` bit(20) NULL DEFAULT NULL,
  PRIMARY KEY (`trainNoOnly`, `startStation`, `endStation`, `seatType`) USING BTREE,
  INDEX `trainNoOnly`(`trainNoOnly` ASC, `seatType` ASC) USING BTREE,
  INDEX `endStation`(`endStation` ASC, `trainNoOnly` ASC) USING BTREE,
  INDEX `trainNoOnly_2`(`trainNoOnly` ASC, `startStation` ASC, `endStation` ASC) USING BTREE,
  CONSTRAINT `Price_ibfk_1` FOREIGN KEY (`trainNoOnly`, `seatType`) REFERENCES `Seat` (`trainNoOnly`, `seatType`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `Price_ibfk_2` FOREIGN KEY (`endStation`, `trainNoOnly`) REFERENCES `TrainStation` (`stationName`, `trainNoOnly`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `Price_ibfk_3` FOREIGN KEY (`trainNoOnly`, `startStation`) REFERENCES `TrainStation` (`trainNoOnly`, `stationName`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for Seat
-- ----------------------------
DROP TABLE IF EXISTS `Seat`;
CREATE TABLE `Seat`  (
  `carriageNo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `trainNoOnly` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `seatNo` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `seatType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `bitmap` bit(20) NULL DEFAULT NULL,
  PRIMARY KEY (`carriageNo`, `trainNoOnly`, `seatNo`) USING BTREE,
  INDEX `carriageNo`(`carriageNo` ASC, `seatNo` ASC) USING BTREE,
  INDEX `trainNoOnly`(`trainNoOnly` ASC, `seatType` ASC) USING BTREE,
  CONSTRAINT `Seat_ibfk_1` FOREIGN KEY (`trainNoOnly`) REFERENCES `Train` (`trainNoOnly`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for Station
-- ----------------------------
DROP TABLE IF EXISTS `Station`;
CREATE TABLE `Station`  (
  `stationName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cityName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `provinceName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`stationName`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for Train
-- ----------------------------
DROP TABLE IF EXISTS `Train`;
CREATE TABLE `Train`  (
  `trainNoOnly` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '列车唯一标识符',
  PRIMARY KEY (`trainNoOnly`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for TrainStation
-- ----------------------------
DROP TABLE IF EXISTS `TrainStation`;
CREATE TABLE `TrainStation`  (
  `trainNoOnly` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `stationName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `trainNo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `stationOrder` int NULL DEFAULT NULL,
  `trainArriveTime` datetime NULL DEFAULT NULL,
  `trainDepartTime` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`trainNoOnly`, `stationName`) USING BTREE,
  INDEX `stationName`(`stationName` ASC) USING BTREE,
  CONSTRAINT `TrainStation_ibfk_1` FOREIGN KEY (`trainNoOnly`) REFERENCES `Train` (`trainNoOnly`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `TrainStation_ibfk_2` FOREIGN KEY (`stationName`) REFERENCES `Station` (`stationName`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for Trip
-- ----------------------------
DROP TABLE IF EXISTS `Trip`;
CREATE TABLE `Trip`  (
  `trainNoOnly` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `carriageNo` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `seatNo` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `startStation` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `endStation` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ticketType` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `sfzNo` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ticketNo` int UNSIGNED NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ticketNo`) USING BTREE,
  INDEX `sfzNo`(`sfzNo` ASC) USING BTREE,
  INDEX `Trip_ibfk_1`(`carriageNo` ASC, `seatNo` ASC, `trainNoOnly` ASC) USING BTREE,
  INDEX `trainNoOnly`(`trainNoOnly` ASC, `startStation` ASC, `endStation` ASC) USING BTREE,
  CONSTRAINT `Trip_ibfk_1` FOREIGN KEY (`carriageNo`, `seatNo`, `trainNoOnly`) REFERENCES `Seat` (`carriageNo`, `seatNo`, `trainNoOnly`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `Trip_ibfk_2` FOREIGN KEY (`sfzNo`) REFERENCES `Passenger` (`sfzNo`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `Trip_ibfk_3` FOREIGN KEY (`trainNoOnly`, `startStation`, `endStation`) REFERENCES `Price` (`trainNoOnly`, `startStation`, `endStation`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 46 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
