function dateToDB(fechaRss) {
  // Parsear la fecha en formato de RSS
  let fecha = new Date(fechaRss);
  //     // Obtener la fecha en formato ISO 8601
  let fechaISO8601 = fecha.toISOString();
  return fechaISO8601;
}


 function createDate(){
   const today = new Date()
   return today.toISOString()
 }


function compareDate(date1, date2) {
    const update =  new Date(date1) > new Date(date2)
  return update
}

module.exports = {dateToDB, compareDate, createDate}
