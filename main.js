function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    if (!gl) {
        console.error("WebGL tidak didukung pada browser ini.");
        return;
    }

    var vertices = [

        // untuk huruf N
        // blok kiri N
        -0.85, -0.6, 0.0,   -0.73, -0.6, 0.0,   -0.73,  0.6, 0.0,
        -0.85, -0.6, 0.0,   -0.73,  0.6, 0.0,   -0.85,  0.6, 0.0,

        // blok miring N
        -0.85,  0.6, 0.0,   -0.73,  0.6, 0.0,   -0.33, -0.6, 0.0,
        -0.85,  0.6, 0.0,   -0.33, -0.6, 0.0,   -0.45, -0.6, 0.0,

        // blok kanan N
        -0.45, -0.6, 0.0,   -0.33, -0.6, 0.0,   -0.33,  0.6, 0.0,
        -0.45, -0.6, 0.0,   -0.33,  0.6, 0.0,   -0.45,  0.6, 0.0,
        
        // huruf B
        // blok kiri B
        0.05, -0.6, 0.0,    0.17, -0.6, 0.0,    0.17,  0.6, 0.0,
        0.05, -0.6, 0.0,    0.17,  0.6, 0.0,    0.05,  0.6, 0.0,

        // blok horizontal atas B
        0.17,  0.48, 0.0,   0.43,  0.48, 0.0,   0.43,  0.6, 0.0,
        0.17,  0.48, 0.0,   0.43,  0.6, 0.0,    0.17,  0.6, 0.0,

        // blok horizontal tengah B
        0.17, -0.06, 0.0,   0.43, -0.06, 0.0,   0.43,  0.06, 0.0,
        0.17, -0.06, 0.0,   0.43,  0.06, 0.0,   0.17,  0.06, 0.0,

        // blok horizontal bawah B
        0.17, -0.6, 0.0,    0.43, -0.6, 0.0,    0.43, -0.48, 0.0,
        0.17, -0.6, 0.0,    0.43, -0.48, 0.0,   0.17, -0.48, 0.0,

        // blok Vertikal Kanan Atas B 
        0.43,  0.06, 0.0,   0.55,  0.18, 0.0,   0.55,  0.48, 0.0,
        0.43,  0.06, 0.0,   0.55,  0.48, 0.0,   0.43,  0.48, 0.0,

        // blok potongan Kanan-Atas B
        0.43,  0.48, 0.0,   0.55,  0.48, 0.0,   0.43,  0.6, 0.0,

        // blok potongan Kanan Tengah Atas B
        0.43,  0.06, 0.0,   0.43, -0.06, 0.0,   0.55,  0.18, 0.0,

        // blok Vertikal Kanan Bawah B
        0.43, -0.48, 0.0,   0.55, -0.48, 0.0,   0.55, -0.18, 0.0,
        0.43, -0.48, 0.0,   0.55, -0.18, 0.0,   0.43, -0.06, 0.0,

        // 9. blok potongan Kanan Bawah B
        0.43, -0.6, 0.0,    0.55, -0.48, 0.0,   0.43, -0.48, 0.0,

        // 10. blok potongan Kanan Tengah Bawah B
        0.43, -0.06, 0.0,   0.55, -0.18, 0.0,   0.43,  0.06, 0.0
    ];

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var vertexShaderCode = `
        attribute vec3 aPosition;
        void main(){
            gl_Position = vec4(aPosition, 1.0);
        }`;

    var fragmentShaderCode = `
        precision mediump float;
        void main(){
            gl_FragColor = vec4(0.0, 0.8, 0.2, 1.0); // hijau
        }`;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error("Vertex shader error:", gl.getShaderInfoLog(vertexShader));
    }

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error("Fragment shader error:", gl.getShaderInfoLog(fragmentShader));
    }

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var aPosition = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    var totalVertices = vertices.length / 3;
    gl.drawArrays(gl.TRIANGLES, 0, totalVertices);
}