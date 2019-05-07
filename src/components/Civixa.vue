<template>
  <div class='container-fluid'>
    <b-row>
      <b-col>
        <canvas id='myCanvas' style='border:1px solid #d3d3d3'>
          Your browser does not support the HTML5 canvas tag.
        </canvas>
      </b-col>
      <b-col>
      <div class="mt-3">
          <b-button size="sm" variant="success" @click='shapeSelector("square")'>Square</b-button>
          <b-button size="sm" variant="success" @click='shapeSelector("circle")'>Circle</b-button>
          <b-button size="sm" variant="" @click='shapeSelector("clear")'>Clear Selection</b-button>
          <b-button class="mt-1" size="sm" variant="danger" @click='clear'>Clear Canvas</b-button>
          <!-- <b-button size="md" variant="" @click='removeShape'>Remove</b-button> -->
      </div>
      <div>
        <b-badge variant="dark">Resolution: {{c.width}}x{{c.height}}</b-badge>
      </div>
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
    this.canvasLoad()
    this.c.addEventListener('mousedown', this.mouseDown, false)
    this.c.addEventListener('mouseup', this.mouseUp, false)
    this.c.addEventListener('mousemove', this.mouseMove, false)
  },
  methods: {
    canvasLoad () {
      this.c = document.getElementById('myCanvas')
      this.ctx = this.c.getContext('2d')
      this.img = new Image()
      this.img.src = 'https://www.carnegiefoundation.org/wp-content/uploads/2015/03/bright-spots-800x600.png'
      this.c.width = this.img.width
      this.c.height = this.img.height
      this.ctx.drawImage(this.img, 0, 0)
      this.ctx.strokeStyle = '#ff2828'
      this.ctx.lineWidth = 5
      this.shapesCreation()
    },
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
      } else if (this.drag && this.circle) {
        this.circ.endX = e.pageX - this.c.offsetLeft
        this.circ.endY = e.pageY - this.c.offsetTop
      }
      this.ctx.clearRect(0, 0, this.c.width, this.c.height)
      this.ctx.drawImage(this.img, 0, 0)
      this.shapesCreation()
      this.draw()
    },
    shapesCreation () {
      this.shapesCreated.rectangle.forEach(s => {
        this.drawRectange(s.x, s.y, s.width, s.height)
      })
      this.shapesCreated.circle.forEach(s => {
        this.drawCircle(s.x, s.y, s.ex, s.ey)
      })
    },
    draw () {
      if (this.square) {
        this.drawRectange(this.rect.startX, this.rect.startY, this.rect.w, this.rect.h)
      } else if (this.circle) {
        this.drawCircle(this.circ.startX, this.circ.startY, this.circ.endX, this.circ.endY)
      }
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
    drawRectange (x, y, width, height) {
      this.ctx.strokeRect(x, y, width, height)
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
      } else if (this.circle) {
        this.shapesCreated.circle.push({x: x, y: y, ex: w, ey: h})
      }
      this.rect = {}
      this.circ = {}
      this.canvasLoad()
    }
  }
}
</script>
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
