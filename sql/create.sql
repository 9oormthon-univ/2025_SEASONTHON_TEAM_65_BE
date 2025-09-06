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

-- ----------------------------

-- SELECT userId, userName FROM user ORDER BY created LIMIT 1;
-- SELECT userName FROM user WHERE userId='asd';
-- DELETE FROM user WHERE userName='박근원';
-- UPDATE user SET userId='dsa' WHERE userName='김기재';