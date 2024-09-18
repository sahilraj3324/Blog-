"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Create = () => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>(""); // Author field
  const [content, setContent] = useState<string>(""); // Content field
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author); // Append author
    formData.append("content", content); // Append content
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post("http://localhost:5000/api/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Blog created successfully");
      setTitle("");
      setAuthor(""); // Clear author field
      setContent(""); // Clear content field
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Error creating blog");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Provide Title</CardTitle>
          <CardDescription>Used to identify your store in the marketplace.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Write your title"
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Provide Author</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            placeholder="Author name"
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Short Description</CardTitle>
          <CardDescription>Describe the content you are adding.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            type ="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Describe here"
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Provide Content</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            className="w-full h-64 p-2 border border-gray-400 rounded resize overflow-auto"
            style={{ minHeight: "150px", maxHeight: "600px" }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Write the content here"
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Provide Image</CardTitle>
        </CardHeader>
        <CardContent>
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setImage(e.target.files[0]);
              }
            }}
          />
        </CardContent>
      </Card>
      
      <CardFooter>
        <Button type="submit" variant="secondary" className="mt-5">
          Submit
        </Button>
      </CardFooter>
    </form>
  );
};

export default Create;
