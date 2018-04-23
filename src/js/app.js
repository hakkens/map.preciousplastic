import { FILTERS } from './const'
import _ from 'lodash'
import { getElement, openNewWindow, getQueryVariable } from './utils'

export default class App {

  constructor({ data, map }) {
    this.data = data
    this.map = map
    this.activeFilters = []
    this.locationData = []
  }

  async initApp() {
    this.toggleMenu()
    const filters = Object.keys(FILTERS).map(filter => ({ key: filter, value: FILTERS[filter] }))
    this.activeFilters = this.initFilters(filters)
    this.createFilterElements(filters)
    this.locationData = await this.data.getLocations()
    getElement('add-pin').addEventListener('click', addPin)
    getElement('mob-add-pin').addEventListener('click', addPin)
    getElement('info').addEventListener('click', toggleInfoBox)
    getElement('drop-toggle').addEventListener('click', toggleFilterDrop)
    this.map.setData(this.locationData)
    this.map.setFilters(this.activeFilters)
  }

  toggleMenu() {
    const param = getQueryVariable('menu')
    if (param === 'false') {
      getElement('mob-add-pin').style.display = 'none'
      getElement('panel').style.display = 'none'
      getElement('info').style.display = 'none'
    }
  }

  initFilters(filters) {
    const param = getQueryVariable('filters')
    const paramFilters = param ? param.split(',') : []

    return filters.map(filter => filter.key).filter(filter => {
      if (paramFilters.length > 0) return paramFilters.includes(filter)
      return true
    })
  }

  createFilterElements(filters) {
    const container = getElement('filters')

    container.innerHTML = filters.map(filter => {
      const key = filter.key.toLowerCase()
      const checked = (this.activeFilters.includes(filter.key)) ? 'checked' : ''
      return `
        <div class="checkbox">
          <input type="checkbox" id=${key} name="filter" class="panel__checkbox" value=${key} ${checked} />
          <label class="panel__checkbox-item" for=${key}></label>
          <span class="panel__checkbox-icon panel__checkbox-icon-${key}"></span>
          <p class="panel__checkbox-text">${filter.value}</p>
        </div>
      `
    }).join('')

    const inputs = [].slice.call(document.querySelectorAll('.panel__checkbox'))

    inputs.forEach(input => {
      input.addEventListener('click', e => {
        const filter = e.target.value.toUpperCase()
        this.activeFilters = _.xor(this.activeFilters, [filter])
        this.map.setFilters(this.activeFilters)
      })
    })
  }
}

function toggleInfoBox() {
  getElement('info-box').classList.toggle('info__box-visible')
}

function toggleFilterDrop() {
  getElement('panel').classList.toggle('panel__form-open')
}

function addPin() {
  openNewWindow(process.env.WP_URL + '/community/register/?add-pin=add')
}

