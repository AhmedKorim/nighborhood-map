const clientID = '33YTSGDO4CLJBKDY10UB0NLS41DURHM3JVVFDH1W50YUMV2Z';
const clientSecret = 'FE0WP1ETLKAODLF1TUWXBZYFHP3BIRZ1OJCOUIRRT31ASROL';
const v = '20171227';
const ll = "40.7243,-74.0018";

const limit = "30";
const radius = "3333";
const categories = {
    Food: "4d4b7105d754a06374d81259",
    Library: "4bf58dd8d48988d12f941735",
    Gym: "4bf58dd8d48988d175941735",
    Circus: "52e81612bcbc57f1066b79e7",
    Coffee: "4bf58dd8d48988d1e0931735"
};
export const url = `https://api.foursquare.com/v2/venues/search?ll=${40.7413549},${-73.9980244}
&categoryId=${'4d4b7105d754a06374d81259'}&radius=${radius}&client_id=${clientID}
&client_secret=${clientSecret}&v=${v}&limit=${limit}`;

export const fetchingDate = (url) => {
    fetch(url).then(response => response.json()).then(data => console.log(data))
};




