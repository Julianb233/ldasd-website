import { Resend } from 'resend'
import { PRODUCT_NAMES, formatPrice, type ProductType } from '@/lib/stripe/products'

const resend = new Resend(process.env.RESEND_API_KEY)

type ReceiptParams = {
  to: string
  customerName: string | null
  productType: ProductType
  isCouples: boolean
  amountCents: number
  orderId: string
}

export async function sendOrderReceipt({
  to,
  customerName,
  productType,
  isCouples,
  amountCents,
  orderId,
}: ReceiptParams) {
  const productName = PRODUCT_NAMES[productType]
  const tierLabel = isCouples ? ' (Couples)' : ''
  const price = formatPrice(amountCents)
  const greeting = customerName ? `Hi ${customerName.split(' ')[0]}` : 'Hello'

  const { data, error } = await resend.emails.send({
    from: 'LDASD Estate Planning <noreply@ldasd.com>',
    to,
    subject: `Order Confirmation — ${productName}${tierLabel}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #1a1a2e; font-size: 24px; margin: 0;">Order Confirmed</h1>
        </div>

        <p style="color: #333; font-size: 16px; line-height: 1.6;">
          ${greeting},
        </p>
        <p style="color: #333; font-size: 16px; line-height: 1.6;">
          Thank you for your purchase. Your estate planning documents are being prepared.
        </p>

        <div style="background: #f8f9fa; border-radius: 12px; padding: 24px; margin: 24px 0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Product</td>
              <td style="padding: 8px 0; color: #333; font-size: 14px; text-align: right; font-weight: 600;">${productName}${tierLabel}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Amount</td>
              <td style="padding: 8px 0; color: #333; font-size: 14px; text-align: right; font-weight: 600;">${price}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Order ID</td>
              <td style="padding: 8px 0; color: #333; font-size: 14px; text-align: right; font-family: monospace;">${orderId.slice(0, 8)}</td>
            </tr>
          </table>
        </div>

        <div style="text-align: center; margin: 32px 0;">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://ldasd.com'}/dashboard"
             style="display: inline-block; background: #2563eb; color: white; text-decoration: none; padding: 14px 32px; border-radius: 9999px; font-weight: 600; font-size: 16px;">
            View Your Dashboard
          </a>
        </div>

        <div style="border-top: 1px solid #e5e7eb; padding-top: 24px; margin-top: 32px;">
          <h3 style="color: #333; font-size: 16px; margin: 0 0 12px;">What happens next?</h3>
          <ol style="color: #666; font-size: 14px; line-height: 1.8; padding-left: 20px;">
            <li>Complete the guided questionnaire in your dashboard</li>
            <li>Our team reviews your information</li>
            <li>Your documents are prepared and ready for download</li>
            <li>Follow signing and notarization instructions</li>
          </ol>
        </div>

        <p style="color: #999; font-size: 12px; text-align: center; margin-top: 40px;">
          Questions? Reply to this email or contact us at support@ldasd.com
        </p>
      </div>
    `,
  })

  if (error) {
    console.error('Failed to send receipt email:', error)
  }

  return { data, error }
}
