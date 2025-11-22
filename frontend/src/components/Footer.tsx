import React from "react";
import { Link } from "react-router-dom";

const SocialIcon = ({ children, href }: { children: React.ReactNode; href?: string }) => (
  <a href={href ?? "#"} className="text-slate-500 hover:text-slate-700">
    <span className="sr-only">social</span>
    <div className="w-8 h-8 flex items-center justify-center rounded-md bg-white border shadow-sm">
      {children}
    </div>
  </a>
);

export default function Footer() {
  const product = ["Docs by Hashnode", "Blogs", "AI Markdown Editor", "GraphQL APIs", "Starter-kit"];
  const explore = ["My feed", "AI QA Engineer"];
  const company = ["About", "Logos & media", "Changelog", "Feature requests"];
  const blogs = ["Official Blog", "Engineering Blog", "Townhall"];

  const Column = ({ title, items }: { title: string; items: string[] }) => (
    <div>
      <h4 className="font-semibold text-sm mb-3">{title}</h4>
      <ul className="space-y-3 text-sm text-slate-600">
        {items.map((t) => (
          <li key={t}>
            <Link to="#" className="hover:underline">
              {t}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="border-t bg-white">
      <div className="max-w-full mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand + social */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {/* <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center text-white font-bold">H</div> */}
              <div>
                <div className="font-semibold text-2xl mb-2">Inkwave</div>
                <div className="text-sm text-slate-500">Hassle-free blogging platform that developers and teams love.</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <SocialIcon href="#"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.92a8.35 8.35 0 01-2.36.65 4.11 4.11 0 001.8-2.27 8.22 8.22 0 01-2.6.99 4.1 4.1 0 00-7 3.74A11.63 11.63 0 013 4.89a4.1 4.1 0 001.27 5.47 4.07 4.07 0 01-1.86-.51v.05a4.1 4.1 0 003.29 4.02c-.5.14-1.03.17-1.57.06a4.1 4.1 0 003.83 2.85A8.23 8.23 0 012 19.54a11.6 11.6 0 006.29 1.84c7.55 0 11.69-6.26 11.69-11.69v-.53A8.3 8.3 0 0022 5.92z"/></svg></SocialIcon>
              <SocialIcon href="#"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 2.86 8.15 6.84 9.45.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.17-1.11-1.48-1.11-1.48-.91-.62.07-.61.07-.61 1.01.07 1.55 1.04 1.55 1.04.9 1.54 2.36 1.1 2.93.84.09-.65.35-1.1.64-1.36-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8a9.6 9.6 0 012.5.34c1.9-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.41.1 2.66.64.7 1.03 1.6 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86 0 1.34-.01 2.42-.01 2.75 0 .26.18.58.69.48A10 10 0 0022 12c0-5.52-4.48-10-10-10z"/></svg></SocialIcon>
              <SocialIcon href="#"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99H8.9V12h1.54V9.79c0-1.52.9-2.36 2.28-2.36.66 0 1.35.12 1.35.12v1.48h-.76c-.75 0-.98.46-.98.94V12h1.67l-.27 2.89h-1.4v6.99C18.35 21.13 22 16.99 22 12c0-5.52-4.48-10-10-10z"/></svg></SocialIcon>
            </div>

            <div className="mt-4 inline-flex items-center gap-3 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2 bg-white border px-3 py-1 rounded-full text-sm">
                <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.1-7.1 1.4 1.4z"/></svg>
                All services are online
              </span>
            </div>
          </div>

          {/* Columns */}
          <Column title="Product" items={product} />
          <Column title="Explore" items={explore} />
          <Column title="Company" items={company} />
          <Column title="Blogs" items={blogs} />
        </div>

        <div className="mt-8 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} InkWave — Built for developers.</p>
          <div className="flex items-center gap-4 text-sm text-slate-600">
            <Link to="#" className="hover:underline">Privacy</Link>
            <Link to="#" className="hover:underline">Terms</Link>
            <Link to="#" className="hover:underline">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}