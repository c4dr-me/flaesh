'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';


export default function TopicInputPage() {
  const [topic, setTopic] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/dashboard/${encodeURIComponent(topic)}`);
  };

  return (
    <Card className="max-w-md w-full mx-auto bg-transparent text-white p-3 backdrop-filter backdrop-blur-lg bg-opacity-30 rounded-lg  cursor-pointer shadow-lg" style={{
      background: "rgba(157, 70, 18, 0.25)",
      boxShadow: "0 8px 32px 0 rgba(235,101,101,0.25)",
      backdropFilter: "blur(4px)",
      WebkitBackdropFilter: "blur(4px)",
      borderRadius: "10px",
      border: "1px solid rgba(255, 255, 255, 0.18)",
    }}>
      <CardHeader>
        <CardTitle>What do you want to learn?</CardTitle>
        <CardDescription>Enter a topic to generate a learning roadmap and flashcards</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="space-y-2">
            <label htmlFor="topic" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Topic</label>
            <Input
              id="topic"
              type="text"
              value={topic}
              style={{background: "rgba(157, 70, 18, 0.15)"}}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., JavaScript, Machine Learning, World History"
              required
              className=" text-white placeholder-gray-300"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-gradient-to-l from-orange-800 via-orange-700 to-orange-800 text-white">Generate Learning Plan</Button>
        </CardFooter>
      </form>
    </Card>
  );
}