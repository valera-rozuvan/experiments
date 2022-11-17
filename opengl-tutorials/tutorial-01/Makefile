#
# Cross Platform Makefile
# Compatible with Ubuntu 14.04.1 and Mac OS X
#
#
# if you using Mac OS X:
# You'll need glfw
#    http://www.glfw.org
#

#CXX = g++

EXE = tutorial_01_example
OBJS = src/main.o

UNAME_S := $(shell uname -s)


ifeq ($(UNAME_S), Linux) #LINUX
	ECHO_MESSAGE = "Linux"
	LIBS = -lGLU -lGL `pkg-config --static --libs glfw3` `pkg-config  --libs glew`

	CXXFLAGS = -Isrc `pkg-config --cflags glfw3` `pkg-config --cflags glew`
	CXXFLAGS += -Wall -Wformat -std=c++11
	CFLAGS = $(CXXFLAGS)
endif

ifeq ($(UNAME_S), Darwin) #APPLE
	ECHO_MESSAGE = "Mac OS X"
	LIBS = -framework OpenGL -framework Cocoa -framework IOKit -framework CoreVideo
	LIBS += -L/usr/local/lib -lglfw3 -lglew

	CXXFLAGS = -Isrc -I/usr/local/Cellar/glew/1.10.0/include -I/usr/local/include
	CXXFLAGS += -Wall -Wformat -std=c++11
#	CXXFLAGS += -D__APPLE__
	CFLAGS = $(CXXFLAGS)
endif

ifeq ($(UNAME_S), MINGW64_NT-6.3)
   ECHO_MESSAGE = "Windows"
   LIBS = -lglfw3 -lglew -lgdi32 -lopengl32 -limm32

   CXXFLAGS = -Isrc `pkg-config --cflags glfw3` `pkg-config --cflags glew`
   CXXFLAGS += -Wall -Wformat -std=c++11
   CFLAGS = $(CXXFLAGS)
endif


.cpp.o:
	$(CXX) $(CXXFLAGS) -c -o $@ $<

all: $(EXE)
	@echo Build complete for $(ECHO_MESSAGE)

$(EXE): $(OBJS)
	$(CXX) -o $(EXE) $(OBJS) $(CXXFLAGS) $(LIBS)

clean:
	rm $(EXE) $(OBJS)
