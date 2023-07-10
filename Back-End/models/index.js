const dbConfig = require('../config/db.config');
const sequelize = dbConfig.sequelize;
const DataTypes = dbConfig.Sequelize;

const ArtistModel = require('./Artist');
const ArtistPhoneNumberModel = require('./ArtistPhoneNumber');
const ArtworkModel = require('./Artwork');
const ArtworkLocationModel = require('./ArtworkLocation');
const ArtworkMaterialModel = require('./ArtworkMaterial');
const ArtworkPriceModel = require('./ArtworkPrice');
const WorkerModel = require('./Worker');
const WorkerPhoneNumberModel = require('./WorkerPhoneNumber');
const WorkerEmergencyPhoneNumberModel = require("./WorkerEmergencyPhoneNumber");
const VisitorModel = require("./Visitor");
const RoomModel = require("./Room");
const ExhibitionModel = require("./Exhibition");
const RoomExhibitionAssociationModel = require("./RoomExhibitionAssociation");
const ArtworkExhibitionAssociationModel = require("./ArtworkExhibitionAssociation");
const TicketModel = require("./Ticket");
const TicketPriceModel = require("./TicketPrice");
const VisitorFeedbackModel = require("./VisitorFeedback");
const SaleModel = require("./Sale");
const PartnershipModel = require("./Partnership");
const ArtworkLoanModel = require("./ArtworkLoan");


const Artist = ArtistModel(sequelize, DataTypes);
const ArtistPhoneNumber = ArtistPhoneNumberModel(sequelize, DataTypes);
const Artwork = ArtworkModel(sequelize, DataTypes);
const ArtworkLocation = ArtworkLocationModel(sequelize, DataTypes);
const ArtworkMaterial = ArtworkMaterialModel(sequelize, DataTypes);
const ArtworkPrice = ArtworkPriceModel(sequelize, DataTypes);
const Worker = WorkerModel(sequelize, DataTypes);
const WorkerPhoneNumber = WorkerPhoneNumberModel(sequelize, DataTypes);
const WorkerEmergencyPhoneNumber = WorkerEmergencyPhoneNumberModel(sequelize, DataTypes);
const Visitor = VisitorModel(sequelize, DataTypes);
const Room = RoomModel(sequelize, DataTypes);
const Exhibition = ExhibitionModel(sequelize, DataTypes);
const RoomExhibitionAssociation = RoomExhibitionAssociationModel(sequelize, DataTypes);
const ArtworkExhibitionAssociation = ArtworkExhibitionAssociationModel(sequelize, DataTypes);
const Ticket = TicketModel(sequelize, DataTypes);
const TicketPrice = TicketPriceModel(sequelize, DataTypes);
const VisitorFeedback = VisitorFeedbackModel(sequelize, DataTypes);
const Sale = SaleModel(sequelize, DataTypes);
const Partnership = PartnershipModel(sequelize, DataTypes);
const ArtworkLoan = ArtworkLoanModel(sequelize, DataTypes);


// tarife ravabet

// artist => artistPhoneNumber
Artist.hasMany(ArtistPhoneNumber, {
    foreignKey: 'artistId',
    sourceKey: 'artistId',
    as: 'phoneNumbers'
});

ArtistPhoneNumber.belongsTo(Artist, {
    foreignKey: 'artistId',
    targetKey: 'artistId',
    as: 'artist'
});

// artist => artwork
Artist.hasMany(Artwork, {
    foreignKey: 'artistId_artwork_fk',
    sourceKey: 'artistId',
    as: 'artworks'
});

Artwork.belongsTo(Artist, {
    foreignKey: 'artistId_artwork_fk',
    targetKey: 'artistId',
    as: 'artist'
});

// artwork => artworkLocation
Artwork.hasMany(ArtworkLocation, {
    foreignKey: 'artworkId_location_fk',
    sourceKey: 'artworkId',
    as: 'locations'
});

ArtworkLocation.belongsTo(Artwork, {
    foreignKey: 'artworkId_location_fk',
    targetKey: 'artworkId',
    as: 'artwork'
});

// artwork => artworkMaterial
Artwork.hasMany(ArtworkMaterial, {
    foreignKey: 'artworkId_material_fk',
    sourceKey: 'artworkId',
    as: 'materials'
});

ArtworkMaterial.belongsTo(Artwork, {
    foreignKey: 'artworkId_material_fk',
    targetKey: 'artworkId',
    as: 'artwork'
});

// artwork => artworkPrice
Artwork.hasMany(ArtworkPrice, {
    foreignKey: 'artwork_price_fk',
    sourceKey: 'artworkId',
    as: 'prices'
});

ArtworkPrice.belongsTo(Artwork, {
    foreignKey: 'artwork_price_fk',
    targetKey: 'artworkId',
    as: 'artwork'
});

// worker => workerPhoneNumber
Worker.hasMany(WorkerPhoneNumber, {
    foreignKey: 'workerId',
    sourceKey: 'workerId',
    as: 'phoneNumbers'
});

WorkerPhoneNumber.belongsTo(Worker, {
    foreignKey: 'workerId',
    targetKey: 'workerId',
    as: 'worker'
});

// WorkerT => WorkerEmergencyPhoneNumberT
Worker.hasMany(WorkerEmergencyPhoneNumber, {
    foreignKey: 'workerId',
    sourceKey: 'workerId',
    as: 'emergencyPhoneNumbers'
});

WorkerEmergencyPhoneNumber.belongsTo(Worker, {
    foreignKey: 'workerId',
    targetKey: 'workerId',
    as: 'worker'
});

// WorkerT => ExhibitionT
Worker.hasMany(Exhibition, {
    foreignKey: 'workerId',
    sourceKey: 'workerId',
    as: 'exhibitions'
});

Exhibition.belongsTo(Worker, {
    foreignKey: 'workerId',
    targetKey: 'workerId',
    as: 'worker'
});

// RoomT ==> RoomExhibitionAssociationT
Room.hasMany(RoomExhibitionAssociation, {
    foreignKey: 'roomNumber',
    sourceKey: 'roomNumber',
    as: 'exhibitions'
});

RoomExhibitionAssociation.belongsTo(Room, {
    foreignKey: 'roomNumber',
    targetKey: 'roomNumber',
    as: 'room'
});

// ExhibitionT ==> RoomExhibitionAssociationT
Exhibition.hasMany(RoomExhibitionAssociation, {
    foreignKey: 'exhibitionId',
    sourceKey: 'exhibitionId',
    as: 'rooms'
});

RoomExhibitionAssociation.belongsTo(Exhibition, {
    foreignKey: 'exhibitionId',
    targetKey: 'exhibitionId',
    as: 'exhibition'
});

// ArtworkT ==> ArtworkExhibitionAssociationT
Artwork.hasMany(ArtworkExhibitionAssociation, {
    foreignKey: 'artworkId',
    sourceKey: 'artworkId',
    as: 'exhibitions'
});

ArtworkExhibitionAssociation.belongsTo(Artwork, {
    foreignKey: 'artworkId',
    targetKey: 'artworkId',
    as: 'artwork'
});

// ExhibitionT ==> ArtworkExhibitionAssociationT
Exhibition.hasMany(ArtworkExhibitionAssociation, {
    foreignKey: 'exhibitionId',
    sourceKey: 'exhibitionId',
    as: 'artworks'
});

ArtworkExhibitionAssociation.belongsTo(Exhibition, {
    foreignKey: 'exhibitionId',
    targetKey: 'exhibitionId',
    as: 'exhibition'
});

// ExhibitionT ==> TicketT
Exhibition.hasMany(Ticket, {
    foreignKey: 'exhibitionId',
    sourceKey: 'exhibitionId',
    as: 'tickets'
});

Ticket.belongsTo(Exhibition, {
    foreignKey: 'exhibitionId',
    targetKey: 'exhibitionId',
    as: 'exhibition'
});

// VisitorT ==> TicketT
Visitor.hasMany(Ticket, {
    foreignKey: 'nationalCode',
    sourceKey: 'nationalCode',
    as: 'tickets'
});

Ticket.belongsTo(Visitor, {
    foreignKey: 'nationalCode',
    targetKey: 'nationalCode',
    as: 'visitor'
});

// TicketT ==> TicketPriceT
Ticket.hasMany(TicketPrice, {
    foreignKey: 'ticketId',
    sourceKey: 'ticketId',
    as: 'prices'
});

TicketPrice.belongsTo(Ticket, {
    foreignKey: 'ticketId',
    targetKey: 'ticketId',
    as: 'ticket'
});

// TicketT ==> VisitorFeedbackT
Ticket.hasMany(VisitorFeedback, {
    foreignKey: 'ticketId',
    sourceKey: 'ticketId',
    as: 'visitorFeedbacks'
});

VisitorFeedback.belongsTo(Ticket, {
    foreignKey: 'ticketId',
    targetKey: 'ticketId',
    as: 'ticket'
});

// ArtworkT ==> SaleT
Artwork.hasMany(Sale, {
    foreignKey: 'artworkId',
    sourceKey: 'artworkId',
    as: 'sales'
});

Sale.belongsTo(Artwork, {
    foreignKey: 'artworkId',
    targetKey: 'artworkId',
    as: 'artwork'
});

// WorkerT ==> SaleT
Worker.hasMany(Sale, {
    foreignKey: 'workerId',
    sourceKey: 'workerId',
    as: 'sales'
});

Sale.belongsTo(Worker, {
    foreignKey: 'workerId',
    targetKey: 'workerId',
    as: 'worker'
});

// VisitorT ==> SaleT
Visitor.hasMany(Sale, {
    foreignKey: 'nationalCode',
    sourceKey: 'nationalCode',
    as: 'sales'
});

Sale.belongsTo(Visitor, {
    foreignKey: 'nationalCode',
    targetKey: 'nationalCode',
    as: 'visitor'
});

// Artwork => ArtworkLoan
Artwork.hasMany(ArtworkLoan, {
    foreignKey: 'artworkId',
    sourceKey: 'artworkId',
    as: 'artworkLoans'
});

ArtworkLoan.belongsTo(Artwork, {
    foreignKey: 'artworkId',
    targetKey: 'artworkId',
    as: 'artwork'
});

// Partnership => ArtworkLoan
Partnership.hasMany(ArtworkLoan, {
    foreignKey: 'partnershipId',
    sourceKey: 'partnershipId',
    as: 'artworkLoans'
});

ArtworkLoan.belongsTo(Partnership, {
    foreignKey: 'partnershipId',
    targetKey: 'partnershipId',
    as: 'partnership'
});

// Worker => ArtworkLoan
Worker.hasMany(ArtworkLoan, {
    foreignKey: 'workerId',
    sourceKey: 'workerId',
    as: 'artworkLoans'
});

ArtworkLoan.belongsTo(Worker, {
    foreignKey: 'workerId',
    targetKey: 'workerId',
    as: 'worker'
});



module.exports = {
    Artist,
    ArtistPhoneNumber,
    Artwork,
    ArtworkLocation,
    ArtworkMaterial,
    ArtworkPrice,
    Worker,
    WorkerPhoneNumber,
    WorkerEmergencyPhoneNumber,
    Visitor,
    Room,
    Exhibition,
    RoomExhibitionAssociation,
    ArtworkExhibitionAssociation,
    Ticket,
    TicketPrice,
    VisitorFeedback,
    Sale,
    Partnership,
    ArtworkLoan,
    Sequelize: dbConfig.Sequelize,
    sequelize
};