module.exports = async () => {
  // Crear tablas:
  await require("mongoose").connection.dropDatabase();
  console.log("[Database] ¡Las tablas fueron creadas!");

  //Ejecutar seeders (datos de prueba):
  await require("mongoose").connection.dropDatabase();
  await require("./seeders/userSeeder")();
  await require("./seeders/tweetSeeder")();

  console.log("[Database] ¡Los datos de prueba fueron insertados!");
};
