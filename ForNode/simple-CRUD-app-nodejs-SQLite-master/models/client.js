module.exports = function(sequelize, Sequalize) {
    var ClientSchema = sequelize.define("Client", {
        ssn: {
            type : Sequalize.CHAR(10),
            allowNull : false,
            primaryKey : true 
        },
        first_name: Sequalize.CHAR(100),
        last_name: Sequalize.CHAR(100)
    },{
        timestamps: false
    });
    return ClientSchema;
}