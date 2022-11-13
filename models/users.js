const fs  = require("fs");


const usersModel ={
    fileName : './src/database/user-json/user.json',

    getData: function(){
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'))
    },
    findAll: function(){
        return this.getData();
    },
    findByPk: function(id){
        let allUsers= this.findAll();
        let searchedUser= allUsers.find(oneUser => oneUser.id === id);
        return searchedUser;
    },
    findByField: function(field, text){
        let allUsers= this.findAll();
        let searchedUser= allUsers.find(oneUser => oneUser[field] === text);
        return searchedUser;
    },
    borrar: function z(id) {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter((oneUser) => oneUser.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, " "));
        return true;
      }
}

module.exports = usersModel;