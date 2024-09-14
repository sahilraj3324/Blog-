"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { cn } from "@/lib/utils";
import { BentoGrid, BentoGridItem } from "../../components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

const Layout = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);
  return (
    <BentoGrid className="max-w-4xl mx-auto mt-5">
    {blogs.map((items, i) => (
      <BentoGridItem
        key={items._id}
        title={items.title}
        description={items.description}
        header={<img className='flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100'  src={`http://localhost:5000${items.image}`}/>}
        icon={items.items}
        className={i === 3 || i === 6 ? "md:col-span-2" : ""}
      />
    ))}
  </BentoGrid>
  )
}



export default Layout
