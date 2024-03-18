const express = require("express")
const router = express()

// Rota teste
router.get("/", (req, res) => {
    res.send("API funcionando")
})



module.exports = router