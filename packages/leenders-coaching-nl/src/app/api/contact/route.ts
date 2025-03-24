import { NextResponse } from 'next/server';
import type { ContactFormData } from '@/components/sections/SectionForm/SectionForm';

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as ContactFormData;

    // TODO: Implement actual email sending logic here
    // For now, just log the data
    console.log('Contact form submission:', data);

    return NextResponse.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 },
    );
  }
}
