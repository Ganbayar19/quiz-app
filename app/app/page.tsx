import React from 'react';
import { pipeline } from 'stream';
import Tabs from '@/components/Tabs';


export default function HomePage() {
  const[selectedFile, setSelectedFile] = React.useState<File | null>(null);{
  setImagePrevew(null);
  setDefaultResultOrder(null);
  };

  const handleGenerate = async () => {
    if (!imagePreview) return;

    setIsLoading(true);
    try {
      if (!captionerRef.current) {
        captionerRef.current = await pipeline(
          "image-to-text",
          "Xenova/vit-gpt2-image-captioning"
        );
        setIsModelLoading(false);
      }
      const output = await captionerRef.current(imagePreview);

      if(Array.isArray(output) && output.length > 0) {
        const captions = (output[0]{generated_text: string})
         .generated_text;
        setCaptions(captions);
      }
      <main className="flex justify-center px-6 py-8">
        <div className='w-full max-w-2xl'>
          <Tabs defaultvalue="image-analysis" className="w-full">
            <TabsList className="justify-center mb-6">
              
            </TabsList>
          </Tabs>
        </div>
      </main>
}
