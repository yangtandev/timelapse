# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.22

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:

#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:

# Disable VCS-based implicit rules.
% : %,v

# Disable VCS-based implicit rules.
% : RCS/%

# Disable VCS-based implicit rules.
% : RCS/%,v

# Disable VCS-based implicit rules.
% : SCCS/s.%

# Disable VCS-based implicit rules.
% : s.%

.SUFFIXES: .hpux_make_needs_suffix_list

# Produce verbose output by default.
VERBOSE = 1

# Command-line flag to silence nested $(MAKE).
$(VERBOSE)MAKESILENT = -s

#Suppress display of executed commands.
$(VERBOSE).SILENT:

# A target that is always out of date.
cmake_force:
.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/bin/cmake

# The command to remove a file.
RM = /usr/bin/cmake -E rm -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/gini/NVR/ZLMediaKit

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/gini/NVR/ZLMediaKit/build

# Include any dependencies generated for this target.
include srt/CMakeFiles/srt.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include srt/CMakeFiles/srt.dir/compiler_depend.make

# Include the progress variables for this target.
include srt/CMakeFiles/srt.dir/progress.make

# Include the compile flags for this target's objects.
include srt/CMakeFiles/srt.dir/flags.make

srt/CMakeFiles/srt.dir/Ack.cpp.o: srt/CMakeFiles/srt.dir/flags.make
srt/CMakeFiles/srt.dir/Ack.cpp.o: ../srt/Ack.cpp
srt/CMakeFiles/srt.dir/Ack.cpp.o: srt/CMakeFiles/srt.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/gini/NVR/ZLMediaKit/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object srt/CMakeFiles/srt.dir/Ack.cpp.o"
	cd /home/gini/NVR/ZLMediaKit/build/srt && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT srt/CMakeFiles/srt.dir/Ack.cpp.o -MF CMakeFiles/srt.dir/Ack.cpp.o.d -o CMakeFiles/srt.dir/Ack.cpp.o -c /home/gini/NVR/ZLMediaKit/srt/Ack.cpp

srt/CMakeFiles/srt.dir/Ack.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/srt.dir/Ack.cpp.i"
	cd /home/gini/NVR/ZLMediaKit/build/srt && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/gini/NVR/ZLMediaKit/srt/Ack.cpp > CMakeFiles/srt.dir/Ack.cpp.i

srt/CMakeFiles/srt.dir/Ack.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/srt.dir/Ack.cpp.s"
	cd /home/gini/NVR/ZLMediaKit/build/srt && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/gini/NVR/ZLMediaKit/srt/Ack.cpp -o CMakeFiles/srt.dir/Ack.cpp.s

srt/CMakeFiles/srt.dir/HSExt.cpp.o: srt/CMakeFiles/srt.dir/flags.make
srt/CMakeFiles/srt.dir/HSExt.cpp.o: ../srt/HSExt.cpp
srt/CMakeFiles/srt.dir/HSExt.cpp.o: srt/CMakeFiles/srt.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/gini/NVR/ZLMediaKit/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Building CXX object srt/CMakeFiles/srt.dir/HSExt.cpp.o"
	cd /home/gini/NVR/ZLMediaKit/build/srt && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT srt/CMakeFiles/srt.dir/HSExt.cpp.o -MF CMakeFiles/srt.dir/HSExt.cpp.o.d -o CMakeFiles/srt.dir/HSExt.cpp.o -c /home/gini/NVR/ZLMediaKit/srt/HSExt.cpp

srt/CMakeFiles/srt.dir/HSExt.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/srt.dir/HSExt.cpp.i"
	cd /home/gini/NVR/ZLMediaKit/build/srt && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/gini/NVR/ZLMediaKit/srt/HSExt.cpp > CMakeFiles/srt.dir/HSExt.cpp.i

srt/CMakeFiles/srt.dir/HSExt.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/srt.dir/HSExt.cpp.s"
	cd /home/gini/NVR/ZLMediaKit/build/srt && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/gini/NVR/ZLMediaKit/srt/HSExt.cpp -o CMakeFiles/srt.dir/HSExt.cpp.s

srt/CMakeFiles/srt.dir/NackContext.cpp.o: srt/CMakeFiles/srt.dir/flags.make
srt/CMakeFiles/srt.dir/NackContext.cpp.o: ../srt/NackContext.cpp
srt/CMakeFiles/srt.dir/NackContext.cpp.o: srt/CMakeFiles/srt.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/gini/NVR/ZLMediaKit/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_3) "Building CXX object srt/CMakeFiles/srt.dir/NackContext.cpp.o"
	cd /home/gini/NVR/ZLMediaKit/build/srt && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT srt/CMakeFiles/srt.dir/NackContext.cpp.o -MF CMakeFiles/srt.dir/NackContext.cpp.o.d -o CMakeFiles/srt.dir/NackContext.cpp.o -c /home/gini/NVR/ZLMediaKit/srt/NackContext.cpp

srt/CMakeFiles/srt.dir/NackContext.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/srt.dir/NackContext.cpp.i"
	cd /home/gini/NVR/ZLMediaKit/build/srt && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/gini/NVR/ZLMediaKit/srt/NackContext.cpp > CMakeFiles/srt.dir/NackContext.cpp.i

srt/CMakeFiles/srt.dir/NackContext.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/srt.dir/NackContext.cpp.s"
	cd /home/gini/NVR/ZLMediaKit/build/srt && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/gini/NVR/ZLMediaKit/srt/NackContext.cpp -o CMakeFiles/srt.dir/NackContext.cpp.s

srt/CMakeFiles/srt.dir/Packet.cpp.o: srt/CMakeFiles/srt.dir/flags.make
srt/CMakeFiles/srt.dir/Packet.cpp.o: ../srt/Packet.cpp
srt/CMakeFiles/srt.dir/Packet.cpp.o: srt/CMakeFiles/srt.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/gini/NVR/ZLMediaKit/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_4) "Building CXX object srt/CMakeFiles/srt.dir/Packet.cpp.o"
	cd /home/gini/NVR/ZLMediaKit/build/srt && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT srt/CMakeFiles/srt.dir/Packet.cpp.o -MF CMakeFiles/srt.dir/Packet.cpp.o.d -o CMakeFiles/srt.dir/Packet.cpp.o -c /home/gini/NVR/ZLMediaKit/srt/Packet.cpp

srt/CMakeFiles/srt.dir/Packet.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/srt.dir/Packet.cpp.i"
	cd /home/gini/NVR/ZLMediaKit/build/srt && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/gini/NVR/ZLMediaKit/srt/Packet.cpp > CMakeFiles/srt.dir/Packet.cpp.i

srt/CMakeFiles/srt.dir/Packet.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/srt.dir/Packet.cpp.s"
	cd /home/gini/NVR/ZLMediaKit/build/srt && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/gini/NVR/ZLMediaKit/srt/Packet.cpp -o CMakeFiles/srt.dir/Packet.cpp.s

srt/CMakeFiles/srt.dir/PacketQueue.cpp.o: srt/CMakeFiles/srt.dir/flags.make
srt/CMakeFiles/srt.dir/PacketQueue.cpp.o: ../srt/PacketQueue.cpp
srt/CMakeFiles/srt.dir/PacketQueue.cpp.o: srt/CMakeFiles/srt.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/gini/NVR/ZLMediaKit/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_5) "Building CXX object srt/CMakeFiles/srt.dir/PacketQueue.cpp.o"
	cd /home/gini/NVR/ZLMediaKit/build/srt && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT srt/CMakeFiles/srt.dir/PacketQueue.cpp.o -MF CMakeFiles/srt.dir/PacketQueue.cpp.o.d -o CMakeFiles/srt.dir/PacketQueue.cpp.o -c /home/gini/NVR/ZLMediaKit/srt/PacketQueue.cpp

srt/CMakeFiles/srt.dir/PacketQueue.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/srt.dir/PacketQueue.cpp.i"
	cd /home/gini/NVR/ZLMediaKit/build/srt && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/gini/NVR/ZLMediaKit/srt/PacketQueue.cpp > CMakeFiles/srt.dir/PacketQueue.cpp.i

srt/CMakeFiles/srt.dir/PacketQueue.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/srt.dir/PacketQueue.cpp.s"
	cd /home/gini/NVR/ZLMediaKit/build/srt && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/gini/NVR/ZLMediaKit/srt/PacketQueue.cpp -o CMakeFiles/srt.dir/PacketQueue.cpp.s

srt/CMakeFiles/srt.dir/PacketSendQueue.cpp.o: srt/CMakeFiles/srt.dir/flags.make
srt/CMakeFiles/srt.dir/PacketSendQueue.cpp.o: ../srt/PacketSendQueue.cpp
srt/CMakeFiles/srt.dir/PacketSendQueue.cpp.o: srt/CMakeFiles/srt.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/gini/NVR/ZLMediaKit/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_6) "Building CXX object srt/CMakeFiles/srt.dir/PacketSendQueue.cpp.o"
	cd /home/gini/NVR/ZLMediaKit/build/srt && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT srt/CMakeFiles/srt.dir/PacketSendQueue.cpp.o -MF CMakeFiles/srt.dir/PacketSendQueue.cpp.o.d -o CMakeFiles/srt.dir/PacketSendQueue.cpp.o -c /home/gini/NVR/ZLMediaKit/srt/PacketSendQueue.cpp

srt/CMakeFiles/srt.dir/PacketSendQueue.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/srt.dir/PacketSendQueue.cpp.i"
	cd /home/gini/NVR/ZLMediaKit/build/srt && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/gini/NVR/ZLMediaKit/srt/PacketSendQueue.cpp > CMakeFiles/srt.dir/PacketSendQueue.cpp.i

srt/CMakeFiles/srt.dir/PacketSendQueue.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/srt.dir/PacketSendQueue.cpp.s"
	cd /home/gini/NVR/ZLMediaKit/build/srt && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/gini/NVR/ZLMediaKit/srt/PacketSendQueue.cpp -o CMakeFiles/srt.dir/PacketSendQueue.cpp.s

srt/CMakeFiles/srt.dir/SrtSession.cpp.o: srt/CMakeFiles/srt.dir/flags.make
srt/CMakeFiles/srt.dir/SrtSession.cpp.o: ../srt/SrtSession.cpp
srt/CMakeFiles/srt.dir/SrtSession.cpp.o: srt/CMakeFiles/srt.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/gini/NVR/ZLMediaKit/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_7) "Building CXX object srt/CMakeFiles/srt.dir/SrtSession.cpp.o"
	cd /home/gini/NVR/ZLMediaKit/build/srt && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT srt/CMakeFiles/srt.dir/SrtSession.cpp.o -MF CMakeFiles/srt.dir/SrtSession.cpp.o.d -o CMakeFiles/srt.dir/SrtSession.cpp.o -c /home/gini/NVR/ZLMediaKit/srt/SrtSession.cpp

srt/CMakeFiles/srt.dir/SrtSession.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/srt.dir/SrtSession.cpp.i"
	cd /home/gini/NVR/ZLMediaKit/build/srt && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/gini/NVR/ZLMediaKit/srt/SrtSession.cpp > CMakeFiles/srt.dir/SrtSession.cpp.i

srt/CMakeFiles/srt.dir/SrtSession.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/srt.dir/SrtSession.cpp.s"
	cd /home/gini/NVR/ZLMediaKit/build/srt && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/gini/NVR/ZLMediaKit/srt/SrtSession.cpp -o CMakeFiles/srt.dir/SrtSession.cpp.s

srt/CMakeFiles/srt.dir/SrtTransport.cpp.o: srt/CMakeFiles/srt.dir/flags.make
srt/CMakeFiles/srt.dir/SrtTransport.cpp.o: ../srt/SrtTransport.cpp
srt/CMakeFiles/srt.dir/SrtTransport.cpp.o: srt/CMakeFiles/srt.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/gini/NVR/ZLMediaKit/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_8) "Building CXX object srt/CMakeFiles/srt.dir/SrtTransport.cpp.o"
	cd /home/gini/NVR/ZLMediaKit/build/srt && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT srt/CMakeFiles/srt.dir/SrtTransport.cpp.o -MF CMakeFiles/srt.dir/SrtTransport.cpp.o.d -o CMakeFiles/srt.dir/SrtTransport.cpp.o -c /home/gini/NVR/ZLMediaKit/srt/SrtTransport.cpp

srt/CMakeFiles/srt.dir/SrtTransport.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/srt.dir/SrtTransport.cpp.i"
	cd /home/gini/NVR/ZLMediaKit/build/srt && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/gini/NVR/ZLMediaKit/srt/SrtTransport.cpp > CMakeFiles/srt.dir/SrtTransport.cpp.i

srt/CMakeFiles/srt.dir/SrtTransport.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/srt.dir/SrtTransport.cpp.s"
	cd /home/gini/NVR/ZLMediaKit/build/srt && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/gini/NVR/ZLMediaKit/srt/SrtTransport.cpp -o CMakeFiles/srt.dir/SrtTransport.cpp.s

srt/CMakeFiles/srt.dir/SrtTransportImp.cpp.o: srt/CMakeFiles/srt.dir/flags.make
srt/CMakeFiles/srt.dir/SrtTransportImp.cpp.o: ../srt/SrtTransportImp.cpp
srt/CMakeFiles/srt.dir/SrtTransportImp.cpp.o: srt/CMakeFiles/srt.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/gini/NVR/ZLMediaKit/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_9) "Building CXX object srt/CMakeFiles/srt.dir/SrtTransportImp.cpp.o"
	cd /home/gini/NVR/ZLMediaKit/build/srt && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT srt/CMakeFiles/srt.dir/SrtTransportImp.cpp.o -MF CMakeFiles/srt.dir/SrtTransportImp.cpp.o.d -o CMakeFiles/srt.dir/SrtTransportImp.cpp.o -c /home/gini/NVR/ZLMediaKit/srt/SrtTransportImp.cpp

srt/CMakeFiles/srt.dir/SrtTransportImp.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/srt.dir/SrtTransportImp.cpp.i"
	cd /home/gini/NVR/ZLMediaKit/build/srt && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/gini/NVR/ZLMediaKit/srt/SrtTransportImp.cpp > CMakeFiles/srt.dir/SrtTransportImp.cpp.i

srt/CMakeFiles/srt.dir/SrtTransportImp.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/srt.dir/SrtTransportImp.cpp.s"
	cd /home/gini/NVR/ZLMediaKit/build/srt && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/gini/NVR/ZLMediaKit/srt/SrtTransportImp.cpp -o CMakeFiles/srt.dir/SrtTransportImp.cpp.s

srt/CMakeFiles/srt.dir/Statistic.cpp.o: srt/CMakeFiles/srt.dir/flags.make
srt/CMakeFiles/srt.dir/Statistic.cpp.o: ../srt/Statistic.cpp
srt/CMakeFiles/srt.dir/Statistic.cpp.o: srt/CMakeFiles/srt.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/gini/NVR/ZLMediaKit/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_10) "Building CXX object srt/CMakeFiles/srt.dir/Statistic.cpp.o"
	cd /home/gini/NVR/ZLMediaKit/build/srt && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT srt/CMakeFiles/srt.dir/Statistic.cpp.o -MF CMakeFiles/srt.dir/Statistic.cpp.o.d -o CMakeFiles/srt.dir/Statistic.cpp.o -c /home/gini/NVR/ZLMediaKit/srt/Statistic.cpp

srt/CMakeFiles/srt.dir/Statistic.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/srt.dir/Statistic.cpp.i"
	cd /home/gini/NVR/ZLMediaKit/build/srt && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/gini/NVR/ZLMediaKit/srt/Statistic.cpp > CMakeFiles/srt.dir/Statistic.cpp.i

srt/CMakeFiles/srt.dir/Statistic.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/srt.dir/Statistic.cpp.s"
	cd /home/gini/NVR/ZLMediaKit/build/srt && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/gini/NVR/ZLMediaKit/srt/Statistic.cpp -o CMakeFiles/srt.dir/Statistic.cpp.s

# Object files for target srt
srt_OBJECTS = \
"CMakeFiles/srt.dir/Ack.cpp.o" \
"CMakeFiles/srt.dir/HSExt.cpp.o" \
"CMakeFiles/srt.dir/NackContext.cpp.o" \
"CMakeFiles/srt.dir/Packet.cpp.o" \
"CMakeFiles/srt.dir/PacketQueue.cpp.o" \
"CMakeFiles/srt.dir/PacketSendQueue.cpp.o" \
"CMakeFiles/srt.dir/SrtSession.cpp.o" \
"CMakeFiles/srt.dir/SrtTransport.cpp.o" \
"CMakeFiles/srt.dir/SrtTransportImp.cpp.o" \
"CMakeFiles/srt.dir/Statistic.cpp.o"

# External object files for target srt
srt_EXTERNAL_OBJECTS =

../release/linux/Debug/libsrt.a: srt/CMakeFiles/srt.dir/Ack.cpp.o
../release/linux/Debug/libsrt.a: srt/CMakeFiles/srt.dir/HSExt.cpp.o
../release/linux/Debug/libsrt.a: srt/CMakeFiles/srt.dir/NackContext.cpp.o
../release/linux/Debug/libsrt.a: srt/CMakeFiles/srt.dir/Packet.cpp.o
../release/linux/Debug/libsrt.a: srt/CMakeFiles/srt.dir/PacketQueue.cpp.o
../release/linux/Debug/libsrt.a: srt/CMakeFiles/srt.dir/PacketSendQueue.cpp.o
../release/linux/Debug/libsrt.a: srt/CMakeFiles/srt.dir/SrtSession.cpp.o
../release/linux/Debug/libsrt.a: srt/CMakeFiles/srt.dir/SrtTransport.cpp.o
../release/linux/Debug/libsrt.a: srt/CMakeFiles/srt.dir/SrtTransportImp.cpp.o
../release/linux/Debug/libsrt.a: srt/CMakeFiles/srt.dir/Statistic.cpp.o
../release/linux/Debug/libsrt.a: srt/CMakeFiles/srt.dir/build.make
../release/linux/Debug/libsrt.a: srt/CMakeFiles/srt.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/gini/NVR/ZLMediaKit/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_11) "Linking CXX static library ../../release/linux/Debug/libsrt.a"
	cd /home/gini/NVR/ZLMediaKit/build/srt && $(CMAKE_COMMAND) -P CMakeFiles/srt.dir/cmake_clean_target.cmake
	cd /home/gini/NVR/ZLMediaKit/build/srt && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/srt.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
srt/CMakeFiles/srt.dir/build: ../release/linux/Debug/libsrt.a
.PHONY : srt/CMakeFiles/srt.dir/build

srt/CMakeFiles/srt.dir/clean:
	cd /home/gini/NVR/ZLMediaKit/build/srt && $(CMAKE_COMMAND) -P CMakeFiles/srt.dir/cmake_clean.cmake
.PHONY : srt/CMakeFiles/srt.dir/clean

srt/CMakeFiles/srt.dir/depend:
	cd /home/gini/NVR/ZLMediaKit/build && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/gini/NVR/ZLMediaKit /home/gini/NVR/ZLMediaKit/srt /home/gini/NVR/ZLMediaKit/build /home/gini/NVR/ZLMediaKit/build/srt /home/gini/NVR/ZLMediaKit/build/srt/CMakeFiles/srt.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : srt/CMakeFiles/srt.dir/depend
