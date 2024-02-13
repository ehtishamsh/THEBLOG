import React from "react";

function DetailBlog() {
  return (
    <div className="transition-all duration-400 px-2 flex flex-col justify-start items-start  mt-3">
      <p className="transition-all duration-400 text-base font-semibold mb-8 dark:text-purple-900 text-purple-700 ">
        Sunday , 1 Jan 2023
      </p>
      <h1 className="transition-all duration-400 text-4xl font-bold mb-8">
        Grid system for better Design User Interface
      </h1>
      <img
        src="/blog.jpg"
        alt=""
        className="object-cover w-full max-h-[500px] mb-8"
      />
      <div className="transition-all duration-400 gap-8 flex flex-col justify-start items-start">
        <p className="text-xl dark:text-gray-400 text-gray-600">
          A grid system is a design tool used to arrange content on a webpage.
          It is a series of vertical and horizontal lines that create a matrix
          of intersecting points, which can be used to align and organize page
          elements. Grid systems are used to create a consistent look and feel
          across a website, and can help to make the layout more visually
          appealing and easier to navigate.
        </p>
        <p className="text-xl dark:text-gray-400 text-gray-600">
          If you’ve been to New York City and have walked the streets, it is
          easy to figure out how to get from one place to another because of the
          grid system that the city is built on. Just as the predictability of a
          city grid helps locals and tourists get around easily, so do webpage
          grids provide a structure that guides users and designers alike.
          Because of their consistent reference point, grids improve page
          readability and scannability and allow people to quickly get where
          they need to go.
        </p>
        <div className=" w-full">
          <img
            src="/blog.jpg"
            alt=""
            className="object-cover w-full max-h-[500px] mb-4"
          />
          <p className="text-center dark:text-gray-400 text-gray-600 font-bold">
            <span className="max-w-96">
              Definition: A grid is made up of columns, gutters, and margins
              that provide a structure for the layout of elements on a page.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default DetailBlog;
