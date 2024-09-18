"use client";
import { useState } from 'react';
import Link from "next/link";
import Create from "./Create";
import { Update } from "./Update";

export function Dashboard() {
  const [activeComponent, setActiveComponent] = useState('create'); // Default is 'create'

  const renderComponent = () => {
    switch (activeComponent) {
      case 'create':
        return <Create />;
      case 'update':
        return <Update />;
      default:
        return <div>Select an option from the menu</div>;
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          {/* Navigation Section */}
          <nav className="grid gap-4 text-sm text-muted-foreground">
            {/* When clicked, the state changes to 'create' */}
            <button onClick={() => setActiveComponent('create')} className="font-semibold text-primary">
              Create
            </button>
            <button onClick={() => setActiveComponent('update')} className="font-semibold">
              Delete
            </button>
            <button onClick={() => setActiveComponent('delete')} className="font-semibold">
              Update
            </button>
            <button onClick={() => setActiveComponent('details')} className="font-semibold">
              Details
            </button>
          </nav>

          {/* Main content that changes based on the navigation click */}
          <div className="grid gap-6">
            {renderComponent()} {/* This will dynamically render the selected component */}
          </div>
        </div>
      </main>
    </div>
  );
}
