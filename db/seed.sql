DROP TABLE IF EXISTS users;

CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  username VARCHAR(120),
  hash text,
  profile_pic text
);

INSERT INTO users
(username, hash, profile_pic)
VALUES
('Trogdor', '$2a$10$wZUxoi7vsBOeHK3zhiY4H.Nc5WvuyukqmsGjat9XMGl40w3/RhdiW', 'https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'),
('Blackbeard', '$2a$10$KFR1RUO0JiFtCoux3mnJaemV6Ifnk0BOTdjm/VWh.uOZ97pD3X1Re', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Osi4iyL-h4jNMyYD5IrDoz0emcnKY_-zZiY2EdEyMOWLpUwF&s'),
('Skallywag', '$2a$10$dgo.HRAecEhFl8L0h.lJM.OeM2t8y5Pi3AmiBlfCXUIIS/PUtfwd.', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');



DROP TABLE IF EXISTS posts;
CREATE TABLE posts
(
  id SERIAL PRIMARY KEY,
  title varchar(45),
  img text,
  content varchar(600),
  author_id int references users(id)
);