export default (text = "Click me!") => {
  const element = document.createElement("div")

  element.className = "pure-button"
  element.innerHTML = text

  return element
}
