BUILD: gl3tut.cpp
	g++ -o tut gl3tut.cpp -lmingw32 -lSDL2main -lSDL2 -lGLEW32 -lopengl32

BUILD-DEBUG: gl3tut.cpp
	g++ gl3tut.cpp -g -Wall -Werror -o tut -lmingw32 -lSDL2main -lSDL2 -lGLEW32 -lopengl32

BUILD-LINUX: gl3tut.cpp
	g++ -o tut gl3tut.cpp -L/usr/local/lib -Wl,-rpath,/usr/local/lib -lSDL2 -lGL
