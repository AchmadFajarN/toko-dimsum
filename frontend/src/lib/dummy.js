export const categories = [
  "Siomay",
  "Hakau",
  "Bakpao",
  "Gorengan",
  "Favorit",
  "Special",
  "Rice Roll"
];


export const dimsums = [
  {
    "id": 1,
    "img_url": null,
    "name": "Siomay Ayam",
    "category": "Siomay",
    "description": "Siomay ayam lembut dengan bumbu khas, dikukus sempurna dan disajikan hangat.",
    "rating": 4.7,
    "isActive": true
  },
  {
    "id": 2,
    "img_url": null,
    "name": "Siomay Udang",
    "category": "Siomay",
    "description": "Perpaduan udang segar dan daging ayam dengan tekstur juicy dan rasa gurih alami.",
    "rating": 4.8,
    "isActive": true
  },
  {
    "id": 3,
    "img_url": null,
    "name": "Hakau Udang",
    "category": "Hakau",
    "description": "Hakau berisi udang utuh dengan kulit transparan dan kenyal, favorit sepanjang masa.",
    "rating": 4.9,
    "isActive": true
  },
  {
    "id": 4,
    "img_url": null,
    "name": "Bakpao Ayam",
    "category": "Bakpao",
    "description": "Bakpao empuk dengan isian ayam manis gurih yang menggugah selera.",
    "rating": 4.6,
    "isActive": true
  },
  {
    "id": 5,
    "img_url": null,
    "name": "Bakpao Coklat",
    "category": "Bakpao",
    "description": "Bakpao lembut dengan isian coklat lumer, cocok untuk pencuci mulut.",
    "rating": 4.5,
    "isActive": false
  },
  {
    "id": 6,
    "img_url": null,
    "name": "Lumpia Udang",
    "category": "Gorengan",
    "description": "Lumpia goreng renyah dengan isian udang dan sayuran segar.",
    "rating": 4.6,
    "isActive": false
  },
  {
    "id": 7,
    "img_url": null,
    "name": "Ceker Ayam",
    "category": "Favorit",
    "description": "Ceker ayam empuk dengan saus khas yang meresap hingga ke tulang.",
    "rating": 4.7,
    "isActive": false
  },
  {
    "id": 8,
    "img_url": null,
    "name": "Pangsit Goreng",
    "category": "Gorengan",
    "description": "Pangsit goreng garing dengan isian ayam gurih, cocok sebagai camilan.",
    "rating": 4.4,
    "isActive": false
  },
  {
    "id": 9,
    "img_url": null,
    "name": "Xiao Long Bao",
    "category": "Special",
    "description": "Dimsum premium dengan kuah kaldu di dalamnya, disajikan panas dan juicy.",
    "rating": 4.9,
    "isActive": false
  },
  {
    "id": 10,
    "img_url": null,
    "name": "Cheong Fun Ayam",
    "category": "Rice Roll",
    "description": "Kulit rice roll lembut berisi ayam cincang dengan saus manis gurih khas.",
    "rating": 4.6,
    "isActive": false
  }
]


export const getAllDimsums = () => {
    return dimsums;
}
/**
 * mendapatkan dimsum berdasarkan id
 * @param {integer} id - id dari dimsum
 */
export const getDimsumById = (id) =>{
    const dimsum = dimsums.find((dim) => dim.id === id);
    return dimsum;
};

export const getDimSumByCategory = (category) => {
    const dimsum = dimsums.filter((dimsum) => dimsum.category === category);
    return dimsum
}
/**
 * 
 * @returns mendapatkan dimsum yang didisplay
 */
export const getDisplayDimsum = () => {
  return dimsums.filter((dimsum) => dimsum.isActive)
}