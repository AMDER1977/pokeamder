const { Router } = require('express');
const pokemonsRoutes = require("./pokemonsRoutes")
const typesRouters = require("./typesRoutes") 
const router = Router();



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/pokemons" , pokemonsRoutes)
router.use("/types" , typesRouters )

module.exports = router;
