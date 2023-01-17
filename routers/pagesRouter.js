const express = require("express");
const fs = require("fs");
const { send } = require("process");
const router = express.Router();
const { PAGES_FILE_PATH, getDataFromFile, getComponentById, setHbsParams } = require("../utils.js");

router.post("/", (req, res) => {
    const { pageName, componentsIds } = req.body
    const pages = getDataFromFile(PAGES_FILE_PATH)
    pages.push({ id: pages.at(-1)?.id + 1 || 1, pageName, componentsIds })
    fs.writeFileSync(PAGES_FILE_PATH, JSON.stringify(pages))
    res.status(201).send("Ok")
})

router.get("/", (req, res) => {
    res.send(getDataFromFile(PAGES_FILE_PATH))
})

router.get('/show/:pageId', (req, res) => {
    const pageId = +req.params.pageId
    const pageData = getDataFromFile(PAGES_FILE_PATH).find(item => item.id === pageId)

    if (pageData) {
        const { pageName, componentsIds } = pageData
        let templateContent = ""
        let templateStyles = ""
        for (const componentId of componentsIds) {
            const { model, year, img, styles } = getComponentById(componentId)
            templateContent += model
            templateContent += year
            templateContent += img
            templateStyles += styles
        }
        res.render('page.hbs', { pageName, content: templateContent, styles: templateStyles })
    } else {
        res.status(404).send("Not found")
    }
})

module.exports = router