#define Height 223
#define Width 280

typedef long long ll;
typedef const long long cll;

// TODO: optimise this function for better performance
void stereo_vision_c(const unsigned char *L, const unsigned char *R, unsigned char * restrict Disparity_Map, const int Search_Range, const int Radius)
{
    int i,j,k;

    for (i=0;i<Height-Radius-Radius;i++)
    {
        for (j=0;j<Width-Radius-Radius;j++)
        {
            int Distance=0;
            int Minimize=100000;
            for (k=0;k<Search_Range;k++)
            {
                int Sum=0;

                cll lb0 = _mem8_const(&L[(i)*Width+(j)]) & 0xFFFFFFFFFF;
                cll lb1 = _mem8_const(&L[(i+1)*Width+(j)]) & 0xFFFFFFFFFF;
                cll lb2 = _mem8_const(&L[(i+2)*Width+(j)]) & 0xFFFFFFFFFF;
                cll lb3 = _mem8_const(&L[(i+3)*Width+(j)]) & 0xFFFFFFFFFF;
                cll lb4 = _mem8_const(&L[(i+4)*Width+(j)]) & 0xFFFFFFFFFF;

                cll rb0 = _mem8_const(&R[(i)*Width+(j-k)]) & 0xFFFFFFFFFF;
                cll rb1 = _mem8_const(&R[(i+1)*Width+(j-k)]) & 0xFFFFFFFFFF;
                cll rb2 = _mem8_const(&R[(i+2)*Width+(j-k)]) & 0xFFFFFFFFFF;
                cll rb3 = _mem8_const(&R[(i+3)*Width+(j-k)]) & 0xFFFFFFFFFF;
                cll rb4 = _mem8_const(&R[(i+4)*Width+(j-k)]) & 0xFFFFFFFFFF;

                Sum = _abs(_hill(lb0) - _hill(rb0)) + _dotpu4(_subabs4(_loll(lb0), _loll(rb0)), 0x01010101);
                Sum += _abs(_hill(lb1) - _hill(rb1)) + _dotpu4(_subabs4(_loll(lb1), _loll(rb1)), 0x01010101);
                Sum += _abs(_hill(lb2) - _hill(rb2)) + _dotpu4(_subabs4(_loll(lb2), _loll(rb2)), 0x01010101);
                Sum += _abs(_hill(lb3) - _hill(rb3)) + _dotpu4(_subabs4(_loll(lb3), _loll(rb3)), 0x01010101);
                Sum += _abs(_hill(lb4) - _hill(rb4)) + _dotpu4(_subabs4(_loll(lb4), _loll(rb4)), 0x01010101);

                int sumCheck = !(j < k) && (Sum < Minimize);

                Minimize = (sumCheck) ? Sum : Minimize;
                Distance = (sumCheck) ? k : Distance;
            }
            Disparity_Map[(i+Radius)*Width+(j+Radius)] = Distance;
        }
    }
}
