const RssEvent = require("./event/RssEvents");

const obj = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hdHlAbWFpbC5jb20iLCJ1c2VySWQiOjMsImlhdCI6MTcxODE0MjMxOCwiZXhwIjoxNzQ5Njk5OTE4fQ.soYBJUGaKO_P7dnkAeGPLQUKpj9Kgd6WoLIjZjYhFqI",
  items: [
    {
      nameOfSource: "Reforma-Portada",
      url: "https://www.reforma.com/rss/poda.xml"
    },
    {
      nameOfSource: "El Pais-America",
      url: "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/america/por"
    },
    {
      nameOfSource: "BBC-Tecnologia",
      url: "https://www.bbc.com/mundo/temas/tecnologia/ix.xml"
    }
  ]
}

const rssEvent = new RssEvent()
for(let i = 0; i < obj.length; i++){
  rssEvent.uploadRss(obj[i].url, obj[i].nameOfSource)  
}


console.log("terminado")
