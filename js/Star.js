

var smallStarGeo = new THREE.IcosahedronGeometry( 1 , 3 );
var bigStarGeo = new THREE.IcosahedronGeometry( 1 , 5 );

var starVS = `

  uniform sampler2D t_audio;

  varying vec4 vAudio;

  varying float vAudioLookup;

  float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 438.5453);
  }
  //vec3 getPos( vec3 position 
  void main(){

    

    float displacement = rand( uv );
    vAudioLookup =  abs( displacement ); //abs( normal.x * normal.y * normal.z * 3. );
    // Here we sample the audio from a texture that we will
    // be creating on the cpu
    vec4 audio = texture2D( t_audio , vec2( vAudioLookup , 0. ));

    vAudio = audio;


    // To visualize the audio, we will displace the position
    // by a value based on the audio, along the normal
    vec3 pos = 1. * displacement * length( audio)  * normal;

    // Use this position to get the final position 
    gl_Position = projectionMatrix * modelViewMatrix * vec4( pos , 1.);

  }


`

var starFS = `
  
uniform sampler2D t_audio;

varying vec4 vAudio;
varying float vAudioLookup;

void main(){

  vec4 audio = texture2D( t_audio , vec2( vAudioLookup , 0. ) );
  
  // We are also going to color our fragments
  // based on the color of the audio
  vec3 col = audio.xyz;

  gl_FragColor = vec4( col , 1. );

}


`;



function Star( id, big ){


  var mat = new THREE.ShaderMaterial({
   
    uniforms:{
      t_audio: audio.texture
    },

    vertexShader: starVS,
    fragmentShader: starFS

  });


  var geo = big ? bigStarGeo : smallStarGeo ;

  this.body = new THREE.Mesh( geo , mat );


}

Star.prototype.update = function(){


}
