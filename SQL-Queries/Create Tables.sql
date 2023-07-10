CREATE TABLE `ArtistT` (

  `artistId` int NOT NULL AUTO_INCREMENT,

  `firstname` varchar(45) NOT NULL,

  `lastname` varchar(45) NOT NULL,

  `biography` varchar(1500) DEFAULT NULL,

  `commisionPercentage` decimal(4,2) DEFAULT NULL,

  `artsSold` int NOT NULL DEFAULT '0',

  `country` varchar(45) DEFAULT NULL,

  `city` varchar(45) DEFAULT NULL,

  `address` varchar(200) DEFAULT NULL,

  PRIMARY KEY (`artistId`)

) ENGINE=InnoDB AUTO_INCREMENT=302 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ArtworkT` (

  `artworkId` int NOT NULL AUTO_INCREMENT,

  `artistId_artwork_fk` int DEFAULT NULL,

  `creationDate` datetime DEFAULT NULL,

  `salesStatus` varchar(20) DEFAULT 'available',

  `description` varchar(1500) DEFAULT NULL,

  `artworkName` varchar(256) NOT NULL,

  `height` int DEFAULT NULL COMMENT 'in CM\n',

  `width` int DEFAULT NULL COMMENT 'in CM\n',

  `length` int DEFAULT NULL COMMENT 'in CM',

  PRIMARY KEY (`artworkId`),

  KEY `artistId_idx` (`artistId_artwork_fk`),

  CONSTRAINT `artistId_artwork_fk` FOREIGN KEY (`artistId_artwork_fk`) REFERENCES `ArtistT` (`artistId`)

) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ArtistPhoneNumberT` (

  `artistId` int NOT NULL,

  `phoneNumber` varchar(12) NOT NULL,

  PRIMARY KEY (`phoneNumber`,`artistId`),

  KEY `artistId_idx` (`artistId`),

  CONSTRAINT `artistId` FOREIGN KEY (`artistId`) REFERENCES `ArtistT` (`artistId`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ArtworkLocationT` (

  `artworkId_location_fk` int NOT NULL,

  `date` datetime NOT NULL,

  `location` varchar(256) NOT NULL,

  PRIMARY KEY (`artworkId_location_fk`,`date`),

  CONSTRAINT `artworkId_location_fk` FOREIGN KEY (`artworkId_location_fk`) REFERENCES `ArtworkT` (`artworkId`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ArtworkMaterialT` (

  `artworkId_material_fk` int NOT NULL,

  `material` varchar(50) NOT NULL,

  PRIMARY KEY (`artworkId_material_fk`,`material`),

  CONSTRAINT `artworkId_material_fk` FOREIGN KEY (`artworkId_material_fk`) REFERENCES `ArtworkT` (`artworkId`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE `ArtwrokPriceT` (

  `artwork_price_fk` int NOT NULL,

  `date` datetime NOT NULL,

  `price` int NOT NULL,

  PRIMARY KEY (`artwork_price_fk`,`date`),

  CONSTRAINT `artworkId_price_fk` FOREIGN KEY (`artwork_price_fk`) REFERENCES `ArtworkT` (`artworkId`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `UniDBCourseSchema`.`WorkerT` (
  `workerId` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(50) NOT NULL,
  `lastname` VARCHAR(50) NOT NULL,
  `address` VARCHAR(120) NOT NULL,
  `position` VARCHAR(50) NOT NULL,
  `employmentStatus` VARCHAR(30) NOT NULL,
  `employmentDate` DATE NOT NULL,
  `email` VARCHAR(50) NULL,
  `birthDate` DATE NOT NULL,
  `education` VARCHAR(100) NULL,
  `salary` INT NOT NULL,
  `nationalId` CHAR(10) NOT NULL,
  PRIMARY KEY (`workerId`));
  
  CREATE TABLE `UniDBCourseSchema`.`WorkerPhoneNumberT` (
  `workerId` INT NOT NULL,
  `phoneNumber` VARCHAR(12) NOT NULL,
  PRIMARY KEY (`workerId`, `phoneNumber`),
  CONSTRAINT `workerId_phoneNumber_fk`
    FOREIGN KEY (`workerId`)
    REFERENCES `UniDBCourseSchema`.`WorkerT` (`workerId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `WorkerEmergencyPhoneNumberT` (
  `workerId` int NOT NULL,
  `phoneNumber` varchar(12) NOT NULL,
  `relation` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`workerId`,`phoneNumber`),
  CONSTRAINT `workerId_EPhoneNumber_fk` FOREIGN KEY (`workerId`) REFERENCES `WorkerT` (`workerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
SELECT * FROM UniDBCourseSchema.WorkerEmergencyPhoneNumberT;

CREATE TABLE `VisitorT` (
  `nationalCode` char(10) NOT NULL,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `phoneNumber` varchar(12) NOT NULL,
  `newsLetterStatus` varchar(10) DEFAULT NULL,
  `newsLetterExpirationDate` date DEFAULT NULL,
  PRIMARY KEY (`nationalCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `UniDBCourseSchema`.`RoomT` (
  `roomNumber` INT NOT NULL,
  `location` VARCHAR(200) NULL,
  `name` VARCHAR(100) NOT NULL,
  `lightingCondition` VARCHAR(1024) NULL,
  `airConditioningSystem` VARCHAR(1024) NULL,
  `height` INT NULL,
  `width` INT NULL,
  `length` INT NULL,
  PRIMARY KEY (`roomNumber`));

CREATE TABLE `UniDBCourseSchema`.`ExhibitionT` (
  `exhibitionId` INT NOT NULL AUTO_INCREMENT,
  `workerId` INT NOT NULL,
  `name` VARCHAR(512) NOT NULL,
  `startDate` DATETIME NULL,
  `endDate` DATETIME NULL,
  `description` VARCHAR(2048) NULL,
  `visitorAttended` INT NULL,
  `numberOfTickets` INT NULL,
  PRIMARY KEY (`exhibitionId`),
  INDEX `workerId_exhibition_fk_idx` (`workerId` ASC) VISIBLE,
  CONSTRAINT `workerId_exhibition_fk`
    FOREIGN KEY (`workerId`)
    REFERENCES `UniDBCourseSchema`.`WorkerT` (`workerId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
CREATE TABLE `RoomExhibitionAssociationT` (
  `exhibitionId` int NOT NULL,
  `roomNumber` int NOT NULL,
  PRIMARY KEY (`exhibitionId`,`roomNumber`),
  KEY `roomNumber_REA_fk_idx` (`roomNumber`),
  CONSTRAINT `exhibitionId_REA_fk` FOREIGN KEY (`exhibitionId`) REFERENCES `ExhibitionT` (`exhibitionId`),
  CONSTRAINT `roomNumber_REA_fk` FOREIGN KEY (`roomNumber`) REFERENCES `RoomT` (`roomNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ArtworkExhibitionAssociationT` (
  `artworkId` int NOT NULL,
  `exhibitionId` int NOT NULL,
  PRIMARY KEY (`artworkId`,`exhibitionId`),
  KEY `exhibitionId_AEA_fk_idx` (`exhibitionId`),
  CONSTRAINT `artworkId_AEA_fk` FOREIGN KEY (`artworkId`) REFERENCES `ArtworkT` (`artworkId`),
  CONSTRAINT `exhibitionId_AEA_fk` FOREIGN KEY (`exhibitionId`) REFERENCES `ExhibitionT` (`exhibitionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `TicketT` (
  `ticketId` int NOT NULL AUTO_INCREMENT,
  `exhibitionId` int NOT NULL,
  `nationalCode` char(10) DEFAULT NULL,
  `purchaseDate` datetime DEFAULT NULL,
  PRIMARY KEY (`ticketId`),
  KEY `nationalCode_ticket_fk_idx` (`nationalCode`),
  KEY `exhibitionId_ticket_fk_idx` (`exhibitionId`),
  CONSTRAINT `exhibitionId_ticket_fk` FOREIGN KEY (`exhibitionId`) REFERENCES `ExhibitionT` (`exhibitionId`),
  CONSTRAINT `nationalCode_ticket_fk` FOREIGN KEY (`nationalCode`) REFERENCES `VisitorT` (`nationalCode`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `TicketPriceT` (
  `ticketId` int NOT NULL,
  `date` datetime NOT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`ticketId`,`date`),
  CONSTRAINT `ticketId_price_fk` FOREIGN KEY (`ticketId`) REFERENCES `TicketT` (`ticketId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `VisitorFeedbackT` (
  `feedbackId` int NOT NULL AUTO_INCREMENT,
  `ticketId` int NOT NULL,
  `text` varchar(2048) DEFAULT NULL,
  `date` datetime NOT NULL,
  `score` varchar(45) NOT NULL,
  PRIMARY KEY (`feedbackId`),
  KEY `ticketId_visitorFeedBack_fk_idx` (`ticketId`),
  CONSTRAINT `ticketId_visitorFeedBack_fk` FOREIGN KEY (`ticketId`) REFERENCES `TicketT` (`ticketId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `SaleT` (
  `artworkId` int NOT NULL,
  `workerId` int NOT NULL,
  `nationalCode` char(10) NOT NULL,
  `price` int NOT NULL,
  `date` datetime NOT NULL,
  `paymentMethod` varchar(50) NOT NULL,
  `artistCommision` decimal(4,2) DEFAULT NULL,
  PRIMARY KEY (`artworkId`,`workerId`,`nationalCode`),
  KEY `workerId_sale_fk_idx` (`workerId`),
  KEY `nationalCode_sale_fk_idx` (`nationalCode`),
  CONSTRAINT `artworkId_sale_fk` FOREIGN KEY (`artworkId`) REFERENCES `ArtworkT` (`artworkId`),
  CONSTRAINT `nationalCode_sale_fk` FOREIGN KEY (`nationalCode`) REFERENCES `VisitorT` (`nationalCode`),
  CONSTRAINT `workerId_sale_fk` FOREIGN KEY (`workerId`) REFERENCES `WorkerT` (`workerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `PartnershipT` (
  `partnershipId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `type` varchar(50) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `contactPerson` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phoneNumber` char(12) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`partnershipId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ArtworkLoanT` (
  `artworkId` int NOT NULL,
  `partnershipId` int NOT NULL,
  `workerId` int NOT NULL,
  `status` varchar(45) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `conditions` varchar(2048) NOT NULL,
  PRIMARY KEY (`artworkId`,`partnershipId`,`workerId`),
  KEY `partnershipId_ArtworkLoan_fk_idx` (`partnershipId`),
  KEY `workerId_ArtworkLoan_fk_idx` (`workerId`),
  CONSTRAINT `artworkId_ArtworkLoan_fk` FOREIGN KEY (`artworkId`) REFERENCES `ArtworkT` (`artworkId`),
  CONSTRAINT `partnershipId_ArtworkLoan_fk` FOREIGN KEY (`partnershipId`) REFERENCES `PartnershipT` (`partnershipId`),
  CONSTRAINT `workerId_ArtworkLoan_fk` FOREIGN KEY (`workerId`) REFERENCES `WorkerT` (`workerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

