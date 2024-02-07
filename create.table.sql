CREATE TABLE IF NOT EXISTS "user" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR(100) UNIQUE,
    "name" VARCHAR(50),
    "password" TEXT
);

CREATE TABLE IF NOT EXISTS "accommodation" (
    "id" SERIAL PRIMARY KEY,
    "image" VARCHAR(255),
    "name" VARCHAR(100),
    "price" DECIMAL(10, 2),
    "description" TEXT, 
    "user_id" INT, 
    FOREIGN KEY ("user_id") REFERENCES "user"("id")
);

CREATE TABLE
IF NOT EXISTS "reservation" (
    "id" SERIAL PRIMARY KEY,
    "departure_date" DATE,
    "arrival_date" DATE,
    "user_id" INT, 
    FOREIGN KEY ("user_id") REFERENCES "user"("id"),
    "accommodation_id" INT,
    FOREIGN KEY ("accommodation_id") REFERENCES "accommodation"("id")
);
 
CREATE TABLE
 IF NOT EXISTS  "favoris" (
    "id" SERIAL PRIMARY KEY, 
    "user_id" INT, 
    FOREIGN KEY ("user_id") REFERENCES "user"("id"),
    "accommodation_id" INT,
    FOREIGN KEY ("accommodation_id") REFERENCES "accommodation"("id")
);
