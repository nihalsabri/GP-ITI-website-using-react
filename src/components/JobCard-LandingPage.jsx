// src/components/JobCard-LandingPage.jsx
const JobCard = ({ job, className = "" }) => {
  return (
    <div
      className={`relative rounded-xl overflow-hidden shadow-md group ${className}`}
    >
      <img
        src={job.image}
        alt={job.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

      <div className="absolute bottom-0 p-4">
        <h3 className="text-white text-lg font-semibold">{job.title}</h3>
        <div className="h-0.5 w-0 bg-white group-hover:w-10 transition-all duration-300 mt-1" />
      </div>
    </div>
  );
};

export default JobCard;
