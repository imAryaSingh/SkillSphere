CREATE DATABASE IF NOT EXISTS skillsphere;
USE skillsphere;
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    skills_offered TEXT,
    skills_wanted TEXT,
    availability VARCHAR(50),
    is_public BOOLEAN DEFAULT TRUE
);