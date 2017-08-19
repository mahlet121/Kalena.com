module.exports = function (sequelize, DataTypes) {
    var Calendar = sequelize.define("calendar", {
<<<<<<< HEAD
        calendarId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        calendarName: {
=======
        calendarname: {
>>>>>>> 34de67f1631ac964e9207bdac377605edad859e8
            type: DataTypes.STRING,
            validate: {
                isAlphanumeric: true,
                notEmpty: true,
                len: [1, 100]
            }
        },
<<<<<<< HEAD
        calendarDescription: {
          type: DataTypes.TEXT
        },
        calendarOwner: {
            type: DataTypes.STRING
=======
        calendardescription: DataTypes.TEXT,
        calendarowner: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
>>>>>>> 34de67f1631ac964e9207bdac377605edad859e8
        }
    }, {
        timestamps: false
    });

    return Calendar;
};
