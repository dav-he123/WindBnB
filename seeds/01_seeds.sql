
   
INSERT INTO users (name, email, password) 
VALUES ('Tom', 'tom@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('David', 'david@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('John', 'john@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bedrooms, number_of_bathrooms, country, street, city, province, post_code, active)
VALUES (1, 'House', 'description', '1200px-Toronto_Raptors_logo.svg.png', 'photo-1512867616096-c91ed9daf1eb.jpeg', 287, 2, 5, 2, 'Canada', 'Shawn Street', 'Montreal', 'Quebec', 'L3E', TRUE),
(2, 'Condo', 'description', '1200px-Toronto_Raptors_logo.svg.png', 'photo-1512867616096-c91ed9daf1eb.jpeg', 235, 3, 6, 3, 'Canada', 'Shawn Street', 'Montreal', 'Quebec', 'L3E', TRUE),
(3, 'John', 'description', '1200px-Toronto_Raptors_logo.svg.png', 'photo-1512867616096-c91ed9daf1eb.jpeg', 785, 2, 3, 1, 'Canada', 'Albert Street', 'Toronto', 'Ontario', 'L2R', TRUE);


INSERT INTO reservations (property_id, guest_id, start_date, end_date) 
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14');


INSERT INTO property_reviews (property_id, guest_id, reservation_id, message, rating)
VALUES (1, 1, 1, 'message', 7),
(2, 2, 2, 'message', 9),
(3, 3, 3, 'message', 8);


