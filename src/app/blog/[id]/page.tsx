"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Correct import for client components
import axios from "axios";
import Image from "next/image";

const BlogDetails = () => {
  const { id } = useParams(); // Extract 'id' from the dynamic route
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Blog ID:", id); // Check if the `id` is correctly logged

    if (id) {
      const fetchBlog = async () => {
        try {
          // Make the URL dynamic using the `id` from `useParams`
          const response = await axios.get(`http://localhost:5000/api/blogs?id=${id}`);
          console.log("API Response:", response.data); // Log the API response
          setBlog(response.data);
          setLoading(false);
        } catch (err : any) {
          console.error("Error fetching blog details:", err); // Log the error
          setError(err.message); // Adjust error handling
          setLoading(false);
        }
      };

      fetchBlog();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading blog details: {error}</div>; // Show error message

  return (
    <div className="max-w-screen-lg mx-auto">
      {blog && (
        <>
         <main className="mt-10">
         <div className="mb-4 md:mb-0 w-full mx-auto relative">
        <div className="px-4 lg:px-0">
          <h2 className="text-4xl font-semibold text-gray-800 leading-tight text-center">
          {blog.title}
          </h2>
          <a 
            href="#"
            className="py-2 text-blue mb-2 text-center"
          >
            Ask Senior
          </a>
        </div>

        <Image height={500} width={300} src={`http://localhost:5000${blog.image}`} alt={blog.title} className="w-full object-cover lg:rounded" />
       </div>
       <div className="flex flex-col lg:flex-row lg:space-x-12">

        <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
          <p className="pb-6">{blog.description}</p>

          <pre className="pb-6 max-w-screen-lg mx-auto break-words whitespace-pre-wrap">{blog.content}</pre>

        </div>

        <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
          <div className="p-4 border-t border-b md:border md:rounded">
            <div className="flex py-2">
              <img src="https://randomuser.me/api/portraits/men/97.jpg"
                className="h-10 w-10 rounded-full mr-2 object-cover" />
              <div>
                <p className="font-semibold text-gray-700 text-sm"> Mike Sullivan </p>
                <p className="font-semibold text-gray-600 text-xs"> Editor </p>
              </div>
            </div>
            <p className="text-gray-700 py-3">
              Mike writes about technology
              Yourself required no at thoughts delicate landlord it be. Branched dashwood do is whatever it.
            </p>
            <button className="px-2 py-1 text-gray-100 bg-green-700 flex w-full items-center justify-center rounded">
              Follow 
              <i className='bx bx-user-plus ml-2' ></i>
            </button>
          </div>
        </div>

      </div>

         </main>
        </>
      )}
    </div>
  );
};

export default BlogDetails;
