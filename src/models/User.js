const fs  = require("fs");


const User ={
    fileName : './src/database/user.json',

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
    borrar: function (id) {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter((oneUser) => oneUser.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, " "));
        return true;
      }
}
console.log(User.findByField("mail", "hola@gmail.com"));

module.exports = User;