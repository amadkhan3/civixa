<template>
  <div class='container-fluid'>
    <b-row>
      <b-col>
        <canvas id='myCanvas' width='960' height='640' style='border:1px solid #d3d3d3'>
          Your browser does not support the HTML5 canvas tag.
        </canvas>
      </b-col>
      <b-col>
      <div class="mt-3">
          <b-button size="sm" variant="success" @click='shapeSelector("square")'>Square</b-button>
          <b-button size="sm" variant="success" @click='shapeSelector("circle")'>Circle</b-button>
          <b-button size="sm" variant="" @click='shapeSelector("clear")'>Clear Selection</b-button>
          <b-button size="sm" variant="danger" @click='clear'>Clear Canvas</b-button>
          <!-- <b-button size="md" variant="" @click='removeShape'>Remove</b-button> -->
      </div>
      <!-- <div v-if="square">
        <b-form-group
        id="input-group-1"
        label="Height"
        label-for="input-height"
      >
        <b-form-input
          id="input-height"
          v-model="form.height"
          type="number"
          placeholder="Height"
        ></b-form-input>
      </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Width"
          label-for="input-width"
        >
          <b-form-input
            id="input-width"
            v-model="form.width"
            type="number"
            placeholder="Width"
          ></b-form-input>
        </b-form-group>
      </div>
      <div v-if="circle">
        <b-form-group
          id="input-group-1"
          label="Radius"
          label-for="input-radius"
        >
          <b-form-input
            id="input-radius"
            v-model="form.radius"
            type="number"
            placeholder="Radius"
          ></b-form-input>
        </b-form-group>
      </div> -->
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      rect: {},
      circ: {},
      drag: false,
      square: false,
      circle: false,
      form: {
        height: 100,
        width: 100,
        radius: 100
      },
      c: '',
      ctx: '',
      img: '',
      shapesCreated: {
        rectangle: [],
        circle: []
      }
    }
  },
  mounted () {
    this.c = document.getElementById('myCanvas')
    this.ctx = this.c.getContext('2d')
    this.img = new Image()
    this.img.src = 'https://wonderfulengineering.com/wp-content/uploads/2016/01/Desktop-Wallpaper-4.jpg'
    setTimeout(() => {
      this.ctx.drawImage(this.img, 0, 0)
      this.shapesCreated.rectangle.forEach(s => {
        this.drawRectange(s.x, s.y, s.width, s.height)
      })
    }, 400)
    this.c.addEventListener('mousedown', this.mouseDown, false)
    this.c.addEventListener('mouseup', this.mouseUp, false)
    this.c.addEventListener('mousemove', this.mouseMove, false)
    // this.c.addEventListener('click', (evt) => {
    //   var mousePos = this.getMousePos(this.c, evt)
    //   this.saveShapes(mousePos.x, mousePos.y)
    // }, false)
  },
  methods: {
    clear () {
      this.shapesCreated.rectangle = []
      this.shapesCreated.circle = []
      this.canvasLoad()
    },
    mouseDown (e) {
      if (this.square) {
        this.rect.startX = e.pageX - this.c.offsetLeft
        this.rect.startY = e.pageY - this.c.offsetTop
        this.drag = true
      } else if (this.circle) {
        this.circ.startX = e.pageX - this.c.offsetLeft
        this.circ.startY = e.pageY - this.c.offsetTop
        this.drag = true
      }
    },
    mouseUp () {
      this.drag = false
      // console.log(this.rect.startX, this.rect.startY, this.rect.w, this.rect.h)
      if (this.square) {
        this.saveShapes(this.rect.startX, this.rect.startY, this.rect.w, this.rect.h)
      }
      if (this.circle) {
        this.saveShapes(this.circ.startX, this.circ.startY, this.circ.endX, this.circ.endY)
      }
    },
    mouseMove (e) {
      if (this.drag && this.square) {
        this.rect.w = (e.pageX - this.c.offsetLeft) - this.rect.startX
        this.rect.h = (e.pageY - this.c.offsetTop) - this.rect.startY
        this.ctx.clearRect(0, 0, this.c.width, this.c.height)
        this.ctx.drawImage(this.img, 0, 0)
        this.shapesCreated.rectangle.forEach(s => {
          this.drawRectange(s.x, s.y, s.width, s.height)
        })
        this.shapesCreated.circle.forEach(s => {
          this.drawCircle(s.x, s.y, s.ex, s.ey)
        })
        this.draw()
      } else if (this.drag && this.circle) {
        this.circ.endX = e.pageX - this.c.offsetLeft
        this.circ.endY = e.pageY - this.c.offsetTop
        this.ctx.clearRect(0, 0, this.c.width, this.c.height)
        this.ctx.drawImage(this.img, 0, 0)
        this.shapesCreated.rectangle.forEach(s => {
          this.drawRectange(s.x, s.y, s.width, s.height)
        })
        this.shapesCreated.circle.forEach(s => {
          this.drawCircle(s.x, s.y, s.ex, s.ey)
        })
        this.draw()
      }
    },
    draw () {
      if (this.square) {
        this.drawRectange(this.rect.startX, this.rect.startY, this.rect.w, this.rect.h)
      } else if (this.circle) {
        // this.ctx.arc(this.circ.startX, this.circ.startY, this.circ.w, this.circ.h)
        this.drawCircle(this.circ.startX, this.circ.startY, this.circ.endX, this.circ.endY)
      }
    },
    canvasLoad () {
      this.c = document.getElementById('myCanvas')
      this.ctx = this.c.getContext('2d')
      this.img = new Image()
      this.img.src = 'https://wonderfulengineering.com/wp-content/uploads/2016/01/Desktop-Wallpaper-4.jpg'
      setTimeout(() => {
        this.ctx.drawImage(this.img, 0, 0)
        this.shapesCreated.rectangle.forEach(s => {
          this.drawRectange(s.x, s.y, s.width, s.height)
        })
        this.shapesCreated.circle.forEach(s => {
          this.drawCircle(s.x, s.y, s.ex, s.ey)
        })
      }, 200)
      console.log(this.shapesCreated)
    },
    shapeSelector (shape) {
      if (shape === 'square') {
        this.square = true
        this.circle = false
      } else if (shape === 'circle') {
        this.circle = true
        this.square = false
      } else {
        this.circle = false
        this.square = false
      }
    },
    getMousePos (canvas, evt) {
      var rect = canvas.getBoundingClientRect()
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      }
    },
    drawRectange (x, y, width, height) {
      this.ctx.strokeRect(x, y, width, height)
      // this.ctx.stroke()
    },
    drawCircle (startX, startY, endX, endY) {
      var radius = Math.sqrt(Math.pow((startX - endX), 2) + Math.pow((startY - endY), 2))
      this.ctx.beginPath()
      this.ctx.arc(startX, startY, radius, 0, 2 * Math.PI, false)
      this.ctx.stroke()
    },
    saveShapes (x, y, w, h) {
      if (this.square) {
        this.shapesCreated.rectangle.push({x: x, y: y, width: w, height: h})
        this.rect = {}
        this.canvasLoad()
      } else if (this.circle) {
        this.shapesCreated.circle.push({x: x, y: y, ex: w, ey: h})
        console.log(this.shapesCreated.circle)
        this.circ = {}
        this.canvasLoad()
      }
      //   this.shapesCreated.circle.push({x: x, y: y, radius: this.form.radius})
      //   // console.log(this.shapesCreated)
      //   this.canvasLoad()
      // } else {

      // }
    }
    // removeShape () {
    //   this.shapesCreated.rectangle.pop()
    //   console.log(this.shapesCreated.rectangle)
    //   this.canvasLoad()
    //   // var a = this.shapesCreated.rectangle[this.shapesCreated.rectangle.length - 1]
    //   // this.ctx.clearRect(a.x, a.y, a.width, a.height)
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
