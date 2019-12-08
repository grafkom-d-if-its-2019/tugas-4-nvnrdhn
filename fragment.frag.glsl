precision mediump float;

varying vec3 fNormal;
varying vec3 fPosition;
varying vec2 fTexCoord;

uniform vec3 diffuseColor;
uniform vec3 diffusePosition;
uniform vec3 ambientColor;

uniform sampler2D sampler0;

void main() {
  vec3 diffuseDirection = normalize(diffusePosition - fPosition);
  float normalDotLight = max(dot(fNormal, diffuseDirection), 0.0);
  vec4 textureColor = texture2D(sampler0, fTexCoord);
  float specularPower = 80.0;
  float specular = 0.0;
  vec3 viewVec = vec3(0, 0, 1.0);
  vec3 reflectVec = reflect(-diffuseDirection, fNormal);
  float specularFactor = max(dot(reflectVec, viewVec), 0.0);
  specular = pow(specularFactor, specularPower);
  vec3 diffuse = diffuseColor * textureColor.rgb * normalDotLight;
  vec3 ambient = ambientColor * textureColor.rgb;
  gl_FragColor = vec4(diffuse + ambient, 1.0);
  gl_FragColor.rgb += specular;
}
