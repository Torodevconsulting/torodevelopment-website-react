import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  try {
    const { record } = await req.json()

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
      },
      body: JSON.stringify({
        from: 'leads@torodevelop.com',
        to: 'torodevelopmentbcn@gmail.com',
        subject: `New lead: ${record.name}`,
        html: `
          <h2>New lead received</h2>
          <p><strong>Name:</strong> ${record.name}</p>
          <p><strong>Email:</strong> ${record.email}</p>
          <p><strong>Phone:</strong> ${record.phone || '—'}</p>
          <p><strong>Company:</strong> ${record.company || '—'}</p>
          <p><strong>Message:</strong><br/>${record.message}</p>
        `,
      }),
    })

    if (!res.ok) {
      const error = await res.text()
      throw new Error(error)
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
})