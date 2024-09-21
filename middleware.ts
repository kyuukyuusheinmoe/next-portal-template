import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const userToken = cookies().get('token')?.value;
  const signinUrl = '/auth/signin';
  const homeUrl = '/admin/dashboard';

  switch(request.nextUrl.pathname) {
    
    case signinUrl:  {
      if (userToken) {
        return NextResponse.redirect(new URL(homeUrl, request.url))
      } 
    };break;
    default : {
      if (!userToken) {
       return NextResponse.redirect(new URL(signinUrl, request.url))
      }
    }
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\..*|next).*)',
  ],
}