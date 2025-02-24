import HTTP_CODES_MESSAGES, { DEFAULT_ERROR_RESPONSE } from '@/utils/constants/http_codes.const'
import { HttpStatus } from '@nestjs/common'
import { Response } from 'express'

export const responseError = (res: Response, error: any) => {
  if (error.message) {
    return res.status(error.message).json({ 
      message: HTTP_CODES_MESSAGES[error.message], 
      statusCode: error.message 
    })
  }
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(DEFAULT_ERROR_RESPONSE)
}
