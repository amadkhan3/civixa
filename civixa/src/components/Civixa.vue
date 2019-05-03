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
          <b-button size="md" variant="success" @click='shapeSelector("square")'>Square</b-button>
          <b-button size="md" variant="success" @click='shapeSelector("circle")'>Circle</b-button>
          <b-button size="md" variant="" @click='shapeSelector("clear")'>Clear Selection</b-button>
      </div>
      <div v-if="square">
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
      square: false,
      circle: false,
      form: {
        height: 100,
        width: 100,
        radius: 100
      },
      c: '',
      ctx: '',
      img: ''
    }
  },
  mounted () {
    this.c = document.getElementById('myCanvas')
    this.ctx = this.c.getContext('2d')
    this.img = new Image()
    this.img.src = 'https://cdn.pixabay.com/photo/2016/09/01/10/23/image-1635747_960_720.jpg'
    setTimeout(() => {
      this.ctx.drawImage(this.img, 0, 0)
    }, 400)
    this.c.addEventListener('click', (evt) => {
      var mousePos = this.getMousePos(this.c, evt)
      // console.log(mousePos.x + ',' + mousePos.y)
      this.drawShapes(mousePos.x, mousePos.y)
    }, false)
  },
  methods: {
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
    drawShapes (x, y) {
      if (this.square) {
        this.ctx.rect(x - (this.form.width / 2), y - (this.form.height / 2), this.form.width, this.form.height)
        this.ctx.stroke()
      } else if (this.circle) {
        this.ctx.beginPath()
        this.ctx.arc(x, y, this.form.radius, 0, 2 * Math.PI)
        this.ctx.stroke()
      } else {

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
