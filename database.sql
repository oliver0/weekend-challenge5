CREATE TABLE employees(
id SERIAL PRIMARY KEY,
first_name VARCHAR(100),
last_name VARCHAR(100),
job_title VARCHAR(120),
annual_salary FLOAT,
active BOOLEAN DEFAULT true);
