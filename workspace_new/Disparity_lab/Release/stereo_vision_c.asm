;******************************************************************************
;* G3 TMS320C6x C/C++ Codegen                                       PC v8.3.3 *
;* Date/Time created: Mon May 27 22:26:54 2019                                *
;******************************************************************************
	.compiler_opts --abi=eabi --array_alignment=8 --c64p_l1d_workaround=off --diag_wrap=off --endian=little --hll_source=on --long_precision_bits=32 --mem_model:code=near --mem_model:const=data --mem_model:data=far_aggregates --object_format=elf --silicon_version=6600 --symdebug:dwarf --symdebug:dwarf_version=3 

;******************************************************************************
;* GLOBAL FILE PARAMETERS                                                     *
;*                                                                            *
;*   Architecture      : TMS320C66xx                                          *
;*   Optimization      : Enabled at level 3                                   *
;*   Optimizing for    : Speed 1st, size 2nd                                  *
;*                       Based on options: -o3, -ms0                          *
;*   Endian            : Little                                               *
;*   Interrupt Thrshld : Disabled                                             *
;*   Data Access Model : Far Aggregate Data                                   *
;*   Pipelining        : Enabled                                              *
;*   Speculate Loads   : Enabled with threshold = 0                           *
;*   Memory Aliases    : Presume are aliases (pessimistic)                    *
;*   Debug Info        : DWARF Debug                                          *
;*                                                                            *
;******************************************************************************

	.asg	A15, FP
	.asg	B14, DP
	.asg	B15, SP
	.global	$bss


$C$DW$CU	.dwtag  DW_TAG_compile_unit
	.dwattr $C$DW$CU, DW_AT_name("../stereo_vision_c.c")
	.dwattr $C$DW$CU, DW_AT_producer("TI G3 TMS320C6x C/C++ Codegen PC v8.3.3 Copyright (c) 1996-2018 Texas Instruments Incorporated")
	.dwattr $C$DW$CU, DW_AT_TI_version(0x01)
	.dwattr $C$DW$CU, DW_AT_comp_dir("C:\Users\Goce\workspace_new\Disparity_lab\Release")
;	C:\ti\ccs901\ccs\tools\compiler\ti-cgt-c6000_8.3.3\bin\opt6x.exe C:\\Users\\Goce\\AppData\\Local\\Temp\\{9AA484FF-F288-41E7-B494-C3AD8794135F} C:\\Users\\Goce\\AppData\\Local\\Temp\\{D3189C9A-A694-4B78-9825-EDC217897CDF} 
	.sect	".text"
	.clink
	.global	stereo_vision_c

$C$DW$1	.dwtag  DW_TAG_subprogram
	.dwattr $C$DW$1, DW_AT_name("stereo_vision_c")
	.dwattr $C$DW$1, DW_AT_low_pc(stereo_vision_c)
	.dwattr $C$DW$1, DW_AT_high_pc(0x00)
	.dwattr $C$DW$1, DW_AT_TI_symbol_name("stereo_vision_c")
	.dwattr $C$DW$1, DW_AT_external
	.dwattr $C$DW$1, DW_AT_TI_begin_file("../stereo_vision_c.c")
	.dwattr $C$DW$1, DW_AT_TI_begin_line(0x08)
	.dwattr $C$DW$1, DW_AT_TI_begin_column(0x06)
	.dwattr $C$DW$1, DW_AT_decl_file("../stereo_vision_c.c")
	.dwattr $C$DW$1, DW_AT_decl_line(0x08)
	.dwattr $C$DW$1, DW_AT_decl_column(0x06)
	.dwattr $C$DW$1, DW_AT_TI_max_frame_size(0x18)
	.dwpsn	file "../stereo_vision_c.c",line 9,column 1,is_stmt,address stereo_vision_c,isa 0

	.dwfde $C$DW$CIE, stereo_vision_c
$C$DW$2	.dwtag  DW_TAG_formal_parameter
	.dwattr $C$DW$2, DW_AT_name("L")
	.dwattr $C$DW$2, DW_AT_TI_symbol_name("L")
	.dwattr $C$DW$2, DW_AT_type(*$C$DW$T$28)
	.dwattr $C$DW$2, DW_AT_location[DW_OP_reg4]

$C$DW$3	.dwtag  DW_TAG_formal_parameter
	.dwattr $C$DW$3, DW_AT_name("R")
	.dwattr $C$DW$3, DW_AT_TI_symbol_name("R")
	.dwattr $C$DW$3, DW_AT_type(*$C$DW$T$28)
	.dwattr $C$DW$3, DW_AT_location[DW_OP_reg20]

$C$DW$4	.dwtag  DW_TAG_formal_parameter
	.dwattr $C$DW$4, DW_AT_name("Disparity_Map")
	.dwattr $C$DW$4, DW_AT_TI_symbol_name("Disparity_Map")
	.dwattr $C$DW$4, DW_AT_type(*$C$DW$T$30)
	.dwattr $C$DW$4, DW_AT_location[DW_OP_reg6]

$C$DW$5	.dwtag  DW_TAG_formal_parameter
	.dwattr $C$DW$5, DW_AT_name("Search_Range")
	.dwattr $C$DW$5, DW_AT_TI_symbol_name("Search_Range")
	.dwattr $C$DW$5, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$5, DW_AT_location[DW_OP_reg22]

$C$DW$6	.dwtag  DW_TAG_formal_parameter
	.dwattr $C$DW$6, DW_AT_name("Radius")
	.dwattr $C$DW$6, DW_AT_TI_symbol_name("Radius")
	.dwattr $C$DW$6, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$6, DW_AT_location[DW_OP_reg8]


;******************************************************************************
;* FUNCTION NAME: stereo_vision_c                                             *
;*                                                                            *
;*   Regs Modified     : A0,A1,A2,A3,A4,A5,A6,A7,A8,A9,A16,A17,A18,A19,A20,   *
;*                           A21,A22,A23,A24,A25,A26,A27,A28,A29,A30,A31,B0,  *
;*                           B1,B2,B3,B4,B5,B6,B7,B8,B9,B10,B11,B12,B13,SP,   *
;*                           B16,B17,B18,B19,B20,B21,B22,B23,B24,B25,B26,B27, *
;*                           B28,B29,B30,B31                                  *
;*   Regs Used         : A0,A1,A2,A3,A4,A5,A6,A7,A8,A9,A16,A17,A18,A19,A20,   *
;*                           A21,A22,A23,A24,A25,A26,A27,A28,A29,A30,A31,B0,  *
;*                           B1,B2,B3,B4,B5,B6,B7,B8,B9,B10,B11,B12,B13,SP,   *
;*                           B16,B17,B18,B19,B20,B21,B22,B23,B24,B25,B26,B27, *
;*                           B28,B29,B30,B31                                  *
;*   Local Frame Size  : 0 Args + 0 Auto + 24 Save = 24 byte                  *
;******************************************************************************
stereo_vision_c:
;** --------------------------------------------------------------------------*
$C$DW$7	.dwtag  DW_TAG_variable
	.dwattr $C$DW$7, DW_AT_name("$O$C8")
	.dwattr $C$DW$7, DW_AT_TI_symbol_name("$O$C8")
	.dwattr $C$DW$7, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$7, DW_AT_location[DW_OP_regx 0x25]

$C$DW$8	.dwtag  DW_TAG_variable
	.dwattr $C$DW$8, DW_AT_name("$O$K19")
	.dwattr $C$DW$8, DW_AT_TI_symbol_name("$O$K19")
	.dwattr $C$DW$8, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$8, DW_AT_location[DW_OP_reg28]

$C$DW$9	.dwtag  DW_TAG_variable
	.dwattr $C$DW$9, DW_AT_name("$O$K23")
	.dwattr $C$DW$9, DW_AT_TI_symbol_name("$O$K23")
	.dwattr $C$DW$9, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$9, DW_AT_location[DW_OP_reg16]

$C$DW$10	.dwtag  DW_TAG_variable
	.dwattr $C$DW$10, DW_AT_name("$O$K42")
	.dwattr $C$DW$10, DW_AT_TI_symbol_name("$O$K42")
	.dwattr $C$DW$10, DW_AT_type(*$C$DW$T$11)
	.dwattr $C$DW$10, DW_AT_location[DW_OP_regx 0x41]

$C$DW$11	.dwtag  DW_TAG_variable
	.dwattr $C$DW$11, DW_AT_name("$O$K29")
	.dwattr $C$DW$11, DW_AT_TI_symbol_name("$O$K29")
	.dwattr $C$DW$11, DW_AT_type(*$C$DW$T$16)
	.dwattr $C$DW$11, DW_AT_location[DW_OP_reg20]

$C$DW$12	.dwtag  DW_TAG_variable
	.dwattr $C$DW$12, DW_AT_name("$O$U134")
	.dwattr $C$DW$12, DW_AT_TI_symbol_name("$O$U134")
	.dwattr $C$DW$12, DW_AT_type(*$C$DW$T$28)
	.dwattr $C$DW$12, DW_AT_location[DW_OP_regx 0x2e]

$C$DW$13	.dwtag  DW_TAG_variable
	.dwattr $C$DW$13, DW_AT_name("$O$U146")
	.dwattr $C$DW$13, DW_AT_TI_symbol_name("$O$U146")
	.dwattr $C$DW$13, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$13, DW_AT_location[DW_OP_regx 0x40]

$C$DW$14	.dwtag  DW_TAG_variable
	.dwattr $C$DW$14, DW_AT_name("$O$U133")
	.dwattr $C$DW$14, DW_AT_TI_symbol_name("$O$U133")
	.dwattr $C$DW$14, DW_AT_type(*$C$DW$T$11)
	.dwattr $C$DW$14, DW_AT_location[DW_OP_regx 0x2d]

$C$DW$15	.dwtag  DW_TAG_variable
	.dwattr $C$DW$15, DW_AT_name("$O$U111")
	.dwattr $C$DW$15, DW_AT_TI_symbol_name("$O$U111")
	.dwattr $C$DW$15, DW_AT_type(*$C$DW$T$28)
	.dwattr $C$DW$15, DW_AT_location[DW_OP_regx 0x2c]

$C$DW$16	.dwtag  DW_TAG_variable
	.dwattr $C$DW$16, DW_AT_name("$O$U123")
	.dwattr $C$DW$16, DW_AT_TI_symbol_name("$O$U123")
	.dwattr $C$DW$16, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$16, DW_AT_location[DW_OP_regx 0x3f]

$C$DW$17	.dwtag  DW_TAG_variable
	.dwattr $C$DW$17, DW_AT_name("$O$U109")
	.dwattr $C$DW$17, DW_AT_TI_symbol_name("$O$U109")
	.dwattr $C$DW$17, DW_AT_type(*$C$DW$T$11)
	.dwattr $C$DW$17, DW_AT_location[DW_OP_regx 0x2b]

$C$DW$18	.dwtag  DW_TAG_variable
	.dwattr $C$DW$18, DW_AT_name("$O$U86")
	.dwattr $C$DW$18, DW_AT_TI_symbol_name("$O$U86")
	.dwattr $C$DW$18, DW_AT_type(*$C$DW$T$28)
	.dwattr $C$DW$18, DW_AT_location[DW_OP_regx 0x2a]

$C$DW$19	.dwtag  DW_TAG_variable
	.dwattr $C$DW$19, DW_AT_name("$O$U98")
	.dwattr $C$DW$19, DW_AT_TI_symbol_name("$O$U98")
	.dwattr $C$DW$19, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$19, DW_AT_location[DW_OP_reg24]

$C$DW$20	.dwtag  DW_TAG_variable
	.dwattr $C$DW$20, DW_AT_name("$O$U84")
	.dwattr $C$DW$20, DW_AT_TI_symbol_name("$O$U84")
	.dwattr $C$DW$20, DW_AT_type(*$C$DW$T$11)
	.dwattr $C$DW$20, DW_AT_location[DW_OP_regx 0x29]

$C$DW$21	.dwtag  DW_TAG_variable
	.dwattr $C$DW$21, DW_AT_name("$O$U60")
	.dwattr $C$DW$21, DW_AT_TI_symbol_name("$O$U60")
	.dwattr $C$DW$21, DW_AT_type(*$C$DW$T$28)
	.dwattr $C$DW$21, DW_AT_location[DW_OP_regx 0x28]

$C$DW$22	.dwtag  DW_TAG_variable
	.dwattr $C$DW$22, DW_AT_name("$O$U72")
	.dwattr $C$DW$22, DW_AT_TI_symbol_name("$O$U72")
	.dwattr $C$DW$22, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$22, DW_AT_location[DW_OP_regx 0x3d]

$C$DW$23	.dwtag  DW_TAG_variable
	.dwattr $C$DW$23, DW_AT_name("$O$U58")
	.dwattr $C$DW$23, DW_AT_TI_symbol_name("$O$U58")
	.dwattr $C$DW$23, DW_AT_type(*$C$DW$T$11)
	.dwattr $C$DW$23, DW_AT_location[DW_OP_regx 0x27]

$C$DW$24	.dwtag  DW_TAG_variable
	.dwattr $C$DW$24, DW_AT_name("$O$U34")
	.dwattr $C$DW$24, DW_AT_TI_symbol_name("$O$U34")
	.dwattr $C$DW$24, DW_AT_type(*$C$DW$T$28)
	.dwattr $C$DW$24, DW_AT_location[DW_OP_regx 0x26]

$C$DW$25	.dwtag  DW_TAG_variable
	.dwattr $C$DW$25, DW_AT_name("$O$U46")
	.dwattr $C$DW$25, DW_AT_TI_symbol_name("$O$U46")
	.dwattr $C$DW$25, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$25, DW_AT_location[DW_OP_regx 0x37]

$C$DW$26	.dwtag  DW_TAG_variable
	.dwattr $C$DW$26, DW_AT_name("$O$U31")
	.dwattr $C$DW$26, DW_AT_TI_symbol_name("$O$U31")
	.dwattr $C$DW$26, DW_AT_type(*$C$DW$T$11)
	.dwattr $C$DW$26, DW_AT_location[DW_OP_regx 0x38]

$C$DW$27	.dwtag  DW_TAG_variable
	.dwattr $C$DW$27, DW_AT_name("$O$U167")
	.dwattr $C$DW$27, DW_AT_TI_symbol_name("$O$U167")
	.dwattr $C$DW$27, DW_AT_type(*$C$DW$T$29)
	.dwattr $C$DW$27, DW_AT_location[DW_OP_reg19]

$C$DW$28	.dwtag  DW_TAG_variable
	.dwattr $C$DW$28, DW_AT_name("$O$K170")
	.dwattr $C$DW$28, DW_AT_TI_symbol_name("$O$K170")
	.dwattr $C$DW$28, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$28, DW_AT_location[DW_OP_regx 0x30]

$C$DW$29	.dwtag  DW_TAG_variable
	.dwattr $C$DW$29, DW_AT_name("$O$K7")
	.dwattr $C$DW$29, DW_AT_TI_symbol_name("$O$K7")
	.dwattr $C$DW$29, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$29, DW_AT_location[DW_OP_reg1]

$C$DW$30	.dwtag  DW_TAG_variable
	.dwattr $C$DW$30, DW_AT_name("$O$U164")
	.dwattr $C$DW$30, DW_AT_TI_symbol_name("$O$U164")
	.dwattr $C$DW$30, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$30, DW_AT_location[DW_OP_reg27]

$C$DW$31	.dwtag  DW_TAG_variable
	.dwattr $C$DW$31, DW_AT_name("$O$U24")
	.dwattr $C$DW$31, DW_AT_TI_symbol_name("$O$U24")
	.dwattr $C$DW$31, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$31, DW_AT_location[DW_OP_regx 0x31]

$C$DW$32	.dwtag  DW_TAG_variable
	.dwattr $C$DW$32, DW_AT_name("$O$L1")
	.dwattr $C$DW$32, DW_AT_TI_symbol_name("$O$L1")
	.dwattr $C$DW$32, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$32, DW_AT_location[DW_OP_reg1]

$C$DW$33	.dwtag  DW_TAG_variable
	.dwattr $C$DW$33, DW_AT_name("$O$L2")
	.dwattr $C$DW$33, DW_AT_TI_symbol_name("$O$L2")
	.dwattr $C$DW$33, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$33, DW_AT_location[DW_OP_reg17]

$C$DW$34	.dwtag  DW_TAG_variable
	.dwattr $C$DW$34, DW_AT_name("$O$L3")
	.dwattr $C$DW$34, DW_AT_TI_symbol_name("$O$L3")
	.dwattr $C$DW$34, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$34, DW_AT_location[DW_OP_reg26]

$C$DW$35	.dwtag  DW_TAG_variable
	.dwattr $C$DW$35, DW_AT_name("R")
	.dwattr $C$DW$35, DW_AT_TI_symbol_name("R")
	.dwattr $C$DW$35, DW_AT_type(*$C$DW$T$33)
	.dwattr $C$DW$35, DW_AT_location[DW_OP_reg18]

$C$DW$36	.dwtag  DW_TAG_variable
	.dwattr $C$DW$36, DW_AT_name("L")
	.dwattr $C$DW$36, DW_AT_TI_symbol_name("L")
	.dwattr $C$DW$36, DW_AT_type(*$C$DW$T$33)
	.dwattr $C$DW$36, DW_AT_location[DW_OP_reg2]

$C$DW$37	.dwtag  DW_TAG_variable
	.dwattr $C$DW$37, DW_AT_name("Disparity_Map")
	.dwattr $C$DW$37, DW_AT_TI_symbol_name("Disparity_Map")
	.dwattr $C$DW$37, DW_AT_type(*$C$DW$T$30)
	.dwattr $C$DW$37, DW_AT_location[DW_OP_regx 0x2f]

$C$DW$38	.dwtag  DW_TAG_variable
	.dwattr $C$DW$38, DW_AT_name("Search_Range")
	.dwattr $C$DW$38, DW_AT_TI_symbol_name("Search_Range")
	.dwattr $C$DW$38, DW_AT_type(*$C$DW$T$31)
	.dwattr $C$DW$38, DW_AT_location[DW_OP_reg26]

$C$DW$39	.dwtag  DW_TAG_variable
	.dwattr $C$DW$39, DW_AT_name("Radius")
	.dwattr $C$DW$39, DW_AT_TI_symbol_name("Radius")
	.dwattr $C$DW$39, DW_AT_type(*$C$DW$T$31)
	.dwattr $C$DW$39, DW_AT_location[DW_OP_reg29]

$C$DW$40	.dwtag  DW_TAG_variable
	.dwattr $C$DW$40, DW_AT_name("j")
	.dwattr $C$DW$40, DW_AT_TI_symbol_name("j")
	.dwattr $C$DW$40, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$40, DW_AT_location[DW_OP_reg0]

$C$DW$41	.dwtag  DW_TAG_variable
	.dwattr $C$DW$41, DW_AT_name("k")
	.dwattr $C$DW$41, DW_AT_TI_symbol_name("k")
	.dwattr $C$DW$41, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$41, DW_AT_location[DW_OP_reg9]

$C$DW$42	.dwtag  DW_TAG_variable
	.dwattr $C$DW$42, DW_AT_name("Distance")
	.dwattr $C$DW$42, DW_AT_TI_symbol_name("Distance")
	.dwattr $C$DW$42, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$42, DW_AT_location[DW_OP_reg7]

$C$DW$43	.dwtag  DW_TAG_variable
	.dwattr $C$DW$43, DW_AT_name("Minimize")
	.dwattr $C$DW$43, DW_AT_TI_symbol_name("Minimize")
	.dwattr $C$DW$43, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$43, DW_AT_location[DW_OP_reg28]

$C$DW$44	.dwtag  DW_TAG_variable
	.dwattr $C$DW$44, DW_AT_name("Sum")
	.dwattr $C$DW$44, DW_AT_TI_symbol_name("Sum")
	.dwattr $C$DW$44, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$44, DW_AT_location[DW_OP_regx 0x43]

	.dwcfi	cfa_offset, 0
;          EXCLUSIVE CPU CYCLES: 8
;** 9	-----------------------    Disparity_Map = Disparity_Map;
;** 12	-----------------------    if ( (K$7 = Radius*2) > 222 ) goto g11;
;**  	-----------------------    K$19 = 100000;
;**  	-----------------------    U$164 = _lo(_mpyli(280, Radius));
;**  	-----------------------    K$170 = (K$23 = 280)-K$7;
;**  	-----------------------    L$1 = 223-K$7;
;**  	-----------------------    U$24 = 0;
;**  	-----------------------    #pragma MUST_ITERATE(1, 2147483647, 1)
;**  	-----------------------    #pragma LOOP_FLAGS(4096u)

           MV      .L1     A4,A2             ; [A_L66] |9| 
||         MVK     .S1     222,A4            ; [A_S66] |12| 
||         ADD     .D1     A8,A8,A1          ; [A_D64P] |12| 
||         STW     .D2T2   B11,*SP++(-8)     ; [B_D64P] |9| 
||         MVK     .S2     24,B0             ; [B_Sb66] 
||         MV      .L2     B4,B2             ; [B_L66] |9| 
	.dwcfi	cfa_offset, 8
	.dwcfi	save_reg_to_mem, 27, 0

           CMPGT   .L1     A1,A4,A0          ; [A_L66] |12| 
||         STDW    .D2T2   B13:B12,*SP++(-8) ; [B_D64P] |9| 
||         SET     .S2     B0,8,8,B0         ; [B_Sb66] 
||         MV      .L2X    A8,B13            ; [B_L66] |9| 
||         MVK     .S1     223,A3            ; [A_S66] 
||         ZERO    .D1     A28               ; [A_D64P] 
	.dwcfi	cfa_offset, 16
	.dwcfi	save_reg_to_mem, 29, -4
	.dwcfi	save_reg_to_mem, 28, -8

   [ A0]   BNOP            $C$L7,1           ; [] |12| 
||         MPYLI   .M2     B0,B13,B9:B8      ; [B_M66] 
||         MVKL    .S2     0x186a0,B12       ; [B_Sb66] 
||         STW     .D2T2   B10,*SP++(-8)     ; [B_D64P] |9| 
||         MV      .L2     B6,B10            ; [B_L66] |9| 
||         MV      .L1X    B3,A29            ; [A_L66] |9| 
||         MV      .D1     A6,A26            ; [A_D64P] |9| 

	.dwcfi	cfa_offset, 24
	.dwcfi	save_reg_to_mem, 26, -16
	.dwcfi	save_reg_to_reg, 19, 50
           SUB     .L1X    B0,A1,A27         ; [A_L66] 
           MVKH    .S2     0x186a0,B12       ; [B_Sb66] 
           SUB     .L1     A3,A1,A1          ; [A_L66] 
           MV      .L2     B8,B11            ; [B_L66] 
	.dwpsn	file "../stereo_vision_c.c",line 12,column 14,is_stmt,isa 0
           ; BRANCHCC OCCURS {$C$L7}         ; [] |12| 
;** --------------------------------------------------------------------------*
;          EXCLUSIVE CPU CYCLES: 3
	.dwpsn	file "../stereo_vision_c.c",line 14,column 14,is_stmt,isa 0

           ZERO    .L1     A0                ; [A_L66] |14| 
||         ADD     .L2     B11,B13,B0        ; [B_L66] 
||         ZERO    .D1     A7                ; [A_D64P] |16| 
||         MVK     .S1     105,A30           ; [A_S66] 
||         MV      .S2X    A27,B1            ; [B_Sb66] 

	.dwpsn	file "../stereo_vision_c.c",line 18,column 22,is_stmt,isa 0

           ADD     .L1     A0,A28,A16        ; [A_L66] 
||         ADD     .S2X    A26,B0,B3         ; [B_Sb66] 
||         CMPGT   .L2     B10,0,B0          ; [B_L66] |18| 

   [ B0]   ADD     .L1     A2,A16,A9         ; [A_L66] 
;** --------------------------------------------------------------------------*
;**   BEGIN LOOP $C$L1
;** --------------------------------------------------------------------------*
$C$L1:    
;**	-----------------------g3:
;**  	-----------------------    U$167 = &Disparity_Map[Radius+U$164];
;** 16	-----------------------    L$2 = K$170;
;** 14	-----------------------    j = 0;
;**  	-----------------------    #pragma MUST_ITERATE(56, 2147483646, 2)
;**  	-----------------------    #pragma LOOP_FLAGS(4096u)
;** --------------------------------------------------------------------------*
;**   BEGIN LOOP $C$L2
;** --------------------------------------------------------------------------*
$C$L2:    
;          EXCLUSIVE CPU CYCLES: 6
;**	-----------------------g4:
;** 16	-----------------------    Distance = 0;
;** 18	-----------------------    if ( Search_Range <= 0 ) goto g9;

   [ B0]   LDNDW   .D1T2   *+A16(A2),B17:B16 ; [A_D64P] 
|| [!B0]   B       .S1     $C$L6             ; [A_S66] |18| 
|| [ B0]   ADD     .L1     A2,A16,A31        ; [A_L66] 
|| [ B0]   SUB     .L2     B10,1,B4          ; [B_L66] 
|| [ B0]   MVK     .S2     255,B5            ; [B_Sb66] 

   [ B0]   MVK     .S1     140,A8            ; [A_S66] 
|| [ B0]   LDNDW   .D1T2   *+A31[A30],B9:B8  ; [A_D64P] 
|| [ B0]   MVC     .S2     B4,ILC            ; [B_Sb66] 
|| [ B0]   MVK     .L2     -1,B4             ; [B_L66] 
|| [ B0]   ADD     .L1X    B2,A16,A19        ; [A_L66] 

   [ B0]   LDNDW   .D1T2   *+A9[A8],B19:B18  ; [A_D64P] 
|| [ B0]   MVK     .S1     35,A9             ; [A_S66] 
|| [ B0]   ADD     .L1     A2,A16,A8         ; [A_L66] 

   [ B0]   MVK     .S1     70,A8             ; [A_S66] 
|| [ B0]   LDNDW   .D1T2   *+A8[A9],B7:B6    ; [A_D64P] 

   [ B0]   ADD     .L1     A2,A16,A9         ; [A_L66] 

           AND     .L2     B5:B4,B17:B16,B21:B20 ; [B_L66] 
|| [ B0]   LDNDW   .D1T2   *+A9[A8],B17:B16  ; [A_D64P] 
|| [ B0]   ADD     .S2X    B2,A16,B0         ; [B_Sb66] 

           ; BRANCHCC OCCURS {$C$L6}         ; [] |18| 
;** --------------------------------------------------------------------------*
;          EXCLUSIVE CPU CYCLES: 3
;** 17	-----------------------    Minimize = K$19;
;**  	-----------------------    C$8 = U$24+j;
;**  	-----------------------    C$12 = _mem8(C$8+L+1120)&(K$29 = 1099511627775LL);
;**  	-----------------------    U$31 = _hill(C$12);
;**  	-----------------------    U$34 = &R[C$8+1120];
;**  	-----------------------    K$42 = 0x1010101u;
;**  	-----------------------    U$46 = _loll(C$12);
;**  	-----------------------    C$11 = _mem8(C$8+L+840)&K$29;
;**  	-----------------------    U$58 = _hill(C$11);
;**  	-----------------------    U$60 = &R[C$8+840];
;**  	-----------------------    U$72 = _loll(C$11);
;**  	-----------------------    C$10 = _mem8(C$8+L+560)&K$29;
;**  	-----------------------    U$84 = _hill(C$10);
;**  	-----------------------    U$86 = &R[C$8+560];
;**  	-----------------------    U$98 = _loll(C$10);
;**  	-----------------------    C$9 = _mem8(C$8+L+280)&K$29;
;**  	-----------------------    U$109 = _hill(C$9);
;**  	-----------------------    U$111 = &R[C$8+280];
;**  	-----------------------    U$123 = _loll(C$9);
;**  	-----------------------    C$7 = _mem8(C$8+L)&K$29;
;**  	-----------------------    U$133 = _hill(C$7);
;**  	-----------------------    U$134 = &R[C$8];
;**  	-----------------------    U$146 = _loll(C$7);
;** 22	-----------------------    L$3 = Search_Range;
;** 18	-----------------------    k = 0;
;**  	-----------------------    #pragma MUST_ITERATE(1, 2147483647, 1)
;**  	-----------------------    #pragma LOOP_FLAGS(4096u)
;**	-----------------------g6:
;** 34	-----------------------    C$6 = _mem8(U$134)&K$29;
;** 34	-----------------------    C$5 = _mem8(U$111)&K$29;
;** 34	-----------------------    C$4 = _mem8(U$86)&K$29;
;** 34	-----------------------    C$3 = _mem8(U$60)&K$29;
;** 34	-----------------------    C$2 = _mem8(U$34)&K$29;
;** 34	-----------------------    Sum = _abs((int)(U$31-_hill(C$2)))+(int)_dotpu4((unsigned)_subabs4(U$46, (int)_loll(C$2)), K$42)+_abs((int)(U$58-_hill(C$3)))+(int)_dotpu4((unsigned)_subabs4(U$72, (int)_loll(C$3)), K$42)+_abs((int)(U$84-_hill(C$4)))+(int)_dotpu4((unsigned)_subabs4(U$98, (int)_loll(C$4)), K$42)+_abs((int)(U$109-_hill(C$5)))+(int)_dotpu4((unsigned)_subabs4(U$123, (int)_loll(C$5)), K$42)+_abs((int)(U$133-_hill(C$6)))+(int)_dotpu4((unsigned)_subabs4(U$146, (int)_loll(C$6)), K$42);
;** 42	-----------------------    if ( !((j >= k)&(Sum < Minimize)) ) goto g8;
;** 42	-----------------------    Minimize = Sum;
;** 43	-----------------------    Distance = k;
;**	-----------------------g8:
;** 18	-----------------------    --U$34;
;** 18	-----------------------    --U$60;
;** 18	-----------------------    --U$86;
;** 18	-----------------------    --U$111;
;** 18	-----------------------    --U$134;
;** 18	-----------------------    ++k;
;** 18	-----------------------    if ( L$3 = L$3-1 ) goto g6;
           ADDK    .S2     280,B0            ; [B_Sb66] 
           ADD     .L1X    B2,A16,A17        ; [A_L66] 
           AND     .L2     B5:B4,B7:B6,B27:B26 ; [B_L66] 
;*----------------------------------------------------------------------------*
;*   SOFTWARE PIPELINE INFORMATION
;*
;*      Loop found in file               : ../stereo_vision_c.c
;*      Loop source line                 : 18
;*      Loop opening brace source line   : 19
;*      Loop closing brace source line   : 44
;*      Known Minimum Trip Count         : 1                    
;*      Known Max Trip Count Factor      : 1
;*      Loop Carried Dependency Bound(^) : 4
;*      Unpartitioned Resource Bound     : 7
;*      Partitioned Resource Bound(*)    : 7
;*      Resource Partition:
;*                                A-side   B-side
;*      .L units                     6        6     
;*      .S units                     0        0     
;*      .D units                     5        0     
;*      .M units                     0        5     
;*      .X cross paths               0        0     
;*      .T address paths             5        5     
;*      Logical  ops (.LS)           0        5     (.L or .S unit)
;*      Addition ops (.LSD)          9       10     (.L or .S or .D unit)
;*      Bound(.L .S .LS)             3        6     
;*      Bound(.L .S .D .LS .LSD)     7*       7*    
;*
;*      Searching for software pipeline schedule at ...
;*         ii = 7  Schedule found with 4 iterations in parallel
;*
;*      Register Usage Table:
;*          +-----------------------------------------------------------------+
;*          |AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA|BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB|
;*          |00000000001111111111222222222233|00000000001111111111222222222233|
;*          |01234567890123456789012345678901|01234567890123456789012345678901|
;*          |--------------------------------+--------------------------------|
;*       0: |   ** ****      **********      |    ******      * *********** **|
;*       1: |   * *****      **********      |    ******      * ************* |
;*       2: |   **** **      **********      |    ******      ****************|
;*       3: |*  *** ***      **********      |*   ******      ****************|
;*       4: |*  *** ***      **********      |    ******      ****************|
;*       5: |*  *******      **********      |    ******      *** ************|
;*       6: |*  *  ****      **********      |    ******        **************|
;*          +-----------------------------------------------------------------+
;*
;*      Done
;*
;*      Loop will be splooped
;*      Collapsed epilog stages       : 0
;*      Collapsed prolog stages       : 0
;*      Minimum required memory pad   : 0 bytes
;*
;*      Minimum safe trip count       : 1
;*      Min. prof. trip count  (est.) : 3
;*
;*      Mem bank conflicts/iter(est.) : { min 0.000, est 0.000, max 0.000 }
;*      Mem bank perf. penalty (est.) : 0.0%
;*
;*
;*      Total cycles (est.)         : 21 + trip_cnt * 7        
;*----------------------------------------------------------------------------*
;*        SINGLE SCHEDULED ITERATION
;*
;*        $C$C78:
;*   0              LDNDW   .D1T2   *A17++(-1),B5:B4  ; [A_D64P] |34| 
;*   1              NOP     1       ; [A_L66] 
;*   2              LDNDW   .D1T2   *A23++(-1),B5:B4  ; [A_D64P] |34| 
;*   3              LDNDW   .D1T2   *A19++(-1),B7:B6  ; [A_D64P] |34| 
;*   4              LDNDW   .D1T2   *A25++(-1),B17:B16 ; [A_D64P] |34| 
;*   5              LDNDW   .D1T2   *A21++(-1),B5:B4  ; [A_D64P] |34| 
;*     ||           AND     .S2     B21:B20,B5:B4,B5:B4 ; [B_Sb66] |34| 
;*   6              SUB     .S2     B22,B5,B7         ; [B_Sb66] |34| 
;*     ||           SUBABS4 .L2     B23,B4,B16        ; [B_L66] |34| 
;*   7              AND     .S2     B21:B20,B5:B4,B5:B4 ; [B_Sb66] |34| 
;*     ||           ABS     .L2     B7,B29            ; [B_L66] |34| 
;*     ||           DOTPU4  .M2     B16,B28,B5        ; [B_M66] |34| 
;*   8              AND     .S2     B21:B20,B7:B6,B7:B6 ; [B_Sb66] |34| 
;*     ||           SUBABS4 .L2     B26,B4,B31        ; [B_L66] |34| 
;*   9              SUBABS4 .L2     B24,B6,B6         ; [B_L66] |34| 
;*     ||           SUB     .S1X    A22,B5,A7         ; [A_S66] |34| 
;*  10              AND     .S2     B21:B20,B5:B4,B7:B6 ; [B_Sb66] |34| 
;*     ||           SUB     .S1X    A18,B7,A5         ; [A_S66] |34| 
;*     ||           DOTPU4  .M2     B6,B28,B30        ; [B_M66] |34| 
;*  11              ADD     .D2     B5,B29,B31        ; [B_D64P] |34| 
;*     ||           ABS     .L1     A5,A6             ; [A_L66] |34| 
;*     ||           SUBABS4 .L2     B25,B6,B29        ; [B_L66] |34| 
;*     ||           DOTPU4  .M2     B31,B28,B8        ; [B_M66] |34| 
;*  12              AND     .L2     B21:B20,B17:B16,B19:B18 ; [B_L66] |34| 
;*  13              SUB     .S1X    A20,B7,A4         ; [A_S66] |34| 
;*     ||           DOTPU4  .M2     B29,B28,B19       ; [B_M66] |34| 
;*  14              ADD     .S1X    A6,B31,A6         ; [A_S66] |34| 
;*     ||           ABS     .L1     A4,A5             ; [A_L66] |34| 
;*  15              ABS     .L1     A7,A4             ; [A_L66] |34| 
;*     ||           SUB     .S1X    A24,B19,A3        ; [A_S66] |34| 
;*  16              ADD     .D2X    B30,A6,B0         ; [B_D64P] |34| 
;*  17              ADD     .D2X    A5,B0,B4          ; [B_D64P] |34| 
;*     ||           ABS     .L1     A3,A3             ; [A_L66] |34| 
;*     ||           SUBABS4 .L2     B27,B18,B18       ; [B_L66] |34| 
;*  18              ADD     .S2     B19,B4,B6         ; [B_Sb66] |34| 
;*  19              ADD     .D2X    A4,B6,B6          ; [B_D64P] |34| 
;*     ||           DOTPU4  .M2     B18,B28,B4        ; [B_M66] |34| 
;*  20              NOP     1       ; [A_L66] 
;*  21              ADD     .D2     B8,B6,B16         ; [B_D64P] |34| 
;*  22              ADD     .D2X    A3,B16,B19        ; [B_D64P] |34| 
;*  23              ADD     .S2     B4,B19,B30        ; [B_Sb66] |34|  ^ 
;*     ||           CMPLT   .L1     A16,A9,A0         ; [A_L66] |42| 
;*  24              NOP     1       ; [A_L66] 
;*  25              MV      .S1X    B30,A5            ; [A_S66] |34|  ^ Define a twin register
;*  26      [!A0]   CMPLT   .L1X    A5,B9,A0          ; [A_L66] |42|  ^ 
;*     ||   [ A0]   ZERO    .S1     A0                ; [A_S66] |42| 
;*  27      [ A0]   MV      .D2     B30,B9            ; [B_D64P] |42|  ^ 
;*     ||   [ A0]   MV      .D1     A9,A8             ; [A_D64P] |43| 
;*     ||           ADD     .L1     1,A9,A9           ; [A_L66] |18| 
;*     ||           SPBR                              $C$C78 ; [] 
;*  28              ; BRANCHCC OCCURS {$C$C78}        ; [] |18| 
;*----------------------------------------------------------------------------*
$C$L3:    ; PIPED LOOP PROLOG
;          EXCLUSIVE CPU CYCLES: 22

           SPLOOPD         7                 ;28 ; [A_L66] (P) 
||         ADDK    .S1     1120,A17          ; [A_S66] 
||         AND     .L2     B5:B4,B19:B18,B19:B18 ; [B_L66] 
||         AND     .S2     B5:B4,B9:B8,B25:B24 ; [B_Sb66] 
||         MV      .D1X    B21,A24           ; [A_D64P] 

;** --------------------------------------------------------------------------*
$C$L4:    ; PIPED LOOP KERNEL
;          EXCLUSIVE CPU CYCLES: 7
	.dwpsn	file "../stereo_vision_c.c",line 34,column 17,is_stmt,isa 0

           SPMASK                            ; [] 
||^        MV      .L1X    B27,A22           ; [A_L66] 
||^        MV      .D2     B20,B27           ; [B_D64P] 
||^        DADD    .L2     0,B5:B4,B21:B20   ; [B_L66] 
||^        AND     .S2     B5:B4,B17:B16,B9:B8 ; [B_Sb66] 
||         LDNDW   .D1T2   *A17++(-1),B5:B4  ; [A_D64P] |34| (P) <0,0> 

           SPMASK                            ; [] 
||^        MV      .L1X    B0,A23            ; [A_L66] 

           SPMASK                            ; [] 
||^        ADD     .L1X    B2,A16,A21        ; [A_L66] 
||^        ADDK    .S1     840,A19           ; [A_S66] 
||         LDNDW   .D1T2   *A23++(-1),B5:B4  ; [A_D64P] |34| (P) <0,2> 

           SPMASK                            ; [] 
||^        MVKL    .S2     0x1010101,B28     ; [B_Sb66] 
||^        ADD     .L1X    A16,B2,A25        ; [A_L66] 
||         LDNDW   .D1T2   *A19++(-1),B7:B6  ; [A_D64P] |34| (P) <0,3> 

           SPMASK                            ; [] 
||^        MVKH    .S2     0x1010101,B28     ; [B_Sb66] 
||^        ADDK    .S1     560,A21           ; [A_S66] 
||         LDNDW   .D1T2   *A25++(-1),B17:B16 ; [A_D64P] |34| (P) <0,4> 

           SPMASK                            ; [] 
||^        MV      .D2     B18,B23           ; [B_D64P] 
||^        MV      .L2     B19,B22           ; [B_L66] 
||         LDNDW   .D1T2   *A21++(-1),B5:B4  ; [A_D64P] |34| (P) <0,5> 
||         AND     .S2     B21:B20,B5:B4,B5:B4 ; [B_Sb66] |34| (P) <0,5> 

           SUB     .S2     B22,B5,B7         ; [B_Sb66] |34| (P) <0,6> 
||         SUBABS4 .L2     B23,B4,B16        ; [B_L66] |34| (P) <0,6> 

           AND     .S2     B21:B20,B5:B4,B5:B4 ; [B_Sb66] |34| (P) <0,7> 
||         ABS     .L2     B7,B29            ; [B_L66] |34| (P) <0,7> 
||         DOTPU4  .M2     B16,B28,B5        ; [B_M66] |34| (P) <0,7> 

           SPMASK                            ; [] 
||^        MV      .S1     A7,A9             ; [A_S66] 
||^        MV      .L1X    B25,A18           ; [A_L66] 
||         SUBABS4 .L2     B26,B4,B31        ; [B_L66] |34| (P) <0,8> 
||         AND     .S2     B21:B20,B7:B6,B7:B6 ; [B_Sb66] |34| (P) <0,8> 

           SPMASK                            ; [] 
||^        MV      .L1     A7,A8             ; [A_L66] 
||         SUB     .S1X    A22,B5,A7         ; [A_S66] |34| (P) <0,9> 
||         SUBABS4 .L2     B24,B6,B6         ; [B_L66] |34| (P) <0,9> 

           SPMASK                            ; [] 
||^        MV      .L2     B8,B25            ; [B_L66] 
||         SUB     .S1X    A18,B7,A5         ; [A_S66] |34| (P) <0,10> 
||         AND     .S2     B21:B20,B5:B4,B7:B6 ; [B_Sb66] |34| (P) <0,10> 
||         DOTPU4  .M2     B6,B28,B30        ; [B_M66] |34| (P) <0,10> 

           DOTPU4  .M2     B31,B28,B8        ; [B_M66] |34| (P) <0,11> 
||         ABS     .L1     A5,A6             ; [A_L66] |34| (P) <0,11> 
||         SUBABS4 .L2     B25,B6,B29        ; [B_L66] |34| (P) <0,11> 
||         ADD     .D2     B5,B29,B31        ; [B_D64P] |34| (P) <0,11> 

           SPMASK                            ; [] 
||^        MV      .L1X    B9,A20            ; [A_L66] 
||         AND     .L2     B21:B20,B17:B16,B19:B18 ; [B_L66] |34| (P) <0,12> 

           SUB     .S1X    A20,B7,A4         ; [A_S66] |34| (P) <0,13> 
||         DOTPU4  .M2     B29,B28,B19       ; [B_M66] |34| (P) <0,13> 

           ADD     .S1X    A6,B31,A6         ; [A_S66] |34| (P) <0,14> 
||         ABS     .L1     A4,A5             ; [A_L66] |34| (P) <0,14> 

           SUB     .S1X    A24,B19,A3        ; [A_S66] |34| (P) <0,15> 
||         ABS     .L1     A7,A4             ; [A_L66] |34| (P) <0,15> 

           ADD     .D2X    B30,A6,B0         ; [B_D64P] |34| (P) <0,16> 

           SUBABS4 .L2     B27,B18,B18       ; [B_L66] |34| (P) <0,17> 
||         ABS     .L1     A3,A3             ; [A_L66] |34| (P) <0,17> 
||         ADD     .D2X    A5,B0,B4          ; [B_D64P] |34| (P) <0,17> 

           ADD     .S2     B19,B4,B6         ; [B_Sb66] |34| (P) <0,18> 

           DOTPU4  .M2     B18,B28,B4        ; [B_M66] |34| (P) <0,19> 
||         ADD     .D2X    A4,B6,B6          ; [B_D64P] |34| (P) <0,19> 

           SPMASK                            ; [] 
||^        MV      .L1     A0,A16            ; [A_L66] 
||^        MV      .D2     B12,B9            ; [B_D64P] 

           ADD     .D2     B8,B6,B16         ; [B_D64P] |34| <0,21> 
           ADD     .D2X    A3,B16,B19        ; [B_D64P] |34| <0,22> 

           ADD     .S2     B4,B19,B30        ; [B_Sb66] |34| <0,23>  ^ 
||         CMPLT   .L1     A16,A9,A0         ; [A_L66] |42| <0,23> 

           NOP             1                 ; [A_L66] 
           MV      .S1X    B30,A5            ; [A_S66] |34| <0,25>  ^ Define a twin register
	.dwpsn	file "../stereo_vision_c.c",line 42,column 17,is_stmt,isa 0

   [ A0]   ZERO    .S1     A0                ; [A_S66] |42| <0,26> 
|| [!A0]   CMPLT   .L1X    A5,B9,A0          ; [A_L66] |42| <0,26>  ^ 

	.dwpsn	file "../stereo_vision_c.c",line 18,column 37,is_stmt,isa 0

           SPKERNEL        2,0               ; [] 
|| [ A0]   MV      .D1     A9,A8             ; [A_D64P] |43| <0,27> 
||         ADD     .L1     1,A9,A9           ; [A_L66] |18| <0,27> 
|| [ A0]   MV      .D2     B30,B9            ; [B_D64P] |42| <0,27>  ^ 

;** --------------------------------------------------------------------------*
$C$L5:    ; PIPED LOOP EPILOG
;          EXCLUSIVE CPU CYCLES: 21
           NOP             6                 ; [A_L66] 
           MV      .S1     A16,A0            ; [A_S66] 
;** --------------------------------------------------------------------------*
;          EXCLUSIVE CPU CYCLES: 1
           MV      .L1     A8,A7             ; [A_L66] 
;** --------------------------------------------------------------------------*
$C$L6:    
;          EXCLUSIVE CPU CYCLES: 7
;**	-----------------------g9:
;** 45	-----------------------    *U$167++ = Distance;
;** 14	-----------------------    ++j;
;** 14	-----------------------    if ( L$2 = L$2-1 ) goto g4;
;** 12	-----------------------    U$24 += 280;
	.dwpsn	file "../stereo_vision_c.c",line 14,column 18,is_stmt,isa 0

           SUB     .S2     B1,1,B1           ; [B_Sb66] |14| 
||         ADD     .L1     1,A0,A0           ; [A_L66] |14| 
||         CMPGT   .L2     B10,0,B0          ; [B_L66] |18| 
||         STB     .D2T1   A7,*B3++(1)       ; [B_D64P] |45| 

	.dwpsn	file "../stereo_vision_c.c",line 12,column 14,is_stmt,isa 0

   [ B1]   BNOP            $C$L2,3           ; [] |14| 
||         ADD     .L1     A0,A28,A16        ; [A_L66] 
|| [!B1]   SUB     .D1     A1,1,A1           ; [A_D64P] |12| 

	.dwpsn	file "../stereo_vision_c.c",line 16,column 25,is_stmt,isa 0
   [ B1]   ZERO    .L1     A7                ; [A_L66] |16| 
   [ B0]   ADD     .L1     A2,A16,A9         ; [A_L66] 
	.dwpsn	file "../stereo_vision_c.c",line 14,column 18,is_stmt,isa 0
           ; BRANCHCC OCCURS {$C$L2}         ; [] |14| 
;** --------------------------------------------------------------------------*
;          EXCLUSIVE CPU CYCLES: 6
;** 12	-----------------------    U$164 += 280;
;** 12	-----------------------    if ( L$1 = L$1-1 ) goto g3;
;**	-----------------------g11:
;**  	-----------------------    return;
	.dwpsn	file "../stereo_vision_c.c",line 12,column 14,is_stmt,isa 0

   [ A1]   B       .S2     $C$L1             ; [B_Sb66] |12| 
||         ADDK    .S1     280,A28           ; [A_S66] |12| 
|| [ A1]   ZERO    .L1     A0                ; [A_L66] |14| 
|| [ A1]   MV      .L2X    A27,B1            ; [B_L66] 
|| [ A1]   ZERO    .D1     A7                ; [A_D64P] |16| 

           ADDK    .S2     280,B11           ; [B_Sb66] |12| 
|| [ A1]   ADD     .L1     A0,A28,A16        ; [A_L66] 

   [ A1]   ADD     .L2     B11,B13,B0        ; [B_L66] 
   [ A1]   ADD     .L2X    A26,B0,B3         ; [B_L66] 
	.dwpsn	file "../stereo_vision_c.c",line 18,column 22,is_stmt,isa 0
   [ A1]   CMPGT   .L2     B10,0,B0          ; [B_L66] |18| 
   [ B0]   ADD     .L1     A2,A16,A9         ; [A_L66] 
	.dwpsn	file "../stereo_vision_c.c",line 12,column 14,is_stmt,isa 0
           ; BRANCHCC OCCURS {$C$L1}         ; [] |12| 
;** --------------------------------------------------------------------------*
$C$L7:    
;          EXCLUSIVE CPU CYCLES: 7
           LDW     .D2T2   *++SP(8),B10      ; [B_D64P] 
	.dwcfi	cfa_offset, 16
	.dwcfi	restore_reg, 26
	.dwpsn	file "../stereo_vision_c.c",line 48,column 1,is_stmt,isa 0
$C$DW$45	.dwtag  DW_TAG_TI_branch
	.dwattr $C$DW$45, DW_AT_low_pc(0x04)
	.dwattr $C$DW$45, DW_AT_TI_return


           LDDW    .D2T2   *++SP(8),B13:B12  ; [B_D64P] 
||         RET     .S2     A29               ; [B_Sb66] |48| 

	.dwcfi	cfa_offset, 8
	.dwcfi	restore_reg, 29
	.dwcfi	restore_reg, 28
           LDW     .D2T2   *++SP(8),B11      ; [B_D64P] |48| 
	.dwcfi	cfa_offset, 0
	.dwcfi	restore_reg, 27
           NOP             4                 ; [A_L66] 
           ; BRANCH OCCURS {A29}             ; [] |48| 
	.dwattr $C$DW$1, DW_AT_TI_end_file("../stereo_vision_c.c")
	.dwattr $C$DW$1, DW_AT_TI_end_line(0x30)
	.dwattr $C$DW$1, DW_AT_TI_end_column(0x01)
	.dwendentry
	.dwendtag $C$DW$1


;******************************************************************************
;* BUILD ATTRIBUTES                                                           *
;******************************************************************************
	.battr "TI", Tag_File, 1, Tag_Long_Precision_Bits(2)
	.battr "TI", Tag_File, 1, Tag_Bitfield_layout(2)
	.battr "TI", Tag_File, 1, Tag_ABI_enum_size(3)
	.battr "c6xabi", Tag_File, 1, Tag_ABI_wchar_t(1)
	.battr "c6xabi", Tag_File, 1, Tag_ABI_array_object_alignment(0)
	.battr "c6xabi", Tag_File, 1, Tag_ABI_array_object_align_expected(0)
	.battr "c6xabi", Tag_File, 1, Tag_ABI_PIC(0)
	.battr "c6xabi", Tag_File, 1, Tag_ABI_PID(0)
	.battr "c6xabi", Tag_File, 1, Tag_ABI_DSBT(0)
	.battr "c6xabi", Tag_File, 1, Tag_ABI_stack_align_needed(0)
	.battr "c6xabi", Tag_File, 1, Tag_ABI_stack_align_preserved(0)
	.battr "TI", Tag_File, 1, Tag_Tramps_Use_SOC(1)

;******************************************************************************
;* TYPE INFORMATION                                                           *
;******************************************************************************
$C$DW$T$2	.dwtag  DW_TAG_unspecified_type
	.dwattr $C$DW$T$2, DW_AT_name("void")

$C$DW$T$4	.dwtag  DW_TAG_base_type
	.dwattr $C$DW$T$4, DW_AT_encoding(DW_ATE_boolean)
	.dwattr $C$DW$T$4, DW_AT_name("bool")
	.dwattr $C$DW$T$4, DW_AT_byte_size(0x01)

$C$DW$T$5	.dwtag  DW_TAG_base_type
	.dwattr $C$DW$T$5, DW_AT_encoding(DW_ATE_signed_char)
	.dwattr $C$DW$T$5, DW_AT_name("signed char")
	.dwattr $C$DW$T$5, DW_AT_byte_size(0x01)

$C$DW$T$6	.dwtag  DW_TAG_base_type
	.dwattr $C$DW$T$6, DW_AT_encoding(DW_ATE_unsigned_char)
	.dwattr $C$DW$T$6, DW_AT_name("unsigned char")
	.dwattr $C$DW$T$6, DW_AT_byte_size(0x01)

$C$DW$T$27	.dwtag  DW_TAG_const_type
	.dwattr $C$DW$T$27, DW_AT_type(*$C$DW$T$6)

$C$DW$T$28	.dwtag  DW_TAG_pointer_type
	.dwattr $C$DW$T$28, DW_AT_type(*$C$DW$T$27)
	.dwattr $C$DW$T$28, DW_AT_address_class(0x20)

$C$DW$T$33	.dwtag  DW_TAG_const_type
	.dwattr $C$DW$T$33, DW_AT_type(*$C$DW$T$28)

$C$DW$T$29	.dwtag  DW_TAG_pointer_type
	.dwattr $C$DW$T$29, DW_AT_type(*$C$DW$T$6)
	.dwattr $C$DW$T$29, DW_AT_address_class(0x20)

$C$DW$T$30	.dwtag  DW_TAG_restrict_type
	.dwattr $C$DW$T$30, DW_AT_type(*$C$DW$T$29)

$C$DW$T$7	.dwtag  DW_TAG_base_type
	.dwattr $C$DW$T$7, DW_AT_encoding(DW_ATE_signed_char)
	.dwattr $C$DW$T$7, DW_AT_name("wchar_t")
	.dwattr $C$DW$T$7, DW_AT_byte_size(0x02)

$C$DW$T$8	.dwtag  DW_TAG_base_type
	.dwattr $C$DW$T$8, DW_AT_encoding(DW_ATE_signed)
	.dwattr $C$DW$T$8, DW_AT_name("short")
	.dwattr $C$DW$T$8, DW_AT_byte_size(0x02)

$C$DW$T$9	.dwtag  DW_TAG_base_type
	.dwattr $C$DW$T$9, DW_AT_encoding(DW_ATE_unsigned)
	.dwattr $C$DW$T$9, DW_AT_name("unsigned short")
	.dwattr $C$DW$T$9, DW_AT_byte_size(0x02)

$C$DW$T$10	.dwtag  DW_TAG_base_type
	.dwattr $C$DW$T$10, DW_AT_encoding(DW_ATE_signed)
	.dwattr $C$DW$T$10, DW_AT_name("int")
	.dwattr $C$DW$T$10, DW_AT_byte_size(0x04)

$C$DW$T$31	.dwtag  DW_TAG_const_type
	.dwattr $C$DW$T$31, DW_AT_type(*$C$DW$T$10)

$C$DW$T$11	.dwtag  DW_TAG_base_type
	.dwattr $C$DW$T$11, DW_AT_encoding(DW_ATE_unsigned)
	.dwattr $C$DW$T$11, DW_AT_name("unsigned int")
	.dwattr $C$DW$T$11, DW_AT_byte_size(0x04)

$C$DW$T$12	.dwtag  DW_TAG_base_type
	.dwattr $C$DW$T$12, DW_AT_encoding(DW_ATE_signed)
	.dwattr $C$DW$T$12, DW_AT_name("__int40_t")
	.dwattr $C$DW$T$12, DW_AT_byte_size(0x08)
	.dwattr $C$DW$T$12, DW_AT_bit_size(0x28)
	.dwattr $C$DW$T$12, DW_AT_bit_offset(0x18)

$C$DW$T$13	.dwtag  DW_TAG_base_type
	.dwattr $C$DW$T$13, DW_AT_encoding(DW_ATE_unsigned)
	.dwattr $C$DW$T$13, DW_AT_name("unsigned __int40_t")
	.dwattr $C$DW$T$13, DW_AT_byte_size(0x08)
	.dwattr $C$DW$T$13, DW_AT_bit_size(0x28)
	.dwattr $C$DW$T$13, DW_AT_bit_offset(0x18)

$C$DW$T$14	.dwtag  DW_TAG_base_type
	.dwattr $C$DW$T$14, DW_AT_encoding(DW_ATE_signed)
	.dwattr $C$DW$T$14, DW_AT_name("long")
	.dwattr $C$DW$T$14, DW_AT_byte_size(0x04)

$C$DW$T$15	.dwtag  DW_TAG_base_type
	.dwattr $C$DW$T$15, DW_AT_encoding(DW_ATE_unsigned)
	.dwattr $C$DW$T$15, DW_AT_name("unsigned long")
	.dwattr $C$DW$T$15, DW_AT_byte_size(0x04)

$C$DW$T$16	.dwtag  DW_TAG_base_type
	.dwattr $C$DW$T$16, DW_AT_encoding(DW_ATE_signed)
	.dwattr $C$DW$T$16, DW_AT_name("long long")
	.dwattr $C$DW$T$16, DW_AT_byte_size(0x08)

$C$DW$T$36	.dwtag  DW_TAG_const_type
	.dwattr $C$DW$T$36, DW_AT_type(*$C$DW$T$16)

$C$DW$T$38	.dwtag  DW_TAG_typedef
	.dwattr $C$DW$T$38, DW_AT_name("cll")
	.dwattr $C$DW$T$38, DW_AT_type(*$C$DW$T$36)
	.dwattr $C$DW$T$38, DW_AT_language(DW_LANG_C)
	.dwattr $C$DW$T$38, DW_AT_decl_file("../stereo_vision_c.c")
	.dwattr $C$DW$T$38, DW_AT_decl_line(0x05)
	.dwattr $C$DW$T$38, DW_AT_decl_column(0x19)

$C$DW$T$39	.dwtag  DW_TAG_typedef
	.dwattr $C$DW$T$39, DW_AT_name("ll")
	.dwattr $C$DW$T$39, DW_AT_type(*$C$DW$T$16)
	.dwattr $C$DW$T$39, DW_AT_language(DW_LANG_C)
	.dwattr $C$DW$T$39, DW_AT_decl_file("../stereo_vision_c.c")
	.dwattr $C$DW$T$39, DW_AT_decl_line(0x04)
	.dwattr $C$DW$T$39, DW_AT_decl_column(0x13)

$C$DW$T$17	.dwtag  DW_TAG_base_type
	.dwattr $C$DW$T$17, DW_AT_encoding(DW_ATE_unsigned)
	.dwattr $C$DW$T$17, DW_AT_name("unsigned long long")
	.dwattr $C$DW$T$17, DW_AT_byte_size(0x08)

$C$DW$T$18	.dwtag  DW_TAG_base_type
	.dwattr $C$DW$T$18, DW_AT_encoding(DW_ATE_float)
	.dwattr $C$DW$T$18, DW_AT_name("float")
	.dwattr $C$DW$T$18, DW_AT_byte_size(0x04)

$C$DW$T$19	.dwtag  DW_TAG_base_type
	.dwattr $C$DW$T$19, DW_AT_encoding(DW_ATE_float)
	.dwattr $C$DW$T$19, DW_AT_name("double")
	.dwattr $C$DW$T$19, DW_AT_byte_size(0x08)

$C$DW$T$20	.dwtag  DW_TAG_base_type
	.dwattr $C$DW$T$20, DW_AT_encoding(DW_ATE_float)
	.dwattr $C$DW$T$20, DW_AT_name("long double")
	.dwattr $C$DW$T$20, DW_AT_byte_size(0x08)

$C$DW$T$21	.dwtag  DW_TAG_base_type
	.dwattr $C$DW$T$21, DW_AT_encoding(DW_ATE_TI_complex_signed)
	.dwattr $C$DW$T$21, DW_AT_name("cchar")
	.dwattr $C$DW$T$21, DW_AT_byte_size(0x02)

$C$DW$T$22	.dwtag  DW_TAG_base_type
	.dwattr $C$DW$T$22, DW_AT_encoding(DW_ATE_TI_complex_signed)
	.dwattr $C$DW$T$22, DW_AT_name("cshort")
	.dwattr $C$DW$T$22, DW_AT_byte_size(0x04)

$C$DW$T$23	.dwtag  DW_TAG_base_type
	.dwattr $C$DW$T$23, DW_AT_encoding(DW_ATE_TI_complex_signed)
	.dwattr $C$DW$T$23, DW_AT_name("cint")
	.dwattr $C$DW$T$23, DW_AT_byte_size(0x08)

$C$DW$T$24	.dwtag  DW_TAG_base_type
	.dwattr $C$DW$T$24, DW_AT_encoding(DW_ATE_TI_complex_signed)
	.dwattr $C$DW$T$24, DW_AT_name("clonglong")
	.dwattr $C$DW$T$24, DW_AT_byte_size(0x10)

$C$DW$T$25	.dwtag  DW_TAG_base_type
	.dwattr $C$DW$T$25, DW_AT_encoding(DW_ATE_TI_complex_float)
	.dwattr $C$DW$T$25, DW_AT_name("cfloat")
	.dwattr $C$DW$T$25, DW_AT_byte_size(0x08)

$C$DW$T$26	.dwtag  DW_TAG_base_type
	.dwattr $C$DW$T$26, DW_AT_encoding(DW_ATE_TI_complex_float)
	.dwattr $C$DW$T$26, DW_AT_name("cdouble")
	.dwattr $C$DW$T$26, DW_AT_byte_size(0x10)

	.dwattr $C$DW$CU, DW_AT_language(DW_LANG_C)

;***************************************************************
;* DWARF CIE ENTRIES                                           *
;***************************************************************

$C$DW$CIE	.dwcie 19
	.dwcfi	cfa_register, 31
	.dwcfi	cfa_offset, 0
	.dwcfi	same_value, 10
	.dwcfi	same_value, 11
	.dwcfi	same_value, 12
	.dwcfi	same_value, 13
	.dwcfi	same_value, 14
	.dwcfi	same_value, 15
	.dwcfi	same_value, 26
	.dwcfi	same_value, 27
	.dwcfi	same_value, 28
	.dwcfi	same_value, 29
	.dwcfi	same_value, 30
	.dwcfi	same_value, 31
	.dwendentry

;***************************************************************
;* DWARF REGISTER MAP                                          *
;***************************************************************

$C$DW$46	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$46, DW_AT_name("A0")
	.dwattr $C$DW$46, DW_AT_location[DW_OP_reg0]

$C$DW$47	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$47, DW_AT_name("A1")
	.dwattr $C$DW$47, DW_AT_location[DW_OP_reg1]

$C$DW$48	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$48, DW_AT_name("A2")
	.dwattr $C$DW$48, DW_AT_location[DW_OP_reg2]

$C$DW$49	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$49, DW_AT_name("A3")
	.dwattr $C$DW$49, DW_AT_location[DW_OP_reg3]

$C$DW$50	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$50, DW_AT_name("A4")
	.dwattr $C$DW$50, DW_AT_location[DW_OP_reg4]

$C$DW$51	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$51, DW_AT_name("A5")
	.dwattr $C$DW$51, DW_AT_location[DW_OP_reg5]

$C$DW$52	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$52, DW_AT_name("A6")
	.dwattr $C$DW$52, DW_AT_location[DW_OP_reg6]

$C$DW$53	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$53, DW_AT_name("A7")
	.dwattr $C$DW$53, DW_AT_location[DW_OP_reg7]

$C$DW$54	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$54, DW_AT_name("A8")
	.dwattr $C$DW$54, DW_AT_location[DW_OP_reg8]

$C$DW$55	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$55, DW_AT_name("A9")
	.dwattr $C$DW$55, DW_AT_location[DW_OP_reg9]

$C$DW$56	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$56, DW_AT_name("A10")
	.dwattr $C$DW$56, DW_AT_location[DW_OP_reg10]

$C$DW$57	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$57, DW_AT_name("A11")
	.dwattr $C$DW$57, DW_AT_location[DW_OP_reg11]

$C$DW$58	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$58, DW_AT_name("A12")
	.dwattr $C$DW$58, DW_AT_location[DW_OP_reg12]

$C$DW$59	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$59, DW_AT_name("A13")
	.dwattr $C$DW$59, DW_AT_location[DW_OP_reg13]

$C$DW$60	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$60, DW_AT_name("A14")
	.dwattr $C$DW$60, DW_AT_location[DW_OP_reg14]

$C$DW$61	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$61, DW_AT_name("A15")
	.dwattr $C$DW$61, DW_AT_location[DW_OP_reg15]

$C$DW$62	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$62, DW_AT_name("FP")
	.dwattr $C$DW$62, DW_AT_location[DW_OP_regx 0x20]

$C$DW$63	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$63, DW_AT_name("A16")
	.dwattr $C$DW$63, DW_AT_location[DW_OP_regx 0x25]

$C$DW$64	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$64, DW_AT_name("A17")
	.dwattr $C$DW$64, DW_AT_location[DW_OP_regx 0x26]

$C$DW$65	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$65, DW_AT_name("A18")
	.dwattr $C$DW$65, DW_AT_location[DW_OP_regx 0x27]

$C$DW$66	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$66, DW_AT_name("A19")
	.dwattr $C$DW$66, DW_AT_location[DW_OP_regx 0x28]

$C$DW$67	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$67, DW_AT_name("A20")
	.dwattr $C$DW$67, DW_AT_location[DW_OP_regx 0x29]

$C$DW$68	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$68, DW_AT_name("A21")
	.dwattr $C$DW$68, DW_AT_location[DW_OP_regx 0x2a]

$C$DW$69	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$69, DW_AT_name("A22")
	.dwattr $C$DW$69, DW_AT_location[DW_OP_regx 0x2b]

$C$DW$70	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$70, DW_AT_name("A23")
	.dwattr $C$DW$70, DW_AT_location[DW_OP_regx 0x2c]

$C$DW$71	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$71, DW_AT_name("A24")
	.dwattr $C$DW$71, DW_AT_location[DW_OP_regx 0x2d]

$C$DW$72	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$72, DW_AT_name("A25")
	.dwattr $C$DW$72, DW_AT_location[DW_OP_regx 0x2e]

$C$DW$73	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$73, DW_AT_name("A26")
	.dwattr $C$DW$73, DW_AT_location[DW_OP_regx 0x2f]

$C$DW$74	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$74, DW_AT_name("A27")
	.dwattr $C$DW$74, DW_AT_location[DW_OP_regx 0x30]

$C$DW$75	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$75, DW_AT_name("A28")
	.dwattr $C$DW$75, DW_AT_location[DW_OP_regx 0x31]

$C$DW$76	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$76, DW_AT_name("A29")
	.dwattr $C$DW$76, DW_AT_location[DW_OP_regx 0x32]

$C$DW$77	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$77, DW_AT_name("A30")
	.dwattr $C$DW$77, DW_AT_location[DW_OP_regx 0x33]

$C$DW$78	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$78, DW_AT_name("A31")
	.dwattr $C$DW$78, DW_AT_location[DW_OP_regx 0x34]

$C$DW$79	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$79, DW_AT_name("B0")
	.dwattr $C$DW$79, DW_AT_location[DW_OP_reg16]

$C$DW$80	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$80, DW_AT_name("B1")
	.dwattr $C$DW$80, DW_AT_location[DW_OP_reg17]

$C$DW$81	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$81, DW_AT_name("B2")
	.dwattr $C$DW$81, DW_AT_location[DW_OP_reg18]

$C$DW$82	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$82, DW_AT_name("B3")
	.dwattr $C$DW$82, DW_AT_location[DW_OP_reg19]

$C$DW$83	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$83, DW_AT_name("B4")
	.dwattr $C$DW$83, DW_AT_location[DW_OP_reg20]

$C$DW$84	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$84, DW_AT_name("B5")
	.dwattr $C$DW$84, DW_AT_location[DW_OP_reg21]

$C$DW$85	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$85, DW_AT_name("B6")
	.dwattr $C$DW$85, DW_AT_location[DW_OP_reg22]

$C$DW$86	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$86, DW_AT_name("B7")
	.dwattr $C$DW$86, DW_AT_location[DW_OP_reg23]

$C$DW$87	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$87, DW_AT_name("B8")
	.dwattr $C$DW$87, DW_AT_location[DW_OP_reg24]

$C$DW$88	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$88, DW_AT_name("B9")
	.dwattr $C$DW$88, DW_AT_location[DW_OP_reg25]

$C$DW$89	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$89, DW_AT_name("B10")
	.dwattr $C$DW$89, DW_AT_location[DW_OP_reg26]

$C$DW$90	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$90, DW_AT_name("B11")
	.dwattr $C$DW$90, DW_AT_location[DW_OP_reg27]

$C$DW$91	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$91, DW_AT_name("B12")
	.dwattr $C$DW$91, DW_AT_location[DW_OP_reg28]

$C$DW$92	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$92, DW_AT_name("B13")
	.dwattr $C$DW$92, DW_AT_location[DW_OP_reg29]

$C$DW$93	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$93, DW_AT_name("DP")
	.dwattr $C$DW$93, DW_AT_location[DW_OP_reg30]

$C$DW$94	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$94, DW_AT_name("SP")
	.dwattr $C$DW$94, DW_AT_location[DW_OP_reg31]

$C$DW$95	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$95, DW_AT_name("B16")
	.dwattr $C$DW$95, DW_AT_location[DW_OP_regx 0x35]

$C$DW$96	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$96, DW_AT_name("B17")
	.dwattr $C$DW$96, DW_AT_location[DW_OP_regx 0x36]

$C$DW$97	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$97, DW_AT_name("B18")
	.dwattr $C$DW$97, DW_AT_location[DW_OP_regx 0x37]

$C$DW$98	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$98, DW_AT_name("B19")
	.dwattr $C$DW$98, DW_AT_location[DW_OP_regx 0x38]

$C$DW$99	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$99, DW_AT_name("B20")
	.dwattr $C$DW$99, DW_AT_location[DW_OP_regx 0x39]

$C$DW$100	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$100, DW_AT_name("B21")
	.dwattr $C$DW$100, DW_AT_location[DW_OP_regx 0x3a]

$C$DW$101	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$101, DW_AT_name("B22")
	.dwattr $C$DW$101, DW_AT_location[DW_OP_regx 0x3b]

$C$DW$102	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$102, DW_AT_name("B23")
	.dwattr $C$DW$102, DW_AT_location[DW_OP_regx 0x3c]

$C$DW$103	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$103, DW_AT_name("B24")
	.dwattr $C$DW$103, DW_AT_location[DW_OP_regx 0x3d]

$C$DW$104	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$104, DW_AT_name("B25")
	.dwattr $C$DW$104, DW_AT_location[DW_OP_regx 0x3e]

$C$DW$105	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$105, DW_AT_name("B26")
	.dwattr $C$DW$105, DW_AT_location[DW_OP_regx 0x3f]

$C$DW$106	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$106, DW_AT_name("B27")
	.dwattr $C$DW$106, DW_AT_location[DW_OP_regx 0x40]

$C$DW$107	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$107, DW_AT_name("B28")
	.dwattr $C$DW$107, DW_AT_location[DW_OP_regx 0x41]

$C$DW$108	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$108, DW_AT_name("B29")
	.dwattr $C$DW$108, DW_AT_location[DW_OP_regx 0x42]

$C$DW$109	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$109, DW_AT_name("B30")
	.dwattr $C$DW$109, DW_AT_location[DW_OP_regx 0x43]

$C$DW$110	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$110, DW_AT_name("B31")
	.dwattr $C$DW$110, DW_AT_location[DW_OP_regx 0x44]

$C$DW$111	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$111, DW_AT_name("PC")
	.dwattr $C$DW$111, DW_AT_location[DW_OP_regx 0x21]

$C$DW$112	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$112, DW_AT_name("PCE1")
	.dwattr $C$DW$112, DW_AT_location[DW_OP_regx 0x21]

$C$DW$113	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$113, DW_AT_name("IRP")
	.dwattr $C$DW$113, DW_AT_location[DW_OP_regx 0x22]

$C$DW$114	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$114, DW_AT_name("IFR")
	.dwattr $C$DW$114, DW_AT_location[DW_OP_regx 0x23]

$C$DW$115	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$115, DW_AT_name("NRP")
	.dwattr $C$DW$115, DW_AT_location[DW_OP_regx 0x24]

$C$DW$116	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$116, DW_AT_name("CSR")
	.dwattr $C$DW$116, DW_AT_location[DW_OP_regx 0x46]

$C$DW$117	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$117, DW_AT_name("CSR")
	.dwattr $C$DW$117, DW_AT_location[DW_OP_regx 0x46]

$C$DW$118	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$118, DW_AT_name("SSR")
	.dwattr $C$DW$118, DW_AT_location[DW_OP_regx 0x5b]

$C$DW$119	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$119, DW_AT_name("CSR")
	.dwattr $C$DW$119, DW_AT_location[DW_OP_regx 0x46]

$C$DW$120	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$120, DW_AT_name("AMR")
	.dwattr $C$DW$120, DW_AT_location[DW_OP_regx 0x45]

$C$DW$121	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$121, DW_AT_name("ISR")
	.dwattr $C$DW$121, DW_AT_location[DW_OP_regx 0x47]

$C$DW$122	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$122, DW_AT_name("ICR")
	.dwattr $C$DW$122, DW_AT_location[DW_OP_regx 0x48]

$C$DW$123	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$123, DW_AT_name("IER")
	.dwattr $C$DW$123, DW_AT_location[DW_OP_regx 0x49]

$C$DW$124	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$124, DW_AT_name("ISTP")
	.dwattr $C$DW$124, DW_AT_location[DW_OP_regx 0x4a]

$C$DW$125	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$125, DW_AT_name("IN")
	.dwattr $C$DW$125, DW_AT_location[DW_OP_regx 0x4b]

$C$DW$126	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$126, DW_AT_name("OUT")
	.dwattr $C$DW$126, DW_AT_location[DW_OP_regx 0x4c]

$C$DW$127	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$127, DW_AT_name("ACR")
	.dwattr $C$DW$127, DW_AT_location[DW_OP_regx 0x4d]

$C$DW$128	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$128, DW_AT_name("ADR")
	.dwattr $C$DW$128, DW_AT_location[DW_OP_regx 0x4e]

$C$DW$129	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$129, DW_AT_name("FADCR")
	.dwattr $C$DW$129, DW_AT_location[DW_OP_regx 0x4f]

$C$DW$130	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$130, DW_AT_name("FAUCR")
	.dwattr $C$DW$130, DW_AT_location[DW_OP_regx 0x50]

$C$DW$131	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$131, DW_AT_name("FMCR")
	.dwattr $C$DW$131, DW_AT_location[DW_OP_regx 0x51]

$C$DW$132	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$132, DW_AT_name("GFPGFR")
	.dwattr $C$DW$132, DW_AT_location[DW_OP_regx 0x52]

$C$DW$133	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$133, DW_AT_name("DIER")
	.dwattr $C$DW$133, DW_AT_location[DW_OP_regx 0x53]

$C$DW$134	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$134, DW_AT_name("REP")
	.dwattr $C$DW$134, DW_AT_location[DW_OP_regx 0x54]

$C$DW$135	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$135, DW_AT_name("TSCL")
	.dwattr $C$DW$135, DW_AT_location[DW_OP_regx 0x55]

$C$DW$136	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$136, DW_AT_name("TSCH")
	.dwattr $C$DW$136, DW_AT_location[DW_OP_regx 0x56]

$C$DW$137	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$137, DW_AT_name("ARP")
	.dwattr $C$DW$137, DW_AT_location[DW_OP_regx 0x57]

$C$DW$138	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$138, DW_AT_name("ILC")
	.dwattr $C$DW$138, DW_AT_location[DW_OP_regx 0x58]

$C$DW$139	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$139, DW_AT_name("RILC")
	.dwattr $C$DW$139, DW_AT_location[DW_OP_regx 0x59]

$C$DW$140	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$140, DW_AT_name("DNUM")
	.dwattr $C$DW$140, DW_AT_location[DW_OP_regx 0x5a]

$C$DW$141	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$141, DW_AT_name("GPLYA")
	.dwattr $C$DW$141, DW_AT_location[DW_OP_regx 0x5c]

$C$DW$142	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$142, DW_AT_name("GPLYB")
	.dwattr $C$DW$142, DW_AT_location[DW_OP_regx 0x5d]

$C$DW$143	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$143, DW_AT_name("TSR")
	.dwattr $C$DW$143, DW_AT_location[DW_OP_regx 0x5e]

$C$DW$144	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$144, DW_AT_name("ITSR")
	.dwattr $C$DW$144, DW_AT_location[DW_OP_regx 0x5f]

$C$DW$145	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$145, DW_AT_name("NTSR")
	.dwattr $C$DW$145, DW_AT_location[DW_OP_regx 0x60]

$C$DW$146	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$146, DW_AT_name("EFR")
	.dwattr $C$DW$146, DW_AT_location[DW_OP_regx 0x61]

$C$DW$147	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$147, DW_AT_name("ECR")
	.dwattr $C$DW$147, DW_AT_location[DW_OP_regx 0x62]

$C$DW$148	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$148, DW_AT_name("IERR")
	.dwattr $C$DW$148, DW_AT_location[DW_OP_regx 0x63]

$C$DW$149	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$149, DW_AT_name("DMSG")
	.dwattr $C$DW$149, DW_AT_location[DW_OP_regx 0x64]

$C$DW$150	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$150, DW_AT_name("CMSG")
	.dwattr $C$DW$150, DW_AT_location[DW_OP_regx 0x65]

$C$DW$151	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$151, DW_AT_name("DT_DMA_ADDR")
	.dwattr $C$DW$151, DW_AT_location[DW_OP_regx 0x66]

$C$DW$152	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$152, DW_AT_name("DT_DMA_DATA")
	.dwattr $C$DW$152, DW_AT_location[DW_OP_regx 0x67]

$C$DW$153	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$153, DW_AT_name("DT_DMA_CNTL")
	.dwattr $C$DW$153, DW_AT_location[DW_OP_regx 0x68]

$C$DW$154	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$154, DW_AT_name("TCU_CNTL")
	.dwattr $C$DW$154, DW_AT_location[DW_OP_regx 0x69]

$C$DW$155	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$155, DW_AT_name("RTDX_REC_CNTL")
	.dwattr $C$DW$155, DW_AT_location[DW_OP_regx 0x6a]

$C$DW$156	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$156, DW_AT_name("RTDX_XMT_CNTL")
	.dwattr $C$DW$156, DW_AT_location[DW_OP_regx 0x6b]

$C$DW$157	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$157, DW_AT_name("RTDX_CFG")
	.dwattr $C$DW$157, DW_AT_location[DW_OP_regx 0x6c]

$C$DW$158	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$158, DW_AT_name("RTDX_RDATA")
	.dwattr $C$DW$158, DW_AT_location[DW_OP_regx 0x6d]

$C$DW$159	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$159, DW_AT_name("RTDX_WDATA")
	.dwattr $C$DW$159, DW_AT_location[DW_OP_regx 0x6e]

$C$DW$160	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$160, DW_AT_name("RTDX_RADDR")
	.dwattr $C$DW$160, DW_AT_location[DW_OP_regx 0x6f]

$C$DW$161	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$161, DW_AT_name("RTDX_WADDR")
	.dwattr $C$DW$161, DW_AT_location[DW_OP_regx 0x70]

$C$DW$162	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$162, DW_AT_name("MFREG0")
	.dwattr $C$DW$162, DW_AT_location[DW_OP_regx 0x71]

$C$DW$163	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$163, DW_AT_name("DBG_STAT")
	.dwattr $C$DW$163, DW_AT_location[DW_OP_regx 0x72]

$C$DW$164	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$164, DW_AT_name("BRK_EN")
	.dwattr $C$DW$164, DW_AT_location[DW_OP_regx 0x73]

$C$DW$165	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$165, DW_AT_name("HWBP0_CNT")
	.dwattr $C$DW$165, DW_AT_location[DW_OP_regx 0x74]

$C$DW$166	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$166, DW_AT_name("HWBP0")
	.dwattr $C$DW$166, DW_AT_location[DW_OP_regx 0x75]

$C$DW$167	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$167, DW_AT_name("HWBP1")
	.dwattr $C$DW$167, DW_AT_location[DW_OP_regx 0x76]

$C$DW$168	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$168, DW_AT_name("HWBP2")
	.dwattr $C$DW$168, DW_AT_location[DW_OP_regx 0x77]

$C$DW$169	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$169, DW_AT_name("HWBP3")
	.dwattr $C$DW$169, DW_AT_location[DW_OP_regx 0x78]

$C$DW$170	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$170, DW_AT_name("OVERLAY")
	.dwattr $C$DW$170, DW_AT_location[DW_OP_regx 0x79]

$C$DW$171	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$171, DW_AT_name("PC_PROF")
	.dwattr $C$DW$171, DW_AT_location[DW_OP_regx 0x7a]

$C$DW$172	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$172, DW_AT_name("ATSR")
	.dwattr $C$DW$172, DW_AT_location[DW_OP_regx 0x7b]

$C$DW$173	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$173, DW_AT_name("TRR")
	.dwattr $C$DW$173, DW_AT_location[DW_OP_regx 0x7c]

$C$DW$174	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$174, DW_AT_name("TCRR")
	.dwattr $C$DW$174, DW_AT_location[DW_OP_regx 0x7d]

$C$DW$175	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$175, DW_AT_name("DESR")
	.dwattr $C$DW$175, DW_AT_location[DW_OP_regx 0x7e]

$C$DW$176	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$176, DW_AT_name("DETR")
	.dwattr $C$DW$176, DW_AT_location[DW_OP_regx 0x7f]

	.dwendtag $C$DW$CU

