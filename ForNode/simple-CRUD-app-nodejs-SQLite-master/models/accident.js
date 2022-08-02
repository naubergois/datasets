module.exports = function(sequelize, Sequalize) {
    var AccidentShema = sequelize.define("Accident", {
        place:{
            type : Sequalize.CHAR(45),
            allowNull : false
        }, 
        adate:{
            type : Sequalize.DATE,
            allowNull : false
        },
        Car_VIN: {
            type : Sequalize.CHAR(16),
            allowNull : false , 
            references : {
                model : 'Car' , 
                key : 'VIN'
            }
        },
    },{
        timestamps: false
    });
    return AccidentShema;
}