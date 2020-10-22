

var app = new Vue({
    el: "#app",
    data() {
      return {
        // list of team members that will be fetched from the API
        members: [],
        // to keep a track of which sorting method is selected, so we can highlight the selected sorting method button
        sortBy: null
      }
    },
    methods: {
      //localeCompare compares two string and returns a value -1,0,1.
      sort(method) {
        this.sortBy = method
        switch(method){
          case "first":
            this.members = this.members.sort((l, r) => {return l.name.first.toLowerCase().localeCompare(r.name.first.toLowerCase()) })
            break
            
            
          case "last":
            this.members = this.members.sort((l, r) => {return l.name.last.toLowerCase().localeCompare(r.name.last.toLowerCase())})
            break
            
            
          case "":
            this.members = [...this._tempMembers]
            break
            
            
          default:
            console.log("default")
            break
        }
      },
      loadMembers() {
        //loading 8 users from the API and storing them in members.
        fetch("https://randomuser.me/api/?results=8")
        .then(res => {
          return res.json()
        })
        .then(res => {
          console.log(res)
          this.members = res.results
          this._tempMembers = [...res.results]
        })
        .catch(err => {
          console.log("error!")
        })
      }
    },
    // when the vuejs has fully initialized (rendered everything on page), this will be called.
    created() {
      //loading members after the page has loaded
      this.loadMembers()
    }
  })