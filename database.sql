CREATE TABLE employees(
id SERIAL PRIMARY KEY,
first_name VARCHAR(40),
last_name VARCHAR(40),
job_title VARCHAR(40),
annual_salary FLOAT,
active BOOLEAN DEFAULT true);
