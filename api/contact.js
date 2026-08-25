import { handleContactRequest } from '../lib/contact-handler.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const result = await handleContactRequest(req.body)
  return res.status(result.status).json(result.body)
}
