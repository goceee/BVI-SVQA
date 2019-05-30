# invoke SourceDir generated makefile for Disparity_Calculation.pe66
Disparity_Calculation.pe66: .libraries,Disparity_Calculation.pe66
.libraries,Disparity_Calculation.pe66: package/cfg/Disparity_Calculation_pe66.xdl
	$(MAKE) -f C:\Users\Goce\workspace_new\Disparity_lab/src/makefile.libs

clean::
	$(MAKE) -f C:\Users\Goce\workspace_new\Disparity_lab/src/makefile.libs clean

