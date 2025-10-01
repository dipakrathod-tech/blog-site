"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Newsletter({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    null | "idle" | "loading" | "success" | "error"
  >("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      // Placeholder: wire this to your real newsletter API (Mailchimp, ConvertKit, etc.)
      await new Promise((res) => setTimeout(res, 700));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className={cn("w-full max-w-md", className)}>
      <h3 className="text-sm font-semibold">Subscribe to our newsletter</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get occasional updates, tutorials, and posts.
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-3 flex gap-2"
        aria-label="Subscribe to newsletter"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@domain.com"
          required
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <Button type="submit" size="sm" aria-label="Subscribe">
          {status === "loading" ? "..." : "Subscribe"}
        </Button>
      </form>

      {status === "success" && (
        <p className="mt-2 text-sm text-green-600">Thanks for subscribing!</p>
      )}
      {status === "error" && (
        <p className="mt-2 text-sm text-destructive">
          Something went wrong. Try again.
        </p>
      )}
    </div>
  );
}
