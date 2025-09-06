DROP SCHEMA IF EXISTS ItDa;
CREATE SCHEMA IF NOT EXISTS ItDa DEFAULT CHARACTER SET utf8;
USE ItDa;

-- -----------------------------

DROP TABLE IF EXISTS ItDa.user;

CREATE TABLE user (
  user_id VARCHAR(60),
  user_name VARCHAR(20),
  user_password VARCHAR(255),
  user_email VARCHAR(255),
  profile_img_url VARCHAR(255),
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  PRIMARY KEY(user_id)
);

-- 변경된 DB 명세 반영한 sql (수영 12:45)


CREATE TABLE `Users` (
	`user_id`	BIGINT	NOT NULL,
	`user_password`	VARCHAR(255)	NOT NULL,
	`user_name`	VARCHAR(50)	NOT NULL,
	`user_profille_url`	VARCHAR(255)	NULL,
	`email`	VARCHAR(255)	NOT NULL,
	`created`	DATETIME	NOT NULL,
	`updated`	DATETIME	NOT NULL
);


CREATE TABLE `Memories` (
	`memory_id`	BIGINT	NOT NULL,
	`user_id`	BIGINT	NOT NULL,
	`course_id`	BIGINT	NOT NULL,
	`activity_date`	DATETIME	NOT NULL,
	`image_url`	VARCHAR(255)	NULL,
	`mothers_quote`	TEXT	NULL,
	`my_feeling`	TEXT	NULL,
	`created`	DATETIME	NOT NULL,
	`updated`	DATETIME	NOT NULL
);

CREATE TABLE `DateCourses` (
	`course_id`	BIGINT	NOT NULL,
	`course_title`	VARCHAR(255)	NOT NULL,
	`course_description`	TEXT	NULL,
	`course_image_url`	VARCHAR(255)	NULL,
	`course_schedule`	TEXT NULL,
	`course_tag`	BIGINT	NULL,
	`created`	DATETIME	NOT NULL,
	`updated`	DATETIME	NOT NULL
);


ALTER TABLE `Memories` ADD CONSTRAINT `PK_Memories` PRIMARY KEY (
	`memory_id`,
	`user_id`,
	`course_id`
);

ALTER TABLE `DateCourses` ADD CONSTRAINT `PK_DateCourses` PRIMARY KEY (
	`course_id`
);

ALTER TABLE `Users` ADD CONSTRAINT `PK_Users` PRIMARY KEY (
	`user_id`
);

ALTER TABLE `Memories` ADD CONSTRAINT `FK_사용자_TO_Memories_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `Users` (
	`user_id`
);

ALTER TABLE `Memories` ADD CONSTRAINT `FK_DateCourses_TO_Memories_1` FOREIGN KEY (
	`course_id`
)
REFERENCES `DateCourses` (
	`course_id`
);



-- -----------------------------

INSERT INTO user (user_id, user_name, user_password, user_email, profile_img_url)
VALUES
('user01', '박근원', 'pass01', 'user01@email.com', 'https://example.com/img01.png'),
('user02', '김기재', 'pass02', 'user02@email.com', 'https://example.com/img02.png'),
('user03', '이수민', 'pass03', 'user03@email.com', 'https://example.com/img03.png'),
('user04', '최지훈', 'pass04', 'user04@email.com', 'https://example.com/img04.png'),
('user05', '정유진', 'pass05', 'user05@email.com', 'https://example.com/img05.png'),
('user06', '한지은', 'pass06', 'user06@email.com', 'https://example.com/img06.png'),
('user07', '오세훈', 'pass07', 'user07@email.com', 'https://example.com/img07.png'),
('user08', '윤서영', 'pass08', 'user08@email.com', 'https://example.com/img08.png'),
('user09', '장민수', 'pass09', 'user09@email.com', 'https://example.com/img09.png'),
('user10', '백승우', 'pass10', 'user10@email.com', 'https://example.com/img10.png');


-- 변경된 DB 명세 반영한 sql (수영 12:45)
-- Users 더미 데이터
INSERT INTO `Users` (`user_id`, `user_password`, `user_name`, `user_profille_url`, `email`, `created`, `updated`) VALUES
(1, 'pw123', 'Alice', 'https://example.com/profiles/alice.jpg', 'alice@example.com', NOW(), NOW()),
(2, 'pw234', 'Bob', 'https://example.com/profiles/bob.jpg', 'bob@example.com', NOW(), NOW()),
(3, 'pw345', 'Charlie', NULL, 'charlie@example.com', NOW(), NOW()),
(4, 'pw456', 'Diana', 'https://example.com/profiles/diana.png', 'diana@example.com', NOW(), NOW()),
(5, 'pw567', 'Eve', NULL, 'eve@example.com', NOW(), NOW());

-- DateCourses 더미 데이터
INSERT INTO `DateCourses` (`course_id`, `course_title`, `course_description`, `course_image_url`, `course_schedule`, `course_tag`, `created`, `updated`) VALUES
(101, 'Cooking Class', 'Learn to cook Italian dishes.', 'https://example.com/courses/cooking.jpg', 'Every Saturday 10AM', 1, NOW(), NOW()),
(102, 'Yoga Basics', 'Introductory yoga for beginners.', 'https://example.com/courses/yoga.jpg', 'Mon/Wed/Fri 7AM', 2, NOW(), NOW()),
(103, 'Photography', 'Basics of DSLR photography.', NULL, 'Weekend mornings', 3, NOW(), NOW()),
(104, 'Painting Workshop', 'Learn watercolor painting.', 'https://example.com/courses/painting.png', 'Sundays 2PM', 4, NOW(), NOW()),
(105, 'Coding Bootcamp', 'Web development fundamentals.', 'https://example.com/courses/coding.png', 'Weekdays 6PM', 5, NOW(), NOW());

-- Memories 더미 데이터
INSERT INTO `Memories` (`memory_id`, `user_id`, `course_id`, `activity_date`, `image_url`, `mothers_quote`, `my_feeling`, `created`, `updated`) VALUES
(1001, 1, 101, '2025-09-01 10:00:00', 'https://example.com/memories/alice_cooking.jpg', 'Food brings people together.', 'Excited and happy', NOW(), NOW()),
(1002, 2, 102, '2025-09-02 07:00:00', NULL, 'Health is wealth.', 'Relaxed and calm', NOW(), NOW()),
(1003, 3, 103, '2025-09-03 09:00:00', 'https://example.com/memories/charlie_photo.png', NULL, 'Inspired by nature', NOW(), NOW()),
(1004, 4, 104, '2025-09-04 14:00:00', NULL, 'Creativity takes courage.', 'Focused and creative', NOW(), NOW()),
(1005, 5, 105, '2025-09-05 18:00:00', 'https://example.com/memories/eve_code.jpg', 'Learning never ends.', 'Motivated and curious', NOW(), NOW());


-- ----------------------------

-- SELECT userId, userName FROM user ORDER BY created LIMIT 1;
-- SELECT userName FROM user WHERE userId='asd';
-- DELETE FROM user WHERE userName='박근원';
-- UPDATE user SET userId='dsa' WHERE userName='김기재';