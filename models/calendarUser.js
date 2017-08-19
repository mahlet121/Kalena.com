module.exports = function (sequelize, DataTypes) {
    var CalendarUser = sequelize.define("calendarUser", {
        calendarUserUUID: {
            type: DataTypes.STRING
        },
        calendarUserEmail: {
            type: DataTypes.STRING,
            validate: {
<<<<<<< HEAD
                notEmpty: true,
                isEmail: true
=======
                //notNull: true,
                notEmpty: true
>>>>>>> 34de67f1631ac964e9207bdac377605edad859e8
            }
        },
        calendarID: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            validate: {
                notEmpty: true
            }
        },
        isOwner: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            validate: {
                notEmpty: true
            }
        }
    }, {timestamps: false});

    

    return CalendarUser;
};
