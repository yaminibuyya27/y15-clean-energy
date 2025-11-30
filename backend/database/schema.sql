-- Y15 Clean Energy Database Schema

-- Create database
CREATE DATABASE IF NOT EXISTS y15_clean_energy;
USE y15_clean_energy;

-- Table for users with encrypted passwords
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_username (username)
);

-- Table for energy investment data
CREATE TABLE IF NOT EXISTS energy_investments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  year INT NOT NULL,
  technology VARCHAR(50) NOT NULL,
  investment_billions DECIMAL(10, 2) NOT NULL,
  color VARCHAR(7) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_year (year),
  INDEX idx_technology (technology)
);

-- Table for regional capacity data
CREATE TABLE IF NOT EXISTS regional_capacity (
  id INT AUTO_INCREMENT PRIMARY KEY,
  region VARCHAR(100) NOT NULL,
  year INT NOT NULL,
  capacity_mw INT NOT NULL,
  color VARCHAR(7) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_year (year),
  INDEX idx_region (region)
);

-- Insert investment data
INSERT INTO energy_investments (year, technology, investment_billions, color) VALUES
-- 2020 data
(2020, 'Solar', 145.5, '#ffcd56'),
(2020, 'Wind', 125.3, '#36a2eb'),
(2020, 'Hydro', 45.2, '#4bc0c0'),
(2020, 'Energy Storage', 15.8, '#ff6384'),

-- 2021 data
(2021, 'Solar', 165.7, '#ffcd56'),
(2021, 'Wind', 142.1, '#36a2eb'),
(2021, 'Hydro', 48.5, '#4bc0c0'),
(2021, 'Energy Storage', 22.4, '#ff6384'),

-- 2022 data
(2022, 'Solar', 198.3, '#ffcd56'),
(2022, 'Wind', 155.8, '#36a2eb'),
(2022, 'Hydro', 51.2, '#4bc0c0'),
(2022, 'Energy Storage', 35.6, '#ff6384'),

-- 2023 data
(2023, 'Solar', 245.6, '#ffcd56'),
(2023, 'Wind', 178.9, '#36a2eb'),
(2023, 'Hydro', 53.8, '#4bc0c0'),
(2023, 'Energy Storage', 52.3, '#ff6384'),

-- 2024 data (projected)
(2024, 'Solar', 295.4, '#ffcd56'),
(2024, 'Wind', 205.2, '#36a2eb'),
(2024, 'Hydro', 56.1, '#4bc0c0'),
(2024, 'Energy Storage', 75.8, '#ff6384');

-- Insert regional capacity data
INSERT INTO regional_capacity (region, year, capacity_mw, color) VALUES
-- 2020 data
('Asia-Pacific', 2020, 850000, '#ff6384'),
('Europe', 2020, 520000, '#36a2eb'),
('North America', 2020, 380000, '#ffcd56'),
('Latin America', 2020, 185000, '#4bc0c0'),
('Middle East & Africa', 2020, 95000, '#9966ff'),

-- 2021 data
('Asia-Pacific', 2021, 950000, '#ff6384'),
('Europe', 2021, 585000, '#36a2eb'),
('North America', 2021, 425000, '#ffcd56'),
('Latin America', 2021, 215000, '#4bc0c0'),
('Middle East & Africa', 2021, 115000, '#9966ff'),

-- 2022 data
('Asia-Pacific', 2022, 1080000, '#ff6384'),
('Europe', 2022, 650000, '#36a2eb'),
('North America', 2022, 480000, '#ffcd56'),
('Latin America', 2022, 255000, '#4bc0c0'),
('Middle East & Africa', 2022, 145000, '#9966ff'),

-- 2023 data
('Asia-Pacific', 2023, 1245000, '#ff6384'),
('Europe', 2023, 725000, '#36a2eb'),
('North America', 2023, 545000, '#ffcd56'),
('Latin America', 2023, 310000, '#4bc0c0'),
('Middle East & Africa', 2023, 185000, '#9966ff'),

-- 2024 data (projected)
('Asia-Pacific', 2024, 1420000, '#ff6384'),
('Europe', 2024, 810000, '#36a2eb'),
('North America', 2024, 620000, '#ffcd56'),
('Latin America', 2024, 375000, '#4bc0c0'),
('Middle East & Africa', 2024, 235000, '#9966ff');
