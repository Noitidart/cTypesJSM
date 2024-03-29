var EXPORTED_SYMBOLS = ['ostypes'];
Components.utils.import("resource://gre/modules/ctypes.jsm");

var ostypes = new function() {
	this.is64 = ctypes.size_t.size == 8; // can also try firetray.Handler.runtimeABI.indexOf('_64') > -1;
	this.abi = this.is64 ? ctypes.default_abi : ctypes.winapi_abi;
	this.cb_abi = this.is64 ? ctypes.default_abi : ctypes.stdcall_abi;
	
	this.BOOL      = ctypes.bool;
	this.BYTE      = ctypes.unsigned_char;
	this.INT_PTR   = this.is64 ? ctypes.int64_t  : ctypes.int;
	this.UINT      = ctypes.unsigned_int;
	this.UINT_PTR  = this.is64 ? ctypes.uint64_t : ctypes.unsigned_int;
	this.WORD      = ctypes.unsigned_short;
	this.DWORD     = ctypes.unsigned_long;
	this.LPDWORD   = this.DWORD.ptr;
	this.PVOID     = ctypes.voidptr_t;
	this.LPVOID    = ctypes.voidptr_t;
	this.LONG      = ctypes.long;
	this.LONG_PTR  = this.is64 ? ctypes.int64_t  : ctypes.long;
	this.ULONG_PTR = this.is64 ? ctypes.uint64_t : ctypes.unsigned_long;
	this.SIZE_T    = this.ULONG_PTR;
	this.DWORD_PTR = this.ULONG_PTR;
	this.ATOM      = this.WORD;
	this.HANDLE    = ctypes.voidptr_t;
	this.HWND      = this.HANDLE;
	this.HICON     = this.HANDLE;
	this.HINSTANCE = this.HANDLE;
	this.HMODULE   = this.HANDLE;
	this.HMENU     = this.HANDLE;
	this.HBRUSH    = this.HICON;
	this.HCURSOR   = this.HANDLE;
	this.HHOOK     = this.HANDLE;
	this.HDC       = this.HANDLE;
	this.HGDIOBJ   = this.HANDLE;
	this.HBITMAP   = this.HANDLE;
	this.HFONT     = this.HANDLE;
	this.TCHAR     = ctypes.jschar, // Mozilla compiled with UNICODE/_UNICODE macros and wchar_t = jschar
	this.LPSTR     = ctypes.char.ptr;
	this.LPCSTR    = ctypes.char.ptr;
	this.LPTSTR    = ctypes.jschar.ptr; // UNICODE
	this.LPCTSTR   = ctypes.jschar.ptr;
	this.LPCWSTR   = ctypes.jschar.ptr;
	this.LPWSTR    = ctypes.jschar.ptr; // WCHAR
	this.LRESULT   = this.LONG_PTR;
	this.WPARAM    = this.UINT_PTR;
	this.LPARAM    = this.LONG_PTR;
	this.FARPROC   = ctypes.voidptr_t; // typedef INT_PTR (FAR WINAPI *FARPROC)();
	this.COLORREF  = this.DWORD;       // 0x00bbggrr

	this.POINT = ctypes.StructType("POINT", [
		{ "x": this.LONG },
		{ "y": this.LONG }
	]);
	this.PPOINT = this.LPPOINT = this.POINT.ptr;
	
	this.RECT = ctypes.StructType("RECT", [
		{ "left": this.LONG },
		{ "top": this.LONG },
		{ "right": this.LONG },
		{ "bottom": this.LONG }
	]);
	this.PRECT = this.RECT.ptr;
	
	this.ICONINFO = ctypes.StructType("ICONINFO", [
		{ "fIcon": this.BOOL },
		{ "xHotspot": this.DWORD },
		{ "yHotspot": this.DWORD },
		{ "hbmMask": this.HBITMAP },
		{ "hbmColor": this.HBITMAP }
	]);
	this.PICONINFO = this.ICONINFO.ptr;
	
	this.BITMAP = ctypes.StructType("BITMAP", [
		{ "bmType": this.LONG },
		{ "bmWidth": this.LONG },
		{ "bmHeight": this.LONG },
		{ "bmWidthBytes": this.LONG },
		{ "bmPlanes": this.WORD },
		{ "bmBitsPixel": this.WORD },
		{ "bmBits": this.LPVOID }
	]);
	
	// CONSTANTS
	this.ERROR_INVALID_PARAMETER       = 87;
	this.ERROR_INVALID_WINDOW_HANDLE   = 1400;
	this.ERROR_RESOURCE_TYPE_NOT_FOUND = 1813;

	// WinUser.h
	this.WM_NULL              = 0x0000;
	this.WM_CREATE            = 0x0001;
	this.WM_DESTROY           = 0x0002;
	this.WM_MOVE              = 0x0003;
	this.WM_SIZE              = 0x0005;
	this.WM_ACTIVATE          = 0x0006;
	this.WA_INACTIVE          = 0;
	this.WA_ACTIVE            = 1;
	this.WA_CLICKACTIVE       = 2;
	this.WM_SETFOCUS          = 0x0007;
	this.WM_KILLFOCUS         = 0x0008;
	this.WM_ENABLE            = 0x000A;
	this.WM_SETREDRAW         = 0x000B;
	this.WM_SETTEXT           = 0x000C;
	this.WM_GETTEXT           = 0x000D;
	this.WM_GETTEXTLENGTH     = 0x000E;
	this.WM_PAINT             = 0x000F;
	this.WM_CLOSE             = 0x0010;
	this.WM_QUIT              = 0x0012;
	this.WM_ERASEBKGND        = 0x0014;
	this.WM_SYSCOLORCHANGE    = 0x0015;
	this.WM_SHOWWINDOW        = 0x0018;
	this.WM_WININICHANGE      = 0x001A;
	this.WM_SETTINGCHANGE     = this.WM_WININICHANGE;
	this.WM_DEVMODECHANGE     = 0x001B;
	this.WM_ACTIVATEAPP       = 0x001C;
	this.WM_FONTCHANGE        = 0x001D;
	this.WM_TIMECHANGE        = 0x001E;
	this.WM_CANCELMODE        = 0x001F;
	this.WM_SETCURSOR         = 0x0020;
	this.WM_MOUSEACTIVATE     = 0x0021;
	this.WM_CHILDACTIVATE     = 0x0022;
	this.WM_QUEUESYNC         = 0x0023;
	this.WM_WINDOWPOSCHANGING = 0x0046;
	this.WM_WINDOWPOSCHANGED  = 0x0047;
	this.WM_INITDIALOG        = 0x0110;
	this.WM_COMMAND           = 0x0111;
	this.WM_SYSCOMMAND        = 0x0112;
	this.WM_HSCROLL           = 0x0114;
	this.WM_VSCROLL           = 0x0115;
	this.WM_MOUSEWHEEL        = 0x020A;

	this.WM_USER              = 0x0400;
	this.WM_APP               = 0x8000;

	this.WM_CONTEXTMENU       = 0x007B;

	this.WM_MOUSEFIRST        = 0x0200;
	this.WM_MOUSEMOVE         = 0x0200;
	this.WM_LBUTTONDOWN       = 0x0201;
	this.WM_LBUTTONUP         = 0x0202;
	this.WM_LBUTTONDBLCLK     = 0x0203;
	this.WM_RBUTTONDOWN       = 0x0204;
	this.WM_RBUTTONUP         = 0x0205;
	this.WM_RBUTTONDBLCLK     = 0x0206;
	this.WM_MBUTTONDOWN       = 0x0207;
	this.WM_MBUTTONUP         = 0x0208;
	this.WM_MBUTTONDBLCLK     = 0x0209;
	this.WM_MOUSEWHEEL        = 0x020A;
	this.WM_XBUTTONDOWN       = 0x020B;
	this.WM_XBUTTONUP         = 0x020C;
	this.WM_XBUTTONDBLCLK     = 0x020D;
	this.WM_MOUSELAST         = 0x020D;
	this.WM_MOUSELAST         = 0x020A;

	this.SC_MINIMIZE = 0xF020;
	this.SC_CLOSE    = 0xF060;

	this.SIZE_RESTORED  = 0;
	this.SIZE_MINIMIZED = 1;
	this.SIZE_MAXIMIZED = 2;
	this.SIZE_MAXSHOW   = 3;
	this.SIZE_MAXHIDE   = 4;
};