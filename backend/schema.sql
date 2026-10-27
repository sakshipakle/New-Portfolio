-- =============================================================================
-- Portfolio Database Initialization & Contact Messages Schema
-- Target Database: MySQL 8.0+ / 9.x
-- =============================================================================

-- 1. Create the database if it doesn't already exist
CREATE DATABASE IF NOT EXISTS `portfolio_db`
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

-- 2. Select the database
USE `portfolio_db`;

-- 3. Create the contact_messages table to store visitor submissions
CREATE TABLE IF NOT EXISTS `contact_messages` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL COMMENT 'Sender full name',
    `email` VARCHAR(150) NOT NULL COMMENT 'Sender email address',
    `service_interest` VARCHAR(150) DEFAULT NULL COMMENT 'Selected inquiry or service category',
    `subject` VARCHAR(200) NOT NULL COMMENT 'Subject of the message',
    `message` TEXT NOT NULL COMMENT 'Full message content',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Timestamp when message was submitted',
    INDEX `idx_email` (`email`),
    INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Sample verification query
-- SELECT * FROM `contact_messages` ORDER BY `created_at` DESC;
