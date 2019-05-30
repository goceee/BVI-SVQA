################################################################################
# Automatically-generated file. Do not edit!
################################################################################

SHELL = cmd.exe

# Each subdirectory must supply rules for building sources it contributes
build-447979793:
	@$(MAKE) --no-print-directory -Onone -f subdir_rules.mk build-447979793-inproc

build-447979793-inproc: ../Disparity_Calculation.cfg
	@echo 'Building file: "$<"'
	@echo 'Invoking: XDCtools'
	"C:/ti/xdctools_3_51_01_18_core/xs" --xdcpath="C:/ti/pdk_C6678_1_1_2_6/packages;C:/ti/bios_6_75_02_00/packages;C:/ti/ccs901/ccs/ccs_base;C:/ti/uia_2_30_01_02/packages;" xdc.tools.configuro -o configPkg -t ti.targets.elf.C66 -p ti.platforms.evm6678 -r release -c "C:/ti/ccs901/ccs/tools/compiler/ti-cgt-c6000_8.0.4" "$<"
	@echo 'Finished building: "$<"'
	@echo ' '

configPkg/linker.cmd: build-447979793 ../Disparity_Calculation.cfg
configPkg/compiler.opt: build-447979793
configPkg/: build-447979793

%.obj: ../%.c $(GEN_OPTS) | $(GEN_FILES)
	@echo 'Building file: "$<"'
	@echo 'Invoking: C6000 Compiler'
	"C:/ti/ccs901/ccs/tools/compiler/ti-cgt-c6000_8.0.4/bin/cl6x" -mv6600 --abi=eabi -O3 -g --include_path="C:/ti/ccs901/ccs/tools/compiler/ti-cgt-c6000_8.0.4/include" --diag_wrap=off --display_error_number --diag_warning=225 --preproc_with_compile --preproc_dependency="$(basename $(<F)).d_raw" $(GEN_OPTS__FLAG) "$<"
	@echo 'Finished building: "$<"'
	@echo ' '

%.obj: ../%.sa $(GEN_OPTS) | $(GEN_FILES)
	@echo 'Building file: "$<"'
	@echo 'Invoking: C6000 Compiler'
	"C:/ti/ccs901/ccs/tools/compiler/ti-cgt-c6000_8.0.4/bin/cl6x" -mv6600 --abi=eabi -O3 -g --include_path="C:/ti/ccs901/ccs/tools/compiler/ti-cgt-c6000_8.0.4/include" --diag_wrap=off --display_error_number --diag_warning=225 --preproc_with_compile --preproc_dependency="$(basename $(<F)).d_raw" $(GEN_OPTS__FLAG) "$<"
	@echo 'Finished building: "$<"'
	@echo ' '


