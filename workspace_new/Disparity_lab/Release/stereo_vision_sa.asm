;******************************************************************************
;* G3 TMS320C6x C/C++ Codegen                                       PC v8.3.3 *
;* Date/Time created: Thu May 30 19:55:13 2019                                *
;******************************************************************************
	.compiler_opts --abi=eabi --array_alignment=8 --c64p_l1d_workaround=off --diag_wrap=off --endian=little --hll_source=linasm --long_precision_bits=32 --mem_model:code=near --mem_model:const=data --mem_model:data=far_aggregates --object_format=elf --silicon_version=6600 --symdebug:dwarf --symdebug:dwarf_version=3 

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
	.dwattr $C$DW$CU, DW_AT_name("../stereo_vision_sa.sa")
	.dwattr $C$DW$CU, DW_AT_producer("TI G3 TMS320C6x C/C++ Codegen PC v8.3.3 Copyright (c) 1996-2018 Texas Instruments Incorporated")
	.dwattr $C$DW$CU, DW_AT_TI_version(0x01)
	.dwattr $C$DW$CU, DW_AT_comp_dir("C:\Users\Goce\workspace_new\Disparity_lab\Release")
	.sect	".text"
            .global stereo_vision_sa
	.sect	".text"
	.clink

$C$DW$1	.dwtag  DW_TAG_subprogram
	.dwattr $C$DW$1, DW_AT_name("stereo_vision_sa")
	.dwattr $C$DW$1, DW_AT_low_pc(stereo_vision_sa)
	.dwattr $C$DW$1, DW_AT_high_pc(0x00)
	.dwattr $C$DW$1, DW_AT_TI_symbol_name("stereo_vision_sa")
	.dwattr $C$DW$1, DW_AT_TI_begin_file("../stereo_vision_sa.sa")
	.dwattr $C$DW$1, DW_AT_TI_begin_line(0x08)
	.dwattr $C$DW$1, DW_AT_TI_begin_column(0x01)
	.dwattr $C$DW$1, DW_AT_decl_file("../stereo_vision_sa.sa")
	.dwattr $C$DW$1, DW_AT_decl_line(0x08)
	.dwattr $C$DW$1, DW_AT_decl_column(0x01)
	.dwattr $C$DW$1, DW_AT_TI_max_frame_size(0x38)
	.dwpsn	file "../stereo_vision_sa.sa",line 8,column 1,is_stmt,address stereo_vision_sa,isa 0

	.dwfde $C$DW$CIE, stereo_vision_sa

;******************************************************************************
;* FUNCTION NAME: stereo_vision_sa                                            *
;*                                                                            *
;*   Regs Modified     : A0,A1,A2,A3,A4,A5,A6,A7,A8,A9,A10,A11,A12,A13,A14,   *
;*                           A15,A16,A17,A18,A19,A20,A21,A22,A23,A24,A25,A26, *
;*                           A27,A28,A29,A30,A31,B0,B1,B2,B3,B4,B5,B6,B7,B8,  *
;*                           B9,B10,B11,B12,B13,B16,B17,B18,B19,B20,B21,B22,  *
;*                           B23,B24,B25,B26,B27,B28,B29,B30,B31              *
;*   Regs Used         : A0,A1,A2,A3,A4,A5,A6,A7,A8,A9,A10,A11,A12,A13,A14,   *
;*                           A15,A16,A17,A18,A19,A20,A21,A22,A23,A24,A25,A26, *
;*                           A27,A28,A29,A30,A31,B0,B1,B2,B3,B4,B5,B6,B7,B8,  *
;*                           B9,B10,B11,B12,B13,DP,SP,B16,B17,B18,B19,B20,B21,*
;*                           B22,B23,B24,B25,B26,B27,B28,B29,B30,B31          *
;******************************************************************************
stereo_vision_sa:

	.map	maxHeight/B10
	.map	maxHeight'/A3
	.map	maxWidth/B11
	.map	offsetL1/A20
	.map	offsetL1'/A4
	.map	offsetL2/A2
	.map	offsetL2$1/A19
	.map	offsetL2$2/A5
	.map	offsetL2$3/A4
	.map	offsetL3/A6
	.map	offsetL3$1/A18
	.map	offsetL3$2/A7
	.map	offsetL3$3/A8
	.map	offsetL4/A5
	.map	offsetL4$1/A17
	.map	offsetL4$2/A25
	.map	offsetL4$3/A8
	.map	offsetL5/A4
	.map	offsetL5$1/A2
	.map	offsetL5$2/A16
	.map	offsetL5$3/A23
	.map	sum/B3
	.map	sum'/B1
	.map	offsetR1/B1
	.map	offsetR2/B3
	.map	offsetR3/A26
	.map	offsetR4/A25
	.map	offsetR5/A14
	.map	distance/A11
	.map	distance'/A8
	.map	distance''/A31
	.map	mult_one/B7
	.map	mult_one'/A10
	.map	dotprod1/B1
	.map	dotprod1'/B3
	.map	dotprod1''/B9
	.map	dotprod2/B3
	.map	dotprod2'/A25
	.map	dotprod2''/B20
	.map	dotprod3/A0
	.map	dotprod3'/A1
	.map	dotprod3''/B8
	.map	dotprod4/A9
	.map	dotprod4$1/A26
	.map	dotprod4$2/A1
	.map	dotprod4$3/A24
	.map	dotprod5/A9
	.map	dotprod5'/A0
	.map	dotprod5''/A24
	.map	radius_check/B1
	.map	radius_check'/A1
	.map	radius_check''/B0
	.map	w10/A24
	.map	w10'/A13
	.map	w11/B7
	.map	w11'/B1
	.map	w20/A4
	.map	w12/B6
	.map	w13/B5
	.map	w13'/B8
	.map	index/A3
	.map	index'/A16
	.map	w14/B4
	.map	w15/A3
	.map	w15'/A14
	.map	w16/A2
	.map	w17/A7
	.map	w17'/A0
	.map	i/A15
	.map	w18/A6
	.map	w19/A5
	.map	w19'/A25
	.map	j/B3
	.map	j'/B22
	.map	k/A8
	.map	k$1/A30
	.map	k$2/A24
	.map	k$3/A1
	.map	width/B28
	.map	width$1/A3
	.map	width$2/A9
	.map	width$3/A4
	.map	width$4/A5
	.map	width$5/A7
	.map	w1/B5
	.map	w1'/B24
	.map	w2/B4
	.map	w2'/B27
	.map	minimize/B21
	.map	w3/B1
	.map	w3'/B23
	.map	w4/B0
	.map	w4'/B26
	.map	w5/A23
	.map	w6/A22
	.map	w6'/B25
	.map	w7/A3
	.map	w7'/A21
	.map	w8/A2
	.map	w8'/A12
	.map	a_1/B29
	.map	a_1$1/A4
	.map	a_1$2/A24
	.map	a_1$3/A22
	.map	a_1$4/A17
	.map	a_1$5/A16
	.map	a_1$6/A6
	.map	w9/A25
	.map	w9'/A22
	.map	a_2/A29
	.map	a_2'/B18
	.map	a_2''/B4
	.map	a_3/B31
	.map	a_3'/A6
	.map	a_3''/A30
	.map	a_4/A28
	.map	a_4'/B6
	.map	a_5/B30
	.map	a_5'/A8
	.map	and_one/A0
	.map	and_one'/A27
	.map	sum_check/B1
	.map	absDiff1/B1
	.map	absDiff1'/B8
	.map	absDiff2/B9
	.map	absDiff2'/B1
	.map	absDiff3/A25
	.map	absDiff3'/A1
	.map	absDiff4/A0
	.map	absDiff5/A9
	.map	absDiff5'/A1

;** --------------------------------------------------------------------------*
$C$DW$2	.dwtag  DW_TAG_variable
	.dwattr $C$DW$2, DW_AT_name("maxHeight")
	.dwattr $C$DW$2, DW_AT_TI_symbol_name("maxHeight")
	.dwattr $C$DW$2, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$2, DW_AT_location[DW_OP_reg26]

$C$DW$3	.dwtag  DW_TAG_variable
	.dwattr $C$DW$3, DW_AT_name("maxWidth")
	.dwattr $C$DW$3, DW_AT_TI_symbol_name("maxWidth")
	.dwattr $C$DW$3, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$3, DW_AT_location[DW_OP_reg27]

$C$DW$4	.dwtag  DW_TAG_variable
	.dwattr $C$DW$4, DW_AT_name("offsetL1")
	.dwattr $C$DW$4, DW_AT_TI_symbol_name("offsetL1")
	.dwattr $C$DW$4, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$4, DW_AT_location[DW_OP_regx 0x29]

$C$DW$5	.dwtag  DW_TAG_variable
	.dwattr $C$DW$5, DW_AT_name("offsetL2")
	.dwattr $C$DW$5, DW_AT_TI_symbol_name("offsetL2")
	.dwattr $C$DW$5, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$5, DW_AT_location[DW_OP_reg2]

$C$DW$6	.dwtag  DW_TAG_variable
	.dwattr $C$DW$6, DW_AT_name("offsetL3")
	.dwattr $C$DW$6, DW_AT_TI_symbol_name("offsetL3")
	.dwattr $C$DW$6, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$6, DW_AT_location[DW_OP_reg6]

$C$DW$7	.dwtag  DW_TAG_variable
	.dwattr $C$DW$7, DW_AT_name("offsetL4")
	.dwattr $C$DW$7, DW_AT_TI_symbol_name("offsetL4")
	.dwattr $C$DW$7, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$7, DW_AT_location[DW_OP_reg5]

$C$DW$8	.dwtag  DW_TAG_variable
	.dwattr $C$DW$8, DW_AT_name("offsetL5")
	.dwattr $C$DW$8, DW_AT_TI_symbol_name("offsetL5")
	.dwattr $C$DW$8, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$8, DW_AT_location[DW_OP_reg4]

$C$DW$9	.dwtag  DW_TAG_variable
	.dwattr $C$DW$9, DW_AT_name("sum")
	.dwattr $C$DW$9, DW_AT_TI_symbol_name("sum")
	.dwattr $C$DW$9, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$9, DW_AT_location[DW_OP_reg19]

$C$DW$10	.dwtag  DW_TAG_variable
	.dwattr $C$DW$10, DW_AT_name("offsetR1")
	.dwattr $C$DW$10, DW_AT_TI_symbol_name("offsetR1")
	.dwattr $C$DW$10, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$10, DW_AT_location[DW_OP_reg17]

$C$DW$11	.dwtag  DW_TAG_variable
	.dwattr $C$DW$11, DW_AT_name("offsetR2")
	.dwattr $C$DW$11, DW_AT_TI_symbol_name("offsetR2")
	.dwattr $C$DW$11, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$11, DW_AT_location[DW_OP_reg19]

$C$DW$12	.dwtag  DW_TAG_variable
	.dwattr $C$DW$12, DW_AT_name("offsetR3")
	.dwattr $C$DW$12, DW_AT_TI_symbol_name("offsetR3")
	.dwattr $C$DW$12, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$12, DW_AT_location[DW_OP_regx 0x2f]

$C$DW$13	.dwtag  DW_TAG_variable
	.dwattr $C$DW$13, DW_AT_name("offsetR4")
	.dwattr $C$DW$13, DW_AT_TI_symbol_name("offsetR4")
	.dwattr $C$DW$13, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$13, DW_AT_location[DW_OP_regx 0x2e]

$C$DW$14	.dwtag  DW_TAG_variable
	.dwattr $C$DW$14, DW_AT_name("offsetR5")
	.dwattr $C$DW$14, DW_AT_TI_symbol_name("offsetR5")
	.dwattr $C$DW$14, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$14, DW_AT_location[DW_OP_reg14]

$C$DW$15	.dwtag  DW_TAG_variable
	.dwattr $C$DW$15, DW_AT_name("distance")
	.dwattr $C$DW$15, DW_AT_TI_symbol_name("distance")
	.dwattr $C$DW$15, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$15, DW_AT_location[DW_OP_reg11]

$C$DW$16	.dwtag  DW_TAG_variable
	.dwattr $C$DW$16, DW_AT_name("mult_one")
	.dwattr $C$DW$16, DW_AT_TI_symbol_name("mult_one")
	.dwattr $C$DW$16, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$16, DW_AT_location[DW_OP_reg23]

$C$DW$17	.dwtag  DW_TAG_variable
	.dwattr $C$DW$17, DW_AT_name("dotprod1")
	.dwattr $C$DW$17, DW_AT_TI_symbol_name("dotprod1")
	.dwattr $C$DW$17, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$17, DW_AT_location[DW_OP_reg17]

$C$DW$18	.dwtag  DW_TAG_variable
	.dwattr $C$DW$18, DW_AT_name("dotprod2")
	.dwattr $C$DW$18, DW_AT_TI_symbol_name("dotprod2")
	.dwattr $C$DW$18, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$18, DW_AT_location[DW_OP_reg19]

$C$DW$19	.dwtag  DW_TAG_variable
	.dwattr $C$DW$19, DW_AT_name("dotprod3")
	.dwattr $C$DW$19, DW_AT_TI_symbol_name("dotprod3")
	.dwattr $C$DW$19, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$19, DW_AT_location[DW_OP_reg0]

$C$DW$20	.dwtag  DW_TAG_variable
	.dwattr $C$DW$20, DW_AT_name("dotprod4")
	.dwattr $C$DW$20, DW_AT_TI_symbol_name("dotprod4")
	.dwattr $C$DW$20, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$20, DW_AT_location[DW_OP_reg9]

$C$DW$21	.dwtag  DW_TAG_variable
	.dwattr $C$DW$21, DW_AT_name("dotprod5")
	.dwattr $C$DW$21, DW_AT_TI_symbol_name("dotprod5")
	.dwattr $C$DW$21, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$21, DW_AT_location[DW_OP_reg9]

$C$DW$22	.dwtag  DW_TAG_variable
	.dwattr $C$DW$22, DW_AT_name("radius_check")
	.dwattr $C$DW$22, DW_AT_TI_symbol_name("radius_check")
	.dwattr $C$DW$22, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$22, DW_AT_location[DW_OP_reg17]

$C$DW$23	.dwtag  DW_TAG_variable
	.dwattr $C$DW$23, DW_AT_name("w10")
	.dwattr $C$DW$23, DW_AT_TI_symbol_name("w10")
	.dwattr $C$DW$23, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$23, DW_AT_location[DW_OP_regx 0x2d]

$C$DW$24	.dwtag  DW_TAG_variable
	.dwattr $C$DW$24, DW_AT_name("w11")
	.dwattr $C$DW$24, DW_AT_TI_symbol_name("w11")
	.dwattr $C$DW$24, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$24, DW_AT_location[DW_OP_reg23]

$C$DW$25	.dwtag  DW_TAG_variable
	.dwattr $C$DW$25, DW_AT_name("w20")
	.dwattr $C$DW$25, DW_AT_TI_symbol_name("w20")
	.dwattr $C$DW$25, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$25, DW_AT_location[DW_OP_reg4]

$C$DW$26	.dwtag  DW_TAG_variable
	.dwattr $C$DW$26, DW_AT_name("w12")
	.dwattr $C$DW$26, DW_AT_TI_symbol_name("w12")
	.dwattr $C$DW$26, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$26, DW_AT_location[DW_OP_reg22]

$C$DW$27	.dwtag  DW_TAG_variable
	.dwattr $C$DW$27, DW_AT_name("w13")
	.dwattr $C$DW$27, DW_AT_TI_symbol_name("w13")
	.dwattr $C$DW$27, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$27, DW_AT_location[DW_OP_reg21]

$C$DW$28	.dwtag  DW_TAG_variable
	.dwattr $C$DW$28, DW_AT_name("index")
	.dwattr $C$DW$28, DW_AT_TI_symbol_name("index")
	.dwattr $C$DW$28, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$28, DW_AT_location[DW_OP_reg3]

$C$DW$29	.dwtag  DW_TAG_variable
	.dwattr $C$DW$29, DW_AT_name("w14")
	.dwattr $C$DW$29, DW_AT_TI_symbol_name("w14")
	.dwattr $C$DW$29, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$29, DW_AT_location[DW_OP_reg20]

$C$DW$30	.dwtag  DW_TAG_variable
	.dwattr $C$DW$30, DW_AT_name("w15")
	.dwattr $C$DW$30, DW_AT_TI_symbol_name("w15")
	.dwattr $C$DW$30, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$30, DW_AT_location[DW_OP_reg3]

$C$DW$31	.dwtag  DW_TAG_variable
	.dwattr $C$DW$31, DW_AT_name("w16")
	.dwattr $C$DW$31, DW_AT_TI_symbol_name("w16")
	.dwattr $C$DW$31, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$31, DW_AT_location[DW_OP_reg2]

$C$DW$32	.dwtag  DW_TAG_variable
	.dwattr $C$DW$32, DW_AT_name("w17")
	.dwattr $C$DW$32, DW_AT_TI_symbol_name("w17")
	.dwattr $C$DW$32, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$32, DW_AT_location[DW_OP_reg7]

$C$DW$33	.dwtag  DW_TAG_variable
	.dwattr $C$DW$33, DW_AT_name("i")
	.dwattr $C$DW$33, DW_AT_TI_symbol_name("i")
	.dwattr $C$DW$33, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$33, DW_AT_location[DW_OP_reg15]

$C$DW$34	.dwtag  DW_TAG_variable
	.dwattr $C$DW$34, DW_AT_name("w18")
	.dwattr $C$DW$34, DW_AT_TI_symbol_name("w18")
	.dwattr $C$DW$34, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$34, DW_AT_location[DW_OP_reg6]

$C$DW$35	.dwtag  DW_TAG_variable
	.dwattr $C$DW$35, DW_AT_name("w19")
	.dwattr $C$DW$35, DW_AT_TI_symbol_name("w19")
	.dwattr $C$DW$35, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$35, DW_AT_location[DW_OP_reg5]

$C$DW$36	.dwtag  DW_TAG_variable
	.dwattr $C$DW$36, DW_AT_name("j")
	.dwattr $C$DW$36, DW_AT_TI_symbol_name("j")
	.dwattr $C$DW$36, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$36, DW_AT_location[DW_OP_reg19]

$C$DW$37	.dwtag  DW_TAG_variable
	.dwattr $C$DW$37, DW_AT_name("k")
	.dwattr $C$DW$37, DW_AT_TI_symbol_name("k")
	.dwattr $C$DW$37, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$37, DW_AT_location[DW_OP_reg8]

$C$DW$38	.dwtag  DW_TAG_variable
	.dwattr $C$DW$38, DW_AT_name("width")
	.dwattr $C$DW$38, DW_AT_TI_symbol_name("width")
	.dwattr $C$DW$38, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$38, DW_AT_location[DW_OP_regx 0x41]

$C$DW$39	.dwtag  DW_TAG_variable
	.dwattr $C$DW$39, DW_AT_name("w1")
	.dwattr $C$DW$39, DW_AT_TI_symbol_name("w1")
	.dwattr $C$DW$39, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$39, DW_AT_location[DW_OP_reg21]

$C$DW$40	.dwtag  DW_TAG_variable
	.dwattr $C$DW$40, DW_AT_name("w2")
	.dwattr $C$DW$40, DW_AT_TI_symbol_name("w2")
	.dwattr $C$DW$40, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$40, DW_AT_location[DW_OP_reg20]

$C$DW$41	.dwtag  DW_TAG_variable
	.dwattr $C$DW$41, DW_AT_name("minimize")
	.dwattr $C$DW$41, DW_AT_TI_symbol_name("minimize")
	.dwattr $C$DW$41, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$41, DW_AT_location[DW_OP_regx 0x3a]

$C$DW$42	.dwtag  DW_TAG_variable
	.dwattr $C$DW$42, DW_AT_name("w3")
	.dwattr $C$DW$42, DW_AT_TI_symbol_name("w3")
	.dwattr $C$DW$42, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$42, DW_AT_location[DW_OP_reg17]

$C$DW$43	.dwtag  DW_TAG_variable
	.dwattr $C$DW$43, DW_AT_name("w4")
	.dwattr $C$DW$43, DW_AT_TI_symbol_name("w4")
	.dwattr $C$DW$43, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$43, DW_AT_location[DW_OP_reg16]

$C$DW$44	.dwtag  DW_TAG_variable
	.dwattr $C$DW$44, DW_AT_name("w5")
	.dwattr $C$DW$44, DW_AT_TI_symbol_name("w5")
	.dwattr $C$DW$44, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$44, DW_AT_location[DW_OP_regx 0x2c]

$C$DW$45	.dwtag  DW_TAG_variable
	.dwattr $C$DW$45, DW_AT_name("w6")
	.dwattr $C$DW$45, DW_AT_TI_symbol_name("w6")
	.dwattr $C$DW$45, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$45, DW_AT_location[DW_OP_regx 0x2b]

$C$DW$46	.dwtag  DW_TAG_variable
	.dwattr $C$DW$46, DW_AT_name("w7")
	.dwattr $C$DW$46, DW_AT_TI_symbol_name("w7")
	.dwattr $C$DW$46, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$46, DW_AT_location[DW_OP_reg3]

$C$DW$47	.dwtag  DW_TAG_variable
	.dwattr $C$DW$47, DW_AT_name("w8")
	.dwattr $C$DW$47, DW_AT_TI_symbol_name("w8")
	.dwattr $C$DW$47, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$47, DW_AT_location[DW_OP_reg2]

$C$DW$48	.dwtag  DW_TAG_variable
	.dwattr $C$DW$48, DW_AT_name("a_1")
	.dwattr $C$DW$48, DW_AT_TI_symbol_name("a_1")
	.dwattr $C$DW$48, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$48, DW_AT_location[DW_OP_regx 0x42]

$C$DW$49	.dwtag  DW_TAG_variable
	.dwattr $C$DW$49, DW_AT_name("w9")
	.dwattr $C$DW$49, DW_AT_TI_symbol_name("w9")
	.dwattr $C$DW$49, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$49, DW_AT_location[DW_OP_regx 0x2e]

$C$DW$50	.dwtag  DW_TAG_variable
	.dwattr $C$DW$50, DW_AT_name("a_2")
	.dwattr $C$DW$50, DW_AT_TI_symbol_name("a_2")
	.dwattr $C$DW$50, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$50, DW_AT_location[DW_OP_regx 0x32]

$C$DW$51	.dwtag  DW_TAG_variable
	.dwattr $C$DW$51, DW_AT_name("a_2")
	.dwattr $C$DW$51, DW_AT_TI_symbol_name("a_2")
	.dwattr $C$DW$51, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$51, DW_AT_location[DW_OP_reg20]

$C$DW$52	.dwtag  DW_TAG_variable
	.dwattr $C$DW$52, DW_AT_name("a_3")
	.dwattr $C$DW$52, DW_AT_TI_symbol_name("a_3")
	.dwattr $C$DW$52, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$52, DW_AT_location[DW_OP_regx 0x44]

$C$DW$53	.dwtag  DW_TAG_variable
	.dwattr $C$DW$53, DW_AT_name("a_4")
	.dwattr $C$DW$53, DW_AT_TI_symbol_name("a_4")
	.dwattr $C$DW$53, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$53, DW_AT_location[DW_OP_regx 0x31]

$C$DW$54	.dwtag  DW_TAG_variable
	.dwattr $C$DW$54, DW_AT_name("a_4")
	.dwattr $C$DW$54, DW_AT_TI_symbol_name("a_4")
	.dwattr $C$DW$54, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$54, DW_AT_location[DW_OP_reg22]

$C$DW$55	.dwtag  DW_TAG_variable
	.dwattr $C$DW$55, DW_AT_name("a_5")
	.dwattr $C$DW$55, DW_AT_TI_symbol_name("a_5")
	.dwattr $C$DW$55, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$55, DW_AT_location[DW_OP_regx 0x43]

$C$DW$56	.dwtag  DW_TAG_variable
	.dwattr $C$DW$56, DW_AT_name("and_one")
	.dwattr $C$DW$56, DW_AT_TI_symbol_name("and_one")
	.dwattr $C$DW$56, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$56, DW_AT_location[DW_OP_reg0]

$C$DW$57	.dwtag  DW_TAG_variable
	.dwattr $C$DW$57, DW_AT_name("sum_check")
	.dwattr $C$DW$57, DW_AT_TI_symbol_name("sum_check")
	.dwattr $C$DW$57, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$57, DW_AT_location[DW_OP_reg17]

$C$DW$58	.dwtag  DW_TAG_variable
	.dwattr $C$DW$58, DW_AT_name("absDiff1")
	.dwattr $C$DW$58, DW_AT_TI_symbol_name("absDiff1")
	.dwattr $C$DW$58, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$58, DW_AT_location[DW_OP_reg17]

$C$DW$59	.dwtag  DW_TAG_variable
	.dwattr $C$DW$59, DW_AT_name("absDiff2")
	.dwattr $C$DW$59, DW_AT_TI_symbol_name("absDiff2")
	.dwattr $C$DW$59, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$59, DW_AT_location[DW_OP_reg25]

$C$DW$60	.dwtag  DW_TAG_variable
	.dwattr $C$DW$60, DW_AT_name("absDiff3")
	.dwattr $C$DW$60, DW_AT_TI_symbol_name("absDiff3")
	.dwattr $C$DW$60, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$60, DW_AT_location[DW_OP_regx 0x2e]

$C$DW$61	.dwtag  DW_TAG_variable
	.dwattr $C$DW$61, DW_AT_name("absDiff4")
	.dwattr $C$DW$61, DW_AT_TI_symbol_name("absDiff4")
	.dwattr $C$DW$61, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$61, DW_AT_location[DW_OP_reg0]

$C$DW$62	.dwtag  DW_TAG_variable
	.dwattr $C$DW$62, DW_AT_name("absDiff5")
	.dwattr $C$DW$62, DW_AT_TI_symbol_name("absDiff5")
	.dwattr $C$DW$62, DW_AT_type(*$C$DW$T$10)
	.dwattr $C$DW$62, DW_AT_location[DW_OP_reg9]

	.dwcfi	cfa_offset, 0
;          EXCLUSIVE CPU CYCLES: 6
;             ; DONE: Complete stereo vision function in linear assembly
;             ; TODO: Optimise linear assembly. Target: <0.04s, Current: 0.0492s
;             ; Ideas:
;             ; Balance functional units for both A and B sides.
;             ; Draw dependency graph to find areas to fix.
;             ; Optimise either the arithmetic part or the data parts.
; stereo_vision_sa  .cproc a_1,a_2,a_3,a_4,a_5
; 				  .reg i, j, k, sum, minimize, distance, width
; 				  .reg radius_check, sum_check, mult_one, and_one
; 				  .reg w1, w2, w3, w4, w5, w6, w7, w8, w9, w10
; 				  .reg w11, w12, w13, w14, w15, w16, w17, w18, w19, w20
; 				  .reg offsetL1, offsetL2, offsetL3, offsetL4, offsetL5
; 				  .reg offsetR1, offsetR2, offsetR3, offsetR4, offsetR5
; 				  .reg maxWidth, maxHeight
; 				  .reg dotprod1, dotprod2, dotprod3, dotprod4, dotprod5
; 				  .reg absDiff1, absDiff2, absDiff3, absDiff4, absDiff5
; 				  .reg index
$C$DW$63	.dwtag  DW_TAG_TI_branch
	.dwattr $C$DW$63, DW_AT_low_pc(0x00)
	.dwattr $C$DW$63, DW_AT_name("__c6xabi_push_rts")
	.dwattr $C$DW$63, DW_AT_TI_call

           CALLP   .S1     __c6xabi_push_rts,A3 ; [A_S66] |8| 
$C$RL0:    ; CALLP OCCURS {__c6xabi_push_rts}   ; [] |8| 
	.dwcfi	cfa_offset, 56
	.dwcfi	save_reg_to_mem, 30, -4
	.dwcfi	save_reg_to_mem, 14, -12
	.dwcfi	save_reg_to_mem, 15, -8
	.dwcfi	save_reg_to_mem, 28, -20
	.dwcfi	save_reg_to_mem, 29, -16
	.dwcfi	save_reg_to_mem, 12, -28
	.dwcfi	save_reg_to_mem, 13, -24
	.dwcfi	save_reg_to_mem, 26, -36
	.dwcfi	save_reg_to_mem, 27, -32
	.dwcfi	save_reg_to_mem, 10, -44
	.dwcfi	save_reg_to_mem, 11, -40
	.dwcfi	save_reg_to_mem, 18, -52
	.dwcfi	save_reg_to_mem, 19, -48

           MV      .L2X    a_5',a_5          ; [B_L66] |8| 
||         MVKL    .S1     0xdb,maxHeight'   ; [A_S66] |21| 

           MV      .L2X    a_3',a_3          ; [B_L66] |8| 
	.dwpsn	file "../stereo_vision_sa.sa",line 21,column 1,is_stmt,isa 0

           MVKL    .S1     0x118,width$1     ; [A_S66] |23| 
||         MV      .L2X    maxHeight',maxHeight ; [B_L66] |21| 
||         MVKL    .S2     0x1010101,mult_one ; [B_Sb66] |24| 

	.dwpsn	file "../stereo_vision_sa.sa",line 8,column 1,is_stmt,isa 0

           MV      .L2     B3,B13            ; [B_L66] |8| 
||         MV      .L1X    a_4',a_4          ; [A_L66] |8| 
||         MV      .D2X    a_1$1,a_1         ; [B_D64P] |8| 
||         MVKL    .S2     0x114,maxWidth    ; [B_Sb66] |20| 
	.dwcfi	save_reg_to_reg, 19, 29

           MV      .L2X    width$1,width     ; [B_L66] |23| 
||         ZERO    .D2     j                 ; [B_D64P] |29|  Loop variable j
||         MVKH    .S2     0x1010101,mult_one ; [B_Sb66] |25| 
||         MVKL    .S1     0xff,and_one      ; [A_S66] |22| 
||         MV      .L1X    a_2'',a_2         ; [A_L66] |8| 
||         ZERO    .D1     i                 ; [A_D64P] |26|  Loop variable i

;** --------------------------------------------------------------------------*
;**   BEGIN LOOP $C$L1
;** --------------------------------------------------------------------------*
$C$L1:    
;** --------------------------------------------------------------------------*
$C$L2:    
;          EXCLUSIVE CPU CYCLES: 4
	.dwpsn	file "../stereo_vision_sa.sa",line 38,column 1,is_stmt,isa 0

           ADD     .L1     1,i,offsetL2$3    ; [A_L66] |38| 
||         MV      .S1X    width,width$4     ; [A_S66] |42| 

	.dwpsn	file "../stereo_vision_sa.sa",line 43,column 1,is_stmt,isa 0

           MV      .L1X    width,width$3     ; [A_L66] 
||         MPY     .M1     width$4,offsetL2$3,offsetL2 ; [A_M66] |43| 

	.dwpsn	file "../stereo_vision_sa.sa",line 41,column 1,is_stmt,isa 0

           MV      .L1X    width,width$4     ; [A_L66] |53| 
||         ADD     .S1     4,i,offsetL5$3    ; [A_S66] |41| 

	.dwpsn	file "../stereo_vision_sa.sa",line 39,column 1,is_stmt,isa 0

           MPY     .M1     i,width$3,offsetL1' ; [A_M66] |42| 
||         ADD     .L1X    j,offsetL2,offsetL2$1 ; [A_L66] |48| 
||         ADD     .S1     3,i,offsetL4$2    ; [A_S66] |40| 
||         ADD     .D1     2,i,offsetL3$3    ; [A_D64P] |39| 

;** --------------------------------------------------------------------------*
;**   BEGIN LOOP $C$L3
;** --------------------------------------------------------------------------*
$C$L3:    
;          EXCLUSIVE CPU CYCLES: 10
	.dwpsn	file "../stereo_vision_sa.sa",line 46,column 1,is_stmt,isa 0

           ADD     .L1X    j,offsetL2,offsetL2$2 ; [A_L66] |48| 
||         MPY     .M1     width$4,offsetL5$3,offsetL5$1 ; [A_M66] |46| 
||         MVK     .L2     1,B2              ; [B_L66] 

	.dwpsn	file "../stereo_vision_sa.sa",line 43,column 1,is_stmt,isa 0
           MV      .L1X    width,width$5     ; [A_L66] |43| 
	.dwpsn	file "../stereo_vision_sa.sa",line 44,column 1,is_stmt,isa 0

           MPY     .M1     width$5,offsetL3$3,offsetL3$2 ; [A_M66] |44| 
||         MV      .L1X    a_1,a_1$3         ; [A_L66] |53| 

	.dwpsn	file "../stereo_vision_sa.sa",line 47,column 1,is_stmt,isa 0

           MV      .L1X    a_1,a_1$2         ; [A_L66] |47| 
||         LDNDW   .D1T2   *+a_1$3(offsetL2$2),w3:w4 ; [A_D64P] |54| 

           MV      .L1X    width,width$1     ; [A_L66] |47| 
	.dwpsn	file "../stereo_vision_sa.sa",line 45,column 1,is_stmt,isa 0

           ADD     .L1X    j,offsetL1',offsetL1 ; [A_L66] |47| 
||         MPY     .M1     width$1,offsetL4$2,offsetL4$3 ; [A_M66] |45| 

	.dwpsn	file "../stereo_vision_sa.sa",line 51,column 1,is_stmt,isa 0

           ADD     .L1X    j,offsetL5$1,offsetL5 ; [A_L66] |51| 
||         LDNDW   .D1T2   *+a_1$2(offsetL1),w1:w2 ; [A_D64P] |53| 

	.dwpsn	file "../stereo_vision_sa.sa",line 55,column 1,is_stmt,isa 0
           MV      .L1X    a_1,a_1$4         ; [A_L66] |55| 
	.dwpsn	file "../stereo_vision_sa.sa",line 54,column 1,is_stmt,isa 0
           MV      .L1X    a_1,a_1$5         ; [A_L66] |54| 
	.dwpsn	file "../stereo_vision_sa.sa",line 56,column 1,is_stmt,isa 0
           MV      .L1X    a_1,a_1$6         ; [A_L66] |56| 
;*----------------------------------------------------------------------------*
;*   SOFTWARE PIPELINE INFORMATION
;*
;*      Loop found in file               : ../stereo_vision_sa.sa
;*      Loop source line                 : 66
;*      Loop closing brace source line   : 126
;*      Known Minimum Trip Count         : 1                    
;*      Known Max Trip Count Factor      : 1
;*      Loop Carried Dependency Bound(^) : 9
;*      Unpartitioned Resource Bound     : 10
;*      Partitioned Resource Bound(*)    : 10
;*      Resource Partition:
;*                                A-side   B-side
;*      .L units                     6        9     
;*      .S units                     0        0     
;*      .D units                     3        2     
;*      .M units                     4        1     
;*      .X cross paths               0        0     
;*      .T address paths             5        5     
;*      Logical  ops (.LS)           0        0     (.L or .S unit)
;*      Addition ops (.LSD)         19       14     (.L or .S or .D unit)
;*      Bound(.L .S .LS)             3        5     
;*      Bound(.L .S .D .LS .LSD)    10*       9     
;*
;*      Searching for software pipeline schedule at ...
;*         ii = 10 Schedule found with 3 iterations in parallel
;*
;*      Register Usage Table:
;*          +-----------------------------------------------------------------+
;*          |AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA|BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB|
;*          |00000000001111111111222222222233|00000000001111111111222222222233|
;*          |01234567890123456789012345678901|01234567890123456789012345678901|
;*          |--------------------------------+--------------------------------|
;*       0: | ******** ****  ******** *******|*********        *** *******    |
;*       1: |**************  ********* **** *|* * ******      **** *******    |
;*       2: |**************  ******** * *** *|**********      **** *******    |
;*       3: |  ************* ********** *****|******** *      **** *******    |
;*       4: |******** ****** ********* ******|********        **** *******    |
;*       5: |******** ****** ****************|*** *****       * ** *******    |
;*       6: |******** ****** ****************|*********       * **********    |
;*       7: |*************** ****************| ********       * **********    |
;*       8: |******** ****** ********** *****|*** ******      * **********    |
;*       9: |******** ****** ********** *****|*** *****        *** *******    |
;*          +-----------------------------------------------------------------+
;*
;*      Done
;*
;*      Loop will be splooped
;*      Collapsed epilog stages       : 2
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
;*      Total cycles (est.)         : 20 + trip_cnt * 10        
;*----------------------------------------------------------------------------*
;*       SETUP CODE
;*
;*                  MVK     1,B2    ; [] 
;*                  MV      A30,B19 ; [] Define a LI twin register
;*                  MV      A29,B18 ; [] Define a LI twin register
;*                  MV      A30,A8  ; [] 
;*                  MV      B2,B17  ; [] 
;*
;*        SINGLE SCHEDULED ITERATION
;*
;*        $C$C77:
;*   3              SUB     .S1     A18,A30,A26       ; [A_S66] |68| 
;*   4              NOP     1       ; [A_L66] 
;*   5              SUB     .S1     A17,A30,A25       ; [A_S66] |69| 
;*   6              SUB     .S1     A16,A30,A14       ; [A_S66] |70| 
;*   7      [ B2]   LDNDW   .D1T1   *+A29(A26),A3:A2  ; [A_D64P] |74| 
;*   8      [ B2]   LDNDW   .D1T1   *+A29(A25),A7:A6  ; [A_D64P] |75| 
;*   9              SUB     .L2X    A19,B19,B3        ; [B_L66] |67|  ^ 
;*     ||   [ B2]   LDNDW   .D1T1   *+A29(A14),A5:A4  ; [A_D64P] |76| 
;*  10              ROTL    .M1     A30,0,A1          ; [A_M66] |124| Post-sched spill
;*     ||   [ B2]   LDNDW   .D2T2   *+B18(B3),B5:B4   ; [B_D64P] |73|  ^ 
;*  11              SUB     .L2X    A20,B19,B1        ; [B_L66] |66| 
;*  12      [ B2]   LDNDW   .D2T2   *+B18(B1),B7:B6   ; [B_D64P] |72| 
;*     ||           AND     .D1     A3,A27,A14        ; [A_D64P] |79| 
;*     ||           ADD     .S1     1,A1,A30          ; [A_S66] |124| 
;*  13              AND     .D1     A7,A27,A0         ; [A_D64P] |80| 
;*     ||           CMPLT   .L1     A30,A28,A1        ; [A_L66] |125| 
;*  14              AND     .D1     A5,A27,A25        ; [A_D64P] |81| 
;*     ||           SUB     .S1     A21,A0,A0         ; [A_S66] |86| 
;*     ||           SUBABS4 .L2X    B25,A2,B8         ; [B_L66] |97| 
;*     ||           SUBABS4 .L1     A12,A6,A24        ; [A_L66] |98| 
;*  15              SUB     .D1     A22,A25,A9        ; [A_D64P] |87| 
;*     ||           SUBABS4 .L2     B26,B4,B20        ; [B_L66] |96|  ^ 
;*     ||           SUBABS4 .L1     A13,A4,A24        ; [A_L66] |99| 
;*     ||           DOTPU4  .M1     A24,A10,A1        ; [A_M66] |104| 
;*  16              AND     .S2X    B5,A27,B8         ; [B_Sb66] |78| 
;*     ||           SUB     .D1     A23,A14,A1        ; [A_D64P] |85| 
;*     ||           ABS     .L1     A9,A9             ; [A_L66] |93| 
;*     ||           DOTPU4  .M1X    B8,A10,A1         ; [A_M66] |103| 
;*     ||   [!A1]   ZERO    .D2     B2                ; [B_D64P] |125| 
;*  17              AND     .S2X    B7,A27,B1         ; [B_Sb66] |77| 
;*     ||           ABS     .L1     A0,A0             ; [A_L66] |92| 
;*     ||           SUBABS4 .L2     B27,B6,B9         ; [B_L66] |95| 
;*     ||           DOTPU4  .M1     A24,A10,A9        ; [A_M66] |105| 
;*  18              ABS     .L1     A1,A25            ; [A_L66] |91| 
;*     ||           DOTPU4  .M2X    B9,A10,B3         ; [B_M66] |101| 
;*     ||           DOTPU4  .M1X    B20,A10,A25       ; [A_M66] |102|  ^ 
;*     ||           CMPLT   .L2     B22,B19,B0        ; [B_L66] |118|  ^ 
;*     ||           ADD     .S2     1,B19,B19         ; [B_Sb66] |124|  ^ Define a twin register
;*  19              SUB     .S2     B24,B1,B8         ; [B_Sb66] |83| 
;*     ||           SUB     .D2     B23,B8,B1         ; [B_D64P] |84| 
;*     ||           ROTL    .M1     A9,0,A1           ; [A_M66] |124| Post-sched spill
;*     ||           ADD     .L1     A0,A1,A26         ; [A_L66] |110| 
;*  20              ABS     .L2     B1,B9             ; [B_L66] |90| 
;*     ||           ADD     .L1     A25,A1,A0         ; [A_L66] |109| 
;*     ||           MV      .S1     A30,A24           ; [A_S66] |124| Split a long life (split-join)
;*     ||           MV      .S2     B2,B16            ; [B_Sb66] |125| Split a long life (split-join)
;*  21              ADD     .S1     A1,A9,A0          ; [A_S66] |111| 
;*     ||           ADD     .L1     A0,A26,A9         ; [A_L66] |114| 
;*  22              ABS     .L2     B8,B1             ; [B_L66] |89| 
;*     ||           ADD     .L1     A9,A0,A9          ; [A_L66] |115| 
;*  23              ADD     .L2     B1,B3,B1          ; [B_L66] |107| 
;*     ||           ADD     .S2X    B9,A25,B3         ; [B_Sb66] |108|  ^ 
;*  24              MVD     .M2     B17,B0            ; [B_M66] |125| Post-sched spill
;*     ||           ADD     .S2     B1,B3,B1          ; [B_Sb66] |113|  ^ 
;*  25              ADD     .S2X    A9,B1,B3          ; [B_Sb66] |116|  ^ 
;*     ||   [ B0]   ZERO    .D2     B1                ; [B_D64P] |120| 
;*  26      [!B0]   CMPLT   .L2     B3,B21,B1         ; [B_L66] |119|  ^ 
;*     ||   [ B2]   SPWBR                             $C$C77 ; [] 
;*  27      [ B1]   MV      .D2     B3,B21            ; [B_D64P] |121| 
;*     ||   [ B1]   MV      .S1     A8,A11            ; [A_S66] |122| 
;*  28      [ B0]   MV      .S1     A11,A31           ; [A_S66] |125| 
;*     ||           MV      .D2     B16,B17           ; [B_D64P] |125| Split a long life (split-join)
;*  29              MV      .S1     A24,A8            ; [A_S66] |124| Split a long life (split-join)
;*  30              ; BRANCHCC OCCURS {$C$C77}        ; [] |126| 
;*
;*       RESTORE CODE
;*
;*                  MV      A31,A11 ; [] 
;*----------------------------------------------------------------------------*
$C$L4:    ; PIPED LOOP PROLOG
;          EXCLUSIVE CPU CYCLES: 21
	.dwpsn	file "../stereo_vision_sa.sa",line 49,column 1,is_stmt,isa 0

   [ B2]   SPLOOPW         10                ;30 ; [A_L66] (P) 
||         ADD     .S1X    j,offsetL3$2,offsetL3 ; [A_S66] |49| 
||         LDNDW   .D1T1   *+a_1$6(offsetL5),w9:w10 ; [A_D64P] |57| 

;** --------------------------------------------------------------------------*
$C$L5:    ; PIPED LOOP KERNEL
;          EXCLUSIVE CPU CYCLES: 10
	.dwpsn	file "../stereo_vision_sa.sa",line 50,column 1,is_stmt,isa 0

           SPMASK                            ; [] 
||^        ADD     .L1X    j,offsetL4$3,offsetL4 ; [A_L66] |50| 
||^        LDNDW   .D1T1   *+a_1$5(offsetL3),A23:w6 ; [A_D64P] |55| 

	.dwpsn	file "../stereo_vision_sa.sa",line 51,column 1,is_stmt,isa 0

           SPMASK                            ; [] 
||^        ADD     .L1X    j,offsetL5$1,offsetL5$2 ; [A_L66] |51| 
||^        LDNDW   .D1T1   *+a_1$4(offsetL4),w7:w8 ; [A_D64P] |56| 

	.dwpsn	file "../stereo_vision_sa.sa",line 36,column 1,is_stmt,isa 0

           SPMASK                            ; [] 
||^        ZERO    .S1     k$1               ; [A_S66] |36| 
||^        ADD     .L1X    j,offsetL3$2,offsetL3$1 ; [A_L66] |49| 

	.dwpsn	file "../stereo_vision_sa.sa",line 68,column 1,is_stmt,isa 0
           SUB     .S1     offsetL3$1,k$1,offsetR3 ; [A_S66] |68| (P) <0,3> 
	.dwpsn	file "../stereo_vision_sa.sa",line 50,column 1,is_stmt,isa 0

           SPMASK                            ; [] 
||^        ADD     .S1X    j,offsetL4$3,offsetL4$1 ; [A_S66] |50| 
||^        AND     .L1     w9,and_one,w9     ; [A_L66] |62| 

	.dwpsn	file "../stereo_vision_sa.sa",line 69,column 1,is_stmt,isa 0

           SPMASK                            ; [] 
||^        MV      .L2X    w6,w6'            ; [B_L66] 
||^        MV      .L1     w9,w9'            ; [A_L66] 
||         SUB     .S1     offsetL4$1,k$1,offsetR4 ; [A_S66] |69| (P) <0,5> 

	.dwpsn	file "../stereo_vision_sa.sa",line 61,column 1,is_stmt,isa 0

           SPMASK                            ; [] 
||^        AND     .L1     w7,and_one,w7     ; [A_L66] |61| 
||         SUB     .S1     offsetL5$2,k$1,offsetR5 ; [A_S66] |70| (P) <0,6> 

	.dwpsn	file "../stereo_vision_sa.sa",line 74,column 1,is_stmt,isa 0

           SPMASK                            ; [] 
||^        MV      .L2X    a_2,a_2'          ; [B_L66] Define a LI twin register
||^        MV      .L1     w8,w8'            ; [A_L66] 
||^        MV      .S1     w7,w7'            ; [A_S66] 
|| [ B2]   LDNDW   .D1T1   *+a_2(offsetR3),w15:w16 ; [A_D64P] |74| (P) <0,7> 

	.dwpsn	file "../stereo_vision_sa.sa",line 36,column 1,is_stmt,isa 0

           SPMASK                            ; [] 
||^        ZERO    .L1     A7                ; [A_L66] |36| 
||^        ZERO    .L2     B19               ; [B_L66] |36| 
||^        AND     .S2X    w1,and_one,w1     ; [B_Sb66] |58| 
|| [ B2]   LDNDW   .D1T1   *+a_2(offsetR4),w17:w18 ; [A_D64P] |75| (P) <0,8> 

	.dwpsn	file "../stereo_vision_sa.sa",line 67,column 1,is_stmt,isa 0

           SPMASK                            ; [] 
||^        MV      .D2     j,j'              ; [B_D64P] 
||^        MV      .S2     w2,w2'            ; [B_Sb66] 
||         SUB     .L2X    offsetL2$1,B19,offsetR2 ; [B_L66] |67| (P) <0,9>  ^ 
|| [ B2]   LDNDW   .D1T1   *+a_2(offsetR5),w19:w20 ; [A_D64P] |76| (P) <0,9> 

	.dwpsn	file "../stereo_vision_sa.sa",line 59,column 1,is_stmt,isa 0

           SPMASK                            ; [] 
||^        AND     .S2X    w3,and_one,w3     ; [B_Sb66] |59| 
||^        MV      .L2     w1,w1'            ; [B_L66] 
||         ROTL    .M1     k$1,0,k$3         ; [A_M66] |124| (P) <0,10> Post-sched spill
|| [ B2]   LDNDW   .D2T2   *+a_2'(offsetR2),w13:w14 ; [B_D64P] |73| (P) <0,10>  ^ 

	.dwpsn	file "../stereo_vision_sa.sa",line 60,column 1,is_stmt,isa 0

           SPMASK                            ; [] 
||^        MV      .D1X    mult_one,mult_one' ; [A_D64P] 
||^        MV      .L1     and_one,and_one'  ; [A_L66] 
||^        AND     .S1     w5,and_one,w5     ; [A_S66] |60| 
||^        MV      .S2     w3,w3'            ; [B_Sb66] 
||         SUB     .L2X    offsetL1,B19,offsetR1 ; [B_L66] |66| (P) <0,11> 

	.dwpsn	file "../stereo_vision_sa.sa",line 72,column 1,is_stmt,isa 0

           SPMASK                            ; [] 
||^        MV      .L1     w10,w10'          ; [A_L66] 
||         ADD     .S1     1,k$3,k$1         ; [A_S66] |124| (P) <0,12> 
|| [ B2]   LDNDW   .D2T2   *+a_2'(offsetR1),w11:w12 ; [B_D64P] |72| (P) <0,12> 
||         AND     .D1     w15,and_one',w15' ; [A_D64P] |79| (P) <0,12> 

	.dwpsn	file "../stereo_vision_sa.sa",line 80,column 1,is_stmt,isa 0

           AND     .D1     w17,and_one',w17' ; [A_D64P] |80| (P) <0,13> 
||         CMPLT   .L1     k$1,a_4,radius_check' ; [A_L66] |125| (P) <0,13> 

	.dwpsn	file "../stereo_vision_sa.sa",line 33,column 1,is_stmt,isa 0

           SPMASK                            ; [] 
||^        MVKL    .S2     0x86a0,minimize   ; [B_Sb66] |33| 
||^        MV      .D2     w4,w4'            ; [B_D64P] 
||         SUB     .S1     w7',w17',absDiff4 ; [A_S66] |86| (P) <0,14> 
||         SUBABS4 .L2X    w6',w16,dotprod3'' ; [B_L66] |97| (P) <0,14> 
||         AND     .D1     w19,and_one',w19' ; [A_D64P] |81| (P) <0,14> 
||         SUBABS4 .L1     w8',w18,dotprod4$3 ; [A_L66] |98| (P) <0,14> 

	.dwpsn	file "../stereo_vision_sa.sa",line 34,column 1,is_stmt,isa 0

           SPMASK                            ; [] 
||^        MVKH    .S2     0x1,minimize      ; [B_Sb66] |34| 
||         SUB     .D1     w9',w19',absDiff5 ; [A_D64P] |87| (P) <0,15> 
||         SUBABS4 .L1     w10',w20,dotprod5'' ; [A_L66] |99| (P) <0,15> 
||         DOTPU4  .M1     dotprod4$3,mult_one',dotprod4$2 ; [A_M66] |104| (P) <0,15> 
||         SUBABS4 .L2     w4',w14,dotprod2'' ; [B_L66] |96| (P) <0,15>  ^ 

	.dwpsn	file "../stereo_vision_sa.sa",line 78,column 1,is_stmt,isa 0

           SPMASK                            ; [] 
||^        MV      .L2     B2,B17            ; [B_L66] 
||         SUB     .D1     w5,w15',absDiff3' ; [A_D64P] |85| (P) <0,16> 
||         DOTPU4  .M1X    dotprod3'',mult_one',dotprod3' ; [A_M66] |103| (P) <0,16> 
||         AND     .S2X    w13,and_one',w13' ; [B_Sb66] |78| (P) <0,16> 
|| [!radius_check'] ZERO .D2 B2              ; [B_D64P] |125| (P) <0,16> 
||         ABS     .L1     absDiff5,absDiff5 ; [A_L66] |93| (P) <0,16> 

	.dwpsn	file "../stereo_vision_sa.sa",line 77,column 1,is_stmt,isa 0

           DOTPU4  .M1     dotprod5'',mult_one',dotprod5 ; [A_M66] |105| (P) <0,17> 
||         AND     .S2X    w11,and_one',w11' ; [B_Sb66] |77| (P) <0,17> 
||         SUBABS4 .L2     w2',w12,dotprod1'' ; [B_L66] |95| (P) <0,17> 
||         ABS     .L1     absDiff4,absDiff4 ; [A_L66] |92| (P) <0,17> 

	.dwpsn	file "../stereo_vision_sa.sa",line 36,column 1,is_stmt,isa 0

           SPMASK                            ; [] 
||^        ZERO    .S1     distance          ; [A_S66] |36| 
||         ABS     .L1     absDiff3',absDiff3 ; [A_L66] |91| (P) <0,18> 
||         DOTPU4  .M1X    dotprod2'',mult_one',dotprod2' ; [A_M66] |102| (P) <0,18>  ^ 
||         ADD     .S2     1,B19,B19         ; [B_Sb66] |124| (P) <0,18>  ^ Define a twin register
||         CMPLT   .L2     j',B19,radius_check'' ; [B_L66] |118| (P) <0,18>  ^ 
||         DOTPU4  .M2X    dotprod1'',mult_one',dotprod1' ; [B_M66] |101| (P) <0,18> 

           SPMASK                            ; [] 
||^        ZERO    .S1     k                 ; [A_S66] |36| 
||         ROTL    .M1     absDiff5,0,absDiff5' ; [A_M66] |124| (P) <0,19> Post-sched spill
||         ADD     .L1     absDiff4,dotprod4$2,dotprod4$1 ; [A_L66] |110| (P) <0,19> 
||         SUB     .S2     w1',w11',absDiff1' ; [B_Sb66] |83| (P) <0,19> 
||         SUB     .D2     w3',w13',absDiff2' ; [B_D64P] |84| (P) <0,19> 

	.dwpsn	file "../stereo_vision_sa.sa",line 90,column 1,is_stmt,isa 0

           MV      .S2     B2,B16            ; [B_Sb66] |125| <0,20> Split a long life (split-join)
||         ADD     .L1     absDiff3,dotprod3',dotprod3 ; [A_L66] |109| <0,20> 
||         ABS     .L2     absDiff2',absDiff2 ; [B_L66] |90| <0,20> 
||         MV      .S1     k$1,k$2           ; [A_S66] |124| <0,20> Split a long life (split-join)

	.dwpsn	file "../stereo_vision_sa.sa",line 111,column 1,is_stmt,isa 0

           ROTL    .M1     k$2,0,k$2         ; [A_M66] |124| <0,21> Post-sched spill
||         ADD     .L1     dotprod3,dotprod4$1,dotprod4 ; [A_L66] |114| <0,21> 
||         ADD     .S1     absDiff5',dotprod5,dotprod5' ; [A_S66] |111| <0,21> 

	.dwpsn	file "../stereo_vision_sa.sa",line 89,column 1,is_stmt,isa 0

           ADD     .L1     dotprod4,dotprod5',dotprod5 ; [A_L66] |115| <0,22> 
||         ABS     .L2     absDiff1',absDiff1 ; [B_L66] |89| <0,22> 

	.dwpsn	file "../stereo_vision_sa.sa",line 107,column 1,is_stmt,isa 0

           MVD     .M1     k,k               ; [A_M66] |124| <0,23> Post-sched spill
||         ADD     .L2     absDiff1,dotprod1',dotprod1 ; [B_L66] |107| <0,23> 
||         ADD     .S2X    absDiff2,dotprod2',dotprod2 ; [B_Sb66] |108| <0,23>  ^ 

	.dwpsn	file "../stereo_vision_sa.sa",line 113,column 1,is_stmt,isa 0

           MVD     .M1     k$2,k$2           ; [A_M66] |124| <0,24> Post-sched spill
||         MVD     .M2     B17,B0            ; [B_M66] |125| <0,24> Post-sched spill
||         ADD     .S2     dotprod1,dotprod2,sum' ; [B_Sb66] |113| <0,24>  ^ 

	.dwpsn	file "../stereo_vision_sa.sa",line 116,column 1,is_stmt,isa 0

   [ radius_check''] ZERO .D2 sum_check      ; [B_D64P] |120| <0,25> 
||         ADD     .S2X    dotprod5,sum',sum ; [B_Sb66] |116| <0,25>  ^ 

	.dwpsn	file "../stereo_vision_sa.sa",line 119,column 1,is_stmt,isa 0
   [!radius_check''] CMPLT .L2 sum,minimize,sum_check ; [B_L66] |119| <0,26>  ^ 
	.dwpsn	file "../stereo_vision_sa.sa",line 121,column 1,is_stmt,isa 0

   [ sum_check] MV .D2     sum,minimize      ; [B_D64P] |121| <0,27> 
|| [ sum_check] MV .S1     k,distance        ; [A_S66] |122| <0,27> 

	.dwpsn	file "../stereo_vision_sa.sa",line 125,column 1,is_stmt,isa 0

           MV      .D2     B16,B17           ; [B_D64P] |125| <0,28> Split a long life (split-join)
|| [ B0]   MV      .S1     distance,distance'' ; [A_S66] |125| <0,28> 

	.dwpsn	file "../stereo_vision_sa.sa",line 124,column 1,is_stmt,isa 0

           SPKERNEL        0,0               ; [] 
||         MV      .S1     k$2,k             ; [A_S66] |124| <0,29> Split a long life (split-join)

;** --------------------------------------------------------------------------*
$C$L6:    ; PIPED LOOP EPILOG
;** --------------------------------------------------------------------------*
;          EXCLUSIVE CPU CYCLES: 10
	.dwpsn	file "../stereo_vision_sa.sa",line 129,column 1,is_stmt,isa 0

           ADD     .L1X    i,a_5,index'      ; [A_L66] |129| 
||         MV      .S1     distance'',distance' ; [A_S66] 
||         MV      .D1     and_one',and_one  ; [A_D64P] 
||         MV      .L2X    mult_one',mult_one ; [B_L66] 

           MV      .L1X    width,width$2     ; [A_L66] |129| 
	.dwpsn	file "../stereo_vision_sa.sa",line 130,column 1,is_stmt,isa 0

           ADD     .L2     1,j',j            ; [B_L66] |135| 
||         MPY     .M1     width$2,index',index ; [A_M66] |130| 
||         MV      .L1X    a_3,a_3''         ; [A_L66] |132| 

	.dwpsn	file "../stereo_vision_sa.sa",line 136,column 1,is_stmt,isa 0
           CMPLT   .L2     j,maxWidth,radius_check ; [B_L66] |136| 
	.dwpsn	file "../stereo_vision_sa.sa",line 38,column 1,is_stmt,isa 0

   [ radius_check] B .S2   $C$L3             ; [B_Sb66] |137| 
||         MV      .L1X    width,width$4     ; [A_L66] |42| 
||         ADD     .S1     1,i,offsetL2$3    ; [A_S66] |38| 
|| [ radius_check] ADD .D1 3,i,offsetL4$2    ; [A_D64P] |40| 

	.dwpsn	file "../stereo_vision_sa.sa",line 41,column 1,is_stmt,isa 0

           MPY     .M1     width$4,offsetL2$3,offsetL2 ; [A_M66] |43| 
||         ADD     .L1X    j',index,index    ; [A_L66] |131| 
|| [ radius_check] ADD .S1 4,i,offsetL5$3    ; [A_S66] |41| 

           MV      .L1X    width,width$3     ; [A_L66] 
	.dwpsn	file "../stereo_vision_sa.sa",line 42,column 1,is_stmt,isa 0

           ADD     .L1X    a_5,index,index   ; [A_L66] |132| 
||         MPY     .M1     i,width$3,offsetL1' ; [A_M66] |42| 
|| [!radius_check] ADD .S1 1,i,i             ; [A_S66] |139| 

	.dwpsn	file "../stereo_vision_sa.sa",line 39,column 1,is_stmt,isa 0

           STB     .D1T1   distance',*+a_3''[index] ; [A_D64P] |133| 
||         ADD     .L1X    j,offsetL2,offsetL2$1 ; [A_L66] |48| 
|| [ radius_check] ADD .S1 2,i,offsetL3$3    ; [A_S66] |39| 

	.dwpsn	file "../stereo_vision_sa.sa",line 53,column 1,is_stmt,isa 0
   [ radius_check] MV .L1X width,width$4     ; [A_L66] |53| 
	.dwpsn	file "../stereo_vision_sa.sa",line 137,column 1,is_stmt,isa 0
           ; BRANCHCC OCCURS {$C$L3}         ; [] |137| 
;** --------------------------------------------------------------------------*
;          EXCLUSIVE CPU CYCLES: 7
;                   .return
	.dwpsn	file "../stereo_vision_sa.sa",line 140,column 1,is_stmt,isa 0
           CMPLT   .L1X    i,maxHeight,radius_check' ; [A_L66] |140| 
	.dwpsn	file "../stereo_vision_sa.sa",line 29,column 1,is_stmt,isa 0

   [ radius_check'] BNOP   $C$L1,5           ; [] |141| 
|| [ radius_check'] ZERO .L2 j               ; [B_L66] |29|  Loop variable j

	.dwpsn	file "../stereo_vision_sa.sa",line 141,column 1,is_stmt,isa 0
           ; BRANCHCC OCCURS {$C$L1}         ; [] |141| 
;** --------------------------------------------------------------------------*
;          EXCLUSIVE CPU CYCLES: 1
	.dwpsn	file "../stereo_vision_sa.sa",line 144,column 1,is_stmt,isa 0
$C$DW$64	.dwtag  DW_TAG_TI_branch
	.dwattr $C$DW$64, DW_AT_low_pc(0x00)
	.dwattr $C$DW$64, DW_AT_name("__c6xabi_pop_rts")
	.dwattr $C$DW$64, DW_AT_TI_call
	.dwattr $C$DW$64, DW_AT_TI_return


           RETP    .S1     __c6xabi_pop_rts,A3 ; [A_S66] |144| 
||         MV      .L2     B13,B3            ; [B_L66] |144| 

	.dwcfi	restore_reg, 19
$C$RL1:    ; CALLP OCCURS {__c6xabi_pop_rts}   ; [] |144| 
	.dwattr $C$DW$1, DW_AT_TI_end_file("../stereo_vision_sa.sa")
	.dwattr $C$DW$1, DW_AT_TI_end_line(0x90)
	.dwattr $C$DW$1, DW_AT_TI_end_column(0x01)
	.dwendentry
	.dwendtag $C$DW$1

	.clearmap


;                   .endproc
;*****************************************************************************
;* UNDEFINED EXTERNAL REFERENCES                                             *
;*****************************************************************************
	.global	__c6xabi_push_rts
	.global	__c6xabi_pop_rts

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

$C$DW$65	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$65, DW_AT_name("A0")
	.dwattr $C$DW$65, DW_AT_location[DW_OP_reg0]

$C$DW$66	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$66, DW_AT_name("A1")
	.dwattr $C$DW$66, DW_AT_location[DW_OP_reg1]

$C$DW$67	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$67, DW_AT_name("A2")
	.dwattr $C$DW$67, DW_AT_location[DW_OP_reg2]

$C$DW$68	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$68, DW_AT_name("A3")
	.dwattr $C$DW$68, DW_AT_location[DW_OP_reg3]

$C$DW$69	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$69, DW_AT_name("A4")
	.dwattr $C$DW$69, DW_AT_location[DW_OP_reg4]

$C$DW$70	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$70, DW_AT_name("A5")
	.dwattr $C$DW$70, DW_AT_location[DW_OP_reg5]

$C$DW$71	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$71, DW_AT_name("A6")
	.dwattr $C$DW$71, DW_AT_location[DW_OP_reg6]

$C$DW$72	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$72, DW_AT_name("A7")
	.dwattr $C$DW$72, DW_AT_location[DW_OP_reg7]

$C$DW$73	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$73, DW_AT_name("A8")
	.dwattr $C$DW$73, DW_AT_location[DW_OP_reg8]

$C$DW$74	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$74, DW_AT_name("A9")
	.dwattr $C$DW$74, DW_AT_location[DW_OP_reg9]

$C$DW$75	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$75, DW_AT_name("A10")
	.dwattr $C$DW$75, DW_AT_location[DW_OP_reg10]

$C$DW$76	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$76, DW_AT_name("A11")
	.dwattr $C$DW$76, DW_AT_location[DW_OP_reg11]

$C$DW$77	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$77, DW_AT_name("A12")
	.dwattr $C$DW$77, DW_AT_location[DW_OP_reg12]

$C$DW$78	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$78, DW_AT_name("A13")
	.dwattr $C$DW$78, DW_AT_location[DW_OP_reg13]

$C$DW$79	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$79, DW_AT_name("A14")
	.dwattr $C$DW$79, DW_AT_location[DW_OP_reg14]

$C$DW$80	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$80, DW_AT_name("A15")
	.dwattr $C$DW$80, DW_AT_location[DW_OP_reg15]

$C$DW$81	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$81, DW_AT_name("FP")
	.dwattr $C$DW$81, DW_AT_location[DW_OP_regx 0x20]

$C$DW$82	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$82, DW_AT_name("A16")
	.dwattr $C$DW$82, DW_AT_location[DW_OP_regx 0x25]

$C$DW$83	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$83, DW_AT_name("A17")
	.dwattr $C$DW$83, DW_AT_location[DW_OP_regx 0x26]

$C$DW$84	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$84, DW_AT_name("A18")
	.dwattr $C$DW$84, DW_AT_location[DW_OP_regx 0x27]

$C$DW$85	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$85, DW_AT_name("A19")
	.dwattr $C$DW$85, DW_AT_location[DW_OP_regx 0x28]

$C$DW$86	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$86, DW_AT_name("A20")
	.dwattr $C$DW$86, DW_AT_location[DW_OP_regx 0x29]

$C$DW$87	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$87, DW_AT_name("A21")
	.dwattr $C$DW$87, DW_AT_location[DW_OP_regx 0x2a]

$C$DW$88	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$88, DW_AT_name("A22")
	.dwattr $C$DW$88, DW_AT_location[DW_OP_regx 0x2b]

$C$DW$89	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$89, DW_AT_name("A23")
	.dwattr $C$DW$89, DW_AT_location[DW_OP_regx 0x2c]

$C$DW$90	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$90, DW_AT_name("A24")
	.dwattr $C$DW$90, DW_AT_location[DW_OP_regx 0x2d]

$C$DW$91	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$91, DW_AT_name("A25")
	.dwattr $C$DW$91, DW_AT_location[DW_OP_regx 0x2e]

$C$DW$92	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$92, DW_AT_name("A26")
	.dwattr $C$DW$92, DW_AT_location[DW_OP_regx 0x2f]

$C$DW$93	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$93, DW_AT_name("A27")
	.dwattr $C$DW$93, DW_AT_location[DW_OP_regx 0x30]

$C$DW$94	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$94, DW_AT_name("A28")
	.dwattr $C$DW$94, DW_AT_location[DW_OP_regx 0x31]

$C$DW$95	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$95, DW_AT_name("A29")
	.dwattr $C$DW$95, DW_AT_location[DW_OP_regx 0x32]

$C$DW$96	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$96, DW_AT_name("A30")
	.dwattr $C$DW$96, DW_AT_location[DW_OP_regx 0x33]

$C$DW$97	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$97, DW_AT_name("A31")
	.dwattr $C$DW$97, DW_AT_location[DW_OP_regx 0x34]

$C$DW$98	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$98, DW_AT_name("B0")
	.dwattr $C$DW$98, DW_AT_location[DW_OP_reg16]

$C$DW$99	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$99, DW_AT_name("B1")
	.dwattr $C$DW$99, DW_AT_location[DW_OP_reg17]

$C$DW$100	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$100, DW_AT_name("B2")
	.dwattr $C$DW$100, DW_AT_location[DW_OP_reg18]

$C$DW$101	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$101, DW_AT_name("B3")
	.dwattr $C$DW$101, DW_AT_location[DW_OP_reg19]

$C$DW$102	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$102, DW_AT_name("B4")
	.dwattr $C$DW$102, DW_AT_location[DW_OP_reg20]

$C$DW$103	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$103, DW_AT_name("B5")
	.dwattr $C$DW$103, DW_AT_location[DW_OP_reg21]

$C$DW$104	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$104, DW_AT_name("B6")
	.dwattr $C$DW$104, DW_AT_location[DW_OP_reg22]

$C$DW$105	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$105, DW_AT_name("B7")
	.dwattr $C$DW$105, DW_AT_location[DW_OP_reg23]

$C$DW$106	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$106, DW_AT_name("B8")
	.dwattr $C$DW$106, DW_AT_location[DW_OP_reg24]

$C$DW$107	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$107, DW_AT_name("B9")
	.dwattr $C$DW$107, DW_AT_location[DW_OP_reg25]

$C$DW$108	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$108, DW_AT_name("B10")
	.dwattr $C$DW$108, DW_AT_location[DW_OP_reg26]

$C$DW$109	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$109, DW_AT_name("B11")
	.dwattr $C$DW$109, DW_AT_location[DW_OP_reg27]

$C$DW$110	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$110, DW_AT_name("B12")
	.dwattr $C$DW$110, DW_AT_location[DW_OP_reg28]

$C$DW$111	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$111, DW_AT_name("B13")
	.dwattr $C$DW$111, DW_AT_location[DW_OP_reg29]

$C$DW$112	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$112, DW_AT_name("DP")
	.dwattr $C$DW$112, DW_AT_location[DW_OP_reg30]

$C$DW$113	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$113, DW_AT_name("SP")
	.dwattr $C$DW$113, DW_AT_location[DW_OP_reg31]

$C$DW$114	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$114, DW_AT_name("B16")
	.dwattr $C$DW$114, DW_AT_location[DW_OP_regx 0x35]

$C$DW$115	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$115, DW_AT_name("B17")
	.dwattr $C$DW$115, DW_AT_location[DW_OP_regx 0x36]

$C$DW$116	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$116, DW_AT_name("B18")
	.dwattr $C$DW$116, DW_AT_location[DW_OP_regx 0x37]

$C$DW$117	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$117, DW_AT_name("B19")
	.dwattr $C$DW$117, DW_AT_location[DW_OP_regx 0x38]

$C$DW$118	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$118, DW_AT_name("B20")
	.dwattr $C$DW$118, DW_AT_location[DW_OP_regx 0x39]

$C$DW$119	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$119, DW_AT_name("B21")
	.dwattr $C$DW$119, DW_AT_location[DW_OP_regx 0x3a]

$C$DW$120	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$120, DW_AT_name("B22")
	.dwattr $C$DW$120, DW_AT_location[DW_OP_regx 0x3b]

$C$DW$121	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$121, DW_AT_name("B23")
	.dwattr $C$DW$121, DW_AT_location[DW_OP_regx 0x3c]

$C$DW$122	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$122, DW_AT_name("B24")
	.dwattr $C$DW$122, DW_AT_location[DW_OP_regx 0x3d]

$C$DW$123	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$123, DW_AT_name("B25")
	.dwattr $C$DW$123, DW_AT_location[DW_OP_regx 0x3e]

$C$DW$124	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$124, DW_AT_name("B26")
	.dwattr $C$DW$124, DW_AT_location[DW_OP_regx 0x3f]

$C$DW$125	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$125, DW_AT_name("B27")
	.dwattr $C$DW$125, DW_AT_location[DW_OP_regx 0x40]

$C$DW$126	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$126, DW_AT_name("B28")
	.dwattr $C$DW$126, DW_AT_location[DW_OP_regx 0x41]

$C$DW$127	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$127, DW_AT_name("B29")
	.dwattr $C$DW$127, DW_AT_location[DW_OP_regx 0x42]

$C$DW$128	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$128, DW_AT_name("B30")
	.dwattr $C$DW$128, DW_AT_location[DW_OP_regx 0x43]

$C$DW$129	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$129, DW_AT_name("B31")
	.dwattr $C$DW$129, DW_AT_location[DW_OP_regx 0x44]

$C$DW$130	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$130, DW_AT_name("PC")
	.dwattr $C$DW$130, DW_AT_location[DW_OP_regx 0x21]

$C$DW$131	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$131, DW_AT_name("PCE1")
	.dwattr $C$DW$131, DW_AT_location[DW_OP_regx 0x21]

$C$DW$132	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$132, DW_AT_name("IRP")
	.dwattr $C$DW$132, DW_AT_location[DW_OP_regx 0x22]

$C$DW$133	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$133, DW_AT_name("IFR")
	.dwattr $C$DW$133, DW_AT_location[DW_OP_regx 0x23]

$C$DW$134	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$134, DW_AT_name("NRP")
	.dwattr $C$DW$134, DW_AT_location[DW_OP_regx 0x24]

$C$DW$135	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$135, DW_AT_name("CSR")
	.dwattr $C$DW$135, DW_AT_location[DW_OP_regx 0x46]

$C$DW$136	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$136, DW_AT_name("CSR")
	.dwattr $C$DW$136, DW_AT_location[DW_OP_regx 0x46]

$C$DW$137	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$137, DW_AT_name("SSR")
	.dwattr $C$DW$137, DW_AT_location[DW_OP_regx 0x5b]

$C$DW$138	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$138, DW_AT_name("CSR")
	.dwattr $C$DW$138, DW_AT_location[DW_OP_regx 0x46]

$C$DW$139	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$139, DW_AT_name("AMR")
	.dwattr $C$DW$139, DW_AT_location[DW_OP_regx 0x45]

$C$DW$140	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$140, DW_AT_name("ISR")
	.dwattr $C$DW$140, DW_AT_location[DW_OP_regx 0x47]

$C$DW$141	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$141, DW_AT_name("ICR")
	.dwattr $C$DW$141, DW_AT_location[DW_OP_regx 0x48]

$C$DW$142	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$142, DW_AT_name("IER")
	.dwattr $C$DW$142, DW_AT_location[DW_OP_regx 0x49]

$C$DW$143	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$143, DW_AT_name("ISTP")
	.dwattr $C$DW$143, DW_AT_location[DW_OP_regx 0x4a]

$C$DW$144	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$144, DW_AT_name("IN")
	.dwattr $C$DW$144, DW_AT_location[DW_OP_regx 0x4b]

$C$DW$145	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$145, DW_AT_name("OUT")
	.dwattr $C$DW$145, DW_AT_location[DW_OP_regx 0x4c]

$C$DW$146	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$146, DW_AT_name("ACR")
	.dwattr $C$DW$146, DW_AT_location[DW_OP_regx 0x4d]

$C$DW$147	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$147, DW_AT_name("ADR")
	.dwattr $C$DW$147, DW_AT_location[DW_OP_regx 0x4e]

$C$DW$148	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$148, DW_AT_name("FADCR")
	.dwattr $C$DW$148, DW_AT_location[DW_OP_regx 0x4f]

$C$DW$149	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$149, DW_AT_name("FAUCR")
	.dwattr $C$DW$149, DW_AT_location[DW_OP_regx 0x50]

$C$DW$150	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$150, DW_AT_name("FMCR")
	.dwattr $C$DW$150, DW_AT_location[DW_OP_regx 0x51]

$C$DW$151	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$151, DW_AT_name("GFPGFR")
	.dwattr $C$DW$151, DW_AT_location[DW_OP_regx 0x52]

$C$DW$152	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$152, DW_AT_name("DIER")
	.dwattr $C$DW$152, DW_AT_location[DW_OP_regx 0x53]

$C$DW$153	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$153, DW_AT_name("REP")
	.dwattr $C$DW$153, DW_AT_location[DW_OP_regx 0x54]

$C$DW$154	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$154, DW_AT_name("TSCL")
	.dwattr $C$DW$154, DW_AT_location[DW_OP_regx 0x55]

$C$DW$155	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$155, DW_AT_name("TSCH")
	.dwattr $C$DW$155, DW_AT_location[DW_OP_regx 0x56]

$C$DW$156	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$156, DW_AT_name("ARP")
	.dwattr $C$DW$156, DW_AT_location[DW_OP_regx 0x57]

$C$DW$157	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$157, DW_AT_name("ILC")
	.dwattr $C$DW$157, DW_AT_location[DW_OP_regx 0x58]

$C$DW$158	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$158, DW_AT_name("RILC")
	.dwattr $C$DW$158, DW_AT_location[DW_OP_regx 0x59]

$C$DW$159	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$159, DW_AT_name("DNUM")
	.dwattr $C$DW$159, DW_AT_location[DW_OP_regx 0x5a]

$C$DW$160	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$160, DW_AT_name("GPLYA")
	.dwattr $C$DW$160, DW_AT_location[DW_OP_regx 0x5c]

$C$DW$161	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$161, DW_AT_name("GPLYB")
	.dwattr $C$DW$161, DW_AT_location[DW_OP_regx 0x5d]

$C$DW$162	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$162, DW_AT_name("TSR")
	.dwattr $C$DW$162, DW_AT_location[DW_OP_regx 0x5e]

$C$DW$163	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$163, DW_AT_name("ITSR")
	.dwattr $C$DW$163, DW_AT_location[DW_OP_regx 0x5f]

$C$DW$164	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$164, DW_AT_name("NTSR")
	.dwattr $C$DW$164, DW_AT_location[DW_OP_regx 0x60]

$C$DW$165	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$165, DW_AT_name("EFR")
	.dwattr $C$DW$165, DW_AT_location[DW_OP_regx 0x61]

$C$DW$166	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$166, DW_AT_name("ECR")
	.dwattr $C$DW$166, DW_AT_location[DW_OP_regx 0x62]

$C$DW$167	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$167, DW_AT_name("IERR")
	.dwattr $C$DW$167, DW_AT_location[DW_OP_regx 0x63]

$C$DW$168	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$168, DW_AT_name("DMSG")
	.dwattr $C$DW$168, DW_AT_location[DW_OP_regx 0x64]

$C$DW$169	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$169, DW_AT_name("CMSG")
	.dwattr $C$DW$169, DW_AT_location[DW_OP_regx 0x65]

$C$DW$170	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$170, DW_AT_name("DT_DMA_ADDR")
	.dwattr $C$DW$170, DW_AT_location[DW_OP_regx 0x66]

$C$DW$171	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$171, DW_AT_name("DT_DMA_DATA")
	.dwattr $C$DW$171, DW_AT_location[DW_OP_regx 0x67]

$C$DW$172	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$172, DW_AT_name("DT_DMA_CNTL")
	.dwattr $C$DW$172, DW_AT_location[DW_OP_regx 0x68]

$C$DW$173	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$173, DW_AT_name("TCU_CNTL")
	.dwattr $C$DW$173, DW_AT_location[DW_OP_regx 0x69]

$C$DW$174	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$174, DW_AT_name("RTDX_REC_CNTL")
	.dwattr $C$DW$174, DW_AT_location[DW_OP_regx 0x6a]

$C$DW$175	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$175, DW_AT_name("RTDX_XMT_CNTL")
	.dwattr $C$DW$175, DW_AT_location[DW_OP_regx 0x6b]

$C$DW$176	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$176, DW_AT_name("RTDX_CFG")
	.dwattr $C$DW$176, DW_AT_location[DW_OP_regx 0x6c]

$C$DW$177	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$177, DW_AT_name("RTDX_RDATA")
	.dwattr $C$DW$177, DW_AT_location[DW_OP_regx 0x6d]

$C$DW$178	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$178, DW_AT_name("RTDX_WDATA")
	.dwattr $C$DW$178, DW_AT_location[DW_OP_regx 0x6e]

$C$DW$179	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$179, DW_AT_name("RTDX_RADDR")
	.dwattr $C$DW$179, DW_AT_location[DW_OP_regx 0x6f]

$C$DW$180	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$180, DW_AT_name("RTDX_WADDR")
	.dwattr $C$DW$180, DW_AT_location[DW_OP_regx 0x70]

$C$DW$181	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$181, DW_AT_name("MFREG0")
	.dwattr $C$DW$181, DW_AT_location[DW_OP_regx 0x71]

$C$DW$182	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$182, DW_AT_name("DBG_STAT")
	.dwattr $C$DW$182, DW_AT_location[DW_OP_regx 0x72]

$C$DW$183	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$183, DW_AT_name("BRK_EN")
	.dwattr $C$DW$183, DW_AT_location[DW_OP_regx 0x73]

$C$DW$184	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$184, DW_AT_name("HWBP0_CNT")
	.dwattr $C$DW$184, DW_AT_location[DW_OP_regx 0x74]

$C$DW$185	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$185, DW_AT_name("HWBP0")
	.dwattr $C$DW$185, DW_AT_location[DW_OP_regx 0x75]

$C$DW$186	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$186, DW_AT_name("HWBP1")
	.dwattr $C$DW$186, DW_AT_location[DW_OP_regx 0x76]

$C$DW$187	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$187, DW_AT_name("HWBP2")
	.dwattr $C$DW$187, DW_AT_location[DW_OP_regx 0x77]

$C$DW$188	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$188, DW_AT_name("HWBP3")
	.dwattr $C$DW$188, DW_AT_location[DW_OP_regx 0x78]

$C$DW$189	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$189, DW_AT_name("OVERLAY")
	.dwattr $C$DW$189, DW_AT_location[DW_OP_regx 0x79]

$C$DW$190	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$190, DW_AT_name("PC_PROF")
	.dwattr $C$DW$190, DW_AT_location[DW_OP_regx 0x7a]

$C$DW$191	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$191, DW_AT_name("ATSR")
	.dwattr $C$DW$191, DW_AT_location[DW_OP_regx 0x7b]

$C$DW$192	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$192, DW_AT_name("TRR")
	.dwattr $C$DW$192, DW_AT_location[DW_OP_regx 0x7c]

$C$DW$193	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$193, DW_AT_name("TCRR")
	.dwattr $C$DW$193, DW_AT_location[DW_OP_regx 0x7d]

$C$DW$194	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$194, DW_AT_name("DESR")
	.dwattr $C$DW$194, DW_AT_location[DW_OP_regx 0x7e]

$C$DW$195	.dwtag  DW_TAG_TI_assign_register
	.dwattr $C$DW$195, DW_AT_name("DETR")
	.dwattr $C$DW$195, DW_AT_location[DW_OP_regx 0x7f]

	.dwendtag $C$DW$CU

