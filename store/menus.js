import axios from 'axios'
export const state = () => ({
  menuItems: [
    { menuName: 'Admin', underMenu: '', linkedTo: '/admin'},
    { menuName: 'Home', underMenu: '', linkedTo: '/'},
    // { menuName: 'Features', underMenu: '', linkedTo: 'https://lesspod.com'},
    // { menuName: 'Pricing', underMenu: '', linkedTo: '/pricing'},
    { menuName: 'Blog', underMenu: '', linkedTo: '/blog'},
    { menuName: 'New', underMenu: '', linkedTo: '/'},
    { menuName: 'Post', underMenu: 'New', linkedTo: '/post/new'},
    { menuName: 'Menu', underMenu: 'New', linkedTo: ''}
    // { menuName: 'Key Features', underMenu: 'Features', linkedTo: '/key-features'},
    // { menuName: 'All Features', underMenu: 'Features', linkedTo: '/all-features'}
  ],
  currentMenu: {}
})

export const mutations = {
  setMenus(state, data) {
    console.log('setting menus... ' + JSON.stringify(data))
    if(data) state.menuItems = state.menuItems.concat(data)
  },
  setMenu(state, data) {
    console.log('setting current menu... ' + JSON.stringify(data))
    if(data) state.currentMenu = data
  },
  add(state, menuItem) {
    state.menuItems.push(menuItem)
    this.$toast.success('Menu added successfully.', { duration: 2000 })
    // axios.post('/api/menu', menuItem)
  },
  remove(state, menuName) {
    var menuItem = state.menuItems.filter(menu1 => {
      return menu1.menuName == menuName;
    })
    const { result } = axios.delete(process.env.baseUrl + '/api/menu/' + menuItem[0]._id)
    console.log('menu deleted...' + result)
    state.menuItems.splice(state.menuItems.indexOf(menuItem[0], 1))
    this.$toast.success('Menu removed successfully.', { duration: 2000 })
  }
}

export const actions = {
  async ADD_MENU ({ commit }, menu) {
    console.log('ADD_MENU...')
    var result = await axios.post('/api/menu', menu)
    console.log('ADD_MENU result: ' + JSON.stringify(result))
    commit('add', menu)
  },
  async GET_MENUS ({ commit }) {
    // process.env.baseUrl
    console.log('getting menus......')
    const { data } = await axios.get(process.env.baseUrl + '/api/menu/')
    commit('setMenus', data)
    console.log('data in GET_MENUS... ' + JSON.stringify(data))
  },
  async GET_MENU ({ commit }, menu_id) {
    // process.env.baseUrl
    const { data } = await axios.get(process.env.baseUrl + '/api/menu/' + menu_id)
    commit('setMenu', data)
    console.log('data in GET_MENU... ' + JSON.stringify(data))
  },
  async DELETE_MENU({ commit }, menuName) {
    commit('remove', menuName)
  }
}
