export const JobCard = ({ job, className = "", compact = false }) => {
  return (
    <div
      className={`
        relative rounded-lg overflow-hidden
        shadow-sm hover:shadow-md
        group/job cursor-pointer
        transition-all duration-300
        ${className}
      `}
    >
      <img
        src={job.image}
        alt={job.title}
        className="
          w-full h-full object-cover
          group-hover/job:scale-105
          transition-transform duration-400 ease-out
        "
      />

      <div
        className="
          absolute inset-0 bg-gradient-to-t
          from-purple-900/85 via-purple-800/35 to-transparent
        "
      />

      <div
        className={`
          absolute bottom-0 left-0 right-0
          ${compact ? "p-3" : "p-5"}
        `}
      >
        <h3
          className={`
            text-white font-medium
            ${compact ? "text-sm" : "text-lg"}
          `}
        >
          {job.title}
        </h3>

        <div
          className="
            h-0.5 w-0 bg-white
            group-hover/job:w-10
            transition-all duration-300 mt-1
          "
        />
      </div>
    </div>
  );
};

