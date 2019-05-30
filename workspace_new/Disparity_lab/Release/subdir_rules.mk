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
	"C:/ti/ccs901/xdctools_3_55_00_11_core/xs" --xdcpath="C:/ti/bios_6_75_02_00/packages;C:/ti/uia_2_30_01_02/packages;C:/ti/ccs901/ccs/ccs_base;C:/ti/pdk_c667x_2_0_13/packages;" xdc.tools.configuro -o configPkg -t ti.targets.elf.C66 -p ti.platforms.evm6678 -r release -c "C:/ti/ccs901/ccs/tools/compiler/ti-cgt-c6000_8.3.3" "$<"
	@echo 'Finished building: "$<"'
	@echo ' '

configPkg/linker.cmd: build-447979793 ../Disparity_Calculation.cfg
configPkg/compiler.opt: build-447979793
configPkg/: build-447979793

%.obj: ../%.c $(GEN_OPTS) | $(GEN_FILES)
	@echo 'Building file: "$<"'
	@echo 'Invoking: C6000 Compiler'
	"C:/ti/ccs901/ccs/tools/compiler/ti-cgt-c6000_8.3.3/bin/cl6x" -mv6600 --abi=eabi -O3 --opt_for_speed=5 -ms0 --include_path="C:/ti/ccs901/ccs/tools/compiler/ti-cgt-c6000_8.3.3/include" --diag_warning=225 --diag_wrap=off --display_error_number --debug_software_pipeline --src_interlist --preproc_with_compile --preproc_dependency="$(basename $(<F)).d_raw" $(GEN_OPTS__FLAG) "$<"
	@echo 'Finished building: "$<"'
	@echo ' '

%.obj: ../%.sa $(GEN_OPTS) | $(GEN_FILES)
	@echo 'Building file: "$<"'
	@echo 'Invoking: C6000 Compiler'
	"C:/ti/ccs901/ccs/tools/compiler/ti-cgt-c6000_8.3.3/bin/cl6x" -mv6600 --abi=eabi -O3 --opt_for_speed=5 -ms0 --include_path="C:/ti/ccs901/ccs/tools/compiler/ti-cgt-c6000_8.3.3/include" --diag_warning=225 --diag_wrap=off --display_error_number --debug_software_pipeline --src_interlist --preproc_with_compile --preproc_dependency="$(basename $(<F)).d_raw" $(GEN_OPTS__FLAG) "$<"
	@echo 'Finished building: "$<"'
	@echo ' '


