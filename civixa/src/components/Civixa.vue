<template>
  <div class='container-fluid'>
    <b-row>
      <b-col>
        <canvas id='myCanvas' width='960' height='640' style='border:1px solid #d3d3d3'>
          Your browser does not support the HTML5 canvas tag.
        </canvas>
      </b-col>
      <b-col>
      <div class="mt-5">
        
          <b-button size="lg" variant="success" @click='shapeSelector("square")'>Square</b-button>
          <b-button size="lg" variant="success" @click='shapeSelector("circle")'>Circle</b-button>
          <b-button size="lg" variant="danger" @click='shapeSelector("clear")'>Clear</b-button>
        
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
      c: '',
      ctx: '',
      img: '',
      workingShape: ''
    }
  },
  mounted () {
    this.c = document.getElementById('myCanvas')
    this.ctx = this.c.getContext('2d')
    this.img = new Image()
    this.workingShape = ''
    this.img.src = 'https://cdn.pixabay.com/photo/2016/09/01/10/23/image-1635747_960_720.jpg'
    setTimeout(() => {
      this.ctx.drawImage(this.img, 0, 0)
    }, 100)
    this.c.addEventListener('click', (evt) => {
      var mousePos = this.getMousePos(this.c, evt)
      console.log(mousePos.x + ',' + mousePos.y)
      this.drawShapes(mousePos.x, mousePos.y)
    }, false)
  },
  methods: {
    shapeSelector (shape) {
      if (shape !== 'clear') {
        this.workingShape = shape
      }
      else {
        this.workingShape = ''
      }
    },
    getMousePos (canvas, evt) {
      var rect = canvas.getBoundingClientRect()
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      }
    },
    drawShapes (x, y) {
      if (this.workingShape === 'square') {
        this.ctx.rect(x - 100, y - 100, 200, 200)
        this.ctx.stroke()
      }
      else if (this.workingShape === 'circle') {
        this.ctx.beginPath()
        this.ctx.arc(x, y, 100, 0, 2 * Math.PI)
        this.ctx.stroke()
      }
      else {

      }
    }
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
