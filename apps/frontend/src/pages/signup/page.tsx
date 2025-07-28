"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../../utils/auth";
import { Header } from "../../components/Header";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await registerUser(name, email, password);
    if (success) {
      router.push("/");
    } else {
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <Header />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80 p-4 border rounded-xl shadow bg-card">
        <h2 className="text-xl font-semibold text-center">Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <button type="submit" className="bg-primary text-white p-2 rounded hover:bg-primary/80">
          Sign Up
        </button>
      </form>
    </div>
  );
}

// Force server-side rendering to avoid static generation errors
export async function getServerSideProps() {
  return {
    props: {},
  };
}
