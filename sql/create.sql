DROP SCHEMA IF EXISTS ItDa;
CREATE SCHEMA IF NOT EXISTS ItDa DEFAULT CHARACTER SET utf8;
USE ItDa;

-- -----------------------------

DROP TABLE IF EXISTS ItDa.Users;
DROP TABLE IF EXISTS ItDa.Memories;
DROP TABLE IF EXISTS ItDa.DateCourses;

CREATE TABLE Users (
  user_id BIGINT NOT NULL AUTO_INCREMENT,
  user_password VARCHAR(255) NOT NULL,
  user_name VARCHAR(50) NOT NULL,
  user_profille_url VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  PRIMARY KEY (user_id)
);

CREATE TABLE Memories (
  memory_id BIGINT NOT NULL AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  course_id BIGINT NOT NULL,
  activity_date DATETIME NOT NULL,
  image_url VARCHAR(255),
  mothers_quote TEXT,
  my_feeling TEXT,
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  PRIMARY KEY (memory_id)
);

CREATE TABLE DateCourses (
  course_id BIGINT NOT NULL AUTO_INCREMENT,
  course_title VARCHAR(255) NOT NULL,
  course_description TEXT,
  course_image_url VARCHAR(255),
  course_schedule TEXT,
  course_tag INT,
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  PRIMARY KEY (course_id)
);

-- Users 더미 데이터
INSERT INTO Users (user_password, user_name, user_profille_url, email) VALUES
('pw123', 'Alice', 'https://example.com/profiles/alice.jpg', 'alice@example.com'),
('pw234', 'Bob', 'https://example.com/profiles/bob.jpg', 'bob@example.com'),
('pw345', 'Charlie', NULL, 'charlie@example.com'),
('pw456', 'Diana', 'https://example.com/profiles/diana.png', 'diana@example.com'),
('pw567', 'Eve', NULL, 'eve@example.com');

-- DateCourses 더미 데이터
INSERT INTO DateCourses (course_title, course_description, course_image_url, course_schedule, course_tag) VALUES
('Cooking Class', 'Learn to cook Italian dishes.', 'https://example.com/courses/cooking.jpg', 'Every Saturday 10AM', 1),
('Yoga Basics', 'Introductory yoga for beginners.', 'https://example.com/courses/yoga.jpg', 'Mon/Wed/Fri 7AM', 2),
('Photography', 'Basics of DSLR photography.', NULL, 'Weekend mornings', 3),
('Painting Workshop', 'Learn watercolor painting.', 'https://example.com/courses/painting.png', 'Sundays 2PM', 4),
('Coding Bootcamp', 'Web development fundamentals.', 'https://example.com/courses/coding.png', 'Weekdays 6PM', 5);

-- Memories 더미 데이터
INSERT INTO Memories (user_id, course_id, activity_date, image_url, mothers_quote, my_feeling) VALUES
(1, 1, '2025-09-01 10:00:00', 'https://example.com/memories/alice_cooking.jpg', 'Food brings people together.', 'Excited and happy'),
(2, 2, '2025-09-02 07:00:00', NULL, 'Health is wealth.', 'Relaxed and calm'),
(3, 3, '2025-09-03 09:00:00', 'https://example.com/memories/charlie_photo.png', NULL, 'Inspired by nature'),
(4, 4, '2025-09-04 14:00:00', NULL, 'Creativity takes courage.', 'Focused and creative'),
(5, 5, '2025-09-05 18:00:00', 'https://example.com/memories/eve_code.jpg', 'Learning never ends.', 'Motivated and curious');

