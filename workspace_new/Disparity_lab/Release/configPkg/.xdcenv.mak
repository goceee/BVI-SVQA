#
_XDCBUILDCOUNT = 
ifneq (,$(findstring path,$(_USEXDCENV_)))
override XDCPATH = C:/ti/bios_6_75_02_00/packages;C:/ti/uia_2_30_01_02/packages;C:/ti/ccs901/ccs/ccs_base;C:/ti/pdk_c667x_2_0_13/packages
override XDCROOT = C:/ti/ccs901/xdctools_3_55_00_11_core
override XDCBUILDCFG = ./config.bld
endif
ifneq (,$(findstring args,$(_USEXDCENV_)))
override XDCARGS = 
override XDCTARGETS = 
endif
#
ifeq (0,1)
PKGPATH = C:/ti/bios_6_75_02_00/packages;C:/ti/uia_2_30_01_02/packages;C:/ti/ccs901/ccs/ccs_base;C:/ti/pdk_c667x_2_0_13/packages;C:/ti/ccs901/xdctools_3_55_00_11_core/packages;..
HOSTOS = Windows
endif
