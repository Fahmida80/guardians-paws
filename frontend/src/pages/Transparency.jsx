import { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import LiveDonationChart from '../components/LiveDonationChart';

const Transparency = () => {
  const { summary } = useSocket();
  const [loading, setLoading] = useState(true);

  // Wait for socket data to arrive
  useEffect(() => {
    if (summary && summary.transactionCount !== undefined) {
      setLoading(false);
    }
  }, [summary]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="text-6xl mb-4 animate-bounce">📊</div>
        <p className="text-2xl text-navy-600 font-semibold animate-pulse">Loading transparency data...</p>
      </div>
    );
  }

  const { totalDonations, totalExpenses, transactionCount, recent } = summary;
  const balance = (totalDonations || 0) - (totalExpenses || 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-navy-50">
      <div className="container mx-auto px-4 py-12 pt-24 max-w-5xl">

        {/* ===== HEADER ===== */}
        <div className="text-center mb-16">
          <div className="inline-block bg-navy-50 rounded-full px-6 py-2 border border-navy-200 mb-4">
            <span className="text-sm font-semibold text-navy-600">📊 FINANCIAL TRANSPARENCY</span>
          </div>
          <h1 className="text-5xl font-bold text-navy-700 mb-4">Your Donations in Action</h1>
          <p className="text-xl text-navy-500 max-w-2xl mx-auto">
            Every contribution is tracked with complete transparency. Here's how your support is making a difference.
          </p>
          <div className="mt-3 inline-block bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
            🔴 Live updates via WebSocket
          </div>
        </div>

        {/* ===== SUMMARY CARDS ===== */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-md border border-navy-100 p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-green-600">৳</span>
            </div>
            <div className="text-3xl font-bold text-navy-700">
              ৳{(totalDonations || 0).toLocaleString()}
            </div>
            <p className="text-sm text-navy-500 mt-1 font-medium">Total Donations</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-navy-100 p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-red-500">৳</span>
            </div>
            <div className="text-3xl font-bold text-navy-700">
              ৳{(totalExpenses || 0).toLocaleString()}
            </div>
            <p className="text-sm text-navy-500 mt-1 font-medium">Total Expenses</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-navy-100 p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-full bg-navy-50 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-navy-700">#</span>
            </div>
            <div className="text-3xl font-bold text-navy-700">
              {transactionCount || 0}
            </div>
            <p className="text-sm text-navy-500 mt-1 font-medium">Total Transactions</p>
          </div>
        </div>

        {/* ===== BALANCE CARD ===== */}
        <div className="bg-gradient-to-r from-navy-700 to-sky-600 rounded-2xl p-6 md:p-8 mb-12 text-center text-white shadow-lg">
          <p className="text-sm text-sky-200 mb-1 font-medium">Current Balance</p>
          <p className="text-4xl md:text-5xl font-bold">
            ৳{balance.toLocaleString()}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-3 text-xs text-sky-200">
            <span>Donations: ৳{(totalDonations || 0).toLocaleString()}</span>
            <span className="hidden sm:inline">•</span>
            <span>Expenses: ৳{(totalExpenses || 0).toLocaleString()}</span>
          </div>
        </div>

        {/* ===== LIVE CHART ===== */}
        <div className="mb-12">
          <LiveDonationChart />
        </div>

        {/* ===== RECENT TRANSACTIONS ===== */}
        <div className="bg-white rounded-2xl shadow-md border border-navy-100 p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-navy-700">Recent Activity</h2>
            <span className="text-xs text-navy-400 bg-navy-50 px-3 py-1 rounded-full">
              Last {recent?.length || 0} entries
            </span>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-navy-50">
                  <th className="px-4 py-3 text-left text-navy-600 font-semibold rounded-l-lg">Date</th>
                  <th className="px-4 py-3 text-right text-navy-600 font-semibold">Donations</th>
                  <th className="px-4 py-3 text-right text-navy-600 font-semibold rounded-r-lg">Expenses</th>
                </tr>
              </thead>
              <tbody>
                {recent && recent.length > 0 ? (
                  recent.map((item, index) => (
                    <tr key={index} className="border-t border-navy-50 hover:bg-navy-50/30 transition-colors">
                      <td className="px-4 py-3 text-navy-700 font-medium">
                        {new Date(item.date).toLocaleDateString('en-BD', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-3 text-right text-green-600 font-semibold">
                        {item.incomingDonation > 0 ? `৳${item.incomingDonation.toLocaleString()}` : '—'}
                      </td>
                      <td className="px-4 py-3 text-right text-red-500 font-semibold">
                        {item.dailyTotalExpense > 0 ? `৳${item.dailyTotalExpense.toLocaleString()}` : '—'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-4 py-8 text-center text-navy-400">
                      No transactions recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {recent && recent.length > 0 ? (
              recent.map((item, index) => (
                <div key={index} className="bg-navy-50/30 rounded-xl p-4 border border-navy-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-navy-700">
                      {new Date(item.date).toLocaleDateString('en-BD', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="text-xs text-navy-400 bg-white px-2 py-0.5 rounded-full">
                      #{index + 1}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-navy-500">Donations</p>
                      <p className="text-sm font-semibold text-green-600">
                        {item.incomingDonation > 0 ? `৳${item.incomingDonation.toLocaleString()}` : '—'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-navy-500">Expenses</p>
                      <p className="text-sm font-semibold text-red-500">
                        {item.dailyTotalExpense > 0 ? `৳${item.dailyTotalExpense.toLocaleString()}` : '—'}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-navy-400">
                No transactions recorded yet.
              </div>
            )}
          </div>
        </div>

        {/* ===== FOOTER NOTE ===== */}
        <div className="mt-8 text-center text-sm text-navy-400">
          Data is updated automatically. All donations and expenses are publicly recorded for accountability.
        </div>
      </div>
    </div>
  );
};

export default Transparency;