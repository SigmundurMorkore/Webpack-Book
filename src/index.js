import "purecss"
import "./main.css"
import component from "./component"
import appConfig from "./appData.json5"

console.log(appConfig)
document.body.appendChild(component())
