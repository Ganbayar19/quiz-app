"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");

  const handleGenerate = async () => {
    if (!file) return alert("Upload image first");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));

    setResult("Detected ingredients: tomato, cheese, bread 🍕");
    setLoading(false);
  };

  return (
    <Tabs defaultValue="analysis" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="analysis">Image analysis</TabsTrigger>
        <TabsTrigger value="ingredient">Ingredient recognition</TabsTrigger>
        <TabsTrigger value="creator">Image creator</TabsTrigger>
      </TabsList>
      <TabsContent value="analysis">
        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle>✨ Image analysis</CardTitle>
            <p className="text-sm text-muted-foreground">
              Upload a food photo, and AI will detect the ingredients.
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <Input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />

            <Button onClick={handleGenerate} disabled={loading}>
              {loading ? "Generating..." : "Generate"}
            </Button>
          </CardContent>
        </Card>
        <Card className="max-w-xl mt-6">
          <CardHeader>
            <CardTitle>📄 Here is the summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {result || "First, enter your image to recognize ingredients."}
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="ingredient">
        <Card className="max-w-xl p-6">
          Ingredient recognition coming soon...
        </Card>
      </TabsContent>
      <TabsContent value="creator">
        <Card className="max-w-xl p-6">Image generator coming soon...</Card>
      </TabsContent>
    </Tabs>
  );
}
