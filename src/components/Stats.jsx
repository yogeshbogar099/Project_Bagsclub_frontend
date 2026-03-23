import { useState, useEffect } from 'react';
import api from '../utils/api';
import { ShoppingBag, Users, UserCheck } from 'lucide-react';

const Stats = () => {
  const [stats, setStats] = useState({
    deliveryPartners: 0,
    totalMembers: 0,
    dedicatedStaffs: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
        try {
            const { data } = await api.get('/stats');
            setStats({
              deliveryPartners: Number(data?.deliveryPartners ?? 0),
              totalMembers: Number(data?.totalMembers ?? 0),
              dedicatedStaffs: Number(data?.dedicatedStaffs ?? 0)
            });
        } catch (error) {
            // Silent fallback for landing page
            setStats({ deliveryPartners: 25, totalMembers: 1000, dedicatedStaffs: 100 });
        }
    };
    fetchStats();
  }, []);

  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Bags Printed */}
          <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
            <div className="w-16 h-16 bg-white text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag size={32} />
            </div>
            <div className="text-4xl font-bold font-heading mb-2">
              {Number(stats?.deliveryPartners ?? 0).toLocaleString()}+
            </div>
            <div className="text-green-200 uppercase tracking-wider font-medium">Delivery Partners</div>
          </div>

          {/* Clients */}
          <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
            <div className="w-16 h-16 bg-white text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <UserCheck size={32} />
            </div>
            <div className="text-4xl font-bold font-heading mb-2">
              {Number(stats?.totalMembers ?? 0).toLocaleString()}+
            </div>
            <div className="text-green-200 uppercase tracking-wider font-medium">Total Members</div>
          </div>

          {/* Team */}
          <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
            <div className="w-16 h-16 bg-white text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={32} />
            </div>
            <div className="text-4xl font-bold font-heading mb-2">
              {Number(stats?.dedicatedStaffs ?? 0)}+
            </div>
            <div className="text-green-200 uppercase tracking-wider font-medium">Dedicated Staffs</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
