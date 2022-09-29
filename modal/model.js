const mongooes = require("mongoose");

const offerSchema = new mongooes.Schema({
    
        offer_id: {type:String, require:true},
        offer_title: {type: String, require:true}, 
        offer_description: String, 
        offer_image: String, 
        content: Array, 
        schedule: Object, 
        target: String,
        pricing: String
});

const OfferModel = mongooes.model("Offer", offerSchema);

module.exports = OfferModel;