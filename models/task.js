module.exports = function (sequelize, DataTypes) {
    var Task = sequelize.define("tasks", {
      taskCalendar: {
        type: DataTypes.INTEGER,
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      taskName: {
        type: DataTypes.STRING,
        validate: {
          isAlphanumeric: true,
          notNull: true,
          notEmpty: true,
          len: [2, 100]
        }
      },
      taskDescription: DataTypes.TEXT,
      taskAccepted: {
        type: DataTypes.BOOLEAN,
        default: false,
        validate: {
          notNull: true
        }
      },
      taskRequester: {
        type: DataTypes.INTEGER,
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      taskAccepter: {
        type: DataTypes.STRING
      },
      taskDate: {
        type: DataTypes.DATE,
        validate: {
          notEmpty: true,
          notNull: true
        }
      }
    }, {
      timestamps: false
    });

  return Task;
};
