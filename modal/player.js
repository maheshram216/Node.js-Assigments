const mongooes = require("mongoose");

const playerSchema = new mongooes.Schema({
    
        player_id: {type:String, require:true},
        password: {type:String, require:true},
        age: {type: Number},
        country: String, 
        installed_days: Number, 
        coins: Number, 
        gems: Number, 
        game_level: Number, 
        purchaser: Boolean
         
});

const playerModel = mongooes.model("Player", playerSchema);

module.exports = playerModel;