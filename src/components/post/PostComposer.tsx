"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Image, Smile, Calendar, MapPin, BarChart3, Globe } from "lucide-react";
import Link from "next/link";

interface PostComposerProps {
  placeholder?: string;
  buttonText?: string;
}

export default function PostComposer({
  placeholder = "What's happening?",
  buttonText = "Post",
}: PostComposerProps) {
  const [content, setContent] = useState("");

  return (
    <div className="border-b border-gray-800 p-4">
      <div className="flex space-x-3">
        {/* Avatar */}
        <Link href="/profile/alice_dev" className="flex-shrink-0">
          <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
            <span className="text-lg font-bold">U</span>
          </div>
        </Link>

        {/* Content */}
        <div className="flex-1">
          <Textarea
            placeholder={placeholder}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-transparent border-0 text-xl placeholder-gray-500 resize-none focus:ring-0 focus:border-0 focus:outline-none focus-visible:ring-0 focus-visible:border-0 p-0 shadow-none"
            rows={3}
          />

          {/* Icons */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <Image
                className="h-5 w-5 text-blue-500 cursor-pointer hover:bg-blue-500/10 p-1 rounded-full transition-colors"
                size={28}
              />
              <BarChart3
                className="h-5 w-5 text-blue-500 cursor-pointer hover:bg-blue-500/10 p-1 rounded-full transition-colors"
                size={28}
              />
              <Smile
                className="h-5 w-5 text-blue-500 cursor-pointer hover:bg-blue-500/10 p-1 rounded-full transition-colors"
                size={28}
              />
              <Calendar
                className="h-5 w-5 text-blue-500 cursor-pointer hover:bg-blue-500/10 p-1 rounded-full transition-colors"
                size={28}
              />
              <MapPin
                className="h-5 w-5 text-blue-500 cursor-pointer hover:bg-blue-500/10 p-1 rounded-full transition-colors"
                size={28}
              />
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-blue-500">
                <Globe className="h-4 w-4" />
                <span className="text-sm font-semibold">
                  Everyone can reply
                </span>
              </div>
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-1.5 rounded-full disabled:opacity-50"
                disabled={content.trim().length === 0}
              >
                {buttonText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
