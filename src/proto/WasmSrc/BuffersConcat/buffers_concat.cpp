#include <emscripten.h>
#include <cstdio>
#include <string>

char*	g_arg1 = NULL;
int		g_arg1_size = 0;

char*	g_arg2 = NULL;
int		g_arg2_size = 0;

char*	g_res = NULL;

EMSCRIPTEN_KEEPALIVE
char* init_arg1( int size )
{
	g_arg1_size = size;

	g_arg1 = new char [size];

	return g_arg1;
}

EMSCRIPTEN_KEEPALIVE
char* init_arg2( int size )
{
	g_arg2_size = size;

	g_arg2 = new char[size];

	return g_arg2;
}

EMSCRIPTEN_KEEPALIVE
bool Exec( )
{
	if ( g_arg1 && g_arg2 )
	{
		g_res = new char [g_arg1_size + g_arg2_size];

		memcpy( ( void* ) g_res, ( void* ) g_arg1, g_arg1_size );
		
		memcpy( ( void* ) ( &g_res[g_arg1_size] ), g_arg2, g_arg2_size );

		return true;
	}
	else
		return false;
}

EMSCRIPTEN_KEEPALIVE
char* get_result_pointer( )
{
	return g_res;
}

EMSCRIPTEN_KEEPALIVE
int get_result_size( )
{
	return g_arg1_size + g_arg2_size;
}