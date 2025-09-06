CREATE TABLE `Users` (
   `user_id`   BIGINT   NOT NULL,
   `user_password`   VARCHAR(255)   NOT NULL,
   `user_name`   VARCHAR(50)   NOT NULL,
   `user_profille_url`   VARCHAR(255)   NULL,
   `email`   VARCHAR(255)   NOT NULL,
   `created`   DATETIME   NOT NULL,
   `updated`   DATETIME   NOT NULL
);


CREATE TABLE `Memories` (
   `memory_id`   BIGINT   NOT NULL,
   `user_id`   BIGINT   NOT NULL,
   `course_id`   BIGINT   NOT NULL,
   `activity_date`   DATETIME   NOT NULL,
   `image_url`   VARCHAR(255)   NULL,
   `mothers_quote`   TEXT   NULL,
   `my_feeling`   TEXT   NULL,
   `created`   DATETIME   NOT NULL,
   `updated`   DATETIME   NOT NULL
);

CREATE TABLE `DateCourses` (
   `course_id`   BIGINT   NOT NULL,
   `course_title`   VARCHAR(255)   NOT NULL,
   `course_description`   TEXT   NULL,
   `course_image_url`   VARCHAR(255)   NULL,
   `course_schedule`   TEXT   NULL,
   `course_tag`   INT   NULL,
   `created`   DATETIME   NOT NULL,
   `updated`   DATETIME   NOT NULL
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

