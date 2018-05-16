var ProjectService = {
  computed: {
    projects: {
      // getter
      get: function () {
        console.log('get')
        const Store = require('electron-store')
        const store = new Store()
        var projects = store.get('projects')
        if (projects === undefined) {
          projects = []
        }
        return projects
      },
      // setter
      set: function (newValue) {
        const Store = require('electron-store')
        const store = new Store()
        store.set('projects', newValue)
      }
    },
    current: {
      // getter
      get: function () {
        const Store = require('electron-store')
        const store = new Store()

        return store.get('current')
      },
      // setter
      set: function (newValue) {
        const Store = require('electron-store')
        const store = new Store()
        store.set('current', newValue)
      }
    }
  },

  add: function (project) {
    if (this.getProject(project.path) !== null) {
      return false
    }

    this.projects.push(project)
    return true
  },

  delete: function (project) {
  },

  update: function (project) {
  },

  getProject: function (path) {
    for (var project in this.projects) {
      if (path === project.path) {
        return project
      }
    }
    return null
  },

  clear: function () {
    const Store = require('electron-store')
    const store = new Store()
    console.log('clear')
    store.clear()
  }
}

module.exports = ProjectService
