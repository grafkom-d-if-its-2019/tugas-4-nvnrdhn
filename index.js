(function() {
  // console.log("test");
  
  glUtils.SL.init({ callback: function() { main(); }});
  function main() {
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);

    var cubePoints = [
      [ -0.5, -0.5,  0.5 ],
      [ -0.5,  0.5,  0.5 ],
      [  0.5,  0.5,  0.5 ],
      [  0.5, -0.5,  0.5 ],
      [ -0.5, -0.5, -0.5 ],
      [ -0.5,  0.5, -0.5 ],
      [  0.5,  0.5, -0.5 ],
      [  0.5, -0.5, -0.5 ],
    ]

    var cubeNormals = [
      [  0.0,  0.0, -1.0 ], // depan
      [ -1.0,  0.0,  0.0 ], // kanan
      [  0.0,  1.0,  0.0 ], // bawah
      [  0.0,  0.0,  1.0 ], // belakang
      [  1.0,  0.0,  0.0 ], // kiri
      [  0.0, -1.0,  0.0 ], // atas
    ]

    var nPoints = [
      [-0.3, -0.5, 0.10], //0
      [-0.5, -0.3, 0.10],
      [-0.5, 0.3, 0.10],
      [-0.3, 0.5, 0.10],
      [0.3, -0.1, 0.10],
      [0.3, 0.5, 0.10],
      [0.5, 0.3, 0.10],
      [0.5, -0.3, 0.10],
      [0.3, -0.5, 0.10],
      [-0.3, 0.1, 0.10],  //9

      [-0.3, -0.5, -0.10],//10
      [-0.5, -0.3, -0.10],
      [-0.5, 0.3, -0.10],
      [-0.3, 0.5, -0.10],
      [0.3, -0.1, -0.10],
      [0.3, 0.5, -0.10],
      [0.5, 0.3, -0.10],
      [0.5, -0.3, -0.10],
      [0.3, -0.5, -0.10],
      [-0.3, 0.1, -0.10], //19
    ]

    var nTriangles = []

    nTriangles.push(...nPoints[0], ...[0.0, 0.0, 0.0], ...nPoints[1], ...[0.0, 0.0, 0.0], ...nPoints[2], ...[0.0, 0.0, 0.0]) 
    nTriangles.push(...nPoints[0], ...[0.0, 0.0, 0.0], ...nPoints[2], ...[0.0, 0.0, 0.0], ...nPoints[9], ...[0.0, 0.0, 0.0])
    nTriangles.push(...nPoints[2], ...[0.0, 0.0, 0.0], ...nPoints[3], ...[0.0, 0.0, 0.0], ...nPoints[8], ...[0.0, 0.0, 0.0])
    nTriangles.push(...nPoints[3], ...[0.0, 0.0, 0.0], ...nPoints[7], ...[0.0, 0.0, 0.0], ...nPoints[8], ...[0.0, 0.0, 0.0])
    nTriangles.push(...nPoints[4], ...[0.0, 0.0, 0.0], ...nPoints[5], ...[0.0, 0.0, 0.0], ...nPoints[7], ...[0.0, 0.0, 0.0])
    nTriangles.push(...nPoints[5], ...[0.0, 0.0, 0.0], ...nPoints[6], ...[0.0, 0.0, 0.0], ...nPoints[7], ...[0.0, 0.0, 0.0])

    nTriangles.push(...nPoints[0+10], ...[0.0, 0.0, 0.0], ...nPoints[1+10], ...[0.0, 0.0, 0.0], ...nPoints[2+10], ...[0.0, 0.0, 0.0]) 
    nTriangles.push(...nPoints[0+10], ...[0.0, 0.0, 0.0], ...nPoints[2+10], ...[0.0, 0.0, 0.0], ...nPoints[9+10], ...[0.0, 0.0, 0.0])
    nTriangles.push(...nPoints[2+10], ...[0.0, 0.0, 0.0], ...nPoints[3+10], ...[0.0, 0.0, 0.0], ...nPoints[8+10], ...[0.0, 0.0, 0.0])
    nTriangles.push(...nPoints[3+10], ...[0.0, 0.0, 0.0], ...nPoints[7+10], ...[0.0, 0.0, 0.0], ...nPoints[8+10], ...[0.0, 0.0, 0.0])
    nTriangles.push(...nPoints[4+10], ...[0.0, 0.0, 0.0], ...nPoints[5+10], ...[0.0, 0.0, 0.0], ...nPoints[7+10], ...[0.0, 0.0, 0.0])
    nTriangles.push(...nPoints[5+10], ...[0.0, 0.0, 0.0], ...nPoints[6+10], ...[0.0, 0.0, 0.0], ...nPoints[7+10], ...[0.0, 0.0, 0.0])
    
    for (let i = 0; i < 10; i++) {
      if (i == 9) {
        nTriangles.push(...nPoints[i], ...[0.0, 0.0, 0.0], ...nPoints[i+10], ...[0.0, 0.0, 0.0], ...nPoints[0], ...[0.0, 0.0, 0.0])
        nTriangles.push(...nPoints[i+10], ...[0.0, 0.0, 0.0], ...nPoints[10], ...[0.0, 0.0, 0.0], ...nPoints[0], ...[0.0, 0.0, 0.0])
      }
      else {
        nTriangles.push(...nPoints[i], ...[0.0, 0.0, 0.0], ...nPoints[i+10], ...[0.0, 0.0, 0.0], ...nPoints[i+1], ...[0.0, 0.0, 0.0])
        nTriangles.push(...nPoints[i+10], ...[0.0, 0.0, 0.0], ...nPoints[i+11], ...[0.0, 0.0, 0.0], ...nPoints[i+1], ...[0.0, 0.0, 0.0])
      }
    }

    var vertices = []

    function quad(a, b, c, d) {
      var indices = [a, b, c, a, c, d];
      for (var i=0; i < indices.length; i++) {
        for (var j=0; j < 3; j++) {
          vertices.push(cubePoints[indices[i]][j])
        }
        for (var j=0; j < 3; j++) {
          vertices.push(cubeNormals[a-1][j])
        }
      }
    }
    quad(2, 3, 7, 6)
    quad(3, 0, 4, 7)
    quad(4, 5, 6, 7)
    quad(5, 4, 0, 1)
    quad(6, 5, 1, 2)

    vertices.push(...nTriangles)

    var texCoord = []

    for (var i=0;i<5;i++) {
      var x = Math.floor(i/2)/4
      var y = (i%2)/2
      texCoord.push(
        x       , y       ,
        x       , y + 0.5 ,
        x + 0.25, y + 0.5 ,
        x       , y       ,
        x + 0.25, y + 0.5 ,
        x + 0.25, y       ,
      )
    }

    for (var i=0;i<nTriangles.length/6;i++)
      texCoord.push(0, 0)

    var vertexBufferObject = gl.createBuffer()
    var vPosition = gl.getAttribLocation(program, "vPosition")
    var vNormal = gl.getAttribLocation(program, "vNormal")
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
    gl.vertexAttribPointer(
      vPosition,                          //variabel posisi attrib di shader
      3,                                  //jumlah elemen per attrib
      gl.FLOAT,                           //tipe data attrib
      gl.FALSE,                           
      6 * Float32Array.BYTES_PER_ELEMENT, //ukuran byte tiap verteks (overall)
      0                                   //offset posisi elemen
    )
    gl.vertexAttribPointer(
      vNormal, 
      3, 
      gl.FLOAT, 
      gl.FALSE, 
      6 * Float32Array.BYTES_PER_ELEMENT, 
      3 * Float32Array.BYTES_PER_ELEMENT
    )
    gl.enableVertexAttribArray(vPosition)
    gl.enableVertexAttribArray(vNormal)
    var textureBufferObject = gl.createBuffer()
    var vTexCoord = gl.getAttribLocation(program, "vTexCoord")
    gl.bindBuffer(gl.ARRAY_BUFFER, textureBufferObject)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoord), gl.STATIC_DRAW)
    gl.vertexAttribPointer(
      vTexCoord, 
      2, 
      gl.FLOAT, 
      gl.FALSE, 
      0,
      0
    )
    gl.enableVertexAttribArray(vTexCoord)
    var speed = 0.005, camZ = 0.0, rotator = 0.0
    var axis = [false, false, false], x = 0, y = 1, z = 2
    var transX = 0.0, transY = 0.0, transZ = 0.0,
        mulX = 0.005, mulY = 0.005, mulZ = 0.005, rot = 0.05

    var loaded = false

    var currentN = [],
        currentCube = []

    var PLANE = {
      FRONT: null,
      BACK: null,
      TOP: null,
      BOTTOM: null,
      RIGHT: null,
      LEFT: null
    }

    var mmLoc = gl.getUniformLocation(program, 'modelMatrix'),
        vmLoc = gl.getUniformLocation(program, 'viewMatrix'),
        pmLoc = gl.getUniformLocation(program, 'projectionMatrix'),
        dcLoc = gl.getUniformLocation(program, 'diffuseColor'),
        ddLoc = gl.getUniformLocation(program, 'diffusePosition'),
        acLoc = gl.getUniformLocation(program, 'ambientColor'),
        nmLoc = gl.getUniformLocation(program, 'normalMatrix'),
        sampler0Loc = gl.getUniformLocation(program, 'sampler0'),
        texture = gl.createTexture()

    var mm = glMatrix.mat4.create(),
        vm = glMatrix.mat4.create(),
        pm = glMatrix.mat4.create(),
        nm = glMatrix.mat3.create(),
        temp = glMatrix.mat4.create(),
        dc = glMatrix.vec3.fromValues(1.0, 1.0, 1.0),  // rgb
        dd = glMatrix.vec3.fromValues(0., 0., 0.),  // xyz
        ac = glMatrix.vec3.fromValues(0.17, 0.00, 0.86)

    glMatrix.mat4.translate(mm, mm, [0.0, 0.0, -1.5])
    glMatrix.mat4.perspective(pm,
      glMatrix.glMatrix.toRadian(90), // FoV Y dlm radian
      canvas.width/canvas.height,     // aspect ratio
      0.5,  //near
      10.0  //far
    )
    gl.uniformMatrix4fv(pmLoc, false, pm)
    gl.uniform3fv(dcLoc, dc)
    gl.uniform3fv(ddLoc, dd)
    gl.uniform3fv(acLoc, ac)
    gl.uniform1i(sampler0Loc, 0)
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 255, 255]))

    var image = new Image()
    image.src = "images/selfieboi.jpg"
    image.addEventListener('load', function() {
      loaded = true
    })
    
    var dragging, lastx, lasty
    function onMouseDown(event) {
      var x = event.clientX
      var y = event.clientY
      var rect = event.target.getBoundingClientRect()
      if (
        rect.left <= x &&
        rect.right > x &&
        rect.top <= y &&
        rect.bottom > y
      ) {
        dragging = true
        lastx = x
        lasty = y
      }
    }
    function onMouseUp(event) {
      dragging = false
    }
    function onMouseMove(event) {
      var x = event.clientX
      var y = event.clientY
      if (dragging) {
        factor = 10 / canvas.height
        var dx = factor * (x - lastx)
        var dy = factor * (y - lasty)
        glMatrix.mat4.rotateY(mm, mm, dx)
        glMatrix.mat4.rotateX(mm, mm, dy)
      }
      lastx = x
      lasty = y
    }
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mousemove', onMouseMove)

    function calculateDistance(point, plane) {
      var v = glMatrix.vec3.subtract([], point, plane[0]),
          a = glMatrix.vec3.subtract([], plane[1], plane[0]),
          b = glMatrix.vec3.subtract([], plane[2], plane[1]),
          c = glMatrix.vec3.cross([], a, b)
      return Math.abs(glMatrix.vec3.dot(v, c))
    }

    function checkCollision() {
      var eps = 0.01
      for (let i = 0; i < currentN.length; i++) {
        if (calculateDistance(currentN[i], PLANE.FRONT) < eps) {
          if (mulZ > 0) {
            mulZ*=-1
            rot*=-1
            return
          }
        }
        if (calculateDistance(currentN[i], PLANE.BACK) < eps) {
          if (mulZ < 0) {
            mulZ*=-1
            rot*=-1
            return
          }
        }
        if (calculateDistance(currentN[i], PLANE.TOP) < eps) {
          if (mulY > 0) {
            mulY*=-1
            return
          }
        }
        if (calculateDistance(currentN[i], PLANE.BOTTOM) < eps) {
          if (mulY < 0) {
            mulY*=-1
            return
          }
        }
        if (calculateDistance(currentN[i], PLANE.RIGHT) < eps) {
          if (mulX > 0) {
            mulX*=-1
            rot*=-1
            return
          }
        }
        if (calculateDistance(currentN[i], PLANE.LEFT) < eps) {
          if (mulX < 0) {
            mulX*=-1
            rot*=-1
            return
          }
        }
      }
    }
    
    function render() {
      glMatrix.mat4.lookAt(vm,
        [0.0, 0.0, camZ],  //posisi kamera
        [0.0, 0.0, -1.5], //kemana kamera menghadap (vektor)
        [0.0, 1.0, 0.0]
      )
      gl.uniformMatrix4fv(vmLoc, false, vm)

      gl.clear(gl.COLOR_BUFFER_BIT)
      if (axis[x]) glMatrix.mat4.rotateX(mm, mm, speed)
      if (axis[y]) glMatrix.mat4.rotateY(mm, mm, speed)
      if (axis[z]) glMatrix.mat4.rotateZ(mm, mm, speed)
      gl.uniformMatrix4fv(mmLoc, false, mm)
      glMatrix.mat3.normalFromMat4(nm, mm)
      gl.uniformMatrix3fv(nmLoc, false, nm)

      if (loaded) {
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image)
        gl.generateMipmap(gl.TEXTURE_2D)
      }
      else {
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
          new Uint8Array([0, 255, 255, 255]))
      }

      gl.drawArrays(gl.TRIANGLES, 0, 30)

      currentCube = []
      for (let i = 0; i < cubePoints.length; i++) {
        var t = glMatrix.vec4.transformMat4([], [...cubePoints[i], 1.0], mm)
        currentCube.push(t)
      }

      PLANE.FRONT = [currentCube[0], currentCube[1], currentCube[2]]
      PLANE.BACK = [currentCube[4], currentCube[5], currentCube[6]]
      PLANE.TOP = [currentCube[1], currentCube[2], currentCube[6]]
      PLANE.BOTTOM = [currentCube[0], currentCube[3], currentCube[7]]
      PLANE.RIGHT = [currentCube[2], currentCube[3], currentCube[7]]
      PLANE.LEFT = [currentCube[0], currentCube[1], currentCube[5]]

      glMatrix.mat4.copy(temp, mm)

      glMatrix.mat4.translate(mm, mm, [transX, transY, transZ])
      glMatrix.mat4.rotateY(mm, mm, rotator)
      glMatrix.mat4.scale(mm, mm, [0.2, 0.2, 0.2])
      gl.uniformMatrix4fv(mmLoc, false, mm)
      glMatrix.mat3.normalFromMat4(nm, mm)
      gl.uniformMatrix3fv(nmLoc, false, nm)
      glMatrix.vec3.transformMat4(dd, [0., 0., 0.], mm)
      gl.uniform3fv(ddLoc, dd)

      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
        new Uint8Array([0, 255, 255, 255]))

      gl.drawArrays(gl.TRIANGLES, 30, nTriangles.length/6)

      let indices = [
        0, 1, 2, 3, 5, 6, 7, 8,
        10, 11, 12, 13, 15, 16, 17, 18
      ]
      currentN = []
      for (let i = 0; i < indices.length; i++) {
        var t = glMatrix.vec4.transformMat4([], [...nPoints[indices[i]], 1.0], mm)
        currentN.push(t)
      }

      glMatrix.mat4.copy(mm, temp)
      gl.uniformMatrix4fv(mmLoc, false, mm)

      checkCollision()

      rotator += rot
      transX += mulX
      transY += mulY
      transZ += mulZ
      
      requestAnimationFrame(render)
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.enable(gl.DEPTH_TEST)
    render()
  }
})();