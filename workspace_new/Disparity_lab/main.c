#include <xdc/std.h>
#include <xdc/runtime/Types.h>
#include <xdc/cfg/global.h>
#include <xdc/runtime/Log.h>
#include <xdc/runtime/Diags.h>
#include <xdc/runtime/IHeap.h>
#include <xdc/runtime/Memory.h>
#include <xdc/runtime/System.h>

#include <ti/uia/events/UIABenchmark.h>
#include <ti/uia/runtime/LogSync.h>

#include <xdc/runtime/System.h>
#include <xdc/runtime/Timestamp.h>
#include <ti/sysbios/knl/Clock.h>
#include <stdio.h>
#include <string.h>


#include "Left1.h"
#include "Right1.h"
#include "GT.h"

#define Height 223
#define Width 280
#define TS64_TO_ULL(ts) ((unsigned long long)ts.lo) | (((unsigned long long)ts.hi) << 32)
#define FQ64_TO_FLOAT(fq) (float)(TS64_TO_ULL(fq))

#pragma DATA_ALIGN(L, 128);
#pragma DATA_ALIGN(R, 128);
#pragma DATA_ALIGN(Disparity_Map, 128);


unsigned char L[Height*Width] = {Left};
unsigned char R[Height*Width] = {Right};
unsigned char Disparity_Map[Height*Width];
unsigned char GroundTruth[Height*Width] = {GT};

extern void stereo_vision_c(unsigned char *L, unsigned char *R, unsigned char * restrict Disparity_Map, int Search_Range, int Radius);
extern void stereo_vision_sa(unsigned char *L, unsigned char *R, unsigned char * restrict Disparity_Map, int Search_Range, int Radius);


float verify_result(unsigned char* A, unsigned char* B)
{
    int cnt = 0;
    int i, j;
    for (i = 0; i < Height; i++)
    {
        for (j = 0; j < Width; j++)
        {
            if (A[i*Width + j] != B[i*Width + j]) cnt++;
        }
    }
    return cnt*100/(float)(Height*Width);
}


int main()
{

    Types_FreqHz freq;
    Timestamp_getFreq(&freq);
    Types_Timestamp64 start, stop;
    float tdiff1, tdiff2, err1, err2;

    System_printf("start\n");

    // set output buffer to zero
    memset(Disparity_Map, 0, Height*Width);



    // C code
    Timestamp_get64(&start);
    stereo_vision_c(L, R, Disparity_Map, 60, 2);
    Timestamp_get64(&stop);

    err1 = verify_result(GroundTruth, Disparity_Map);
    tdiff1 = ((TS64_TO_ULL(stop)) - (TS64_TO_ULL(start))) / FQ64_TO_FLOAT(freq);

    // TODO: when you start working on linear assembly, uncomment this line below to reset output buffer to zero
    memset(Disparity_Map, 0, Height*Width);

    // linear assembly
    Timestamp_get64(&start);
    stereo_vision_sa(L, R, Disparity_Map, 60, 2);
    Timestamp_get64(&stop);

    err2 = verify_result(GroundTruth, Disparity_Map);
    tdiff2 = ((TS64_TO_ULL(stop)) - (TS64_TO_ULL(start))) / FQ64_TO_FLOAT(freq);


    System_printf("C code %f seconds, error rate %f%, SA code %f seconds, error rate %f%\n", tdiff1, err1, tdiff2, err2);

    return 0;
}

