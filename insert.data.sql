INSERT INTO "user" (email, name, password) VALUES
('john@example.com', 'John Doe', 'password123'),
('jane@example.com', 'Jane Doe', 'securepass'),
('bob@example.com', 'Bob Smith', 'secret');

INSERT INTO accommodation (name, image, price, description, user_id) VALUES
('Nice, France', 'nice_image.jpg', 200, 'petite maison', 1),
('Paris, France',  'paris_image.jpg', 300, 'Bel appartement près de la Tour Eiffel', 2),
('New York, USA', 'ny_image.jpg', 500,  'Spacious loft in the heart of Manhattan', 3);


INSERT INTO reservation (departure_date, arrival_date, user_id, accommodation_id) VALUES
('2023-01-12', '2023-09-12', 1, 2),
('2023-01-15', '2023-09-15', 1, 2);

INSERT INTO favoris (user_id, accommodation_id) VALUES 
(1, 1)