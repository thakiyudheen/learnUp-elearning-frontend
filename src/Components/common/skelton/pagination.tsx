import React from 'react';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { useTheme } from "@/Components/ui/theme-provider";

interface PaginationControlsProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  setCurrentPage,
  totalPages
}) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const { theme } = useTheme();

  return (
    <div className="flex items-center justify-center gap-4 p-20">
      <button
        onClick={() => setCurrentPage((prevPage: any) => Math.max(prevPage - 1, 1))}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 dark:text-white uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        <HiArrowLeft className="w-4 h-4" />
       <small> Prev</small>
      </button>
      <div className="flex items-center gap-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase ${
              currentPage === page ? 'bg-blue-600 text-white shadow-md shadow-gray-900/10' : 'text-white hover:bg-gray-900/10 active:bg-gray-900/20'
            } transition-all disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
            disabled={currentPage === page}
            type="button"
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">{page}</span>
          </button>
        ))}
      </div>
      <button
        onClick={() => setCurrentPage((prevPage: any) => Math.min(prevPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center dark:text-white text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        <small> Next</small>
        <HiArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
