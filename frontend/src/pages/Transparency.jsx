import { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import LiveDonationChart from '../components/LiveDonationChart';

const Transparency = () => {
  const { summary } = useSocket();
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    if (summary && summary.transactionCount !== undefined) {
      setLoading(false);
    }
  }, [summary]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const handleShowLess = () => {
    setVisibleCount(10);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="text-6xl mb-4 animate-bounce">📊</div>
        <p className="text-xl sm:text-2xl text-navy-600 font-semibold animate-pulse">Loading transparency data...</p>
      </div>
    );
  }

  const { totalDonations, totalExpenses, transactionCount, recent } = summary;
  const balance = (totalDonations || 0) - (totalExpenses || 0);
  const totalEntries = recent?.length || 0;
  const visibleEntries = recent?.slice(0, visibleCount) || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-navy-50">
      <div className="container mx-auto px-4 sm:px-6 py-12 pt-24 max-w-5xl">

        {/* ===== HEADER ===== */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block bg-navy-50 rounded-full px-4 sm:px-6 py-2 border border-navy-200 mb-4">
            <span className="text-xs sm:text-sm font-semibold text-navy-600">FINANCIAL TRANSPARENCY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-700 mb-4">
            Your Donations in Action
          </h1>
          <p className="text-base sm:text-xl text-navy-500 max-w-2xl mx-auto px-4">
            Every contribution is tracked with complete transparency. Here's how your support is making a difference.
          </p>
          <div className="mt-3 inline-block bg-green-50 text-green-700 text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full">
            🔴 Live updates via WebSocket
          </div>
        </div>

        {/* ===== SUMMARY CARDS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-md border border-navy-100 p-4 sm:p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3">
              <span className="text-base sm:text-2xl font-bold text-green-600">৳</span>
            </div>
            <div className="text-xl sm:text-3xl font-bold text-navy-700">
              ৳{(totalDonations || 0).toLocaleString()}
            </div>
            <p className="text-xs sm:text-sm text-navy-500 mt-1 font-medium">Total Donations</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-navy-100 p-4 sm:p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-3">
              <span className="text-base sm:text-2xl font-bold text-red-500">৳</span>
            </div>
            <div className="text-xl sm:text-3xl font-bold text-navy-700">
              ৳{(totalExpenses || 0).toLocaleString()}
            </div>
            <p className="text-xs sm:text-sm text-navy-500 mt-1 font-medium">Total Expenses</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-navy-100 p-4 sm:p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-navy-50 flex items-center justify-center mx-auto mb-3">
              <span className="text-base sm:text-2xl font-bold text-navy-700">#</span>
            </div>
            <div className="text-xl sm:text-3xl font-bold text-navy-700">
              {transactionCount || 0}
            </div>
            <p className="text-xs sm:text-sm text-navy-500 mt-1 font-medium">Total Transactions</p>
          </div>
        </div>

        {/* ===== BALANCE CARD ===== */}
        <div className="bg-gradient-to-r from-navy-700 to-sky-600 rounded-2xl p-5 sm:p-8 mb-12 text-center text-white shadow-lg">
          <p className="text-xs sm:text-sm text-sky-200 mb-1 font-medium">Current Balance</p>
          <p className="text-2xl sm:text-4xl md:text-5xl font-bold">
            ৳{balance.toLocaleString()}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-3 text-[10px] sm:text-xs text-sky-200">
            <span>Donations: ৳{(totalDonations || 0).toLocaleString()}</span>
            <span className="hidden xs:inline">•</span>
            <span>Expenses: ৳{(totalExpenses || 0).toLocaleString()}</span>
          </div>
        </div>

        {/* ===== LIVE CHART ===== */}
        <div className="mb-12">
          <LiveDonationChart />
        </div>

        {/* ===== RECENT TRANSACTIONS ===== */}
        <div className="bg-white rounded-2xl shadow-md border border-navy-100 p-4 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-navy-700">Recent Activity</h2>
            <span className="text-[10px] sm:text-xs text-navy-400 bg-navy-50 px-3 py-1 rounded-full">
              Showing {Math.min(visibleCount, totalEntries)} of {totalEntries} entries
            </span>
          </div>

          {/* Desktop Table - Hidden on Mobile */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="bg-navy-50">
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-navy-600 font-semibold rounded-l-lg">Date</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-navy-600 font-semibold">Donations</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-navy-600 font-semibold rounded-r-lg">Expenses</th>
                </tr>
              </thead>
              <tbody>
                {visibleEntries.length > 0 ? (
                  visibleEntries.map((item, index) => (
                    <tr key={index} className="border-t border-navy-50 hover:bg-navy-50/30 transition-colors">
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-navy-700 font-medium">
                        {new Date(item.date).toLocaleDateString('en-BD', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-green-600 font-semibold">
                        {item.incomingDonation > 0 ? `৳${item.incomingDonation.toLocaleString()}` : '—'}
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-red-500 font-semibold">
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

          {/* Mobile Cards - Visible on Mobile */}
          <div className="md:hidden space-y-3">
            {visibleEntries.length > 0 ? (
              visibleEntries.map((item, index) => (
                <div key={index} className="bg-navy-50/30 rounded-xl p-4 border border-navy-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-navy-700">
                      {new Date(item.date).toLocaleDateString('en-BD', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="text-[10px] text-navy-400 bg-white px-2 py-0.5 rounded-full">
                      #{index + 1}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-navy-500">Donations</p>
                      <p className="text-sm font-semibold text-green-600">
                        {item.incomingDonation > 0 ? `৳${item.incomingDonation.toLocaleString()}` : '—'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-navy-500">Expenses</p>
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

          {/* ===== LOAD MORE / SHOW LESS ===== */}
          {totalEntries > 10 && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {visibleCount < totalEntries && (
                <button
                  onClick={handleLoadMore}
                  className="px-5 sm:px-6 py-2 sm:py-2.5 bg-navy-700 text-white font-semibold rounded-xl hover:bg-navy-800 transition-all duration-300 shadow-md hover:shadow-lg text-sm"
                >
                  Load More ({totalEntries - visibleCount} remaining)
                </button>
              )}
              {visibleCount > 10 && (
                <button
                  onClick={handleShowLess}
                  className="px-5 sm:px-6 py-2 sm:py-2.5 bg-navy-50 text-navy-700 font-semibold rounded-xl hover:bg-navy-100 transition-all duration-300 text-sm"
                >
                  Show Less
                </button>
              )}
            </div>
          )}
        </div>

        {/* ===== FOOTER NOTE ===== */}
        <div className="mt-8 text-center text-[10px] sm:text-sm text-navy-400">
          Data is updated automatically. All donations and expenses are publicly recorded for accountability.
        </div>
      </div>
    </div>
  );
};

export default Transparency;