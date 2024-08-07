-- CREATE DATABASE IF NOT EXISTS productsdb; 

-- -- SCRIPT PARA POSTGRES
-- -- SELECT 'CREATE DATABASE ordersdb'
-- -- WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'ordersdb')\gexec

-- CREATE TABLE IF NOT EXISTS productsdb.products (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     price DECIMAL(10, 2) NOT NULL,
--     available BOOLEAN DEFAULT true,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
--     deleted_at TIMESTAMP NULL
-- );

WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'productsdb')\gexec

CREATE SCHEMA productsdb;

\c productsdb