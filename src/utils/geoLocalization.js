"use strict";

require('dotenv').config();
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const geoLocalization = async (location) => {

    try {
        const geocodingURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${GOOGLE_API_KEY}`;
        const geocodingResponse = await fetch(geocodingURL);
        const geocodingData = await geocodingResponse.json();

        let latitude, longitude;

        if (geocodingData.results.length > 0) {
            latitude = geocodingData.results[0].geometry.location.lat;
            longitude = geocodingData.results[0].geometry.location.lng;
        };

        let mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`

        return mapLink;
    } catch (error){
        console.log(error)
        
        return;
    };
};


module.exports = { geoLocalization };