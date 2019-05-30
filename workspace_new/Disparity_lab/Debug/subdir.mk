################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
CFG_SRCS += \
../Disparity_Calculation.cfg 


# Each subdirectory must supply rules for building sources it contributes
configPkg/linker.cmd: ../Disparity_Calculation.cfg
	@echo 'Building file: $<'
	@echo 'Invoking: XDCtools'
	"/xs" --xdcpath="/packages;/packages;/packages;" xdc.tools.configuro -o configPkg -t ti.targets.elf.C66 -p ti.platforms.evm6678 -r release -c "$<"
	@echo 'Finished building: $<'
	@echo ' '


