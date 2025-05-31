import React from "react";

type CardProps = {
  imgSrc: string;
  category: string;
  title: string;
  description: string;
  views: string;
  comments: string;
  linksrc: string;
};

const Card: React.FC<CardProps> = ({
  imgSrc,
  category,
  title,
  description,
  views,
  comments,
  linksrc,
}) => {
  return (
    <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 p-4 md:p-5 m-4 w-full md:w-1/3">
      <div className="flex justify-between items-center border-b border-gray-200 rounded-t-xl py-3 px-4 md:px-5 dark:border-neutral-700">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          {title}
        </h3>
      </div>
      <div className="p-4">
        <p className="mt-2 text-gray-500 dark:text-neutral-400">{description}</p>
        <a
          className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 decoration-2 hover:text-blue-700 hover:underline focus:underline focus:outline-hidden focus:text-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-600 dark:focus:text-blue-600"
          href={linksrc}
        >
          Card link
        </a>
      </div>
    </div>
  );
};

export default Card;