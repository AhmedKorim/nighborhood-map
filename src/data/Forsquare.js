const clientID = '33YTSGDO4CLJBKDY10UB0NLS41DURHM3JVVFDH1W50YUMV2Z';
const clientSecret = 'FE0WP1ETLKAODLF1TUWXBZYFHP3BIRZ1OJCOUIRRT31ASROL';
const v = '20171227';
const ll = "40.7243,-74.0018";
const venuesID = "43695300f964a5208c291fe3";
const limit = "100";
const radius = "1000";
const categories = {
    Food: "4d4b7105d754a06374d81259",
    Library: "4bf58dd8d48988d12f941735",
    Gym: "4bf58dd8d48988d175941735",
    Circus: "52e81612bcbc57f1066b79e7",
    Coffee: "4bf58dd8d48988d1e0931735"
};
export const url = `https://api.foursquare.com/v2/venues/search?ll=${40.7413549},${-73.9980244}
&categoryId=${Object.values(categories)}&radius=${radius}&client_id=${clientID}&client_secret=${clientSecret}&v=${v}&limit=${limit}`;
const imgUrl = `https://api.foursquare.com/v2/venues/${venuesID}/photos?limit=9&client_id=${clientID}&client_secret=${clientSecret}&v=${v}`;

export const fetchingDate = (url) => {
    fetch(url).then(response => response.json()).then(data => data)
};
export const fetchImges = (venuesID) => {
    const imgUrl = `https://api.foursquare.com/v2/venues/${venuesID}/photos?limit=9&client_id=${clientID}&client_secret=${clientSecret}&v=${v}`;
    return new Promise((resolve, reject) => {
        resolve(fetch(imgUrl).then(response => response.json()).then(data => {
            const {prefix, height, width, suffix, user, source} = data.response.photos.items[0];
            return {
                imgSrc: `${prefix}${height}x${width}${suffix}`,
                user,
                source
            }
        }))
            .catch(error => reject(error))
    })

};




