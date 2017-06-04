export function getElement(id) {
  return document.getElementById(id)
}

export function createElement({ tag, cls, type, name, value }) {
  const el = document.createElement(tag)
  if (cls && !el.classList.contains(cls)) {
    el.classList.add(cls)
  }

  addAttribute(el, 'type', type)
  addAttribute(el, 'name', name)
  addAttribute(el, 'value', value)

  return el
}

export function addAttribute(el, attrType, attrVal) {
  return attrVal ? el.setAttribute(attrType, attrVal) : el
}
