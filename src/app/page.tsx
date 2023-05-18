"use client"
import { useState } from "react";
import Image from 'next/image';

const HomePage = () => {
  const [file, setFile] = useState(null);

  const sendFile = async (e: any) => {
    e.preventDefault();

    if (!file) return;

    const form = new FormData();
    form.set('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: form
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div  className="bg-zinc-950 p-5 rounded-lg">
        <h1 className="text-4xl text-center my-4 font-bold">UPLOAD FILE</h1>
        <form onSubmit={(e: any) => sendFile(e)}>
          <input type="file" onChange={(e: any) => setFile(e.target.files[0])} className="bg-red-500 text-zinc-100 p-2 rounded block w-full mb-4" />
          <button className="bg-blue-500 text-zinc-100 p-2 rounded block w-full mb-4 font-bold" disabled={!file}>Upload</button>
        </form>
        {
          file && (<Image src={URL.createObjectURL(file)} alt="file" className="bg-green-500 w-128 h-128 object-cover rounded mx-auto p-2" width={512} height={512} />)
        }
      </div>
    </div>
  )
}

export default HomePage;