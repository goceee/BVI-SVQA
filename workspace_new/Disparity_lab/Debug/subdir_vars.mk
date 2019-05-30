################################################################################
# Automatically-generated file. Do not edit!
################################################################################

SHELL = cmd.exe

# Add inputs and outputs from these tool invocations to the build variables 
CFG_SRCS += \
../Disparity_Calculation.cfg 

SA_SRCS += \
../stereo_vision_sa.sa 

C_SRCS += \
../main.c \
../stereo_vision_c.c 

GEN_CMDS += \
./configPkg/linker.cmd 

GEN_FILES += \
./configPkg/linker.cmd \
./configPkg/compiler.opt 

GEN_MISC_DIRS += \
./configPkg/ 

C_DEPS += \
./main.d \
./stereo_vision_c.d 

GEN_OPTS += \
./configPkg/compiler.opt 

OBJS += \
./main.obj \
./stereo_vision_c.obj \
./stereo_vision_sa.obj 

SA_DEPS += \
./stereo_vision_sa.d 

SA_DEPS__QUOTED += \
"stereo_vision_sa.d" 

GEN_MISC_DIRS__QUOTED += \
"configPkg\" 

OBJS__QUOTED += \
"main.obj" \
"stereo_vision_c.obj" \
"stereo_vision_sa.obj" 

C_DEPS__QUOTED += \
"main.d" \
"stereo_vision_c.d" 

GEN_FILES__QUOTED += \
"configPkg\linker.cmd" \
"configPkg\compiler.opt" 

C_SRCS__QUOTED += \
"../main.c" \
"../stereo_vision_c.c" 

SA_SRCS__QUOTED += \
"../stereo_vision_sa.sa" 


