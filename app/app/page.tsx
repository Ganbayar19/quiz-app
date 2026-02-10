"use client";

import { useState, useRef } from "react";
import { Sparkles, FileText, RotateCw, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { pipeline } from "@xenova/transformers";
import ChatWidget from "./_components/ChatWidget";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const captionerRef = useRef<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setResult(null);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setResult(null);
  };

  const handleGenerate = async () => {
    if (!imagePreview) return;

    setIsLoading(true);
    try {
      if (!captionerRef.current) {
        setIsModelLoading(true);
        captionerRef.current = await pipeline(
          "image-to-text",
          "Xenova/vit-gpt2-image-captioning",
        );
        setIsModelLoading(false);
      }

      const output = await captionerRef.current(imagePreview);

      if (Array.isArray(output) && output.length > 0) {
        const caption = (output[0] as { generated_text: string })
          .generated_text;
        setResult(caption);
      }
    } catch (error) {
      console.error("Error generating caption:", error);
      setResult("Error analyzing image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b px-6 py-4">
        <h1 className="text-lg font-semibold">AI tools</h1>
      </header>
      <main className="flex justify-center px-6 py-8">
        <div className="w-full max-w-2xl">
          <Tabs defaultValue="image-analysis" className="w-full">
            <TabsList className="mb-6 grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="image-analysis">Image analysis</TabsTrigger>
              <TabsTrigger value="ingredient-recognition">
                Ingredient recognition
              </TabsTrigger>
              <TabsTrigger value="image-creator">Image creator</TabsTrigger>
            </TabsList>
            <TabsContent value="image-analysis" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    <h2 className="text-xl font-semibold">Image analysis</h2>
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleReset}>
                    <RotateCw className="h-4 w-4" />
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground">
                  Upload a food photo, and AI will detect the ingredients.
                </p>

                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Label
                          htmlFor="file-upload"
                          className="cursor-pointer text-sm font-medium"
                        >
                          Choose File
                        </Label>
                        <span className="text-sm text-muted-foreground">
                          {selectedFile ? selectedFile.name : "JPG , PNG"}
                        </span>
                        <Input
                          id="file-upload"
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>
                      {imagePreview && (
                        <div className="mt-4">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="max-h-64 rounded-lg object-contain"
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button
                    className="bg-zinc-800 hover:bg-zinc-700"
                    onClick={handleGenerate}
                    disabled={!selectedFile || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {isModelLoading ? "Loading model..." : "Analyzing..."}
                      </>
                    ) : (
                      "Generate"
                    )}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Here is the summary</h3>
                </div>
                {result ? (
                  <p className="text-sm text-foreground bg-muted p-4 rounded-lg">
                    {result}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    First, enter your image to recognize an ingredients.
                  </p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="ingredient-recognition">
              <div className="text-center text-muted-foreground py-8">
                Ingredient recognition content coming soon...
              </div>
            </TabsContent>

            <TabsContent value="image-creator">
              <div className="text-center text-muted-foreground py-8">
                Image creator content coming soon...
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <ChatWidget />
    </div>
  );
}
