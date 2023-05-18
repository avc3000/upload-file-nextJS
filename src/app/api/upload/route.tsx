import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: any) {
  const data = await request.formData();
  const file = data.get('file');
  
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = path.join(process.cwd(), 'public', file.name);
  writeFile(filePath, buffer);

  return new Response(JSON.stringify({
    message: 'Uploaded file'
  }));
}