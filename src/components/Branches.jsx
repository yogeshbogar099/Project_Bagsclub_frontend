import { MapPin } from 'lucide-react';

const Branches = () => {
  const branches = [
    { city: "Latur, Maharashtra", status: "Active", type: "Main Branch", active: true },
    { city: "Pune", status: "Coming Soon", type: "Branch", active: false },
    { city: "Mumbai", status: "Coming Soon", type: "Branch", active: false }
  ];

  return (
    <section id="branches" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary mb-4">OUR BRANCHES</h2>
          <div className="w-20 h-1 bg-secondary mx-auto"></div>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 place-items-center md:grid-cols-3">
          {branches.map((branch, index) => (
            <div key={index} className="w-full max-w-sm border border-gray-200 rounded-3xl p-8 hover:shadow-lg transition-shadow bg-gray-50">
              <div className="flex items-start justify-between mb-4">
                <MapPin className={`w-8 h-8 ${branch.active ? 'text-primary' : 'text-gray-400'}`} />
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${branch.active ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                  {branch.status}
                </span>
              </div>
              <h3 className="text-xl font-bold font-heading mb-1">{branch.city}</h3>
              <p className="text-gray-500 text-sm">{branch.type}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Branches;
