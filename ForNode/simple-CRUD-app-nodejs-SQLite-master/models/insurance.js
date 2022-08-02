module.exports = function(sequelize, Sequalize) {
    var InsuranceShema = sequelize.define("Insurance", {
        price: Sequalize.DECIMAL(15 , 2),
        expiration_date: Sequalize.DATE,
        paymanet_date: Sequalize.DATE,
        InsuranceCompany_company_name:{
            type : Sequalize.CHAR(20),
            allowNull : false,
            references : {
                model : 'insurancecompany' , 
                key : 'company_name'
            } 
    }
    },{
        timestamps: false
    });
    return InsuranceShema;
}