const upload = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hdHlAbWFpbC5jb20iLCJ1c2VySWQiOjMsImlhdCI6MTcxODE0MjMxOCwiZXhwIjoxNzQ5Njk5OTE4fQ.soYBJUGaKO_P7dnkAeGPLQUKpj9Kgd6WoLIjZjYhFqI",
  items: [
    {
      nameOfSource: "Reforma-Portada",
      url: "https://www.reforma.com/rss/portada.xml"
    },
    {
      nameOfSource: "El Pais-America",
      url: "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/america/portada"
    },
    {
      nameOfSource: "BBC-Tecnologia",
      url: "https://www.bbc.com/mundo/temas/tecnologia/index.xml"
    }
  ]
}
const oneError = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hdHlAbWFpbC5jb20iLCJ1c2VySWQiOjMsImlhdCI6MTcxODE0MjMxOCwiZXhwIjoxNzQ5Njk5OTE4fQ.soYBJUGaKO_P7dnkAeGPLQUKpj9Kgd6WoLIjZjYhFqI",
  items: [
    {
      nameOfSource: "Reforma-Portada",
      url: "https://www.reforma.com/rss/poa.xml"
    },
    {
      nameOfSource: "El Pais-America",
      url: "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/america/portada"
    },
    {
      nameOfSource: "BBC-Tecnologia",
      url: "https://www.bbc.com/mundo/temas/tecnologia/index.xml"
    }
  ]
}


const allError = {
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


const namesError = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hdHlAbWFpbC5jb20iLCJ1c2VySWQiOjMsImlhdCI6MTcxODE0MjMxOCwiZXhwIjoxNzQ5Njk5OTE4fQ.soYBJUGaKO_P7dnkAeGPLQUKpj9Kgd6WoLIjZjYhFqI",
  items: [
    {
      nameOfSource: "Reforma-Portada",
      url: "https://www.rema.com/rss/poda.xml"
    },
    {
      nameOfSource: "El Pais-America",
      url: "https://feeds.els.com/mrss-s/pages/ep/site/elpais.com/section/america/por"
    },
    {
      nameOfSource: "BBC-Tecnologia",
      url: "https://www.b.com/mundo/temas/tecnologia/ix.xml"
    }
  ]
}

module.exports = { upload, oneError, allError, namesError};
