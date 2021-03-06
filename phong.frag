precision mediump float; 

in vec3 normalInterp;
in vec3 vertPos;

uniform int mode;

out vec4 outColor;

const vec3 lightPos = vec3(1.0,1.0,1.0);
const vec3 ambientColor = vec3(0.3, 0.0, 0.0);
const vec3 diffuseColor = vec3(0.5, 0.0, 0.0);
const vec3 specColor = vec3(1.0, 1.0, 1.0);


void main() {
    vec3 normal = normalize(normalInterp);
    vec3 lightDir = normalize(lightPos - vertPos);
    vec3 reflectDir = reflect(-lightDir, normal);
    vec3 viewDir = normalize(-vertPos);

    float lambertian = max(dot(lightDir,normal), 0.0);
    float specular = 0.0;

    if(lambertian > 0.0) {
       float specAngle = max(dot(reflectDir, viewDir), 0.0);
       specular = pow(specAngle, 4.0);
    }
    outColor = vec4(ambientColor +
                      lambertian*diffuseColor +
                      specular*specColor, 1.0);

    // only ambient
    if(mode == 2) outColor = vec4(ambientColor, 1.0);
    // only diffuse
    if(mode == 3) outColor = vec4(lambertian*diffuseColor, 1.0);
    // only specular
    if(mode == 4) outColor = vec4(specular*specColor, 1.0);

}
