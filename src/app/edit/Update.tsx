"use client";

import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";

export function Update() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id : any) => {
    try {
      // Make DELETE request to the backend
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      
      // Update the blogs state to remove the deleted blog
      setBlogs(blogs.filter((blog : any) => blog.id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(response.data);
      } catch (error) {
        setError('Error fetching blogs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>Blog Details</CardTitle>
                  <CardDescription>
                    Blogs details will be shown below 
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Id</TableCell>
                        <TableCell>Views</TableCell>
                        <TableCell>Reacts</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {blogs.map((product : any) => (
                        <TableRow key={product.id}>
                          <TableCell className="hidden sm:table-cell">
                            <Image
                              alt={product.title}
                              className="aspect-square rounded-md object-cover"
                              height="64"
                              src={`http://localhost:5000${product.image}` || '/placeholder.svg'}
                              width="64"
                            />
                          </TableCell>
                          <TableCell className="font-medium">{product.title}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{product.id}</Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {product.price || 'N/A'}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {product.stock || 'N/A'}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {product.createdAt || "N/A"}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDelete(product._id)}>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
