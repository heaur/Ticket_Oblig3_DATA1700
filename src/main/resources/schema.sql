CREATE TABLE Ticket
(
    orderNr SMALLINT NOT NULL AUTO_INCREMENT,
    movies VARCHAR(255) NOT NULL,
    totalTickets INTEGER NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telephoneNr VARCHAR(255) NOT NULL,
    PRIMARY KEY (orderNr)
);
