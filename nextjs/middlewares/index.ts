import { authMiddlewareDashboard } from '@/middlewares/authMiddlewareDashboard'
import { NextRequest, NextResponse } from 'next/server'

export function runMiddlewares(req: NextRequest) {
  let response: NextResponse | undefined

  const middlewares = [authMiddlewareDashboard]

  for (const middleware of middlewares) {
    response = middleware(req)
    if (response) break
  }

  return response || NextResponse.next()
}
