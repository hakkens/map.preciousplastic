import { FILTERS } from './const'

export default function generateMarkerContent(data) {
  return `
    <div class="popup">
      ${generateImgSlideshow(data.imgs)}
      <div class="popup__text">
        <h2 class="popup__header">${data.name}</h2>
        <p class="popup__description">${data.description}</p>
        <ul class="popup__filters">
          ${data.filters.map(filter =>
            `<li class="popup__filter">
              <span class="popup__filtericon popup__filtericon-${filter.toLowerCase()}"></span>
              <p class="popup__filter-text">${FILTERS[filter]}</p>
            </li>`
          ).join('')}
        </ul>
        <div class="popup__column">
          <p class="popup__status">${data.status}</p>
          <a href="${data.website}" class="popup__website">Website</a>
        </div>
        <div class="popup__column popup__column-right">
          <a href="${data.contact}" target="_blank" class="btn btn-primary">Contact</a>
        </div>
      </div>
    </div>
  `
}

function generateImgSlideshow(imgs) {
  const slides = imgs.map((img, i) => {
    const checked = (i === 0) ? 'checked' : ''
    const prev = (i === 0) ? imgs.length - 1 : i - 1
    const next = (i === imgs.length - 1) ? '0' : i + 1

    return `<input class="slides__input" type="radio" name="radio-btn" id="img-${i}" ${checked} />
      <li class="slides__container">
        <div class="slides__slide">
          <img class="slides__img" src="${img}" />
        </div>
        <div class="slides__nav">
          <label for="img-${prev}" class="slides__prev"></label>
          <label for="img-${next}" class="slides__next"></label>
        </div>
    </li>`
  })
  return `<ul class="slides">${slides.join('')}</ul>`
}