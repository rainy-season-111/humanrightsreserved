import type { VercelRequest, VercelResponse } from '@vercel/node'
import crypto from 'node:crypto'

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { password } = req.body || {}
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ error: 'Password required' })
  }

  const hash = crypto.createHash('sha256').update(password).digest('hex')
  const expected = process.env.PHOTOS_PASSWORD_HASH

  if (!expected || !crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(expected))) {
    return res.status(401).json({ error: 'Incorrect password' })
  }

  const secret = process.env.TOKEN_SECRET
  if (!secret) {
    return res.status(500).json({ error: 'Server misconfigured' })
  }

  const payload = {
    granted: true,
    exp: Date.now() + 24 * 60 * 60 * 1000,
    nonce: crypto.randomBytes(16).toString('hex'),
  }
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const sig = crypto.createHmac('sha256', secret).update(data).digest('base64url')
  const token = `${data}.${sig}`

  return res.status(200).json({ token })
}
