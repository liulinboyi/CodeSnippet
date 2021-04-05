const App = {
    data() {
      return {
        name: "小明",
        index: 0,
        curIndex: 0,
      }
    },
    methods:{
      select(e) {
        this.curIndex = Number(e.target.attributes.index.value)
        let name = e.target.innerText
        console.log(name)
        this.getContent(name)
      },
      sleep(time) {
        return new Promise(resolve => setTimeout(resolve,time))
      },
      async getContent(name) {
  //       let id = ++this.index
        let time = 1000
        let requestIndex = 0
        if(name === "小明") {
          time = 1000
          requestIndex = 0
        } else if(name === "小刚") {
          time = 2000
          requestIndex = 1
        } else if(name === "小红") {
          time = 3000
          requestIndex = 2
        }
        let res = await this.request(name,time)
  //       if(id !== this.index) return
        // 如果当前的索引值不等于请求的索引
        if(this.curIndex !== requestIndex) return
        this.name = res
      },
      request(query,time) {
        return new Promise( async (resolve,reject) => {
            await this.sleep(time)
            resolve(query)
        })
      }
    }
  }
  
  Vue.createApp(App).mount('#app')
  