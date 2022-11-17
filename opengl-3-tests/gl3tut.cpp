#include <stdlib.h>
#include <stdio.h>

#include "SDL2/SDL.h"

#ifdef _WIN32
#  define GLEW_STATIC 1
#  include "GL/GLEW.h"
#else
#  define GL_GLEXT_PROTOTYPES
#  include "SDL2/SDL_opengl.h"
#endif

//
// Globals
//
const int    WIDTH       = 640;
const int    HEIGHT      = 480;
const int    SLEEP_TIME  = 10;

SDL_Window*    g_pWindow;
SDL_GLContext  g_context;

bool        g_running;

GLuint      g_shVert;
GLuint      g_shFrag;
GLuint      g_shProg;

GLuint      g_vao;
GLuint      g_vbo;

//
// Prototypes
//
bool  init_context();
bool  init_opengl();
void  create_shaders();
void  create_vao();
void  run();
void  check_events();
void  render();
void  release();

//
// Functions
//

//-----------------------------------------------------------------------------
int main(int argc, char* argv[])
{
  if (!init_context()) {
    return 1;
  }

  if (!init_opengl()) {
    release();

    return 1;
  }

  run();

  release();

  return 0;
}


//-----------------------------------------------------------------------------
bool init_context()
{
  if (SDL_Init(SDL_INIT_EVERYTHING) < 0) {
    fprintf(stderr, "Could not initiliaze SDL: %s\n", SDL_GetError());

    return false;
  }

  unsigned int flags = SDL_WINDOW_OPENGL | SDL_WINDOW_SHOWN;

  SDL_GL_SetAttribute(SDL_GL_RED_SIZE, 8);
  SDL_GL_SetAttribute(SDL_GL_GREEN_SIZE, 8);
  SDL_GL_SetAttribute(SDL_GL_BLUE_SIZE, 8);
  SDL_GL_SetAttribute(SDL_GL_DEPTH_SIZE, 24);
  SDL_GL_SetAttribute(SDL_GL_DOUBLEBUFFER, 1);

  SDL_GL_SetAttribute(SDL_GL_CONTEXT_MAJOR_VERSION, 3);
  SDL_GL_SetAttribute(SDL_GL_CONTEXT_MINOR_VERSION, 2);

  // Make the window
  g_pWindow = SDL_CreateWindow(
    "OpenGL3.2 Tutorial",
    SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED,
    WIDTH, HEIGHT,
    flags
  );

  if (!g_pWindow) {
    fprintf(stderr, "Could not create the stupid SDL window: %s\n", SDL_GetError());

    return false;
  }

  // Make the OpenGL 3.2 context
  g_context = SDL_GL_CreateContext(g_pWindow);
  if (!g_context) {
    fprintf(stderr, "Could not create the OpenGL 3.2 context for the window: %s\n", SDL_GetError());

    return false;
  }

  SDL_GL_SetSwapInterval(1); // VSync

  return true;
}

//-----------------------------------------------------------------------------
bool init_opengl()
{
#ifdef _WIN32
  GLenum err;

  glewExperimental = GL_TRUE;

  if (GLEW_OK != (err = glewInit())) {
    fprintf(stderr, "Could not init GLEW: %s\n", glewGetErrorString(err));

    return false;
  }
#endif

  create_shaders();
  create_vao();

  // config opengl
  glClearColor(.0f, .0f, .0f, 1.0f);
  glClearDepth(1.0f);

  glViewport(0, 0, WIDTH, HEIGHT);

  return true;
}

//-----------------------------------------------------------------------------
void create_shaders()
{
  char shErr[1024];
  int errlen;
  GLint res;

  const char* vert_src =
    "#version 150\n"
    "in vec2 in_Position;\n"
    "\n"
    "void main(){\n"
    "  gl_Position = vec4(in_Position, .0, 1.0);\n"
    "}";
  const char* frag_src =
    "#version 150\n"
    "out vec4 frag_Color;\n"
    "\n"
    "void main(){\n"
    "  frag_Color = vec4(1.0, .0, .0, 1.0);\n"
    "}";

  // Generate some IDs for our shader programs
  g_shVert = glCreateShader(GL_VERTEX_SHADER);
  g_shFrag = glCreateShader(GL_FRAGMENT_SHADER);
  g_shProg = glCreateProgram();

  // Assign our above shader source code to these IDs
  glShaderSource(g_shVert, 1, &vert_src, NULL);
  glShaderSource(g_shFrag, 1, &frag_src, NULL);

  // Attempt to compile the source code
  glCompileShader(g_shVert);
  glCompileShader(g_shFrag);

  // check if compilation was successful
  glGetShaderiv(g_shVert, GL_COMPILE_STATUS, &res);
  if (GL_FALSE == res) {
    fprintf(stderr, "Failed to compile vertex shader\n");
    glGetShaderInfoLog(g_shVert, 1024, &errlen, shErr);
    printf("%s\n", shErr);

    return;
  }
  glGetShaderiv(g_shFrag, GL_COMPILE_STATUS, &res);
  if (GL_FALSE == res) {
    fprintf(stderr, "Failed to compile fragment shader\n");
    glGetShaderInfoLog(g_shFrag, 1024, &errlen, shErr);
    printf("%s\n", shErr);

    return;
  }

  // Attach these shaders to the shader program
  glAttachShader(g_shProg, g_shVert);
  glAttachShader(g_shProg, g_shFrag);

  // flag the shaders to be deleted when the shader program is deleted
  glDeleteShader(g_shVert);
  glDeleteShader(g_shFrag);

  // Link the shaders
  glLinkProgram(g_shProg);
  glGetProgramiv(g_shProg, GL_LINK_STATUS, &res);
  if (GL_FALSE == res) {
    fprintf(stderr, "Failed to link shader program\n");
  }

  glUseProgram(g_shProg);
}

//-----------------------------------------------------------------------------
void create_vao()
{
  // Create our static triangle strip of 2 triangles = 4 vertices
  const float quad[8] = {
    -.5f,  .5f,
    -.5f, -.5f,
     .5f,  .5f,
     .5f, -.5f
  };

  // Generate ID for VAO, and bind it as the active VAO
  glGenVertexArrays(1, &g_vao);
  glBindVertexArray(g_vao);

  // Generate a VBO to store our vertex list
  glGenBuffers(1, &g_vbo);
  glBindBuffer(GL_ARRAY_BUFFER, g_vbo);
  glBufferData(GL_ARRAY_BUFFER, sizeof(float)*8, quad, GL_STATIC_DRAW);
  glVertexAttribPointer((GLuint)0, 2, GL_FLOAT, GL_FALSE, 0, 0);
  glEnableVertexAttribArray(0);
}

//-----------------------------------------------------------------------------
void run()
{
  g_running = true;

  while(g_running){
    check_events();

    render();
    SDL_GL_SwapWindow(g_pWindow);

    SDL_Delay(SLEEP_TIME);
  }
}

//-----------------------------------------------------------------------------
void check_events()
{
  SDL_Event evt;
  SDL_Keycode key;

  while (SDL_PollEvent(&evt)){
    switch(evt.type){
      case SDL_KEYDOWN:
        key = evt.key.keysym.sym & 0xff;
        if ((SDLK_ESCAPE & 0xff) == key) {
          g_running = false;
        }
        break;
    };
  }
}

//-----------------------------------------------------------------------------
void render()
{
  glDrawArrays(GL_TRIANGLE_STRIP, 0, 4);
}

//-----------------------------------------------------------------------------
void release()
{
  glDeleteBuffers(1, &g_vbo);
  glDeleteVertexArrays(1, &g_vao);
  SDL_GL_DeleteContext(g_context);
  SDL_DestroyWindow(g_pWindow);
  SDL_Quit();
}
