const TELEGRAM_API_BASE = 'https://api.telegram.org'
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0
}

/**
 * Framework-agnostic handler shared by the Vercel (api/contact.js) and
 * Netlify (netlify/functions/contact.js) adapters, so both platforms run
 * the exact same validation and Telegram-delivery logic.
 */
export async function handleContactRequest(payload) {
  const name = isNonEmptyString(payload?.name) ? payload.name.trim() : ''
  const email = isNonEmptyString(payload?.email) ? payload.email.trim() : ''
  const message = isNonEmptyString(payload?.message) ? payload.message.trim() : ''

  const missing = []
  if (!name) missing.push('name')
  if (!email) missing.push('email')
  if (!message) missing.push('message')

  if (missing.length > 0) {
    return {
      status: 400,
      body: { ok: false, error: `Missing required field(s): ${missing.join(', ')}` },
    }
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { status: 400, body: { ok: false, error: 'Please provide a valid email address.' } }
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    console.error('contact-handler: missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID env vars')
    return { status: 500, body: { ok: false, error: 'Server is not configured to send messages.' } }
  }

  const text = ['New message from portfolio site', `Name: ${name}`, `Email: ${email}`, `Message: ${message}`].join(
    '\n',
  )

  try {
    const response = await fetch(`${TELEGRAM_API_BASE}/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    })

    const data = await response.json()

    if (!response.ok || !data.ok) {
      console.error('contact-handler: Telegram API rejected the message', data)
      return { status: 502, body: { ok: false, error: 'Failed to deliver the message. Please try again later.' } }
    }

    return { status: 200, body: { ok: true } }
  } catch (error) {
    console.error('contact-handler: failed to reach the Telegram API', error)
    return { status: 502, body: { ok: false, error: 'Failed to deliver the message. Please try again later.' } }
  }
}
